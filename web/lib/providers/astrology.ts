import { computeNatal, computePositions, aspectsBetween } from "../engines/astrology";
import type {
  AstrologyEngine,
  BirthInput,
  CalculationMeta,
  NatalChart,
  TransitInput,
  TransitResult,
} from "./types";

export const ASTROLOGY_METHODOLOGY_VERSION = "tropical-wholesign-1.0.0";

/**
 * Real astronomical engine (not a demo): geocentric true-ecliptic-of-date
 * positions via astronomy-engine, tropical zodiac, whole-sign houses,
 * Meeus ascendant. Verified against equinox/solstice geometry in
 * scripts/verify-engines.ts.
 */
export class RealAstrologyEngine implements AstrologyEngine {
  meta(): CalculationMeta {
    return {
      engine: "astronomy-engine",
      engineVersion: "2.1.19",
      methodologyVersion: ASTROLOGY_METHODOLOGY_VERSION,
      zodiacType: "tropical",
      houseSystem: "whole_sign",
      isDemo: false,
      generatedAt: new Date().toISOString(),
    };
  }

  async calculateNatalChart(input: BirthInput): Promise<NatalChart> {
    const calc = computeNatal({
      dateISO: input.dateISO,
      time: input.time,
      lat: input.lat,
      lon: input.lon,
      tz: input.tz,
    });
    return {
      calc,
      meta: { ...this.meta(), houseSystem: calc.houses_system === "whole_sign" ? "whole_sign" : "none" },
    };
  }

  async calculateTransits(input: TransitInput): Promise<TransitResult> {
    const at = input.atISO ? new Date(input.atISO) : new Date();
    const natalChart = await this.calculateNatalChart(input.natal);
    const transiting = computePositions(at);
    const warnings = [...natalChart.calc.calculation_warnings];
    return {
      transits: {
        at: at.toISOString(),
        planets: transiting,
        aspects_to_natal: aspectsBetween(transiting, natalChart.calc.planets),
        calculation_warnings: warnings,
      },
      meta: this.meta(),
    };
  }
}

export const astrologyEngine: AstrologyEngine = new RealAstrologyEngine();
