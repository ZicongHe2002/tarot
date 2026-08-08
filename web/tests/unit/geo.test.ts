import { describe, it, expect } from "vitest";
import { searchCities, cityById, resolveBirthPlace, countryOptions, isValidTimeZone } from "@/lib/geo";

// Requires the seeded City table (npm run db:cities).
describe("world city database", () => {
  it("covers 240+ countries", async () => {
    const countries = await countryOptions();
    expect(countries.length).toBeGreaterThan(240);
    const cn = countries.find((c) => c.code === "CN")!;
    expect(cn.en).toBe("China");
    expect(cn.zh).toBe("中国");
  });

  it("finds major and minor cities with correct timezone", async () => {
    const beijing = await searchCities({ country: "CN", q: "beijing" });
    expect(beijing[0].name).toBe("Beijing");
    expect(beijing[0].tz).toBe("Asia/Shanghai");

    const leeds = await searchCities({ country: "GB", q: "leeds" });
    expect(leeds[0].tz).toBe("Europe/London");
    expect(leeds[0].admin1).toBe("England");

    // A smaller city (pop ~100k) must exist too — not just world capitals.
    const wagga = await searchCities({ country: "AU", q: "wagga" });
    expect(wagga.length).toBeGreaterThan(0);
    expect(wagga[0].tz).toBe("Australia/Sydney");
  });

  it("ranks by population and matches second words", async () => {
    const york = await searchCities({ country: "US", q: "york" });
    expect(york[0].name).toBe("New York City"); // " york" secondary-word match, top by population
  });

  it("empty query returns the country's biggest cities", async () => {
    const top = await searchCities({ country: "JP" });
    expect(top[0].name).toBe("Tokyo");
  });

  it("resolveBirthPlace: cityId path and manual path", async () => {
    const hits = await searchCities({ country: "SG", q: "singapore" });
    const byCity = await resolveBirthPlace({ cityId: String(hits[0].id) });
    expect(byCity?.tz).toBe("Asia/Singapore");

    const manual = await resolveBirthPlace({ lat: 1.29, lon: 103.85, tz: "Asia/Singapore" });
    expect(manual?.lat).toBeCloseTo(1.29);

    expect(await resolveBirthPlace({ lat: 1, lon: 2, tz: "Not/AZone" })).toBeNull();
    expect(await resolveBirthPlace({ cityId: "999999999" })).toBeNull();
    expect(await resolveBirthPlace({})).toBeNull();
  });

  it("validates IANA timezones", () => {
    expect(isValidTimeZone("Asia/Shanghai")).toBe(true);
    expect(isValidTimeZone("Mars/Olympus")).toBe(false);
  });

  it("cityById rejects garbage ids", async () => {
    expect(await cityById("abc")).toBeNull();
    expect(await cityById(-5)).toBeNull();
  });
});
