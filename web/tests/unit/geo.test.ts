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

  it.each([
    ["北京", "Beijing"],
    ["北京市", "Beijing"],
    ["上海", "Shanghai"],
    ["天津", "Tianjin"],
    ["重庆", "Chongqing"],
    ["广州", "Guangzhou"],
    ["深圳", "Shenzhen"],
    ["杭州", "Hangzhou"],
    ["南京", "Nanjing"],
    ["武汉", "Wuhan"],
    ["成都", "Chengdu"],
    ["西安", "Xi’an"],
    ["厦门", "Xiamen"],
    ["青岛", "Qingdao"],
    ["长沙", "Changsha"],
    ["石家庄", "Shijiazhuang"],
    ["拉萨", "Lhasa"],
    ["乌鲁木齐", "Ürümqi"],
    ["哈尔滨", "Harbin"],
    ["呼和浩特", "Hohhot"],
    ["亳州", "Bozhou"],
    ["宜昌", "Yichang"],
    ["桂林", "Guilin"],
    ["苏州", "Suzhou"],
    ["佛山", "Foshan"],
    ["昆明", "Kunming"],
    ["贵阳", "Guiyang"],
    ["南宁", "Nanning"],
    ["福州", "Fuzhou"],
    ["合肥", "Hefei"],
    ["郑州", "Zhengzhou"],
    ["济南", "Jinan"],
    ["沈阳", "Shenyang"],
    ["长春", "Changchun"],
    ["兰州", "Lanzhou"],
    ["西宁", "Xining"],
    ["银川", "Yinchuan"],
    ["海口", "Haikou"],
    ["三亚", "Sanya"],
    ["洛阳", "Luoyang"],
    ["大连", "Dalian"],
    ["宁波", "Ningbo"],
    ["无锡", "Wuxi"],
    ["温州", "Wenzhou"],
    ["泉州", "Quanzhou"],
    ["东莞", "Dongguan"],
    ["珠海", "Zhuhai"],
  ])("finds %s by its Chinese name", async (query, expectedName) => {
    const hits = await searchCities({ country: "CN", q: query });
    expect(hits.some((city) => city.name === expectedName)).toBe(true);
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
