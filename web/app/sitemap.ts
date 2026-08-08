import type { MetadataRoute } from "next";
import { env, LOCALES } from "@/lib/config";
import { TAROT_MAJORS } from "@/content/tarot-majors";
import { TAROT_MINORS } from "@/content/tarot-minors";
import { ARTICLES } from "@/content/articles";
import { DAY_MASTERS } from "@/content/day-masters";
import { SUN_PLACEMENTS } from "@/content/sun-placements";
import { SIGN_SLUGS } from "@/lib/horoscope";

// Public, indexable routes only — personalized pages are noindex and excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.appBaseUrl();
  const staticPaths = [
    "",
    "/tarot",
    "/tarot/daily",
    "/tarot/one-card",
    "/tarot/three-card",
    "/tarot/yes-or-no",
    "/tarot/cards",
    "/astrology",
    "/astrology/birth-chart",
    "/astrology/transits",
    "/astrology/today",
    "/astrology/big-three",
    "/bazi",
    "/bazi/calculator",
    "/bazi/five-elements",
    "/bazi/ten-gods",
    "/bazi/luck-pillars",
    "/bazi/methodology",
    "/daily-guidance",
    "/compatibility",
    "/compatibility/astrology",
    "/compatibility/bazi",
    "/compatibility/combined",
    "/learn",
    "/pricing",
    ...["terms", "privacy", "cookies", "subscriptions", "refunds", "disclaimer", "ai-disclosure"].map((d) => `/legal/${d}`),
    ...[...TAROT_MAJORS, ...TAROT_MINORS].map((c) => `/tarot/cards/${c.slug}`),
    ...ARTICLES.map((a) => `/learn/${a.slug}`),
    ...DAY_MASTERS.map((d) => `/bazi/day-master/${d.slug}`),
    ...SUN_PLACEMENTS.map((p) => `/astrology/placements/${p.slug}`),
    ...SIGN_SLUGS.map((s) => `/horoscope/${s}/daily`),
  ];

  return staticPaths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${base}/${locale}${path}`,
      changeFrequency: path.includes("horoscope") ? ("daily" as const) : ("weekly" as const),
      priority: path === "" ? 1 : 0.6,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${base}/${l}${path}`])),
      },
    }))
  );
}
