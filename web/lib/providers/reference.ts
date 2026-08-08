// Knowledge grounding for interpretations. Each reading type gets a compact
// "reference" object of ESTABLISHED meaning that the model must read from:
//   - Tarot: canonical Rider-Waite-Smith meanings we already authored.
//   - BaZi: the public-domain 子平 framework (Ten Gods, five-element cycles,
//           Day-Master strength) — traditional knowledge, not any modern book.
//   - Astrology: standard planet/aspect/house significations.
// This makes readings consistent with the traditions rather than improvised.
import type { LocaleCode } from "./types";
import { TAROT_MAJORS } from "@/content/tarot-majors";
import { TAROT_MINORS } from "@/content/tarot-minors";

const CARD_BY_ID = new Map([...TAROT_MAJORS, ...TAROT_MINORS].map((c) => [c.id, c]));

function tarotReference(calc: unknown, lang: LocaleCode) {
  const c = calc as { cards?: Array<{ deck_index: number; orientation: string; position_en: string; position_zh: string }> };
  if (!c?.cards) return undefined;
  return {
    tradition: "Rider-Waite-Smith",
    cards: c.cards.map((card) => {
      const content = CARD_BY_ID.get(card.deck_index);
      if (!content) return { deck_index: card.deck_index };
      return {
        name: content.name[lang],
        position: lang === "zh" ? card.position_zh : card.position_en,
        orientation: card.orientation,
        upright_keywords: content.uprightKeywords[lang],
        reversed_keywords: content.reversedKeywords[lang],
        general: content.generalMeaning[lang],
        love: content.loveMeaning[lang],
        career: content.careerMeaning[lang],
        growth: content.growthMeaning[lang],
      };
    }),
  };
}

// ---- BaZi (子平) classical framework — public domain traditional knowledge ----
const TEN_GODS: Record<string, { en: string; zh: string }> = {
  比肩: { en: "Companion (比肩): peers and self-reliance; independence, resilience, competition among equals.", zh: "比肩：同我之力，主独立、自立、与同侪并肩，也主竞争。" },
  劫财: { en: "Rob Wealth (劫财): bold allies and rivalry; risk-taking, drive, spending, shared ventures.", zh: "劫财：同类异性，主进取、合作亦争夺，敢闯敢花。" },
  食神: { en: "Eating God (食神): gentle output; creativity, expression, enjoyment, nourishment of talent.", zh: "食神：我生之秀气，主才华、表达、享受与从容输出。" },
  伤官: { en: "Hurting Officer (伤官): brilliant, unconventional output; talent that breaks rules, expressive intensity.", zh: "伤官：我生而锋芒，主才气、创造、不拘常规，亦需收敛。" },
  偏财: { en: "Indirect Wealth (偏财): fluid wealth; opportunity, generosity, sociability, windfalls.", zh: "偏财：我克之活财，主机遇、慷慨、交际与流动之财。" },
  正财: { en: "Direct Wealth (正财): steady wealth; diligence, practicality, commitment, earned resources.", zh: "正财：我克之正财，主勤勉、务实、稳定积累与责任。" },
  七杀: { en: "Seven Killings (七杀): pressure and drive; discipline, courage under challenge, authority tested.", zh: "七杀：克我而无制，主压力、魄力、开创，需有制方成大器。" },
  正官: { en: "Direct Officer (正官): responsibility and status; rules, integrity, reputation, self-restraint.", zh: "正官：克我而有情，主责任、名分、规矩与自律。" },
  偏印: { en: "Indirect Resource (偏印): unconventional support; intuition, niche learning, detachment.", zh: "偏印：生我之偏，主直觉、偏门学问、独处与超然。" },
  正印: { en: "Direct Resource (正印): nurture and study; support, learning, wisdom, protection.", zh: "正印：生我之正，主庇护、学识、涵养与贵人。" },
};

