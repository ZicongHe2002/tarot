// World birth-place resolution backed by the GeoNames City table
// (170k+ cities, 246 countries, per-city IANA timezone).
import { prisma } from "./prisma";
import type { Locale } from "./config";
import { pinyin } from "pinyin-pro";
import OpenCC from "opencc-js";

export interface CityHit {
  id: number;
  name: string;
  nameZh?: string;
  admin1: string;
  admin1Zh?: string;
  country: string;
  lat: number;
  lon: number;
  tz: string;
}

const CN_ADMIN_ZH: Record<string, string> = {
  Anhui: "安徽",
  Beijing: "北京",
  Chongqing: "重庆",
  Fujian: "福建",
  Gansu: "甘肃",
  Guangdong: "广东",
  Guangxi: "广西",
  Guizhou: "贵州",
  Hainan: "海南",
  Hebei: "河北",
  Heilongjiang: "黑龙江",
  Henan: "河南",
  Hubei: "湖北",
  Hunan: "湖南",
  "Inner Mongolia": "内蒙古",
  Jiangsu: "江苏",
  Jiangxi: "江西",
  Jilin: "吉林",
  Liaoning: "辽宁",
  Ningxia: "宁夏",
  Qinghai: "青海",
  Shaanxi: "陕西",
  Shandong: "山东",
  Shanghai: "上海",
  Shanxi: "山西",
  Sichuan: "四川",
  Tianjin: "天津",
  Tibet: "西藏",
  Xinjiang: "新疆",
  Yunnan: "云南",
  Zhejiang: "浙江",
};

const traditionalToSimplified = OpenCC.Converter({ from: "tw", to: "cn" });
const japaneseToSimplified = OpenCC.Converter({ from: "jp", to: "cn" });

function simplifiedChinese(value: string): string {
  return traditionalToSimplified(japaneseToSimplified(value));
}

function latinKey(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{Mark}/gu, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();
}

function bestChineseAlias(
  aliases: string,
  primaryName: string,
  asciiName: string,
  preferredQuery?: string
): string | undefined {
  const candidates = aliases
    .split(",")
    .map((alias) => alias.trim())
    .filter(
      (alias) =>
        /\p{Script=Han}/u.test(alias) &&
        !/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(alias)
    )
    .map(simplifiedChinese);
  const unique = [...new Set(candidates)];
  if (unique.length === 0) return undefined;

  const baseName = (value: string) => value.replace(/[市县区镇乡]$/u, "");
  if (preferredQuery && /\p{Script=Han}/u.test(preferredQuery)) {
    const preferred = baseName(simplifiedChinese(preferredQuery));
    if (unique.some((candidate) => baseName(candidate) === preferred)) return preferred;
  }

  const primaryKeys = new Set([latinKey(primaryName), latinKey(asciiName)]);
  const primaryMatches = unique.filter((candidate) => {
    const romanized = pinyin(baseName(candidate), { toneType: "none", type: "array" }).join("");
    return primaryKeys.has(latinKey(romanized));
  });
  if (primaryMatches.length > 0) {
    return primaryMatches.sort((a, b) => a.length - b.length)[0].replace(/[市县区镇乡]$/u, "");
  }

  return unique[0].replace(/[市县区镇乡]$/u, "");
}

function toCityHit(c: {
  id: number;
  name: string;
  ascii: string;
  aliases: string;
  admin1: string;
  country: string;
  lat: number;
  lon: number;
  tz: string;
}, preferredQuery?: string): CityHit {
  return {
    id: c.id,
    name: c.name,
    nameZh: bestChineseAlias(c.aliases, c.name, c.ascii, preferredQuery),
    admin1: c.admin1,
    admin1Zh: c.country === "CN" ? CN_ADMIN_ZH[c.admin1] : undefined,
    country: c.country,
    lat: c.lat,
    lon: c.lon,
    tz: c.tz,
  };
}

