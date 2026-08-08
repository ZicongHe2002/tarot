import type { Metadata } from "next";
import { env, type Locale, BRAND } from "./config";

/**
 * Standard metadata for public pages: unique title/description, canonical,
 * hreflang alternates, Open Graph. Personalized pages must NOT use this —
 * they set robots noindex instead (spec §19).
 */
export function pageMetadata(opts: {
  locale: Locale;
  path: string; // path WITHOUT locale prefix, e.g. "/tarot/daily"
  title: string;
  description: string;
}): Metadata {
  const base = env.appBaseUrl();
  const url = `${base}/${opts.locale}${opts.path}`;
  return {
    // The locale layout's title template appends the brand.
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${base}/en${opts.path}`,
        zh: `${base}/zh${opts.path}`,
      },
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: BRAND[opts.locale],
      type: "website",
    },
  };
}

export const NOINDEX: Metadata = {
  robots: { index: false, follow: false },
};

export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
