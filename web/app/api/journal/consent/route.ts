import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { CONSENT_WORDING_VERSION } from "@/lib/config";

const Body = z.object({
  enabled: z.boolean(),
  locale: z.enum(["en", "zh"]).optional(),
});

// Journal AI opt-in is an explicit, versioned consent record (spec §16).
// Enabling appends "journal_ai_optin"; disabling appends "journal_ai_optout" —
// the newest of the two wins, so the full history is auditable.
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  const { enabled, locale } = parsed.data;

  await prisma.consentRecord.create({
    data: {
      userId: user.id,
      kind: enabled ? "journal_ai_optin" : "journal_ai_optout",
      wordingVersion: CONSENT_WORDING_VERSION,
      locale: locale ?? "en",
    },
  });
  return NextResponse.json(
    { ok: true, enabled },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
  );
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const [optin, optout] = await Promise.all([
    prisma.consentRecord.findFirst({
      where: { userId: user.id, kind: "journal_ai_optin" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.consentRecord.findFirst({
      where: { userId: user.id, kind: "journal_ai_optout" },
      orderBy: { createdAt: "desc" },
    }),
  ]);
  const enabled = !!optin && (!optout || optin.createdAt > optout.createdAt);
  return NextResponse.json(
    { enabled },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
  );
}
