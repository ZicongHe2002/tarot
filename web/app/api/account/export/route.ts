import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { audit } from "@/lib/audit";

// Full user data export (spec §18): profiles, readings, journal, consents.
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const [profiles, tarot, astro, bazi, daily, compat, journal, consents, subs] = await Promise.all([
    prisma.birthProfile.findMany({ where: { userId: user.id } }),
    prisma.tarotReading.findMany({ where: { userId: user.id } }),
    prisma.astrologyChart.findMany({ where: { userId: user.id } }),
    prisma.baziChart.findMany({ where: { userId: user.id } }),
    prisma.dailyGuidance.findMany({ where: { userId: user.id } }),
    prisma.compatibilityReport.findMany({ where: { userId: user.id } }),
    prisma.journalEntry.findMany({ where: { userId: user.id } }),
    prisma.consentRecord.findMany({ where: { userId: user.id } }),
    prisma.subscription.findMany({ where: { userId: user.id } }),
  ]);

  await prisma.dataRequest.create({ data: { userId: user.id, kind: "export", status: "completed" } });
  await audit("data_exported", user.id, "full export", user.id);

  const parse = (s: string | null) => (s ? JSON.parse(s) : null);
  const body = {
    exportedAt: new Date().toISOString(),
    email: user.email,
    profiles,
    readings: {
      tarot: tarot.map((r) => ({ ...r, spreadJson: parse(r.spreadJson), interpretationJson: parse(r.interpretationJson) })),
      astrology: astro.map((r) => ({ ...r, calcJson: parse(r.calcJson), interpretationJson: parse(r.interpretationJson) })),
      bazi: bazi.map((r) => ({ ...r, calcJson: parse(r.calcJson), interpretationJson: parse(r.interpretationJson) })),
      dailyGuidance: daily.map((r) => ({ ...r, contentJson: parse(r.contentJson) })),
      compatibility: compat.map((r) => ({ ...r, calcJson: parse(r.calcJson), interpretationJson: parse(r.interpretationJson) })),
    },
    journal: journal.map((e) => ({ ...e, tagsJson: parse(e.tagsJson) })),
    consents,
    subscriptions: subs,
  };

  return new NextResponse(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="my-data-export.json"',
      "Cache-Control": "no-store",
    },
  });
}