export async function searchCities(opts: {
  country: string; // ISO-3166 alpha-2
  q?: string;
  limit?: number;
}): Promise<CityHit[]> {
  const q = (opts.q ?? "").trim().toLowerCase();
  const queryTerms = new Set<string>();
  if (q) queryTerms.add(q);

  // GeoNames stores most Chinese city names in Latin script. Convert a Han
  // query such as “杭州” or “北京市” to searchable variants automatically.
  if (/\p{Script=Han}/u.test(q)) {
    const withoutSuffix = q.replace(/[市县区]$/u, "");
    const syllables = pinyin(withoutSuffix, { toneType: "none", type: "array" })
      .map((part) => part.toLowerCase())
      .filter(Boolean);
    if (syllables.length > 0) {
      queryTerms.add(syllables.join(""));
      queryTerms.add(syllables.join("'"));
      queryTerms.add(syllables.join(" "));
      queryTerms.add(syllables.join("-"));
    }
  }

  const terms = [...queryTerms].filter(Boolean);
  const rows = await prisma.city.findMany({
    where: {
      country: opts.country.toUpperCase(),
      ...(terms.length > 0
        ? {
            OR: terms.flatMap((term) => [
              { ascii: { startsWith: term } },
              { name: { startsWith: term } },
              { aliases: { contains: term } },
              // match secondary words: "new yo" hits, but also "york" → "New York"
              { ascii: { contains: ` ${term}` } },
            ]),
          }
        : {}),
    },
    orderBy: { population: "desc" },
    take: Math.min(opts.limit ?? 20, 50),
  });
  return rows.map((city) => toCityHit(city, q));
}

export async function cityById(id: number | string): Promise<CityHit | null> {
  const num = typeof id === "string" ? Number(id) : id;
  if (!Number.isInteger(num) || num <= 0) return null;
  const c = await prisma.city.findUnique({ where: { id: num } });
  return c ? toCityHit(c) : null;
}

export function cityLabel(c: CityHit, locale: Locale = "en"): string {
  const name = locale === "zh" ? c.nameZh ?? c.name : c.name;
  const admin1 = locale === "zh" ? c.admin1Zh ?? c.admin1 : c.admin1;
  return admin1 ? `${name}${locale === "zh" ? "，" : ", "}${admin1}` : name;
}

/**
 * Central resolver for every API that accepts a birth place: a GeoNames
 * cityId OR manual lat/lon/tz. Returns null when neither is complete.
 */
export async function resolveBirthPlace(input: {
  cityId?: string | number;
  lat?: number;
  lon?: number;
  tz?: string;
}): Promise<{ lat: number; lon: number; tz: string; label: string } | null> {
  if (input.cityId !== undefined && input.cityId !== null && `${input.cityId}` !== "") {
    const city = await cityById(input.cityId);
    if (!city) return null;
    return { lat: city.lat, lon: city.lon, tz: city.tz, label: `${cityLabel(city)}, ${city.country}` };
  }
  if (
    typeof input.lat === "number" &&
    typeof input.lon === "number" &&
    input.tz &&
    isValidTimeZone(input.tz)
  ) {
    return { lat: input.lat, lon: input.lon, tz: input.tz, label: `${input.lat.toFixed(3)}, ${input.lon.toFixed(3)}` };
  }
  return null;
}

export function isValidTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

// ---------- Countries (all ISO regions, localized names built-in) ----------

let countryCache: { list: Array<{ code: string; en: string; zh: string }> } | null = null;

export async function countryOptions(): Promise<Array<{ code: string; en: string; zh: string }>> {
  if (countryCache) return countryCache.list;
  const rows = await prisma.city.groupBy({ by: ["country"] });
  const en = new Intl.DisplayNames(["en"], { type: "region" });
  const zh = new Intl.DisplayNames(["zh-Hans"], { type: "region" });
  const list = rows
    .map((r) => ({
      code: r.country,
      en: en.of(r.country) ?? r.country,
      zh: zh.of(r.country) ?? r.country,
    }))
    .sort((a, b) => a.en.localeCompare(b.en));
  // Never retain an empty result: the production city import can finish after
  // an early request during deployment, and a later request must recover.
  if (list.length > 0) countryCache = { list };
  return list;
}

export function countryName(code: string, locale: Locale): string {
  try {
    return (
      new Intl.DisplayNames([locale === "zh" ? "zh-Hans" : "en"], { type: "region" }).of(code) ?? code
    );
  } catch {
    return code;
  }
}

/** Full IANA timezone list — no curated subsets. */
export function allTimeZones(): string[] {
  return Intl.supportedValuesOf("timeZone");
}
