import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { BaziFlow } from "@/components/bazi/bazi-flow";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/bazi/calculator",
    title: t(M.baziCalculator, locale),
    description:
      locale === "zh"
        ? "免费八字排盘：四柱、日主、五行分布与大运，按传统节气边界计算。"
        : "Free BaZi calculator: Four Pillars, Day Master, element distribution, and luck pillars using traditional solar-term boundaries.",
  });
}

export default async function BaziCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <a href={`/${lo}/bazi`} className="hover:underline">{t(M.navBazi, lo)}</a>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{t(M.baziCalculator, lo)}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.baziCalculator, lo)}</h1>
      <p className="mt-2 max-w-2xl text-[var(--fg-muted)]">{t(M.unknownTimeNotice, lo)}</p>
      <div className="mt-8">
        <BaziFlow locale={lo} />
      </div>
    </div>
  );
}
