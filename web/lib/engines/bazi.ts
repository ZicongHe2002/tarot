// BaZi (Four Pillars) engine — thin deterministic wrapper over lunar-javascript.
// Pillars follow the local birth clock (standard consumer practice). Because
// solar-term boundary moments are absolute, births within ±1 day of a term
// boundary get a calculation warning instead of a silent guess.
import { Lunar, Solar } from "lunar-javascript";

const STEM_INFO: Record<string, { pinyin: string; element: string; element_zh: string; polarity: "Yang" | "Yin" }> = {
  甲: { pinyin: "Jia", element: "Wood", element_zh: "木", polarity: "Yang" },
  乙: { pinyin: "Yi", element: "Wood", element_zh: "木", polarity: "Yin" },
  丙: { pinyin: "Bing", element: "Fire", element_zh: "火", polarity: "Yang" },
  丁: { pinyin: "Ding", element: "Fire", element_zh: "火", polarity: "Yin" },
  戊: { pinyin: "Wu", element: "Earth", element_zh: "土", polarity: "Yang" },
  己: { pinyin: "Ji", element: "Earth", element_zh: "土", polarity: "Yin" },
  庚: { pinyin: "Geng", element: "Metal", element_zh: "金", polarity: "Yang" },
  辛: { pinyin: "Xin", element: "Metal", element_zh: "金", polarity: "Yin" },
  壬: { pinyin: "Ren", element: "Water", element_zh: "水", polarity: "Yang" },
  癸: { pinyin: "Gui", element: "Water", element_zh: "水", polarity: "Yin" },
};

const BRANCH_INFO: Record<string, { pinyin: string; element: string; element_zh: string; animal_en: string; animal_zh: string }> = {
  子: { pinyin: "Zi", element: "Water", element_zh: "水", animal_en: "Rat", animal_zh: "鼠" },
  丑: { pinyin: "Chou", element: "Earth", element_zh: "土", animal_en: "Ox", animal_zh: "牛" },
  寅: { pinyin: "Yin", element: "Wood", element_zh: "木", animal_en: "Tiger", animal_zh: "虎" },
  卯: { pinyin: "Mao", element: "Wood", element_zh: "木", animal_en: "Rabbit", animal_zh: "兔" },
  辰: { pinyin: "Chen", element: "Earth", element_zh: "土", animal_en: "Dragon", animal_zh: "龙" },
  巳: { pinyin: "Si", element: "Fire", element_zh: "火", animal_en: "Snake", animal_zh: "蛇" },
  午: { pinyin: "Wu", element: "Fire", element_zh: "火", animal_en: "Horse", animal_zh: "马" },
  未: { pinyin: "Wei", element: "Earth", element_zh: "土", animal_en: "Goat", animal_zh: "羊" },
  申: { pinyin: "Shen", element: "Metal", element_zh: "金", animal_en: "Monkey", animal_zh: "猴" },
  酉: { pinyin: "You", element: "Metal", element_zh: "金", animal_en: "Rooster", animal_zh: "鸡" },
  戌: { pinyin: "Xu", element: "Earth", element_zh: "土", animal_en: "Dog", animal_zh: "狗" },
  亥: { pinyin: "Hai", element: "Water", element_zh: "水", animal_en: "Pig", animal_zh: "猪" },
};

export interface BaziInput {
  dateISO: string; // "1992-08-08" local birth date
  time?: string; // "14:30" local; undefined => unknown hour pillar
  sex: "male" | "female"; // direction of luck pillars (traditional rule)
  tz?: string; // stored for context/warnings only in v1
}

export interface Pillar {
  stem: string;
  stem_zh: string;
  branch: string;
  branch_zh: string;
  ganzhi_zh: string;
  stem_element: string;
  branch_element: string;
  branch_animal: string;
  ten_god_stem?: string;
  ten_god_stem_zh?: string;
}

