import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compass } from "lucide-react";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { Card } from "@/components/ui/card";
import { DAY_MASTERS } from "@/content/day-masters";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/bazi",
    title: t(M.baziTitle, locale),
    description: t(M.baziIntro, locale),
  });
}

export default async function BaziHub({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  const links = [
    { href: `/${lo}/bazi/calculator`, title: t(M.baziCalculator, lo), body: lo === "zh" ? "排出四柱、日主、五行与大运。" : "Four Pillars, Day Master, elements, and luck cycles." },
    { href: `/${lo}/bazi/five-elements`, title: t(M.baziFiveElements, lo), body: lo === "zh" ? "认识木火土金水的相生相克。" : "The generation and control cycles of the five elements." },
    { href: `/${lo}/bazi/ten-gods`, title: t(M.baziTenGods, lo), body: lo === "zh" ? "十神：日主与其他天干的十种关系。" : "Ten relationships between the Day Master and other stems." },
    { href: `/${lo}/bazi/luck-pillars`, title: t(M.baziLuckPillars, lo), body: lo === "zh" ? "十年一运的大运如何排、如何读。" : "How ten-year luck pillars are derived and read." },
    { href: `/${lo}/bazi/methodology`, title: t(M.baziMethodology, lo), body: lo === "zh" ? "我们的计算方法与边界处理，全部公开。" : "Our calculation policies and boundary handling, in the open." },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex items-center gap-3">
        <Compass className="h-7 w-7 text-gold" aria-hidden />
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.baziTitle, lo)}</h1>
      </div>
      <p className="mt-3 max-w-2xl leading-relaxed text-[var(--fg-muted)]">{t(M.baziIntro, lo)}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Card key={l.href} className="flex flex-col">
            <h2 className="font-display text-xl font-semibold">{l.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">{l.body}</p>
            <Link href={l.href} className="mt-4 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
              →
            </Link>
          </Card>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">{t(M.baziDayMaster, lo)}</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {DAY_MASTERS.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/${lo}/bazi/day-master/${d.slug}`}
                className="block rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] px-3 py-2.5 text-center hover:border-gold/50"
              >
                <span className="font-display text-xl">{d.stem_zh}</span>
                <span className="mt-0.5 block text-xs text-[var(--fg-muted)]">
                  {lo === "zh" ? `${d.polarity === "Yang" ? "阳" : "阴"}${{ Wood: "木", Fire: "火", Earth: "土", Metal: "金", Water: "水" }[d.element]}` : `${d.stem} ${d.element}`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
