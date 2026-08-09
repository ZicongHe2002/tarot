import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { newAccessToken } from "@/lib/ids";
import { getSessionUser, assertOwnsProfile } from "@/lib/session";
import { baziEngine, versionsJson } from "@/lib/providers";
import { sanitizeQuestion } from "@/lib/safety";
import { safetyEvent, audit } from "@/lib/audit";
import { resolveBirthPlace } from "@/lib/geo";
import { hasUnlimitedAccess, freeInterpretationsUsed, FREE_MONTHLY_INTERPRETATIONS } from "@/lib/entitlements";

const Body = z.object({
  kind: z.enum(["natal", "annual"]).default("natal"),
  locale: z.enum(["en", "zh"]).default("en"),
  profileId: z.string().optional(),
  birth: z
    .object({
      dateISO: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
      cityId: z.string().optional(),
      lat: z.number().min(-90).max(90).optional(),
      lon: z.number().min(-180).max(180).optional(),
      tz: z.string().optional(),
    })
    .optional(),
  sex: z.enum(["male", "female"]).nullable().default(null),
  year: z.number().int().min(1900).max(2100).optional(),
  topic: z.string().max(40).optional(),
  question: z.string().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  const { kind, profileId, sex, year, question } = parsed.data;
  const user = await getSessionUser();

  let birth: { dateISO: string; time?: string; lat: number; lon: number; tz: string };
  let effectiveSex = sex;
  if (profileId) {
    if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    const p = await assertOwnsProfile(user.id, profileId).catch(() => null);
    if (!p) return NextResponse.json({ error: "forbidden" }, { status: 403 });
    birth = { dateISO: p.dateISO, time: p.timeKnown && p.time ? p.time : undefined, lat: p.lat, lon: p.lon, tz: p.tz };
    effectiveSex = sex ?? (p.sex as "male" | "female" | null);
  } else {
    const b = parsed.data.birth;
    if (!b) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    const place = await resolveBirthPlace(b);
    if (!place) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    birth = { dateISO: b.dateISO, time: b.time, lat: place.lat, lon: place.lon, tz: place.tz };
  }

  const sanitized = sanitizeQuestion(question);
  if (sanitized.level === "crisis") {
    await safetyEvent("crisis_blocked", sanitized.categories.join(","), { userId: user?.id });
    return NextResponse.json({ blocked: true });
  }

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

  const options = { sex: effectiveSex };
  let calc: unknown;
  let meta;
  if (kind === "annual") {
    const res = await baziEngine.calculateAnnualInfluence({
      natal: birth,
      options,
      year: year ?? new Date().getFullYear(),
    });
    // Annual influence is interpreted alongside the natal pillars.
    const chart = await baziEngine.calculateChart(birth, options);
    calc = { natal: chart.calc, annual: res.annual };
    meta = res.meta;
  } else {
    const res = await baziEngine.calculateChart(birth, options);
    calc = res.calc;
    meta = res.meta;
  }

  const row = await prisma.baziChart.create({
    data: {
      accessToken: newAccessToken(),
      userId: user?.id ?? null,
      profileId: profileId ?? null,
      kind,
      calcJson: JSON.stringify(calc),
      versionsJson: versionsJson(meta),
    },
  });
  if (sanitized.level === "high_stakes") {
    await safetyEvent("high_stakes_flagged", sanitized.categories.join(","), { userId: user?.id, refId: row.id });
  }
  await audit("bazi_chart_created", row.id, kind);
  return NextResponse.json({ token: row.accessToken, kind: "bazi" });
}
