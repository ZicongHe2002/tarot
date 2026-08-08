import crypto from "crypto";
import type { Locale } from "../config";

export interface TarotCard {
  index: number; // 0-77, stable deck index
  arcana: "major" | "minor";
  name: { en: string; zh: string };
  suit?: { en: string; zh: string };
  rank?: { en: string; zh: string };
  number?: number; // major arcana number
}

const MAJORS: Array<[string, string]> = [
  ["The Fool", "愚者"],
  ["The Magician", "魔术师"],
  ["The High Priestess", "女祭司"],
  ["The Empress", "女皇"],
  ["The Emperor", "皇帝"],
  ["The Hierophant", "教皇"],
  ["The Lovers", "恋人"],
  ["The Chariot", "战车"],
  ["Strength", "力量"],
  ["The Hermit", "隐士"],
  ["Wheel of Fortune", "命运之轮"],
  ["Justice", "正义"],
  ["The Hanged Man", "倒吊人"],
  ["Death", "死神"],
  ["Temperance", "节制"],
  ["The Devil", "恶魔"],
  ["The Tower", "高塔"],
  ["The Star", "星星"],
  ["The Moon", "月亮"],
  ["The Sun", "太阳"],
  ["Judgement", "审判"],
  ["The World", "世界"],
];

const SUITS: Array<[string, string]> = [
  ["Wands", "权杖"],
  ["Cups", "圣杯"],
  ["Swords", "宝剑"],
  ["Pentacles", "星币"],
];

const RANKS: Array<[string, string]> = [
  ["Ace", "王牌"],
  ["Two", "二"],
  ["Three", "三"],
  ["Four", "四"],
  ["Five", "五"],
  ["Six", "六"],
  ["Seven", "七"],
  ["Eight", "八"],
  ["Nine", "九"],
  ["Ten", "十"],
  ["Page", "侍者"],
  ["Knight", "骑士"],
  ["Queen", "王后"],
  ["King", "国王"],
];

function buildDeck(): TarotCard[] {
  const deck: TarotCard[] = MAJORS.map(([en, zh], i) => ({
    index: i,
    arcana: "major" as const,
    number: i,
    name: { en: `${en}`, zh },
  }));
  let idx = 22;
  for (const [suitEn, suitZh] of SUITS) {
    for (const [rankEn, rankZh] of RANKS) {
      deck.push({
        index: idx++,
        arcana: "minor",
        suit: { en: suitEn, zh: suitZh },
        rank: { en: rankEn, zh: rankZh },
        name: {
          en: `${rankEn} of ${suitEn}`,
          zh: `${suitZh}${rankZh}`,
        },
      });
    }
  }
  return deck;
}

export const DECK: TarotCard[] = buildDeck();

/** Canonical card slug (matches content slugs and image filenames). */
export function cardSlug(index: number): string {
  return DECK[index].name.en.toLowerCase().replace(/\s+/g, "-");
}

export type SpreadId = "single" | "three_card" | "celtic_cross";

export const SPREADS: Record<
  SpreadId,
  { positions: Array<{ en: string; zh: string }> }
> = {
  single: { positions: [{ en: "Card of the Day", zh: "今日之牌" }] },
  three_card: {
    positions: [
      { en: "Past", zh: "过去" },
      { en: "Present", zh: "现在" },
      { en: "Future", zh: "未来" },
    ],
  },
  celtic_cross: {
    positions: [
      { en: "Present situation", zh: "现状" },
      { en: "Challenge", zh: "阻碍" },
      { en: "Foundation", zh: "基础" },
      { en: "Recent past", zh: "过去" },
      { en: "Conscious goal", zh: "目标" },
      { en: "Near future", zh: "近期发展" },
      { en: "Your attitude", zh: "自身态度" },
      { en: "Outside influences", zh: "外部影响" },
      { en: "Hopes and fears", zh: "希望与恐惧" },
      { en: "Potential outcome", zh: "可能的结果" },
    ],
  },
};

export interface DrawnCard {
  deck_index: number;
  name_en: string;
  name_zh: string;
  arcana: "major" | "minor";
  orientation: "upright" | "reversed";
  position: number;
  position_en: string;
  position_zh: string;
}

export interface TarotCalc {
  spread: SpreadId;
  cards: DrawnCard[];
  calculation_warnings: string[];
}

/**
 * Cryptographically secure draw (Fisher–Yates over crypto.randomInt).
 * The engine draws; DeepSeek never selects or alters cards.
 */
export function drawSpread(spread: SpreadId): TarotCalc {
  const positions = SPREADS[spread].positions;
  const indices = Array.from({ length: 78 }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const cards: DrawnCard[] = positions.map((pos, p) => {
    const card = DECK[indices[p]];
    return {
      deck_index: card.index,
      name_en: card.name.en,
      name_zh: card.name.zh,
      arcana: card.arcana,
      orientation: crypto.randomInt(2) === 0 ? "upright" : "reversed",
      position: p + 1,
      position_en: pos.en,
      position_zh: pos.zh,
    };
  });
  return { spread, cards, calculation_warnings: [] };
}

/** Deterministic per-(seed, date) daily card so refreshes never redraw. */
export function dailyCard(seed: string, dateIso: string): {
  cardIndex: number;
  reversed: boolean;
} {
  const h = crypto.createHmac("sha256", "daily-card-v1").update(`${seed}|${dateIso}`).digest();
  return { cardIndex: h.readUInt32BE(0) % 78, reversed: (h[4] & 1) === 1 };
}

export function cardName(index: number, locale: Locale): string {
  return locale === "zh" ? DECK[index].name.zh : DECK[index].name.en;
}
