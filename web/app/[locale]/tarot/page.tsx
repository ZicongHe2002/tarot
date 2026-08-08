import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { Card } from "@/components/ui/card";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/tarot",
    title: t(M.tarotTitle, locale),
    description: t(M.tarotIntro, locale),
  });
}

export default async function TarotHub({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  const modes = [
    { href: `/${lo}/tarot/daily`, title: t(M.tarotDaily, lo), free: true, body: lo === "zh" ? "每天一张牌，同一天内不重抽。" : "One card per day — the same card all day, never redrawn." },
    { href: `/${lo}/tarot/one-card`, title: t(M.tarotOneCard, lo), body: lo === "zh" ? "带着一个问题，抽一张牌细读。" : "Bring one question; read one card closely." },
    { href: `/${lo}/tarot/three-card`, title: t(M.tarotThreeCard, lo), body: lo === "zh" ? "三张牌看一件事的来龙去脉。" : "Three cards for how a situation moves." },
    { href: `/${lo}/tarot/yes-or-no`, title: t(M.tarotYesNo, lo), body: t(M.tarotYesNoNote, lo) },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex items-center gap-3">
        <Sparkles className="h-7 w-7 text-gold" aria-hidden />
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.tarotTitle, lo)}</h1>
      </div>
      <p className="mt-3 max-w-2xl leading-relaxed text-[var(--fg-muted)]">{t(M.tarotIntro, lo)}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {modes.map((m) => (
          <Card key={m.href} className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-semibold">{m.title}</h2>
              {m.free && (
                <span className="rounded-full bg-el-wood/15 px-2 py-0.5 text-xs font-medium text-[var(--wood-text)]">
                  {t(M.pricingFree, lo)}
                </span>
              )}
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">{m.body}</p>
            <Link href={m.href} className="mt-4 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
              {t(M.tarotShuffle, lo)} →
            </Link>
          </Card>
        ))}
      </div>
      <p className="mt-8">
        <Link href={`/${lo}/tarot/cards`} className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
          {t(M.tarotLibrary, lo)} →
        </Link>
      </p>
      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.disclaimerGeneral, lo)}</p>
    </div>
  );
}
