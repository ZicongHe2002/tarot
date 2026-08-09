// Builds the pre-paid, locked reading row for each one-time report product.
// The deterministic calculation happens at order time; interpretation stays
// "awaiting_payment" until the webhook unlocks it.
import { z } from "zod";
import { prisma } from "../prisma";
import { newAccessToken } from "../ids";
import { createTarotReading } from "../readings";
import { astrologyEngine, baziEngine, versionsJson } from "../providers";
import { computeCompatibility } from "../compat";
import { RealAstrologyEngine } from "../providers/astrology";
import { resolveBirthPlace } from "../geo";
import type { LocaleCode } from "../providers/types";

const ManualBirthInput = z.object({
  dateISO: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  cityId: z.string().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lon: z.number().min(-180).max(180).optional(),
  tz: z.string().optional(),
  sex: z.enum(["male", "female"]).nullable().optional(),
});

const SavedBirthInput = z.object({
  profileId: z.string().min(1),
  sex: z.enum(["male", "female"]).nullable().optional(),
});

const BirthInput = z.union([ManualBirthInput, SavedBirthInput]);

export const REPORT_INPUT_SCHEMAS = {
  "tarot-deep-reading": z.object({
    topic: z.enum(["love", "career", "growth", "general"]).default("general"),
    question: z.string().max(2000).optional(),
  }),
  "natal-report": z.object({ birth: BirthInput }),
  "bazi-report": z.object({ birth: BirthInput }),
  "compatibility-report": z.object({ a: BirthInput, b: BirthInput }),
} as const;

export type ReportSlug = keyof typeof REPORT_INPUT_SCHEMAS;

async function resolvePlace(b: z.infer<typeof BirthInput>, userId: string | null) {
  if ("profileId" in b) {
    if (!userId) throw new Error("unauthenticated_profile");
    const profile = await prisma.birthProfile.findFirst({
      where: { id: b.profileId, userId },
    });
    if (!profile) throw new Error("invalid_profile");
    return {
      profileId: profile.id,
      dateISO: profile.dateISO,
      time: profile.timeKnown && profile.time ? profile.time : undefined,
      lat: profile.lat,
      lon: profile.lon,
      tz: profile.tz,
      sex: b.sex ?? (profile.sex as "male" | "female" | null),
    };
  }
  const place = await resolveBirthPlace(b);
  if (!place) throw new Error("invalid_place");
  return { dateISO: b.dateISO, time: b.time, lat: place.lat, lon: place.lon, tz: place.tz, sex: b.sex ?? null };
}

export async function createLockedReading(
  slug: ReportSlug,
  input: unknown,
  locale: LocaleCode,
  userId: string | null
): Promise<{ kind: string; refId: string; blocked?: boolean } | null> {
  const parsed = REPORT_INPUT_SCHEMAS[slug].safeParse(input);
  if (!parsed.success) return null;

  if (slug === "tarot-deep-reading") {
    const data = parsed.data as z.infer<(typeof REPORT_INPUT_SCHEMAS)["tarot-deep-reading"]>;
    const created = await createTarotReading({
      mode: "one_card",
      spreadOverride: "celtic_cross",
      topic: data.topic,
      question: data.question,
      locale,
      userId,
      initialStatus: "awaiting_payment",
    });
    if (created.blocked) return { kind: "tarot", refId: "", blocked: true };
    return { kind: "tarot", refId: created.id };
  }

  if (slug === "natal-report" || slug === "bazi-report") {
    const data = parsed.data as { birth: z.infer<typeof BirthInput> };
    const place = await resolvePlace(data.birth, userId);
    if (slug === "natal-report") {
      const result = await astrologyEngine.calculateNatalChart(place);
      const row = await prisma.astrologyChart.create({
        data: {
          accessToken: newAccessToken(),
          userId,
          profileId: place.profileId ?? null,
          kind: "natal",
          calcJson: JSON.stringify(result.calc),
          interpretationStatus: "awaiting_payment",
          versionsJson: versionsJson(result.meta),
        },
      });
      return { kind: "astrology", refId: row.id };
    }
    const result = await baziEngine.calculateChart(place, { sex: place.sex });
    const row = await prisma.baziChart.create({
      data: {
        accessToken: newAccessToken(),
        userId,
        profileId: place.profileId ?? null,
        kind: "natal",
        calcJson: JSON.stringify(result.calc),
        interpretationStatus: "awaiting_payment",
        versionsJson: versionsJson(result.meta),
      },
    });
    return { kind: "bazi", refId: row.id };
  }

  // compatibility-report
  const data = parsed.data as { a: z.infer<typeof BirthInput>; b: z.infer<typeof BirthInput> };
  const a = await resolvePlace(data.a, userId);
  const b = await resolvePlace(data.b, userId);
  const labelA = locale === "zh" ? "甲方" : "Person A";
  const labelB = locale === "zh" ? "乙方" : "Person B";
  const { calc } = computeCompatibility("combined", { ...a, label: labelA }, { ...b, label: labelB });
  const meta = new RealAstrologyEngine().meta();
  const row = await prisma.compatibilityReport.create({
    data: {
      accessToken: newAccessToken(),
      userId,
      mode: "combined",
      inputJson: JSON.stringify({ derived: true }),
      calcJson: JSON.stringify(calc),
      interpretationStatus: "awaiting_payment",
      versionsJson: versionsJson(meta),
    },
  });
  return { kind: "compatibility", refId: row.id };
}

/** Access token of the underlying reading — only exposed once the order is paid. */
export async function readingTokenFor(kind: string, refId: string): Promise<string | null> {
  if (kind === "tarot") return (await prisma.tarotReading.findUnique({ where: { id: refId } }))?.accessToken ?? null;
  if (kind === "astrology") return (await prisma.astrologyChart.findUnique({ where: { id: refId } }))?.accessToken ?? null;
  if (kind === "bazi") return (await prisma.baziChart.findUnique({ where: { id: refId } }))?.accessToken ?? null;
  if (kind === "compatibility") return (await prisma.compatibilityReport.findUnique({ where: { id: refId } }))?.accessToken ?? null;
  return null;
}
