// Compatibility calculation — derived placements only. Exact birth data is
// used transiently for calculation and never stored in the report (spec §13).
import { computeNatal, aspectsBetween } from "./engines/astrology";
import { computeBazi } from "./engines/bazi";

export type CompatMode = "astrology" | "bazi" | "combined";

export interface CompatPerson {
  dateISO: string;
  time?: string;
  lat: number;
  lon: number;
  tz: string;
  sex?: "male" | "female" | null;
  label: string; // display label only, e.g. "Person A"
}

// Branch relations (classical pairings).
const LIU_HE: Array<[string, string]> = [
  ["子", "丑"], ["寅", "亥"], ["卯", "戌"], ["辰", "酉"], ["巳", "申"], ["午", "未"],
];
const XIANG_CHONG: Array<[string, string]> = [
  ["子", "午"], ["丑", "未"], ["寅", "申"], ["卯", "酉"], ["辰", "戌"], ["巳", "亥"],
];
const SAN_HE: string[][] = [
  ["申", "子", "辰"], ["亥", "卯", "未"], ["寅", "午", "戌"], ["巳", "酉", "丑"],
];

const GEN: Record<string, string> = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
const CTRL: Record<string, string> = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };

function branchRelation(a: string, b: string): string {
  if (LIU_HE.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) return "liu_he (six harmony)";
  if (XIANG_CHONG.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) return "xiang_chong (clash)";
  if (SAN_HE.some((g) => g.includes(a) && g.includes(b)) && a !== b) return "san_he (partial trine group)";
  if (a === b) return "same branch";
  return "neutral";
}

function elementRelation(a: string, b: string): string {
  if (a === b) return "same element";
  if (GEN[a] === b) return `${a} generates ${b}`;
  if (GEN[b] === a) return `${b} generates ${a}`;
  if (CTRL[a] === b) return `${a} controls ${b}`;
  if (CTRL[b] === a) return `${b} controls ${a}`;
  return "neutral";
}

export function computeCompatibility(mode: CompatMode, a: CompatPerson, b: CompatPerson) {
  const calc: Record<string, unknown> = { mode };
  const warnings: string[] = [];

  if (mode === "astrology" || mode === "combined") {
    const chartA = computeNatal({ dateISO: a.dateISO, time: a.time, lat: a.lat, lon: a.lon, tz: a.tz });
    const chartB = computeNatal({ dateISO: b.dateISO, time: b.time, lat: b.lat, lon: b.lon, tz: b.tz });
    warnings.push(...chartA.calculation_warnings.map((w) => `${a.label}: ${w}`));
    warnings.push(...chartB.calculation_warnings.map((w) => `${b.label}: ${w}`));
    const inter = aspectsBetween(chartA.planets, chartB.planets)
      .filter((x) => ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"].includes(x.transiting.toLowerCase()))
      .slice(0, 14);
    calc.astrology = {
      a: {
        label: a.label,
        placements: chartA.planets.map((p) => ({ planet: p.planet_en, sign: p.sign, sign_zh: p.sign_zh })),
      },
      b: {
        label: b.label,
        placements: chartB.planets.map((p) => ({ planet: p.planet_en, sign: p.sign, sign_zh: p.sign_zh })),
      },
      inter_aspects: inter.map((x) => ({ from_a: x.transiting, to_b: x.natal, aspect: x.aspect, aspect_zh: x.aspect_zh, orb: x.orb })),
    };
  }

  if (mode === "bazi" || mode === "combined") {
    const baziA = computeBazi({ dateISO: a.dateISO, time: a.time, sex: a.sex ?? "male", tz: a.tz });
    const baziB = computeBazi({ dateISO: b.dateISO, time: b.time, sex: b.sex ?? "male", tz: b.tz });
    warnings.push(...baziA.calculation_warnings.map((w) => `${a.label}: ${w}`));
    warnings.push(...baziB.calculation_warnings.map((w) => `${b.label}: ${w}`));
    calc.bazi = {
      a: { label: a.label, day_master: baziA.day_master, year_branch_zh: baziA.pillars.year.branch_zh, day_branch_zh: baziA.pillars.day.branch_zh, elements: baziA.element_distribution },
      b: { label: b.label, day_master: baziB.day_master, year_branch_zh: baziB.pillars.year.branch_zh, day_branch_zh: baziB.pillars.day.branch_zh, elements: baziB.element_distribution },
      day_master_relation: elementRelation(baziA.day_master.element, baziB.day_master.element),
      year_branch_relation: branchRelation(baziA.pillars.year.branch_zh, baziB.pillars.year.branch_zh),
      day_branch_relation: branchRelation(baziA.pillars.day.branch_zh, baziB.pillars.day.branch_zh),
    };
  }

  calc.categories = [
    "Communication", "Emotional Style", "Affection", "Conflict",
    "Shared Values", "Daily Rhythm", "Long-Term Growth", "Practical Suggestions",
  ];
  calc.calculation_warnings = warnings;
  return { calc, warnings };
}
