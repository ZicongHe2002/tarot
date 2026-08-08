// "Big Three" placement write-ups: Sun (identity), Moon (inner/emotional
// world), Rising/Ascendant (how you meet the world). role × 12 signs = 36.
export interface BigThreeEntry {
  role: "sun" | "moon" | "rising";
  sign: string; // "Aries"
  sign_zh: string; // 白羊座
  headline: { en: string; zh: string }; // short evocative phrase
  body: { en: string; zh: string }; // 2-4 reflective sentences
}
