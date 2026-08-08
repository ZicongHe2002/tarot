// "Today's Sky" — a deterministic snapshot of the current heavens. No AI, no
// login, no cost; recomputed from astronomy-engine on each request. Powers a
// free daily astrology feature (Cece/Co-Star-style "what's happening now").
import * as A from "astronomy-engine";
import { computePositions, SIGNS, type PlanetPosition } from "./engines/astrology";

const ASPECTS: Array<{ key: string; angle: number; orb: number; en: string; zh: string }> = [
  { key: "conjunction", angle: 0, orb: 6, en: "conjunction", zh: "合相" },
  { key: "sextile", angle: 60, orb: 3, en: "sextile", zh: "六分相" },
  { key: "square", angle: 90, orb: 5, en: "square", zh: "四分相" },
  { key: "trine", angle: 120, orb: 5, en: "trine", zh: "三分相" },
  { key: "opposition", angle: 180, orb: 6, en: "opposition", zh: "对分相" },
];

export interface SkyAspect {
  a: string;
  a_zh: string;
  b: string;
  b_zh: string;
  aspect: string;
  aspect_zh: string;
  orb: number;
}

export interface SkyNow {
  date: string;
  sun: PlanetPosition;
  moon: PlanetPosition;
  moonPhase: { angle: number; name_en: string; name_zh: string; emoji: string };
  planets: PlanetPosition[];
  retrogrades: PlanetPosition[];
  aspects: SkyAspect[];
}

function moonPhase(angle: number) {
  const names: Array<[string, string, string]> = [
    ["New Moon", "新月", "🌑"],
    ["Waxing Crescent", "娥眉月", "🌒"],
    ["First Quarter", "上弦月", "🌓"],
    ["Waxing Gibbous", "盈凸月", "🌔"],
    ["Full Moon", "满月", "🌕"],
    ["Waning Gibbous", "亏凸月", "🌖"],
    ["Last Quarter", "下弦月", "🌗"],
    ["Waning Crescent", "残月", "🌘"],
  ];
  const idx = Math.round((((angle % 360) + 360) % 360) / 45) % 8;
  const [name_en, name_zh, emoji] = names[idx];
  return { angle: Math.round(angle * 10) / 10, name_en, name_zh, emoji };
}

export function getSkyNow(at: Date = new Date()): SkyNow {
  const positions = computePositions(at);
  const byKey = (k: string) => positions.find((p) => p.planet === k)!;

  const aspects: SkyAspect[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      let sep = Math.abs(positions[i].longitude - positions[j].longitude);
      if (sep > 180) sep = 360 - sep;
      for (const asp of ASPECTS) {
        const orb = Math.abs(sep - asp.angle);
        if (orb <= asp.orb) {
          aspects.push({
            a: positions[i].planet_en,
            a_zh: positions[i].planet_zh,
            b: positions[j].planet_en,
            b_zh: positions[j].planet_zh,
            aspect: asp.en,
            aspect_zh: asp.zh,
            orb: Math.round(orb * 10) / 10,
          });
          break;
        }
      }
    }
  }
  aspects.sort((x, y) => x.orb - y.orb);

  return {
    date: at.toISOString().slice(0, 10),
    sun: byKey("sun"),
    moon: byKey("moon"),
    moonPhase: moonPhase(A.MoonPhase(new A.AstroTime(at))),
    planets: positions,
    retrogrades: positions.filter((p) => p.retrograde),
    aspects: aspects.slice(0, 8),
  };
}

export function signGlyph(signName: string): string {
  const glyphs = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
  const i = SIGNS.findIndex((s) => s.en === signName);
  return i >= 0 ? glyphs[i] : "";
}
