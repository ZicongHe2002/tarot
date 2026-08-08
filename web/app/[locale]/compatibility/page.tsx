import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users } from "lucide-react";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { Badge, Card } from "@/components/ui/card";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/compatibility",
    title: t(M.compatTitle, locale),
    description: t(M.compatIntro, locale),
  });
}

export default async function CompatibilityHub({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;

  const modes = [
    {
      href: `/${lo}/compatibility/astrology`,
      title: t(M.compatAstro, lo),
      body:
        lo === "zh"
          ? "比对两张本命星盘：跨盘相位与太阳配置，看见互动的模式。"
          : "Two natal charts side by side: inter-chart aspects and Sun placements reveal how you interact.",
    },
    {
      href: `/${lo}/compatibility/bazi`,
      title: t(M.compatBazi, lo),
      body:
        lo === "zh"
          ? "从四柱看两人日主的五行生克与地支合冲关系。"
          : "Day Master element relations and branch pairings between two Four Pillars charts.",
    },
    {
      href: `/${lo}/compatibility/combined`,
      title: t(M.compatCombined, lo),
      body:
        lo === "zh"
          ? "占星与八字并列参照，同一段关系的两种视角。"
          : "Astrology and BaZi read together — two angles on the same relationship.",
    },
  ];

  const categories = [
    M.compatCatCommunication,
    M.compatCatEmotional,
    M.compatCatAffection,
    M.compatCatConflict,
    M.compatCatValues,
    M.compatCatRhythm,
    M.compatCatGrowth,
    M.compatCatPractical,
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex items-center gap-3">
        <Users className="h-7 w-7 text-gold" aria-hidden />
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.compatTitle, lo)}</h1>
      </div>
      <p className="mt-3 max-w-2xl leading-relaxed text-[var(--fg-muted)]">{t(M.compatIntro, lo)}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {modes.map((m) => (
          <Card key={m.href} className="flex flex-col">
            <h2 className="font-display text-xl font-semibold">{m.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">{m.body}</p>
            <Link
              href={m.href}
              className="mt-4 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {lo === "zh" ? "开始比对" : "Start comparing"} →
            </Link>
          </Card>
        ))}
      </div>

      <section className="mt-10" aria-labelledby="compat-categories">
        <h2 id="compat-categories" className="font-display text-xl font-semibold">
          {lo === "zh" ? "每份报告覆盖八个方面" : "Every report covers eight areas"}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Badge key={c.en} tone="info">
              {t(c, lo)}
            </Badge>
          ))}
        </div>
      </section>

      <Card className="mt-10 max-w-3xl">
        <p className="text-sm leading-relaxed">
          {lo === "zh"
            ? "报告只描述两张命盘之间的相处模式——绝不诊断你的伴侣，也绝不做任何指责或指控。"
            : "Reports describe patterns between two charts — they never diagnose a partner and never make accusations."}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{t(M.compatShareNote, lo)}</p>
      </Card>

      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.disclaimerGeneral, lo)}</p>
    </div>
  );
}
