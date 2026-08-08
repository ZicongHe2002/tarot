import { computeBazi, tenGodFor, yearGanzhi, stemInfo, branchInfo } from "../engines/bazi";
import type {
  AnnualInput,
  BaziChartResult,
  BaziAnnualResult,
  BaziEngine,
  BaziOptions,
  BirthInput,
  CalculationMeta,
} from "./types";

export const BAZI_METHODOLOGY_VERSION = "local-clock-jie-boundary-1.0.0";

/**
 * Real BaZi engine (not a demo) built on lunar-javascript's sexagenary and
 * solar-term calculations, verified against documented reference dates in
 * scripts/verify-engines.ts. Methodology: pillars from the local birth clock;
 * solar-term (节) month boundaries; Zi-hour handled by lunar-javascript's day
 * boundary; luck-pillar direction from sex + year-stem polarity; boundary
 * births flagged with warnings, never silently resolved.
 */
export class RealBaziEngine implements BaziEngine {
  meta(): CalculationMeta {
    return {
      engine: "lunar-javascript",
      engineVersion: "1.7.7",
      methodologyVersion: BAZI_METHODOLOGY_VERSION,
      isDemo: false,
      generatedAt: new Date().toISOString(),
    };
  }

  async calculateChart(input: BirthInput, options: BaziOptions): Promise<BaziChartResult> {
    const calc = computeBazi({
      dateISO: input.dateISO,
      time: input.time,
      sex: options.sex ?? "male",
      tz: input.tz,
    });
    if (!options.sex) {
      calc.luck_pillars = null;
      calc.calculation_warnings.push(
        "Luck pillars require the sex used by the traditional direction rule and were omitted."
      );
    }
    return { calc, meta: this.meta() };
  }

  async calculateAnnualInfluence(input: AnnualInput): Promise<BaziAnnualResult> {
    const chart = await this.calculateChart(input.natal, input.options);
    const gz = yearGanzhi(input.year);
    const dayStemZh = chart.calc.day_master.stem_zh;
    const tg = tenGodFor(dayStemZh, gz.stemZh);
    const s = stemInfo(gz.stemZh);
    const b = branchInfo(gz.branchZh);
    const warnings = [
      "Annual influence uses the 立春-aligned sexagenary year; dates in January/early February may belong to the previous cycle year.",
    ];
    return {
      annual: {
        year: input.year,
        year_ganzhi_zh: `${gz.stemZh}${gz.branchZh}`,
        year_stem: s.pinyin,
        year_branch: b.pinyin,
        stem_element: s.element,
        branch_element: b.element,
        ten_god_vs_day_master: tg.en,
        ten_god_vs_day_master_zh: tg.zh,
        notes: [
          `The ${input.year} year stem (${s.pinyin} ${s.element}) relates to the Day Master as ${tg.en}.`,
        ],
        calculation_warnings: warnings,
      },
      meta: this.meta(),
    };
  }
}

export const baziEngine: BaziEngine = new RealBaziEngine();
