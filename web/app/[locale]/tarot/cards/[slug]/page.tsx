import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { Card, Alert, Badge } from "@/components/ui/card";
import { CardArt } from "@/components/tarot/card-art";
import { TAROT_MAJORS } from "@/content/tarot-majors";
import { TAROT_MINORS } from "@/content/tarot-minors";
import { Button } from "@/components/ui/button";

const ALL = [...TAROT_MAJORS, ...TAROT_MINORS];

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => ALL.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const card = ALL.find((c) => c.slug === slug);
  if (!isLocale(locale) || !card) return {};
  return pageMetadata({
    locale,
    path: `/tarot/cards/${slug}`,
    title: card.name[locale],
    description: card.generalMeaning[locale].slice(0, 155),
  });
}

export default async function CardPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const card = ALL.find((c) => c.slug === slug);
  if (!isLocale(locale) || !card) notFound();
  const lo = locale;
  const meanings = [
    { title: t(M.topicLove, lo), body: card.loveMeaning[lo] },
    { title: t(M.topicCareer, lo), body: card.careerMeaning[lo] },
    { title: t(M.topicGrowth, lo), body: card.growthMeaning[lo] },
  ];
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <Link href={`/${lo}/tarot`} className="hover:underline">{t(M.navTarot, lo)}</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/${lo}/tarot/cards`} className="hover:underline">{t(M.tarotLibrary, lo)}</Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{card.name[lo]}</li>
        </ol>
      </nav>

      <div className="grid gap-8 sm:grid-cols-[auto_1fr]">
        <div className="mx-auto sm:mx-0">
          <CardArt
            index={card.id}
            slug={card.slug}
            nameEn={card.name.en}
            nameZh={card.name.zh}
            suit={card.suit}
            reversed={false}
            locale={lo}
            width={220}
          />
        </div>
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{card.name[lo]}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge tone="gold">{card.arcana === "major" ? (lo === "zh" ? "大阿卡纳" : "Major Arcana") : (lo === "zh" ? "小阿卡纳" : "Minor Arcana")}</Badge>
            {card.suit && <Badge>{lo === "zh" ? { wands: "权杖", cups: "圣杯", swords: "宝剑", pentacles: "星币" }[card.suit] : card.suit}</Badge>}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Card className="p-4">
              <h2 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.tarotUpright, lo)}</h2>
              <p className="mt-1 text-sm">{card.uprightKeywords[lo].join(" · ")}</p>
            </Card>
            <Card className="p-4">
              <h2 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.tarotReversed, lo)}</h2>
              <p className="mt-1 text-sm">{card.reversedKeywords[lo].join(" · ")}</p>
            </Card>
          </div>
          <p className="mt-5 leading-relaxed">{card.generalMeaning[lo]}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {meanings.map((m) => (
          <Card key={m.title}>
            <h2 className="font-display text-lg font-semibold">{m.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/90">{m.body}</p>
          </Card>
        ))}
      </div>

      <Alert tone="info" className="mt-8">
        <p className="font-medium">{t(M.reflectionHeading, lo)}</p>
        <p className="font-display mt-1 text-lg">{card.reflectionQuestion[lo]}</p>
        <p className="mt-3 text-sm text-[var(--fg-muted)]">
          {t(M.actionHeading, lo)}: {card.actionPrompt[lo]}
        </p>
      </Alert>

      <div className="mt-8">
        <Link href={`/${lo}/tarot/one-card`}>
          <Button>{t(M.ctaDrawCard, lo)}</Button>
        </Link>
      </div>
    </div>
  );
}
