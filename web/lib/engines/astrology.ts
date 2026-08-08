import * as A from "astronomy-engine";
import { DateTime } from "luxon";

export const SIGNS: Array<{ en: string; zh: string }> = [
  { en: "Aries", zh: "白羊座" },
  { en: "Taurus", zh: "金牛座" },
  { en: "Gemini", zh: "双子座" },
  { en: "Cancer", zh: "巨蟹座" },
  { en: "Leo", zh: "狮子座" },
  { en: "Virgo", zh: "处女座" },
  { en: "Libra", zh: "天秤座" },
  { en: "Scorpio", zh: "天蝎座" },
  { en: "Sagittarius", zh: "射手座" },
  { en: "Capricorn", zh: "摩羯座" },
  { en: "Aquarius", zh: "水瓶座" },
  { en: "Pisces", zh: "双鱼座" },
];

const PLANETS: Array<{ key: string; body: A.Body; en: string; zh: string }> = [
  { key: "sun", body: A.Body.Sun, en: "Sun", zh: "太阳" },
  { key: "moon", body: A.Body.Moon, en: "Moon", zh: "月亮" },
  { key: "mercury", body: A.Body.Mercury, en: "Mercury", zh: "水星" },
  { key: "venus", body: A.Body.Venus, en: "Venus", zh: "金星" },
  { key: "mars", body: A.Body.Mars, en: "Mars", zh: "火星" },
  { key: "jupiter", body: A.Body.Jupiter, en: "Jupiter", zh: "木星" },
  { key: "saturn", body: A.Body.Saturn, en: "Saturn", zh: "土星" },
  { key: "uranus", body: A.Body.Uranus, en: "Uranus", zh: "天王星" },
  { key: "neptune", body: A.Body.Neptune, en: "Neptune", zh: "海王星" },
  { key: "pluto", body: A.Body.Pluto, en: "Pluto", zh: "冥王星" },
];

const ASPECTS: Array<{ key: string; angle: number; orb: number; en: string; zh: string }> = [
  { key: "conjunction", angle: 0, orb: 8, en: "conjunction", zh: "合相" },
  { key: "sextile", angle: 60, orb: 4, en: "sextile", zh: "六分相" },
  { key: "square", angle: 90, orb: 6, en: "square", zh: "四分相" },
  { key: "trine", angle: 120, orb: 6, en: "trine", zh: "三分相" },
  { key: "opposition", angle: 180, orb: 8, en: "opposition", zh: "对分相" },
];

export interface NatalInput {
  dateISO: string; // "1992-08-08"
  time?: string; // "14:30" local; undefined => unknown birth time
  lat: number;
  lon: number; // east positive
  tz: string; // IANA
  placeLabel?: string; // display label only; never sent to the AI
}

export interface PlanetPosition {
  planet: string;
  planet_en: string;
  planet_zh: string;
  longitude: number; // 0-360 ecliptic of date
  sign: string;
  sign_zh: string;
  degree_in_sign: number;
  retrograde: boolean;
  house: number | null; // whole-sign house; null if unknown time
}

export interface NatalCalc {
  birth_time_known: boolean;
  utc_datetime: string;
  planets: PlanetPosition[];
  moon_range?: { start_sign: string; end_sign: string; start_sign_zh: string; end_sign_zh: string };
  ascendant?: { longitude: number; sign: string; sign_zh: string; degree_in_sign: number };
  midheaven?: { longitude: number; sign: string; sign_zh: string; degree_in_sign: number };
  houses_system: "whole_sign" | "none";
  aspects: Array<{
    a: string;
    b: string;
    aspect: string;
    aspect_zh: string;
    angle: number;
    orb: number;
  }>;
  moon_phase: { angle: number; name_en: string; name_zh: string };
  calculation_warnings: string[];
}

const norm = (d: number) => ((d % 360) + 360) % 360;
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

function eclipticLongitude(body: A.Body, t: A.AstroTime): number {
  // A.Ecliptic returns TRUE ECLIPTIC OF DATE coordinates (verified against
  // SunPosition at the 2026 equinox: both 0.0003°) — correct tropical frame.
  return norm(A.Ecliptic(A.GeoVector(body, t, true)).elon);
}

