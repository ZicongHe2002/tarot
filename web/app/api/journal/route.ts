import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

const CreateBody = z.object({
  kind: z.enum(["tarot", "astrology", "bazi", "daily_guidance", "note"]),
  refId: z.string().max(80).optional(),
  title: z.string().min(1).max(200),
  notes: z.string().max(8000).optional(),
  mood: z.string().max(30).optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
});

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const parsed = CreateBody.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  const { kind, refId, title, notes, mood, tags } = parsed.data;
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      kind,
      refId: refId ?? null,
      title,
      notes: notes ?? "",
      mood: mood ?? null,
      tagsJson: JSON.stringify(tags ?? []),
    },
  });
  return NextResponse.json({ id: entry.id });
}

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const kind = req.nextUrl.searchParams.get("kind") || undefined;
  const favorite = req.nextUrl.searchParams.get("favorite") === "1" || undefined;
  const entries = await prisma.journalEntry.findMany({
    where: { userId: user.id, ...(kind ? { kind } : {}), ...(favorite ? { favorite: true } : {}) },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return NextResponse.json(
    { entries },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
  );
}
