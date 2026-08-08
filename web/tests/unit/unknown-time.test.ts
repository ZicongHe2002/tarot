import { describe, it, expect } from "vitest";
import { computeNatal } from "@/lib/engines/astrology";
import { computeBazi } from "@/lib/engines/bazi";
import { baziEngine } from "@/lib/providers/bazi";

// Spec §8: when birth time is unknown, never fabricate Ascendant, houses, or
// the Hour Pillar — say so instead.
describe("unknown birth time", () => {
  const base = { dateISO: "1992-08-08", lat: 39.9042, lon: 116.4074, tz: "Asia/Shanghai" };

  it("astrology omits Ascendant/Midheaven/houses and warns", () => {
    const calc = computeNatal(base);
    expect(calc.birth_time_known).toBe(false);
    expect(calc.ascendant).toBeUndefined();
    expect(calc.midheaven).toBeUndefined();
    expect(calc.houses_system).toBe("none");
    expect(calc.planets.every((p) => p.house === null)).toBe(true);
    expect(calc.calculation_warnings.join(" ")).toMatch(/birth time/i);
  });

  it("astrology keeps houses when time IS known", () => {
    const calc = computeNatal({ ...base, time: "14:30" });
    expect(calc.ascendant).toBeDefined();
    expect(calc.houses_system).toBe("whole_sign");
    expect(calc.planets.every((p) => p.house !== null)).toBe(true);
  });

  it("bazi omits the Hour Pillar and warns", () => {
    const calc = computeBazi({ dateISO: "1992-08-08", sex: "female" });
    expect(calc.birth_time_known).toBe(false);
    expect(calc.pillars.hour).toBeNull();
    expect(calc.calculation_warnings.join(" ")).toMatch(/Hour Pillar/);
  });

  it("bazi omits luck pillars when sex is not provided", async () => {
    const res = await baziEngine.calculateChart(
      { dateISO: "1992-08-08", time: "14:30", lat: 0, lon: 0, tz: "Asia/Shanghai" },
      { sex: null }
    );
    expect(res.calc.luck_pillars).toBeNull();
    expect(res.calc.calculation_warnings.join(" ")).toMatch(/luck/i);
  });
});
