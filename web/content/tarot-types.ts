// Shared content types for the 78-card Tarot library (bilingual).
export interface Bilingual {
  en: string;
  zh: string;
}

export interface BilingualList {
  en: string[];
  zh: string[];
}

export type Arcana = "major" | "minor";
export type Suit = "wands" | "cups" | "swords" | "pentacles";

export interface TarotCardContent {
  id: number; // 0-21 majors; 22-77 minors in suit order wands,cups,swords,pentacles × Ace..King
  slug: string; // e.g. "the-fool", "ace-of-wands"
  name: Bilingual;
  arcana: Arcana;
  suit: Suit | null;
  number: number | null; // major number 0-21, or rank 1-14 (11=Page,12=Knight,13=Queen,14=King)
  uprightKeywords: BilingualList; // 3-5 keywords
  reversedKeywords: BilingualList; // 3-5 keywords
  generalMeaning: Bilingual; // 2-4 sentences, reflective non-deterministic tone
  loveMeaning: Bilingual; // 1-3 sentences
  careerMeaning: Bilingual; // 1-3 sentences
  growthMeaning: Bilingual; // 1-3 sentences
  reflectionQuestion: Bilingual; // one open question
  actionPrompt: Bilingual; // one small, low-risk action
  imagePath: string; // /images/tarot/<slug>.svg
}
