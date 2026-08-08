// Typed provider interfaces (spec §3). Deterministic engines calculate;
// the interpretation engine only converts supplied facts into language.
import type { NatalCalc } from "../engines/astrology";
import type { BaziCalc } from "../engines/bazi";
import type { TarotCalc, SpreadId } from "../engines/tarot";

export type LocaleCode = "en" | "zh";

export interface CalculationMeta {
  engine: string; // e.g. "astronomy-engine"
  engineVersion: string;
  methodologyVersion: string;
  zodiacType?: "tropical";
  houseSystem?: "whole_sign" | "none";
  isDemo: boolean; // true only when a real provider is not configured
  generatedAt: string;
}

export interface BirthInput {
  dateISO: string;
  time?: string; // undefined = unknown birth time
  lat: number;
  lon: number;
  tz: string;
}

export interface NatalChart {
  calc: NatalCalc;
  meta: CalculationMeta;
}

export interface TransitInput {
  natal: BirthInput;
  atISO?: string; // defaults to now
}

export interface TransitResult {
  transits: {
    at: string;
    planets: NatalCalc["planets"];
    aspects_to_natal: Array<{
      transiting: string;
      natal: string;
      aspect: string;
      aspect_zh: string;
      orb: number;
    }>;
    calculation_warnings: string[];
  };
  meta: CalculationMeta;
}

export interface BaziOptions {
  sex: "male" | "female" | null; // luck-pillar direction; null limits luck pillars
}

export interface BaziChartResult {
  calc: BaziCalc;
  meta: CalculationMeta;
}

export interface AnnualInput {
  natal: BirthInput;
  options: BaziOptions;
  year: number;
}

export interface BaziAnnualResult {
  annual: {
    year: number;
    year_ganzhi_zh: string;
    year_stem: string;
    year_branch: string;
    stem_element: string;
    branch_element: string;
    ten_god_vs_day_master: string | null;
    ten_god_vs_day_master_zh: string | null;
    notes: string[];
    calculation_warnings: string[];
  };
  meta: CalculationMeta;
}

export interface TarotDrawInput {
  spread: SpreadId;
  mode: "daily" | "one_card" | "three_card" | "yes_no";
  seed?: { key: string; dateISO: string }; // deterministic daily draws
}

export interface TarotDrawResult {
  calc: TarotCalc;
  meta: CalculationMeta;
}

// ---------- Interpretation (spec §17 contract) ----------

export type SourceTag = "tarot" | "astrology" | "bazi";

export interface InterpretationInput {
  requestId: string;
  readingType: string;
  language: LocaleCode;
  calculation: unknown; // deterministic engine output — the only facts allowed
  userContext: { topic?: string; question?: string };
  warnings: string[]; // must be preserved in limitations
}

export interface InterpretationResult {
  title: string;
  summary: string;
  sections: Array<{
    heading: string;
    body: string;
    sourceTags: SourceTag[];
  }>;
  reflectionQuestion: string;
  suggestedAction: string;
  limitations: string[];
  safetyFlags: string[];
}

export interface InterpretationOutcome {
  status: "ok" | "mock" | "invalid" | "error";
  result?: InterpretationResult;
  error?: string;
  modelProvider: string;
  modelName: string;
  promptVersion: string;
  usage?: unknown;
}

export interface AstrologyEngine {
  calculateNatalChart(input: BirthInput): Promise<NatalChart>;
  calculateTransits(input: TransitInput): Promise<TransitResult>;
  meta(): CalculationMeta;
}

export interface BaziEngine {
  calculateChart(input: BirthInput, options: BaziOptions): Promise<BaziChartResult>;
  calculateAnnualInfluence(input: AnnualInput): Promise<BaziAnnualResult>;
  meta(): CalculationMeta;
}

export interface TarotEngine {
  draw(input: TarotDrawInput): Promise<TarotDrawResult>;
  meta(): CalculationMeta;
}

export interface InterpretationEngine {
  interpret(input: InterpretationInput): Promise<InterpretationOutcome>;
  name(): string;
}
