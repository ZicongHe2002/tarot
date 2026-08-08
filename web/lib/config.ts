export type Locale = "en" | "zh";
export const LOCALES: Locale[] = ["en", "zh"];
export const DEFAULT_LOCALE: Locale = "en";

// [BRAND_NAME] placeholder (spec §1) — set NEXT_PUBLIC_BRAND_NAME to rebrand.
export const BRAND: Record<Locale, string> = {
  en: process.env.NEXT_PUBLIC_BRAND_NAME || "Luminary",
  zh: process.env.NEXT_PUBLIC_BRAND_NAME_ZH || "明鉴",
};

export const TAGLINE: Record<Locale, string> = {
  en: "One profile. Three traditions. Daily personalized guidance.",
  zh: "一份档案，三种传统，每日专属指引。",
};

export const CURRENCY = "usd";
export const CONSENT_WORDING_VERSION = "2026-07-16.v1";

export const env = {
  // Render provides its public origin automatically. APP_BASE_URL remains the
  // explicit override for a custom domain and for non-Render deployments.
  appBaseUrl: () =>
    process.env.APP_BASE_URL || process.env.RENDER_EXTERNAL_URL || "http://localhost:3000",
  stripeSecretKey: () => process.env.STRIPE_SECRET_KEY || "",
  stripeWebhookSecret: () => process.env.STRIPE_WEBHOOK_SECRET || "",
  stripeTaxEnabled: () => process.env.STRIPE_TAX_ENABLED === "1",
  stripeStatementSuffix: () => process.env.STRIPE_STATEMENT_DESCRIPTOR_SUFFIX || "",
  // Mock payments are development-only and additionally require the flag.
  devFakePayments: () =>
    process.env.NODE_ENV !== "production" && process.env.DEV_FAKE_PAYMENTS === "1",
  hasDeepSeek: () => !!process.env.DEEPSEEK_API_KEY,
};

export function isLocale(v: string): v is Locale {
  return v === "en" || v === "zh";
}
