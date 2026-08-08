import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { BirthChartFlow } from "@/components/astro/birth-chart-flow";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/astrology/birth-chart",
    title: t(M.astroBirthChart, locale),
    description:
      locale === "zh"
        ? "免费计算你的本命星盘：行星星座、宫位、相位与元素平衡，以天文精度逐度计算。"
        : "Calculate your birth chart free: planetary signs, houses, aspects, and element balance, computed astronomically to the degree.",
  });
}

export default async function BirthChartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <a href={`/${lo}/astrology`} className="hover:underline">{t(M.navAstrology, lo)}</a>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{t(M.astroBirthChart, lo)}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.astroBirthChart, lo)}</h1>
      <p className="mt-2 max-w-2xl text-[var(--fg-muted)]">{t(M.unknownTimeNotice, lo)}</p>
      <div className="mt-8">
        <BirthChartFlow locale={lo} />
      </div>
    </div>
  );
}
