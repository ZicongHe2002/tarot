import { describe, it, expect } from "vitest";
import { astrologyEngine } from "@/lib/providers/astrology";
import { baziEngine } from "@/lib/providers/bazi";
import { MockInterpretationEngine } from "@/lib/providers/interpretation";
import { tenGodFor, yearGanzhi } from "@/lib/engines/bazi";

describe("provider adapters", () => {
  const birth = { dateISO: "1992-08-08", time: "14:30", lat: 39.9042, lon: 116.4074, tz: "Asia/Shanghai" };

  it("astrology natal returns metadata and verified pillars of data", async () => {
    const res = await astrologyEngine.calculateNatalChart(birth);
    expect(res.meta.engine).toBe("astronomy-engine");
    expect(res.meta.zodiacType).toBe("tropical");
    expect(res.calc.planets).toHaveLength(10);
    const sun = res.calc.planets.find((p) => p.planet === "sun")!;
    expect(sun.sign).toBe("Leo"); // independently verified reference chart
  });

  it("astrology transits produce aspects to natal", async () => {
    const res = await astrologyEngine.calculateTransits({ natal: birth, atISO: "2026-07-16T12:00:00Z" });
    expect(res.transits.planets).toHaveLength(10);
    expect(Array.isArray(res.transits.aspects_to_natal)).toBe(true);
  });

  it("bazi chart matches the externally verified reference", async () => {
    const res = await baziEngine.calculateChart(birth, { sex: "male" });
    expect(res.calc.pillars.year.ganzhi_zh).toBe("壬申");
    expect(res.calc.pillars.day.ganzhi_zh).toBe("丙辰");
    expect(res.calc.day_master.element).toBe("Fire");
  });

  it("bazi annual influence derives the correct ten god", async () => {
    const res = await baziEngine.calculateAnnualInfluence({ natal: birth, options: { sex: "male" }, year: 2026 });
    expect(res.annual.year_ganzhi_zh).toBe("丙午");
    // 丙 vs day master 丙: same element, same polarity → Companion (比肩)
    expect(res.annual.ten_god_vs_day_master_zh).toBe("比肩");
  });

  it("ten-god table matches lunar-javascript's independent computation", () => {
    // 壬 (Yang Water) vs 丙 (Yang Fire) day master: water controls fire → 七杀
    expect(tenGodFor("丙", "壬").zh).toBe("七杀");
    expect(yearGanzhi(1984)).toEqual({ stemZh: "甲", branchZh: "子" });
    expect(yearGanzhi(2026)).toEqual({ stemZh: "丙", branchZh: "午" });
  });

  it("mock interpretation is clearly labeled and schema-valid", async () => {
    const mock = new MockInterpretationEngine();
    const res = await mock.interpret({
      requestId: "t",
      readingType: "tarot_one_card",
      language: "en",
      calculation: { cards: [] },
      userContext: {},
      warnings: ["Birth time was not provided."],
    });
    expect(res.status).toBe("mock");
    expect(res.result!.title).toMatch(/sample/i);
    expect(res.result!.limitations.join(" ")).toMatch(/sample|not a real/i);
    // Warnings must be preserved (spec §17).
    expect(res.result!.limitations.join(" ")).toMatch(/Birth time/);
  });
});
