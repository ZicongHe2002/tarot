import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { Card } from "@/components/ui/card";
import { SUN_PLACEMENTS } from "@/content/sun-placements";
import { SIGN_SLUGS } from "@/lib/horoscope";
import { TodaySky } from "@/components/astro/today-sky";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/astrology",
    title: t(M.astroTitle, locale),
    description: t(M.astroIntro, locale),
  });
}

export default async function AstroHub({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex items-center gap-3">
        <Star className="h-7 w-7 text-gold" aria-hidden />
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.astroTitle, lo)}</h1>
      </div>
      <p className="mt-3 max-w-2xl leading-relaxed text-[var(--fg-muted)]">{t(M.astroIntro, lo)}</p>

      <div className="mt-8">
        <TodaySky locale={lo} compact />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <h2 className="font-display text-xl font-semibold">{t(M.astroBirthChart, lo)}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
            {lo === "zh"
              ? "行星、星座、宫位、相位与元素平衡——从速览到完整数据三个层次。"
              : "Planets, signs, houses, aspects, and element balance — from quick profile to full data."}
          </p>
          <Link href={`/${lo}/astrology/birth-chart`} className="mt-4 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
            {t(M.ctaBirthChart, lo)} →
          </Link>
        </Card>
        <Card className="flex flex-col">
          <h2 className="font-display text-xl font-semibold">{t(M.bigThreeTitle, lo)}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
            {lo === "zh"
              ? "太阳、月亮与上升——用文字读懂你的三大主星。"
              : "Sun, Moon, and Rising — your three placements, written out in plain language."}
          </p>
          <Link href={`/${lo}/astrology/big-three`} className="mt-4 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
            {t(M.bigThreeTitle, lo)} →
          </Link>
        </Card>
        <Card className="flex flex-col">
          <h2 className="font-display text-xl font-semibold">{t(M.astroTransits, lo)}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
            {lo === "zh"
              ? "今天的行星走到了你本命盘的哪里？看当下的行运相位。"
              : "Where are today's planets relative to your natal chart? See current transit aspects."}
          </p>
          <Link href={`/${lo}/astrology/transits`} className="mt-4 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
            {t(M.astroTransits, lo)} →
          </Link>
        </Card>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">{t(M.horoscopeDailyTitle, lo)}</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {SIGN_SLUGS.map((slug, i) => (
            <li key={slug}>
              <Link
                href={`/${lo}/horoscope/${slug}/daily`}
                className="block rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] px-3 py-2.5 text-center text-sm hover:border-gold/50"
              >
                {lo === "zh" ? SUN_PLACEMENTS[i].sign_zh : SUN_PLACEMENTS[i].sign}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">{lo === "zh" ? "太阳星座百科" : "Sun-sign placements"}</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {SUN_PLACEMENTS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${lo}/astrology/placements/${p.slug}`}
                className="block rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] px-3 py-2.5 text-center text-sm hover:border-gold/50"
              >
                {lo === "zh" ? p.sign_zh : p.sign}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