function signOf(lon: number) {
  const i = Math.floor(norm(lon) / 30);
  return { sign: SIGNS[i].en, sign_zh: SIGNS[i].zh, degree_in_sign: norm(lon) - i * 30, index: i };
}

/** Ascendant (ecliptic of date) from local sidereal time, latitude, obliquity. */
function ascendantLongitude(t: A.AstroTime, latDeg: number, lonDeg: number): { asc: number; mc: number } {
  const gstHours = A.SiderealTime(t);
  const ramc = norm((gstHours + lonDeg / 15) * 15);
  const eps = A.e_tilt(t).tobl; // true obliquity of date
  const phi = rad(latDeg);
  const e = rad(eps);
  const r = rad(ramc);

  // MC: tan(MC) = tan(RAMC)/cos(eps), quadrant follows RAMC
  const mc = norm(deg(Math.atan2(Math.sin(r), Math.cos(r) * Math.cos(e))));

  // Ascendant (Meeus): tan(Asc) = -cos(RAMC) / (sin(RAMC)·cos(eps) + tan(phi)·sin(eps))
  const y = -Math.cos(r);
  const x = Math.sin(r) * Math.cos(e) + Math.tan(phi) * Math.sin(e);
  let asc = norm(deg(Math.atan2(y, x)));
  // The ascendant must lie in the half of the ecliptic that is rising:
  // it is always < 180° ahead of the MC in zodiacal order.
  if (norm(asc - mc) >= 180) asc = norm(asc + 180);
  return { asc, mc };
}

export function toUtc(input: NatalInput, fallbackTime: string): { dt: DateTime; warnings: string[] } {
  const warnings: string[] = [];
  const timeStr = input.time ?? fallbackTime;
  const dt = DateTime.fromISO(`${input.dateISO}T${timeStr}`, { zone: input.tz });
  if (!dt.isValid) throw new Error(`Invalid date/time/zone: ${dt.invalidReason}`);
  return { dt: dt.toUTC(), warnings };
}

export function computeNatal(input: NatalInput): NatalCalc {
  const warnings: string[] = [];
  const timeKnown = !!input.time;
  // Unknown time: use local noon for slow bodies; Moon reported as a range.
  const { dt } = toUtc(input, timeKnown ? "12:00" : "12:00");
  const t = new A.AstroTime(dt.toJSDate());
  const tNext = t.AddDays(1 / 24); // +1h for retrograde detection

  let ascendant: NatalCalc["ascendant"];
  let midheaven: NatalCalc["midheaven"];
  if (timeKnown) {
    const { asc, mc } = ascendantLongitude(t, input.lat, input.lon);
    ascendant = { longitude: asc, ...signOf(asc) };
    midheaven = { longitude: mc, ...signOf(mc) };
  } else {
    warnings.push(
      "Birth time was not provided. Do not discuss the Ascendant, Midheaven, or houses. The Moon sign may span two signs across the day."
    );
  }
  const ascSignIndex = ascendant ? signOf(ascendant.longitude).index : null;

  const planets: PlanetPosition[] = PLANETS.map((p) => {
    const lon = eclipticLongitude(p.body, t);
    const lonLater = eclipticLongitude(p.body, tNext);
    let delta = lonLater - lon;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const s = signOf(lon);
    const house =
      ascSignIndex === null ? null : ((s.index - ascSignIndex + 12) % 12) + 1;
    return {
      planet: p.key,
      planet_en: p.en,
      planet_zh: p.zh,
      longitude: Math.round(lon * 100) / 100,
      sign: s.sign,
      sign_zh: s.sign_zh,
      degree_in_sign: Math.round(s.degree_in_sign * 100) / 100,
      retrograde: p.key !== "sun" && p.key !== "moon" && delta < 0,
      house,
    };
  });

  let moon_range: NatalCalc["moon_range"];
  if (!timeKnown) {
    const start = DateTime.fromISO(`${input.dateISO}T00:00`, { zone: input.tz }).toUTC();
    const end = DateTime.fromISO(`${input.dateISO}T23:59`, { zone: input.tz }).toUTC();
    const s0 = signOf(eclipticLongitude(A.Body.Moon, new A.AstroTime(start.toJSDate())));
    const s1 = signOf(eclipticLongitude(A.Body.Moon, new A.AstroTime(end.toJSDate())));
    if (s0.sign !== s1.sign) {
      moon_range = {
        start_sign: s0.sign,
        end_sign: s1.sign,
        start_sign_zh: s0.sign_zh,
        end_sign_zh: s1.sign_zh,
      };
      warnings.push(
        `Without a birth time the Moon could be in ${s0.sign} or ${s1.sign} on this date. Present both possibilities.`
      );
    }
  }

  const aspects: NatalCalc["aspects"] = [];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      let sep = Math.abs(planets[i].longitude - planets[j].longitude);
      if (sep > 180) sep = 360 - sep;
      for (const asp of ASPECTS) {
        const orb = Math.abs(sep - asp.angle);
        if (orb <= asp.orb) {
          // Moon aspects are unreliable without a birth time.
          if (!timeKnown && (planets[i].planet === "moon" || planets[j].planet === "moon")) continue;
          aspects.push({
            a: planets[i].planet_en,
            b: planets[j].planet_en,
            aspect: asp.en,
            aspect_zh: asp.zh,
            angle: asp.angle,
            orb: Math.round(orb * 100) / 100,
          });
          break;
        }
      }
    }
  }

  const phaseAngle = A.MoonPhase(t);
  const moon_phase = { angle: Math.round(phaseAngle * 10) / 10, ...moonPhaseName(phaseAngle) };

  return {
    birth_time_known: timeKnown,
    utc_datetime: dt.toISO()!,
    planets,
    moon_range,
    ascendant,
    midheaven,
    houses_system: timeKnown ? "whole_sign" : "none",
    aspects,
    moon_phase,
    calculation_warnings: warnings,
  };
}

