// Engine verification against independently known values.
import * as A from "astronomy-engine";
import { drawSpread, DECK, dailyCard } from "../lib/engines/tarot";
import { computeNatal } from "../lib/engines/astrology";
import { computeBazi } from "../lib/engines/bazi";

let failures = 0;
function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
  if (!ok) failures++;
}

// ---------- Tarot ----------
check("deck has 78 unique cards", new Set(DECK.map((c) => c.name.en)).size === 78);
const spread = drawSpread("celtic_cross");
check("celtic cross draws 10 cards", spread.cards.length === 10);
check(
  "no duplicate cards in a spread",
  new Set(spread.cards.map((c) => c.deck_index)).size === 10
);
const d1 = dailyCard("seedA", "2026-07-16");
const d2 = dailyCard("seedA", "2026-07-16");
const d3 = dailyCard("seedB", "2026-07-16");
check("daily card deterministic per seed+date", d1.cardIndex === d2.cardIndex && d1.reversed === d2.reversed);
check("daily card varies by seed", d1.cardIndex !== d3.cardIndex || d1.reversed !== d3.reversed);

// ---------- Astrology ----------
// 1) At the 2026 March equinox sunrise in London, the Ascendant ≈ Sun ≈ 0° Aries.
// Use the GEOMETRIC horizon crossing (altitude 0, no refraction): at that
// moment the Sun sits exactly on the ascendant by definition.
const obs = new A.Observer(51.5074, -0.1278, 0);
const rise = A.SearchAltitude(A.Body.Sun, obs, +1, new A.AstroTime(new Date("2026-03-20T00:00:00Z")), 1, 0);
if (rise) {
  const riseLocal = rise.date.toISOString();
  const natal = computeNatal({
    dateISO: "2026-03-20",
    time: `${String(rise.date.getUTCHours()).padStart(2, "0")}:${String(rise.date.getUTCMinutes()).padStart(2, "0")}`,
    lat: 51.5074,
    lon: -0.1278,
    tz: "utc",
  });
  const asc = natal.ascendant!.longitude;
  const sun = natal.planets.find((p) => p.planet === "sun")!.longitude;
  const diff = Math.min(Math.abs(asc - sun), 360 - Math.abs(asc - sun));
  check("equinox geometric sunrise: Asc ≈ Sun", diff < 1.0, `asc=${asc.toFixed(2)} sun=${sun.toFixed(2)} rise=${riseLocal}`);
}
// 2) At solar transit (local noon), MC ≈ Sun.
const transit = A.SearchHourAngle(A.Body.Sun, obs, 0, new A.AstroTime(new Date("2026-07-16T00:00:00Z")), 1);
{
  const td = transit.time.date;
  const natal = computeNatal({
    dateISO: "2026-07-16",
    time: `${String(td.getUTCHours()).padStart(2, "0")}:${String(td.getUTCMinutes()).padStart(2, "0")}`,
    lat: 51.5074,
    lon: -0.1278,
    tz: "utc",
  });
  const mc = natal.midheaven!.longitude;
  const sun = natal.planets.find((p) => p.planet === "sun")!.longitude;
  const diff = Math.min(Math.abs(mc - sun), 360 - Math.abs(mc - sun));
  check("solar noon: MC ≈ Sun", diff < 2.0, `mc=${mc.toFixed(2)} sun=${sun.toFixed(2)}`);
}
// 3) Known chart: 1992-08-08 14:30 Beijing — Sun must be mid-Leo.
const natal92 = computeNatal({ dateISO: "1992-08-08", time: "14:30", lat: 39.9042, lon: 116.4074, tz: "Asia/Shanghai" });
const sun92 = natal92.planets.find((p) => p.planet === "sun")!;
check("1992-08-08 Sun in Leo", sun92.sign === "Leo", `${sun92.sign} ${sun92.degree_in_sign.toFixed(1)}°`);
check("houses assigned when time known", natal92.planets.every((p) => p.house !== null));
// 4) Unknown time: no ascendant, warning present, houses null.
const natalNoTime = computeNatal({ dateISO: "1992-08-08", lat: 39.9042, lon: 116.4074, tz: "Asia/Shanghai" });
check("unknown time: no Asc/houses", !natalNoTime.ascendant && natalNoTime.planets.every((p) => p.house === null));
check("unknown time: warning recorded", natalNoTime.calculation_warnings.length > 0);
// 5) Southern hemisphere ascendant sanity (Sydney) — sunrise check.
const obsSyd = new A.Observer(-33.8688, 151.2093, 0);
const riseSyd = A.SearchRiseSet(A.Body.Sun, obsSyd, +1, new A.AstroTime(new Date("2026-07-16T00:00:00Z")), 1);
if (riseSyd) {
  const td = riseSyd.date;
  const natal = computeNatal({
    dateISO: "2026-07-16",
    time: `${String(td.getUTCHours()).padStart(2, "0")}:${String(td.getUTCMinutes()).padStart(2, "0")}`,
    lat: -33.8688,
    lon: 151.2093,
    tz: "utc",
  });
  const asc = natal.ascendant!.longitude;
  const sun = natal.planets.find((p) => p.planet === "sun")!.longitude;
  const diff = Math.min(Math.abs(asc - sun), 360 - Math.abs(asc - sun));
  check("southern hemisphere sunrise: Asc ≈ Sun", diff < 2.5, `asc=${asc.toFixed(2)} sun=${sun.toFixed(2)}`);
}

