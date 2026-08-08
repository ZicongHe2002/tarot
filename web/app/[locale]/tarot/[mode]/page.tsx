import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { TarotFlow } from "@/components/tarot/tarot-flow";
import type { TarotMode } from "@/lib/readings";

const MODES: Record<string, { mode: TarotMode; titleKey: keyof typeof M; descEn: string; descZh: string }> = {
  daily: {
    mode: "daily",
    titleKey: "tarotDaily",
    descEn: "Draw your free daily tarot card — one secure draw per day with a reflective interpretation.",
    descZh: "抽取你的免费每日塔罗牌——每天一次安全抽牌，附反思式解读。",
  },
  "one-card": {
    mode: "one_card",
    titleKey: "tarotOneCard",
    descEn: "A single-card tarot reading for one clear question.",
    descZh: "针对一个明确问题的单牌塔罗解读。",
  },
  "three-card": {
    mode: "three_card",
    titleKey: "tarotThreeCard",
    descEn: "A past–present–future spread for how a situation is moving.",
    descZh: "过去-现在-未来三牌阵，看一件事的走向。",
  },
  "yes-or-no": {
    mode: "yes_no",
    titleKey: "tarotYesNo",
    descEn: "A yes/no reflection draw — clarity about your own leaning, not a verdict.",
    descZh: "是否之问——厘清你自己的倾向，而非替你判决。",
  },
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => Object.keys(MODES).map((mode) => ({ locale, mode })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; mode: string }>;
}): Promise<Metadata> {
  const { locale, mode } = await params;
  const def = MODES[mode];
  if (!isLocale(locale) || !def) return {};
  return pageMetadata({
    locale,
    path: `/tarot/${mode}`,
    title: t(M[def.titleKey] as { en: string; zh: string }, locale),
    description: locale === "zh" ? def.descZh : def.descEn,
  });
}

export default async function TarotModePage({
  params,
}: {
  params: Promise<{ locale: string; mode: string }>;
}) {
  const { locale, mode } = await params;
  const def = MODES[mode];
  if (!isLocale(locale) || !def) notFound();
  const lo = locale;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <a href={`/${lo}/tarot`} className="hover:underline">
              {t(M.navTarot, lo)}
            </a>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{t(M[def.titleKey] as { en: string; zh: string }, lo)}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {t(M[def.titleKey] as { en: string; zh: string }, lo)}
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--fg-muted)]">{lo === "zh" ? def.descZh : def.descEn}</p>
      <div className="mt-8">
        <TarotFlow mode={def.mode} locale={lo} />
      </div>
    </div>
  );
}
