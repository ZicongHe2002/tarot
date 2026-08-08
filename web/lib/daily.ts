// Daily guidance synthesis (spec §12): three deterministic lenses feed one
// interpretation. Facts first, language second — and the disclosure that this
// is reflective synthesis, not probability, ships with every result.
import { Solar } from "lunar-javascript";
import { prisma } from "./prisma";
import { env, type Locale } from "./config";
import { astrologyEngine, tarotEngine, getInterpretationEngine, versionsJson } from "./providers";
import { tenGodFor, stemInfo, branchInfo } from "./engines/bazi";
import { computeBazi } from "./engines/bazi";
import type { InterpretationResult } from "./providers/types";

export interface DailyResult {
  date: string;
  facts: Record<string, unknown>;
  interpretation: InterpretationResult | null;
  isMock: boolean;
  status: "completed" | "failed";
}

export async function getDailyGuidance(opts: {
  userId: string;
  profileId: string;
  locale: Locale;
}): Promise<DailyResult | null> {
  const profile = await prisma.birthProfile.findFirst({
    where: { id: opts.profileId, userId: opts.userId },
  });
  if (!profile) return null;
  const date = new Date().toISOString().slice(0, 10);

  let cached = await prisma.dailyGuidance.findUnique({
    where: { profileId_date_locale: { profileId: profile.id, date, locale: opts.locale } },
  });
  // Regenerate sample-mode guidance once a real interpretation key exists.
  if (cached?.isMock && env.hasDeepSeek()) {
    await prisma.dailyGuidance.delete({ where: { id: cached.id } }).catch(() => null);
    cached = null;
  }
  if (cached) {
    const content = JSON.parse(cached.contentJson);
    return { date, facts: content.facts, interpretation: content.interpretation, isMock: cached.isMock, status: "completed" };
  }

  // Lens 1 — astrology: today's transits to the natal chart.
  const birth = {
    dateISO: profile.dateISO,
    time: profile.timeKnown && profile.time ? profile.time : undefined,
    lat: profile.lat,
    lon: profile.lon,
    tz: profile.tz,
  };
  const transits = await astrologyEngine.calculateTransits({ natal: birth });

  // Lens 2 — BaZi: today's day pillar vs the natal Day Master.
  const natalBazi = computeBazi({
    dateISO: profile.dateISO,
    time: birth.time,
    sex: (profile.sex as "male" | "female" | null) ?? "male",
    tz: profile.tz,
  });
  const now = new Date();
  const todayLunar = Solar.fromYmdHms(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate(), 12, 0, 0).getLunar();
  const dayGz = todayLunar.getDayInGanZhi();
  const dayStem = dayGz[0];
  const dayTenGod = tenGodFor(natalBazi.day_master.stem_zh, dayStem);

  // Lens 3 — tarot: deterministic daily card seeded by profile+date.
  const draw = await tarotEngine.draw({
    spread: "single",
    mode: "daily",
    seed: { key: `profile:${profile.id}`, dateISO: date },
  });

  const facts = {
    date,
    astrology: {
      top_transits: transits.transits.aspects_to_natal.slice(0, 6),
      calculation_warnings: transits.transits.calculation_warnings,
    },
    bazi: {
      natal_day_master: natalBazi.day_master,
      today_day_pillar_zh: dayGz,
      today_stem_element: stemInfo(dayStem).element,
      today_branch_element: branchInfo(dayGz[1]).element,
      today_ten_god_vs_day_master: dayTenGod,
      calculation_warnings: natalBazi.calculation_warnings,
    },
    tarot: {
      card: draw.calc.cards[0],
    },
    synthesis_instruction:
      "Produce sections titled for each lens (astrology, bazi, tarot), plus 'Areas to Notice' and 'Possible Friction'. The title is today's theme. Keep every lens distinct.",
  };

  const warnings = [
    ...transits.transits.calculation_warnings,
    ...natalBazi.calculation_warnings,
  ];

  const outcome = await getInterpretationEngine().interpret({
    requestId: `daily_${profile.id}_${date}_${opts.locale}`,
    readingType: "daily_guidance_synthesis",
    language: opts.locale,
    calculation: facts,
    userContext: { topic: "daily_guidance" },
    warnings,
  });

  if ((outcome.status === "ok" || outcome.status === "mock") && outcome.result) {
    await prisma.dailyGuidance
      .create({
        data: {
          userId: opts.userId,
          profileId: profile.id,
          date,
          locale: opts.locale,
          contentJson: JSON.stringify({ facts, interpretation: outcome.result }),
          isMock: outcome.status === "mock",
          versionsJson: versionsJson(transits.meta, outcome),
        },
      })
      .catch(() => null); // unique race: another request already stored it
    return { date, facts, interpretation: outcome.result, isMock: outcome.status === "mock", status: "completed" };
  }
  return { date, facts, interpretation: null, isMock: false, status: "failed" };
}
