// Reusable safety layer (spec §16, md §6.3-§6.4).
// Input side: PII scrubbing, crisis and high-stakes detection (EN + ZH).
// Output side: unsafe-language detection for AI text before display.
// Only category labels are ever logged — never raw user text.

export const SAFETY_POLICY_VERSION = "2026-07-16.v1";

export type SafetyLevel = "ok" | "high_stakes" | "crisis";

export interface SanitizeResult {
  sanitized: string;
  level: SafetyLevel;
  categories: string[];
  redactions: string[];
}

const PII_PATTERNS: Array<{ kind: string; pattern: RegExp }> = [
  { kind: "email", pattern: /[\w.+-]+@[\w-]+\.[\w.-]+/g },
  { kind: "url", pattern: /https?:\/\/\S+/g },
  { kind: "phone_or_id", pattern: /\+?\d[\d\s\-().]{6,}\d/g },
];

const CRISIS_PATTERNS: Array<{ cat: string; pattern: RegExp }> = [
  {
    cat: "crisis_self_harm",
    pattern:
      /\b(suicide|suicidal|kill(ing)? myself|end(ing)? my life|self[- ]?harm|hurt(ing)? myself|overdose|don'?t want to (live|be alive)|no reason to live)\b/i,
  },
  { cat: "crisis_self_harm", pattern: /自杀|轻生|自残|不想活|活不下去|结束(自己的)?生命|伤害自己/ },
  {
    cat: "crisis_harm_others",
    pattern: /\b(want|going|plan(ning)?)\s+to\s+(kill|hurt|harm|attack)\b|\bmake (him|her|them) pay\b.{0,20}\bhurt\b/i,
  },
  { cat: "crisis_harm_others", pattern: /想(杀|伤害|报复弄死)(他|她|人)/ },
];

const HIGH_STAKES_PATTERNS: Array<{ cat: string; pattern: RegExp }> = [
  { cat: "medical", pattern: /\b(cancer|tumou?r|diagnos\w+|chemo|surgery|pregnan\w+|fertility|hiv|std|medication|stop(ping)? (my )?meds?|disease|terminal)\b/i },
  { cat: "medical", pattern: /癌症|肿瘤|诊断|化疗|手术|怀孕|生育|艾滋|性病|抑郁症|停药|绝症/ },
  { cat: "legal", pattern: /\b(lawsuit|court case|custody|divorce settlement|criminal charge|immigration case|visa appeal|deport|arrest)\b/i },
  { cat: "legal", pattern: /官司|诉讼|离婚财产|抚养权|刑事|移民案|签证被拒|遣返|被捕/ },
  { cat: "financial", pattern: /\b(invest(ment)?s?|stocks?|crypto(currency)?|gambl\w+|lottery|bet(ting)?|casino|loan|debt|bankrupt\w*)\b/i },
  { cat: "financial", pattern: /投资|股票|炒股|加密货币|赌|彩票|下注|借贷|欠债|债务|破产/ },
  { cat: "abuse", pattern: /\b(abus(e|ive|ing)|violen(t|ce)|hit(s|ting)? me|threatens? me|stalk\w*|afraid of (him|her|them))\b/i },
  { cat: "abuse", pattern: /家暴|虐待|打我|威胁我|跟踪我|害怕他|害怕她/ },
];

const MAX_QUESTION_LEN = 400;

export function sanitizeQuestion(raw: string | undefined | null): SanitizeResult {
  const original = (raw || "").trim();
  const redactions: string[] = [];
  const categories: string[] = [];

  let text = original;
  for (const { kind, pattern } of PII_PATTERNS) {
    if (pattern.test(text)) {
      redactions.push(kind);
      text = text.replace(pattern, "[removed]");
    }
  }
  if (text.length > MAX_QUESTION_LEN) {
    text = text.slice(0, MAX_QUESTION_LEN) + "…";
    redactions.push("truncated");
  }

  let level: SafetyLevel = "ok";
  for (const { cat, pattern } of CRISIS_PATTERNS) {
    if (pattern.test(original)) {
      if (!categories.includes(cat)) categories.push(cat);
      level = "crisis";
    }
  }
  if (level !== "crisis") {
    for (const { cat, pattern } of HIGH_STAKES_PATTERNS) {
      if (pattern.test(original)) {
        if (!categories.includes(cat)) categories.push(cat);
        level = "high_stakes";
      }
    }
  }
  return { sanitized: text, level, categories, redactions };
}

// ---------- Output-side checks ----------

// Unsafe output language (spec §16): certainty, doom, accusation, coercion.
const UNSAFE_OUTPUT_PATTERNS: Array<{ cat: string; pattern: RegExp }> = [
  { cat: "certainty", pattern: /\b(definitely|guaranteed|this proves|100% (certain|sure)|will certainly|without a doubt)\b/i },
  { cat: "certainty", pattern: /必定|注定会|百分之百|绝对会|铁定/ },
  { cat: "accusation", pattern: /\b(your partner is cheating|is definitely cheating|is a narcissist|committed a crime)\b/i },
  { cat: "accusation", pattern: /(伴侣|他|她)(肯定|一定)(出轨|背叛)/ },
  { cat: "doom", pattern: /\b(disaster is coming|you will die|death is near|you are cursed)\b/i },
  { cat: "doom", pattern: /大难临头|你会死|死期|你被诅咒|灾祸将至/ },
  { cat: "coercion", pattern: /\b(you must pay|pay to (remove|lift)|send money)\b/i },
  { cat: "coercion", pattern: /必须付费|花钱消灾|转账|汇款给/ },
  { cat: "medical_directive", pattern: /\b(stop taking (your )?medication|don'?t see a doctor|skip your treatment)\b/i },
  { cat: "medical_directive", pattern: /停止服药|别去医院|不用看医生/ },
  { cat: "gambling", pattern: /\b(lucky numbers? (to|for) (bet|play)|winning lottery numbers?|place a bet on)\b/i },
  { cat: "gambling", pattern: /中奖号码|下注.{0,4}(必|准)赢|买这注/ },
  { cat: "prompt_leak", pattern: /you are the interpretation component/i },
  { cat: "injection", pattern: /<script|<iframe|javascript:/i },
];

export function checkOutputSafety(text: string): string[] {
  const violations: string[] = [];
  for (const { cat, pattern } of UNSAFE_OUTPUT_PATTERNS) {
    if (pattern.test(text)) violations.push(cat);
  }
  return [...new Set(violations)];
}
