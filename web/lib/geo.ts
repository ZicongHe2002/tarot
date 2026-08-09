// World birth-place resolution backed by the GeoNames City table
// (170k+ cities, 246 countries, per-city IANA timezone).
import { prisma } from "./prisma";
import type { Locale } from "./config";

export interface CityHit {
  id: number;
  name: string;
  admin1: string;
  country: string;
  lat: number;
  lon: number;
  tz: string;
}

export async function searchCities(opts: {
  country: string; // ISO-3166 alpha-2
  q?: string;
  limit?: number;
}): Promise<CityHit[]> {
  const q = (opts.q ?? "").trim().toLowerCase();
  const rows = await prisma.city.findMany({
    where: {
      country: opts.country.toUpperCase(),
      ...(q
        ? {
            OR: [
              { ascii: { startsWith: q } },
              { name: { startsWith: q } },
              // match secondary words: "new yo" hits, but also "york" → "New York"
              { ascii: { contains: ` ${q}` } },
            ],
          }
        : {}),
    },
    orderBy: { population: "desc" },
    take: Math.min(opts.limit ?? 20, 50),
  });
  return rows.map((c) => ({
    id: c.id,
    name: c.name,
    admin1: c.admin1,
    country: c.country,
    lat: c.lat,
    lon: c.lon,
    tz: c.tz,
  }));
}

export async function cityById(id: number | string): Promise<CityHit | null> {
  const num = typeof id === "string" ? Number(id) : id;
  if (!Number.isInteger(num) || num <= 0) return null;
  const c = await prisma.city.findUnique({ where: { id: num } });
  return c
    ? { id: c.id, name: c.name, admin1: c.admin1, country: c.country, lat: c.lat, lon: c.lon, tz: c.tz }
    : null;
}

export function cityLabel(c: CityHit): string {
  return c.admin1 ? `${c.name}, ${c.admin1}` : c.name;
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
