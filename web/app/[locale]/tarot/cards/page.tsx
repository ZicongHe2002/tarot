import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { TAROT_MAJORS } from "@/content/tarot-majors";
import { TAROT_MINORS } from "@/content/tarot-minors";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/tarot/cards",
    title: t(M.tarotLibrary, locale),
    description:
      locale === "zh"
        ? "78 张塔罗牌的完整牌意：正逆位关键词、含义与反思问题。"
        : "Meanings for all 78 tarot cards: upright and reversed keywords, themes, and reflection questions.",
  });
}

export default async function CardLibrary({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  const groups = [
    { title: lo === "zh" ? "大阿卡纳" : "Major Arcana", cards: TAROT_MAJORS },
    ...(["wands", "cups", "swords", "pentacles"] as const).map((suit) => ({
      title:
        lo === "zh"
          ? { wands: "权杖", cups: "圣杯", swords: "宝剑", pentacles: "星币" }[suit]
          : suit[0].toUpperCase() + suit.slice(1),
      cards: TAROT_MINORS.filter((c) => c.suit === suit),
    })),
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <Link href={`/${lo}/tarot`} className="hover:underline">
              {t(M.navTarot, lo)}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{t(M.tarotLibrary, lo)}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.tarotLibrary, lo)}</h1>
      {groups.map((g) => (
        <section key={g.title} className="mt-10">
          <h2 className="font-display text-2xl font-semibold">{g.title}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {g.cards.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${lo}/tarot/cards/${c.slug}`}
                  className="block rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] px-3 py-2.5 text-sm hover:border-gold/50"
                >
                  <span className="font-medium">{c.name[lo]}</span>
                  <span className="mt-0.5 block text-xs text-[var(--fg-muted)]">
                    {c.uprightKeywords[lo].slice(0, 3).join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="mt-12 text-xs text-[var(--fg-muted)]">
        {lo === "zh"
          ? "牌面采用公有领域的莱德-韦特塔罗（1909，Pamela Colman Smith 绘），图像来自 Wikimedia Commons。"
          : "Card images: the public-domain Rider-Waite-Smith Tarot (1909, illustrated by Pamela Colman Smith), via Wikimedia Commons."}
      </p>
    </div>
  );
}
