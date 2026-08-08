import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/config";
import { ensureInterpretation } from "@/lib/readings";

// Unified status/content endpoint for tarot/astrology/bazi readings.
// The unguessable token is the access capability (never a sequential id);
// responses are personal data and must never be indexed or cached.
const NO_STORE = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };

async function findByToken(token: string) {
  const tarot = await prisma.tarotReading.findUnique({ where: { accessToken: token } });
  if (tarot) return { kind: "tarot" as const, row: tarot };
  const astro = await prisma.astrologyChart.findUnique({ where: { accessToken: token } });
  if (astro) return { kind: "astrology" as const, row: astro };
  const bazi = await prisma.baziChart.findUnique({ where: { accessToken: token } });
  if (bazi) return { kind: "bazi" as const, row: bazi };
  return null;
}

function readingType(kind: "tarot" | "astrology" | "bazi", row: { mode?: string; kind?: string }) {
  if (kind === "tarot") return `tarot_${row.mode}`;
  if (kind === "astrology") return row.kind === "transits" ? "astrology_transits" : "natal_general";
  return row.kind === "annual" ? "bazi_annual" : "bazi_general";
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const found = await findByToken(token);
  if (!found) return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });

  const { kind, row } = found;
  const locale = (req.nextUrl.searchParams.get("locale") === "zh" ? "zh" : "en") as "en" | "zh";
  const calc = JSON.parse(kind === "tarot" ? (row as { spreadJson: string }).spreadJson : (row as { calcJson: string }).calcJson);

  let current = row as {
    interpretationStatus: string;
    interpretationJson: string | null;
    isMock: boolean;
    versionsJson: string;
  };
  // Regenerate when pending/generating — and also when a sample-mode result
  // was cached before the real interpretation key was configured.
  const staleMock =
    current.interpretationStatus === "completed" && current.isMock && env.hasDeepSeek();
  if (current.interpretationStatus === "pending" || current.interpretationStatus === "generating" || staleMock) {
    const r = row as { topic?: string | null; questionSanitized?: string | null; safetyLevel?: string; mode?: string; kind?: string; id: string };
    current = await ensureInterpretation({
      kind,
      id: r.id,
      readingType: readingType(kind, r),
      language: locale,
      calculation: calc,
      warnings: calc.calculation_warnings ?? [],
      userContext: {
        topic: r.topic ?? undefined,
        question: r.questionSanitized ?? undefined,
      },
    });
  }

  return NextResponse.json(
    {
      kind,
      mode: (row as { mode?: string }).mode ?? (row as { kind?: string }).kind,
      topic: (row as { topic?: string | null }).topic ?? null,
      questionSanitized: (row as { questionSanitized?: string | null }).questionSanitized ?? null,
      safetyLevel: (row as { safetyLevel?: string }).safetyLevel ?? "ok",
      status: current.interpretationStatus,
      calc,
      interpretation: current.interpretationJson ? JSON.parse(current.interpretationJson) : null,
      isMock: current.isMock,
      versions: JSON.parse(current.versionsJson),
      createdAt: (row as { createdAt: Date }).createdAt,
    },
    { headers: NO_STORE }
  );
}

// Retry a failed generation at no extra cost (md §4.6.6) — same calculation.
export async function POST(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const found = await findByToken(token);
  if (!found) return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
  const t =
    found.kind === "tarot"
      ? prisma.tarotReading
      : found.kind === "astrology"
        ? prisma.astrologyChart
        : prisma.baziChart;
  await (t as typeof prisma.tarotReading).updateMany({
    where: { id: found.row.id, interpretationStatus: "failed" },
    data: { interpretationStatus: "pending" },
  });
  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
