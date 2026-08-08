import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

const PatchBody = z.object({
  title: z.string().min(1).max(200).optional(),
  notes: z.string().max(8000).optional(),
  mood: z.string().max(30).nullable().optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
  favorite: z.boolean().optional(),
});

// Ownership is always checked server-side against the session (spec §18).
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const { id } = await ctx.params;
  const parsed = PatchBody.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  const { tags, ...rest } = parsed.data;
  const result = await prisma.journalEntry.updateMany({
    where: { id, userId: user.id },
    data: { ...rest, ...(tags ? { tagsJson: JSON.stringify(tags) } : {}) },
  });
  if (result.count === 0) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const { id } = await ctx.params;
  const result = await prisma.journalEntry.deleteMany({ where: { id, userId: user.id } });
  if (result.count === 0) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
