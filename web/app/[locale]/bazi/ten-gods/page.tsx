import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { t, M } from "@/lib/i18n/messages";

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
    path: "/bazi/ten-gods",
    title: lo === "zh" ? "十神：八字中的十种关系" : "The Ten Gods (Shi Shen 十神)",
    description:
      lo === "zh"
        ? "十神词汇表：比肩、劫财、食神、伤官、偏财、正财、七杀、正官、偏印、正印——每一神如何由日主与其他天干的关系构成，以及各自的主题。"
        : "A glossary of the Ten Gods of BaZi — Companion, Rob Wealth, Eating God, Hurting Officer, the Wealths, Officers, and Resources — how each is formed from the Day Master's relationships, and its themes.",
  });
}

const TEN_GODS = [
  {
    zh: "比肩",
    en: "Companion",
    formed: { en: "Same element as the Day Master, same polarity", zh: "与日主同五行、同阴阳" },
    themes: { en: "Peers, self-reliance, equal footing", zh: "同侪、自立、并肩同行" },
  },
  {
    zh: "劫财",
    en: "Rob Wealth",
    formed: { en: "Same element, opposite polarity", zh: "与日主同五行、异阴阳" },
    themes: { en: "Competition, boldness, shared stakes", zh: "竞争、胆识、共享资源" },
  },
  {
    zh: "食神",
    en: "Eating God",
    formed: { en: "Element the Day Master generates, same polarity", zh: "日主所生之五行、同阴阳" },
    themes: { en: "Expression, enjoyment, craft", zh: "表达、享受、才艺" },
  },
  {
    zh: "伤官",
    en: "Hurting Officer",
    formed: { en: "Element the Day Master generates, opposite polarity", zh: "日主所生之五行、异阴阳" },
    themes: { en: "Brilliance, rebellion, innovation", zh: "才华、锋芒、突破常规" },
  },
  {
    zh: "偏财",
    en: "Indirect Wealth",
    formed: { en: "Element the Day Master controls, same polarity", zh: "日主所克之五行、同阴阳" },
    themes: { en: "Opportunity, flow, enterprise", zh: "机遇、流动之财、开拓" },
  },
  {
    zh: "正财",
    en: "Direct Wealth",
    formed: { en: "Element the Day Master controls, opposite polarity", zh: "日主所克之五行、异阴阳" },
    themes: { en: "Steady earnings, diligence, care", zh: "正俸、勤恳、务实经营" },
  },
  {
    zh: "七杀",
    en: "Seven Killings",
    formed: { en: "Element that controls the Day Master, same polarity", zh: "克日主之五行、同阴阳" },
    themes: { en: "Drive, pressure, decisive courage", zh: "魄力、压力、临事之勇" },
  },
  {
    zh: "正官",
    en: "Direct Officer",
    formed: { en: "Element that controls the Day Master, opposite polarity", zh: "克日主之五行、异阴阳" },
    themes: { en: "Order, responsibility, reputation", zh: "规范、责任、名誉" },
  },
  {
    zh: "偏印",
    en: "Indirect Resource",
    formed: { en: "Element that generates the Day Master, same polarity", zh: "生日主之五行、同阴阳" },
    themes: { en: "Intuition, unconventional learning", zh: "直觉、偏门之学、独思" },
  },
  {
    zh: "正印",
    en: "Direct Resource",
    formed: { en: "Element that generates the Day Master, opposite polarity", zh: "生日主之五行、异阴阳" },
    themes: { en: "Support, learning, protection", zh: "庇护、学识、涵养" },
  },
];

export default async function TenGodsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: lo } = await params;
  if (!isLocale(lo)) notFound();

  const th = "px-4 py-2.5 text-left font-medium";
  const td = "px-4 py-2.5 align-top";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={`/${lo}/bazi`} className="hover:text-[var(--fg)] hover:underline">
              {t(M.navBazi, lo)}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{t(M.baziTenGods, lo)}</li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        {lo === "zh" ? "十神：命盘中的十种关系" : "The Ten Gods 十神"}
      </h1>
      <p className="mt-4 leading-relaxed">
        {lo === "zh"
          ? "“十神”并不是十位神明，而是十种关系。八字以日主（日柱天干）为中心，其余每一个天干——包括地支中所藏的天干——都依据“它与日主之间的五行生克关系，以及阴阳是否相同”被赋予一个名字。同我者为比劫，我生者为食伤，我克者为财，克我者为官杀，生我者为印。五组关系，各分阴阳，恰成十神。"
          : "The Ten Gods are not deities but relationships. A BaZi chart takes the Day Master — the stem of the day pillar — as its center, and every other stem in the chart (including those hidden inside branches) is named by how it relates to that center: which of the two elements generates or controls the other, and whether the polarities match. Same element: peers. What I generate: output. What I control: wealth. What controls me: influence. What generates me: resource. Five relationships, each split by polarity — ten names in all."}
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--line)]">
        <table className="w-full min-w-[34rem] border-collapse bg-[var(--bg-raised)] text-sm">
          <caption className="sr-only">
            {lo === "zh"
              ? "十神一览：名称、构成方式与主题"
              : "The Ten Gods: name, how each is formed, and its themes"}
          </caption>
          <thead>
            <tr className="border-b border-[var(--line)] text-[var(--fg-muted)]">
              <th scope="col" className={th}>
                {lo === "zh" ? "十神" : "Name"}
              </th>
              <th scope="col" className={th}>
                {lo === "zh" ? "构成" : "Formed by"}
              </th>
              <th scope="col" className={th}>
                {lo === "zh" ? "主题" : "Themes"}
              </th>
            </tr>
          </thead>
          <tbody>
            {TEN_GODS.map((g) => (
              <tr key={g.zh} className="border-b border-[var(--line)] last:border-b-0">
                <th scope="row" className={`${th} whitespace-nowrap font-medium`}>
                  {g.zh}
                  <span className="block text-xs font-normal text-[var(--fg-muted)]">{g.en}</span>
                </th>
                <td className={`${td} text-[var(--fg-muted)]`}>{g.formed[lo]}</td>
                <td className={td}>{g.themes[lo]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 leading-relaxed">
        {lo === "zh"
          ? "一个常见的误会是把某些十神当作“吉神”、另一些当作“凶神”。更贴近这门手艺的读法是：没有哪一神天生是好是坏。七杀的压力可以炼出担当，伤官的锋芒可以开出新路；正印的庇护若过了头，也可能变成不肯离巢。每一神的意义，都取决于它在整张命盘中的位置、强弱与相互配合。"
          : "A common misreading treats some gods as lucky and others as ominous. Closer to the craft: no god is good or bad in itself. The pressure of Seven Killings can forge real capability, the edge of Hurting Officer can open new roads — and even the shelter of Direct Resource, overgrown, can become a reluctance to leave the nest. Each god's meaning depends on its place, strength, and company within the whole chart."}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
        {lo === "zh"
          ? "在排盘结果里，每个天干旁都会标注它对应的十神。"
          : "In your calculated chart, each stem is labeled with the Ten God it forms."}
      </p>

      <div className="mt-6">
        <Link
          href={`/${lo}/bazi/calculator`}
          className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {lo === "zh" ? "排盘查看你的十神" : "See the Ten Gods in your own chart"}
        </Link>
      </div>
    </div>
  );
}
