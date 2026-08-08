import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { t, M } from "@/lib/i18n/messages";
import { ARTICLES } from "@/content/articles";
import { Card, Badge } from "@/components/ui/card";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: lo } = await params;
  if (!isLocale(lo)) return {};
  return pageMetadata({
    locale: lo,
    path: "/learn",
    title: lo === "zh" ? "学习：塔罗、占星与八字入门" : "Learn Tarot, Astrology & BaZi",
    description:
      lo === "zh"
        ? "一组平静、诚实的入门文章：塔罗的来历、星盘的原理、八字的四柱、日常生活中的五行，以及我们如何使用 AI。"
        : "Calm, honest introductions to the three traditions: where tarot comes from, how birth charts work, the Four Pillars of BaZi, the five elements in daily life, and how we use AI.",
  });
}

export default async function LearnIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: lo } = await params;
  if (!isLocale(lo)) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        {t(M.navLearn, lo)}
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-[var(--fg-muted)]">
        {lo === "zh"
          ? "认识这些传统本身——它们从哪里来、如何运作、能说什么、不能说什么。慢慢读，不着急。"
          : "Get to know the traditions themselves — where they come from, how they work, what they can say, and what they cannot. Take your time."}
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {ARTICLES.map((a) => (
          <li key={a.slug} className="h-full">
            <Link
              href={`/${lo}/learn/${a.slug}`}
              className="group block h-full rounded-2xl focus-visible:outline-2"
            >
              <Card className="flex h-full flex-col transition-colors group-hover:border-[var(--accent)]">
                <Badge className="self-start">
                  {lo === "zh" ? `约 ${a.minutes} 分钟` : `${a.minutes} min read`}
                </Badge>
                <h2 className="mt-3 font-display text-lg font-semibold leading-snug group-hover:text-[var(--accent)]">
                  {a.title[lo]}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {a.description[lo]}
                </p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
