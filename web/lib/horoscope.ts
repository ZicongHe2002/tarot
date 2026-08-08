// Daily horoscope: deterministic sky facts per sign + cached interpretation.
// Cached per (sign, date, locale) in AstrologyChart rows (kind "horoscope").
import { prisma } from "./prisma";
import { computePositions, SIGNS } from "./engines/astrology";
import { getInterpretationEngine, versionsJson } from "./providers";
import type { InterpretationResult } from "./providers/types";
import { env, type Locale } from "./config";
import { RealAstrologyEngine } from "./providers/astrology";

export interface HoroscopeData {
  sign: string;
  sign_zh: string;
  date: string;
  facts: {
    positions: ReturnType<typeof computePositions>;
    solar_houses: Array<{ planet: string; house: number }>;
    retrogrades: string[];
  };
  interpretation: InterpretationResult | null;
  isMock: boolean;
  status: string;
}

export const SIGN_SLUGS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

export async function getDailyHoroscope(signSlug: string, locale: Locale): Promise<HoroscopeData | null> {
  const signIndex = SIGN_SLUGS.indexOf(signSlug);
  if (signIndex === -1) return null;
  const sign = SIGNS[signIndex];
  const date = new Date().toISOString().slice(0, 10);
  const cacheKey = `horoscope_${signSlug}_${date}_${locale}`;

  const positions = computePositions(new Date());
  const solar_houses = positions.map((p) => {
    const pSign = Math.floor((((p.longitude % 360) + 360) % 360) / 30);
    return { planet: p.planet_en, house: ((pSign - signIndex + 12) % 12) + 1 };
  });
  const retrogrades = positions.filter((p) => p.retrograde).map((p) => p.planet_en);
  const facts = { positions, solar_houses, retrogrades };

  const cached = await prisma.astrologyChart.findUnique({ where: { accessToken: cacheKey } });
  // Regenerate sample-mode results once a real interpretation key exists.
  if (cached?.interpretationJson && cached.isMock && env.hasDeepSeek()) {
    await prisma.astrologyChart.update({
      where: { id: cached.id },
      data: { interpretationJson: null, interpretationStatus: "pending" },
    });
    cached.interpretationJson = null;
  }
  if (cached?.interpretationJson) {
    return {
      sign: sign.en,
      sign_zh: sign.zh,
      date,
      facts,
      interpretation: JSON.parse(cached.interpretationJson),
      isMock: cached.isMock,
      status: "completed",
    };
  }

  const meta = new RealAstrologyEngine().meta();
  const row =
    cached ??
    (await prisma.astrologyChart
      .create({
        data: {
          accessToken: cacheKey,
          kind: "horoscope",
          calcJson: JSON.stringify(facts),
          versionsJson: versionsJson(meta),
        },
      })
      .catch(async () => (await prisma.astrologyChart.findUnique({ where: { accessToken: cacheKey } }))!));

  const outcome = await getInterpretationEngine().interpret({
    requestId: cacheKey,
    readingType: "horoscope_daily",
    language: locale,
    calculation: {
      sign: sign.en,
      sign_zh: sign.zh,
      date,
      transiting_positions: positions.map((p) => ({
        planet: p.planet_en,
        sign: p.sign,
        degree_in_sign: p.degree_in_sign,
        retrograde: p.retrograde,
      })),
      solar_houses,
      calculation_warnings: [
        "Solar houses are counted from the sign itself (sun-sign horoscope convention), not from a personal Ascendant.",
      ],
    },
    userContext: { topic: "daily_horoscope" },
    warnings: [],
  });

  if ((outcome.status === "ok" || outcome.status === "mock") && outcome.result) {
    await prisma.astrologyChart.update({
      where: { id: row.id },
      data: {
        interpretationJson: JSON.stringify(outcome.result),
        interpretationStatus: "completed",
        isMock: outcome.status === "mock",
        versionsJson: versionsJson(meta, outcome),
      },
    });
    return {
      sign: sign.en,
      sign_zh: sign.zh,
      date,
      facts,
      interpretation: outcome.result,
      isMock: outcome.status === "mock",
      status: "completed",
    };
  }
  return { sign: sign.en, sign_zh: sign.zh, date, facts, interpretation: null, isMock: false, status: "failed" };
}