export interface BaziCalc {
  birth_time_known: boolean;
  pillars: { year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null };
  day_master: { stem: string; stem_zh: string; element: string; polarity: "Yang" | "Yin" };
  element_distribution: Record<string, number>; // visible stems+branches
  luck_pillars: {
    start_age_years: number;
    direction: "forward" | "backward";
    pillars: Array<{ ganzhi_zh: string; ganzhi: string; start_age: number; end_age: number }>;
  } | null;
  zodiac_animal: { en: string; zh: string };
  lunar_date_zh: string;
  calculation_warnings: string[];
}

const TEN_GOD_ZH_EN: Record<string, string> = {
  比肩: "Companion (Bi Jian)",
  劫财: "Rob Wealth (Jie Cai)",
  食神: "Eating God (Shi Shen)",
  伤官: "Hurting Officer (Shang Guan)",
  偏财: "Indirect Wealth (Pian Cai)",
  正财: "Direct Wealth (Zheng Cai)",
  七杀: "Seven Killings (Qi Sha)",
  正官: "Direct Officer (Zheng Guan)",
  偏印: "Indirect Resource (Pian Yin)",
  正印: "Direct Resource (Zheng Yin)",
};

function pillarFrom(ganzhiZh: string, tenGodZh?: string): Pillar {
  const stemZh = ganzhiZh[0];
  const branchZh = ganzhiZh[1];
  const s = STEM_INFO[stemZh];
  const b = BRANCH_INFO[branchZh];
  return {
    stem: s.pinyin,
    stem_zh: stemZh,
    branch: b.pinyin,
    branch_zh: branchZh,
    ganzhi_zh: ganzhiZh,
    stem_element: s.element,
    branch_element: b.element,
    branch_animal: b.animal_en,
    ...(tenGodZh
      ? { ten_god_stem: TEN_GOD_ZH_EN[tenGodZh] ?? tenGodZh, ten_god_stem_zh: tenGodZh }
      : {}),
  };
}

// Generation cycle: Wood→Fire→Earth→Metal→Water→Wood; control skips one.
const ELEMENT_ORDER = ["Wood", "Fire", "Earth", "Metal", "Water"];

/** Ten God of `otherStemZh` relative to the day master stem. */
export function tenGodFor(
  dayStemZh: string,
  otherStemZh: string
): { zh: string; en: string } {
  const dm = STEM_INFO[dayStemZh];
  const ot = STEM_INFO[otherStemZh];
  const di = ELEMENT_ORDER.indexOf(dm.element);
  const oi = ELEMENT_ORDER.indexOf(ot.element);
  const samePolarity = dm.polarity === ot.polarity;
  let zh: string;
  if (di === oi) zh = samePolarity ? "比肩" : "劫财";
  else if ((di + 1) % 5 === oi) zh = samePolarity ? "食神" : "伤官"; // DM generates other
  else if ((oi + 1) % 5 === di) zh = samePolarity ? "偏印" : "正印"; // other generates DM
  else if ((di + 2) % 5 === oi) zh = samePolarity ? "偏财" : "正财"; // DM controls other
  else zh = samePolarity ? "七杀" : "正官"; // other controls DM
  return { zh, en: TEN_GOD_ZH_EN[zh] ?? zh };
}

const STEMS_ORDER = "甲乙丙丁戊己庚辛壬癸";
const BRANCHES_ORDER = "子丑寅卯辰巳午未申酉戌亥";

/** Sexagenary year (立春-based years share the civil year number for 流年 use). */
export function yearGanzhi(year: number): { stemZh: string; branchZh: string } {
  const idx = (((year - 1984) % 60) + 60) % 60; // 1984 = 甲子
  return { stemZh: STEMS_ORDER[idx % 10], branchZh: BRANCHES_ORDER[idx % 12] };
}

export function stemInfo(stemZh: string) {
  return STEM_INFO[stemZh];
}