/** Positions at an arbitrary moment (no houses) — used for transits. */
export function computePositions(dateUtc: Date): PlanetPosition[] {
  const t = new A.AstroTime(dateUtc);
  const tNext = t.AddDays(1 / 24);
  return PLANETS.map((p) => {
    const lon = eclipticLongitude(p.body, t);
    const lonLater = eclipticLongitude(p.body, tNext);
    let delta = lonLater - lon;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const s = signOf(lon);
    return {
      planet: p.key,
      planet_en: p.en,
      planet_zh: p.zh,
      longitude: Math.round(lon * 100) / 100,
      sign: s.sign,
      sign_zh: s.sign_zh,
      degree_in_sign: Math.round(s.degree_in_sign * 100) / 100,
      retrograde: p.key !== "sun" && p.key !== "moon" && delta < 0,
      house: null,
    };
  });
}

/** Aspects from one set of positions to another (transit → natal). */
export function aspectsBetween(
  transiting: PlanetPosition[],
  natal: PlanetPosition[]
): Array<{ transiting: string; natal: string; aspect: string; aspect_zh: string; orb: number }> {
  const out: Array<{ transiting: string; natal: string; aspect: string; aspect_zh: string; orb: number }> = [];
  // Tighter orbs for transits than natal aspects.
  const transitOrb = (base: number) => Math.max(2, base - 4);
  for (const tp of transiting) {
    for (const np of natal) {
      let sep = Math.abs(tp.longitude - np.longitude);
      if (sep > 180) sep = 360 - sep;
      for (const asp of ASPECTS) {
        const orb = Math.abs(sep - asp.angle);
        if (orb <= transitOrb(asp.orb)) {
          out.push({
            transiting: tp.planet_en,
            natal: np.planet_en,
            aspect: asp.en,
            aspect_zh: asp.zh,
            orb: Math.round(orb * 100) / 100,
          });
          break;
        }
      }
    }
  }
  return out;
}

function moonPhaseName(angle: number): { name_en: string; name_zh: string } {
  const names: Array<[string, string]> = [
    ["New Moon", "新月"],
    ["Waxing Crescent", "娥眉月"],
    ["First Quarter", "上弦月"],
    ["Waxing Gibbous", "盈凸月"],
    ["Full Moon", "满月"],
    ["Waning Gibbous", "亏凸月"],
    ["Last Quarter", "下弦月"],
    ["Waning Crescent", "残月"],
  ];
  const idx = Math.round(norm(angle) / 45) % 8;
  const [name_en, name_zh] = names[idx];
  return { name_en, name_zh };
}
