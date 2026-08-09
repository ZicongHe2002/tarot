import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { newAccessToken } from "@/lib/ids";
import { getSessionUser } from "@/lib/session";
import { computeCompatibility } from "@/lib/compat";
import { resolveBirthPlace } from "@/lib/geo";
import { getInterpretationEngine, versionsJson } from "@/lib/providers";
import { RealAstrologyEngine } from "@/lib/providers/astrology";
import { hasUnlimitedAccess, freeInterpretationsUsed, FREE_MONTHLY_INTERPRETATIONS } from "@/lib/entitlements";
import { audit } from "@/lib/audit";

const ManualPerson = z.object({
  dateISO: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  cityId: z.string().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lon: z.number().min(-180).max(180).optional(),
  tz: z.string().optional(),
  sex: z.enum(["male", "female"]).nullable().optional(),
});

const SavedPerson = z.object({
  profileId: z.string().min(1),
  sex: z.enum(["male", "female"]).nullable().optional(),
});

const Person = z.union([ManualPerson, SavedPerson]);

const Body = z.object({
  mode: z.enum(["astrology", "bazi", "combined"]),
  locale: z.enum(["en", "zh"]).default("en"),
  a: Person,
  b: Person,
});

async function resolve(p: z.infer<typeof Person>, label: string, userId?: string) {
  if ("profileId" in p) {
    if (!userId) return null;
    const profile = await prisma.birthProfile.findFirst({
      where: { id: p.profileId, userId },
    });
    if (!profile) return null;
    return {
      dateISO: profile.dateISO,
      time: profile.timeKnown && profile.time ? profile.time : undefined,
      lat: profile.lat,
      lon: profile.lon,
      tz: profile.tz,
      sex: p.sex ?? (profile.sex as "male" | "female" | null),
      label,
    };
  }
  const place = await resolveBirthPlace(p);
  if (!place) return null;
  return { dateISO: p.dateISO, time: p.time, lat: place.lat, lon: place.lon, tz: place.tz, sex: p.sex ?? null, label };
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  const { mode, locale, a, b } = parsed.data;

  const premium = await hasUnlimitedAccess(user?.id);
  if (!premium) {
    const jar = await cookies();
    if (user) {
      if ((await freeInterpretationsUsed(user.id)) >= FREE_MONTHLY_INTERPRETATIONS) {
        return NextResponse.json({ error: "quota_exceeded", upgrade: true }, { status: 402 });
      }
    } else {
      const used = Number(jar.get("fi")?.value || "0");
      if (used >= FREE_MONTHLY_INTERPRETATIONS) {
        return NextResponse.json({ error: "quota_exceeded", upgrade: true, signin: true }, { status: 402 });
      }
      jar.set("fi", String(used + 1), { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
    }
  }

  // Neutral labels — never customer-entered names of third parties (spec §13).
  const labelA = locale === "zh" ? "甲方" : "Person A";
  const labelB = locale === "zh" ? "乙方" : "Person B";
  const pa = await resolve(a, labelA, user?.id);
  const pb = await resolve(b, labelB, user?.id);
  if (!pa || !pb) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  const { calc, warnings } = computeCompatibility(mode, pa, pb);

  const meta = new RealAstrologyEngine().meta();
  const row = await prisma.compatibilityReport.create({
    data: {
      accessToken: newAccessToken(),
      userId: user?.id ?? null,
      mode,
      inputJson: JSON.stringify({ derived: true }), // no exact birth data stored beyond calc
      calcJson: JSON.stringify(calc),
      versionsJson: versionsJson(meta),
    },
  });

  const outcome = await getInterpretationEngine().interpret({
    requestId: row.id,
    readingType: `compatibility_${mode}`,
    language: locale,
    calculation: calc,
    userContext: { topic: "compatibility" },
    warnings,
  });

  if ((outcome.status === "ok" || outcome.status === "mock") && outcome.result) {
    await prisma.compatibilityReport.update({
      where: { id: row.id },
      data: {
        interpretationJson: JSON.stringify(outcome.result),
        interpretationStatus: "completed",
        isMock: outcome.status === "mock",
        versionsJson: versionsJson(meta, outcome),
      },
    });
  } else {
    await prisma.compatibilityReport.update({
      where: { id: row.id },
      data: { interpretationStatus: "failed" },
    });
  }
  await audit("compatibility_created", row.id, mode);
  return NextResponse.json({ token: row.accessToken });
}