export function branchInfo(branchZh: string) {
  return BRANCH_INFO[branchZh];
}

export function computeBazi(input: BaziInput): BaziCalc {
  const warnings: string[] = [];
  const [y, m, d] = input.dateISO.split("-").map(Number);
  const timeKnown = !!input.time;
  const [hh, mm] = timeKnown ? input.time!.split(":").map(Number) : [12, 0];

  const solar = Solar.fromYmdHms(y, m, d, hh, mm, 0);
  const lunar = solar.getLunar();
  const ec = lunar.getEightChar();

  if (!timeKnown) {
    warnings.push("Birth time was not provided. Do not discuss the Hour Pillar.");
  }

  // Warn near solar-term boundaries (month/year pillar sensitivity).
  const prevJie = lunar.getPrevJie();
  const nextJie = lunar.getNextJie();
  const birthMs = Date.UTC(y, m - 1, d, hh, mm);
  for (const jie of [prevJie, nextJie]) {
    if (!jie) continue;
    const js = jie.getSolar();
    const jieMs = Date.UTC(js.getYear(), js.getMonth() - 1, js.getDay(), js.getHour(), js.getMinute());
    if (Math.abs(jieMs - birthMs) < 24 * 3600 * 1000) {
      warnings.push(
        `The birth falls within one day of the solar term ${jie.getName()}; the month or year pillar can shift with the precise term moment and timezone. Present the chart with this caveat.`
      );
      break;
    }
  }

  const yearP = pillarFrom(ec.getYear(), ec.getYearShiShenGan());
  const monthP = pillarFrom(ec.getMonth(), ec.getMonthShiShenGan());
  const dayP = pillarFrom(ec.getDay());
  const hourP = timeKnown ? pillarFrom(ec.getTime(), ec.getTimeShiShenGan()) : null;

  const dayStemZh = ec.getDay()[0];
  const dm = STEM_INFO[dayStemZh];

  const dist: Record<string, number> = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
  const chars = [yearP, monthP, dayP, ...(hourP ? [hourP] : [])];
  for (const p of chars) {
    dist[p.stem_element] += 1;
    dist[p.branch_element] += 1;
  }

  // Luck pillars (大运): traditional direction by sex + year-stem polarity.
  let luck: BaziCalc["luck_pillars"] = null;
  try {
    const yun = ec.getYun(input.sex === "male" ? 1 : 0);
    const daYunArr = yun.getDaYun();
    const pillars = daYunArr
      .slice(1, 9) // index 0 is the pre-luck childhood period
      .map((dy: { getGanZhi: () => string; getStartAge: () => number; getEndAge: () => number }) => ({
        ganzhi_zh: dy.getGanZhi(),
        ganzhi: dy.getGanZhi()
          ? `${STEM_INFO[dy.getGanZhi()[0]].pinyin} ${BRANCH_INFO[dy.getGanZhi()[1]].pinyin}`
          : "",
        start_age: dy.getStartAge(),
        end_age: dy.getEndAge(),
      }));
    luck = {
      start_age_years: yun.getStartYear(),
      direction: yun.isForward() ? "forward" : "backward",
      pillars,
    };
    if (!timeKnown) {
      warnings.push(
        "Luck-pillar start age is approximate because the birth time is unknown."
      );
    }
  } catch {
    luck = null;
  }

  const yearBranchZh = ec.getYear()[1];
  const animal = BRANCH_INFO[yearBranchZh];

  return {
    birth_time_known: timeKnown,
    pillars: { year: yearP, month: monthP, day: dayP, hour: hourP },
    day_master: { stem: dm.pinyin, stem_zh: dayStemZh, element: dm.element, polarity: dm.polarity },
    element_distribution: dist,
    luck_pillars: luck,
    zodiac_animal: { en: animal.animal_en, zh: animal.animal_zh },
    lunar_date_zh: `农历${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
    calculation_warnings: warnings,
  };
}