function baziReference(calc: unknown, lang: LocaleCode) {
  const root = calc as { natal?: unknown } & Record<string, unknown>;
  const c = (root?.natal ?? root) as {
    day_master?: { element?: string };
    pillars?: Record<string, { ten_god_stem_zh?: string } | null>;
  };
  const present = new Set<string>();
  for (const p of Object.values(c?.pillars ?? {})) {
    if (p?.ten_god_stem_zh) present.add(p.ten_god_stem_zh);
  }
  const tenGods = [...present].map((zh) => (lang === "zh" ? TEN_GODS[zh]?.zh : TEN_GODS[zh]?.en)).filter(Boolean);
  return {
    tradition: lang === "zh" ? "子平（四柱）—— 以中和为要，参《子平真诠》《滴天髓》之意" : "Zi Ping / Four Pillars — balance-centered, in the spirit of 子平真诠 and 滴天髓",
    day_master_strength:
      lang === "zh"
        ? "日主强弱：得同类（比劫）与印相生则强，被食伤泄、财耗、官杀克则弱。强则宜泄宜克，弱则宜生宜扶。"
        : "Day-Master strength: strengthened by same-element (Companions) and Resource; weakened by Output, Wealth, and Officer/Killings. A strong Day Master welcomes release; a weak one welcomes support.",
    five_elements:
      lang === "zh"
        ? "五行生克：木生火、火生土、土生金、金生水、水生木；木克土、土克水、水克火、火克金、金克木。"
        : "Five elements — generating: Wood→Fire→Earth→Metal→Water→Wood; controlling: Wood→Earth→Water→Fire→Metal→Wood.",
    ten_gods_present: tenGods,
    note:
      lang === "zh"
        ? "喜用神只作定性说明（哪些五行能使命局趋于中和），不作吉凶断言。"
        : "Discuss favorable elements (喜用神) only qualitatively — which elements bring balance — never as a fortune verdict.",
  };
}

// ---- Western astrology significations (standard correspondences) ----
const PLANETS_REF: Record<string, { en: string; zh: string }> = {
  Sun: { en: "identity, vitality, what you're growing into", zh: "自我、生命力、你正在成为的方向" },
  Moon: { en: "emotional needs, instincts, what makes you feel safe", zh: "情感需求、本能、安全感的来源" },
  Mercury: { en: "mind, communication, how you think and learn", zh: "心智、沟通、思考与学习方式" },
  Venus: { en: "love, values, pleasure, how you relate", zh: "爱、价值观、愉悦与关系方式" },
  Mars: { en: "drive, assertion, how you pursue and defend", zh: "行动力、进取、如何追求与捍卫" },
  Jupiter: { en: "growth, meaning, where you expand", zh: "成长、意义、扩展之处" },
  Saturn: { en: "structure, discipline, where you mature through limits", zh: "结构、纪律、在限制中成熟之处" },
  Uranus: { en: "change, individuality, where you break patterns", zh: "变革、独特性、打破常规之处" },
  Neptune: { en: "imagination, spirituality, where boundaries dissolve", zh: "想象、灵性、界限消融之处" },
  Pluto: { en: "depth, transformation, where you regenerate", zh: "深度、转化、重生之处" },
};

const ASPECTS_REF = {
  en: "conjunction = fusion of two functions; sextile/trine = ease and flow; square/opposition = productive tension and growth.",
  zh: "合相＝两种能量融合；六分/三分相＝顺畅协作；四分/对分相＝张力与成长课题。",
};

function astrologyReference(lang: LocaleCode) {
  return {
    tradition: lang === "zh" ? "西方回归黄道占星（整宫制）" : "Western tropical astrology (whole-sign houses)",
    planets: Object.fromEntries(Object.entries(PLANETS_REF).map(([k, v]) => [k, lang === "zh" ? v.zh : v.en])),
    aspects: lang === "zh" ? ASPECTS_REF.zh : ASPECTS_REF.en,
    houses:
      lang === "zh"
        ? "十二宫依次为：自我、财与资源、沟通、家庭根基、创造与恋爱、日常与健康、伴侣、亲密与转化、信念与远行、事业与声望、社群与理想、内在与隐秘。仅在已知出生时间时使用。"
        : "The twelve houses: self; resources; communication; home/roots; creativity/romance; work/health; partnership; intimacy/transformation; belief/travel; career/reputation; community/ideals; inner/hidden. Only when birth time is known.",
  };
}

export function buildReference(readingType: string, calculation: unknown, language: LocaleCode): unknown {
  if (readingType.startsWith("tarot")) return tarotReference(calculation, language);
  if (readingType.startsWith("bazi")) return baziReference(calculation, language);
  if (readingType.startsWith("compatibility")) {
    return { astrology: astrologyReference(language), bazi: baziReference(calculation, language) };
  }
  if (
    readingType.startsWith("natal") ||
    readingType.startsWith("astro") ||
    readingType.startsWith("horoscope") ||
    readingType.startsWith("transit")
  )
    return astrologyReference(language);
  if (readingType.startsWith("daily")) {
    return { astrology: astrologyReference(language), bazi: baziReference(calculation, language) };
  }
  return undefined;
}
