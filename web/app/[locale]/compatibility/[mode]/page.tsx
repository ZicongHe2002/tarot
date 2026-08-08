import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "@/lib/config";
import { M, t, type Msg } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { CompatFlow } from "@/components/compat/compat-flow";

const MODES = ["astrology", "bazi", "combined"] as const;
type Mode = (typeof MODES)[number];

function isMode(v: string): v is Mode {
  return (MODES as readonly string[]).includes(v);
}

const MODE_TITLE: Record<Mode, Msg> = {
  astrology: M.compatAstro,
  bazi: M.compatBazi,
  combined: M.compatCombined,
};

const MODE_DESC: Record<Mode, Msg> = {
  astrology: {
    en: "Compare two natal charts: inter-chart aspects, Sun placements, and relationship patterns across eight everyday areas.",
    zh: "比对两张本命星盘：跨盘相位与太阳配置，从八个日常方面观察关系模式。",
  },
  bazi: {
    en: "Traditional BaZi pairing: Day Master element relations and year/day branch pairings between two Four Pillars charts.",
    zh: "传统八字合婚：两盘日主五行生克，以及年支与日支的合冲关系。",
  },
  combined: {
    en: "Astrology synastry and BaZi pairing read side by side for a fuller two-tradition picture of a relationship.",
    zh: "占星合盘与八字合婚并列解读，以双传统视角更完整地理解一段关系。",
  },
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => MODES.map((mode) => ({ locale, mode })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; mode: string }>;
}): Promise<Metadata> {
  const { locale, mode } = await params;
  if (!isLocale(locale) || !isMode(mode)) return {};
  return pageMetadata({
    locale,
    path: `/compatibility/${mode}`,
    title: t(MODE_TITLE[mode], locale),
    description: t(MODE_DESC[mode], locale),
  });
}

export default async function CompatibilityModePage({
  params,
}: {
  params: Promise<{ locale: string; mode: string }>;
}) {
  const { locale, mode } = await params;
  if (!isLocale(locale) || !isMode(mode)) notFound();
  const lo: Locale = locale;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <a href={`/${lo}/compatibility`} className="hover:underline">
              {t(M.compatTitle, lo)}
            </a>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{t(MODE_TITLE[mode], lo)}</li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(MODE_TITLE[mode], lo)}</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-[var(--fg-muted)]">{t(MODE_DESC[mode], lo)}</p>

      <div className="mt-8">
        <CompatFlow mode={mode} locale={lo} />
      </div>

      <p className="mt-10 max-w-2xl text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.disclaimerGeneral, lo)}</p>
    </div>
  );
}
