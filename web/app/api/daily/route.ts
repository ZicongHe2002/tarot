import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/session";
import { getDailyGuidance } from "@/lib/daily";
import { hasPremium, freeInterpretationsUsed, FREE_MONTHLY_INTERPRETATIONS } from "@/lib/entitlements";
import { prisma } from "@/lib/prisma";

const Body = z.object({
  profileId: z.string(),
  locale: z.enum(["en", "zh"]).default("en"),
});

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  // Cached guidance for today is always retrievable; fresh generation is
  // metered on the free tier.
  const date = new Date().toISOString().slice(0, 10);
  const existing = await prisma.dailyGuidance.findUnique({
    where: { profileId_date_locale: { profileId: parsed.data.profileId, date, locale: parsed.data.locale } },
  });
  if (!existing) {
    const premium = await hasPremium(user.id);
    if (!premium && (await freeInterpretationsUsed(user.id)) >= FREE_MONTHLY_INTERPRETATIONS) {
      return NextResponse.json({ error: "quota_exceeded", upgrade: true }, { status: 402 });
    }
  }

  const result = await getDailyGuidance({ userId: user.id, profileId: parsed.data.profileId, locale: parsed.data.locale });
  if (!result) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(result, {
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  });
}