// ---------- BaZi ----------
// 1992-08-08 14:30 male — externally cross-checked pillars: 壬申 戊申 丙辰 乙未
const bazi = computeBazi({ dateISO: "1992-08-08", time: "14:30", sex: "male" });
check(
  "1992-08-08 pillars 壬申/戊申/丙辰/乙未",
  bazi.pillars.year.ganzhi_zh === "壬申" &&
    bazi.pillars.month.ganzhi_zh === "戊申" &&
    bazi.pillars.day.ganzhi_zh === "丙辰" &&
    bazi.pillars.hour?.ganzhi_zh === "乙未",
  JSON.stringify([bazi.pillars.year.ganzhi_zh, bazi.pillars.month.ganzhi_zh, bazi.pillars.day.ganzhi_zh, bazi.pillars.hour?.ganzhi_zh])
);
check("day master Bing Fire Yang", bazi.day_master.stem === "Bing" && bazi.day_master.element === "Fire" && bazi.day_master.polarity === "Yang");
check(
  "element distribution sums to 8",
  Object.values(bazi.element_distribution).reduce((a, b) => a + b, 0) === 8,
  JSON.stringify(bazi.element_distribution)
);
check("luck pillars present with ages", !!bazi.luck_pillars && bazi.luck_pillars.pillars.length === 8 && bazi.luck_pillars.pillars[0].start_age > 0, JSON.stringify(bazi.luck_pillars?.pillars.slice(0, 2)));
check("zodiac animal is Monkey (申)", bazi.zodiac_animal.en === "Monkey");
// Unknown hour
const baziNoTime = computeBazi({ dateISO: "1992-08-08", sex: "female" });
check("unknown hour: hour pillar null + warning", baziNoTime.pillars.hour === null && baziNoTime.calculation_warnings.some((w) => w.includes("Hour Pillar")));
// Boundary warning: 立秋 1992-08-07 ~09:27 CST — birth on 08-07 within a day
const baziBoundary = computeBazi({ dateISO: "1992-08-07", time: "12:00", sex: "male" });
check("solar-term boundary warning fires", baziBoundary.calculation_warnings.some((w) => w.includes("solar term")), baziBoundary.calculation_warnings.join(" | "));

console.log(failures === 0 ? "\nALL ENGINE CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
