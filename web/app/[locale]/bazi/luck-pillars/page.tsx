import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { t, M } from "@/lib/i18n/messages";
import { Alert } from "@/components/ui/card";

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
    path: "/bazi/luck-pillars",
    title: lo === "zh" ? "大运：十年一转的人生篇章" : "Luck Pillars (Da Yun 大运)",
    description:
      lo === "zh"
        ? "认识大运：十年一柱的推移、顺排逆排的传统规则、起运岁数如何由节气距离算出，以及换运可能是什么感觉。"
        : "How BaZi luck pillars work: the ten-year cycles, the traditional forward/backward direction rule, how the onset age is derived from solar-term distance, and what a pillar shift may feel like.",
  });
}

const DIRECTION_ROWS = [
  {
    stem: { en: "Yang year stem (甲丙戊庚壬)", zh: "阳年干（甲丙戊庚壬）" },
    sex: { en: "Male", zh: "男" },
    dir: { en: "Forward", zh: "顺排" },
  },
  {
    stem: { en: "Yin year stem (乙丁己辛癸)", zh: "阴年干（乙丁己辛癸）" },
    sex: { en: "Female", zh: "女" },
    dir: { en: "Forward", zh: "顺排" },
  },
  {
    stem: { en: "Yang year stem (甲丙戊庚壬)", zh: "阳年干（甲丙戊庚壬）" },
    sex: { en: "Female", zh: "女" },
    dir: { en: "Backward", zh: "逆排" },
  },
  {
    stem: { en: "Yin year stem (乙丁己辛癸)", zh: "阴年干（乙丁己辛癸）" },
    sex: { en: "Male", zh: "男" },
    dir: { en: "Backward", zh: "逆排" },
  },
];

export default async function LuckPillarsPage({
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
          <li aria-current="page">{t(M.baziLuckPillars, lo)}</li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        {lo === "zh" ? "大运：十年一柱的推移" : "Luck Pillars 大运"}
      </h1>
      <p className="mt-4 leading-relaxed">
        {lo === "zh"
          ? "本命四柱描述出生的那一刻，大运则描述此后的岁月。传统方法从月柱出发，沿六十甲子的次序一柱一柱推移，每柱掌管约十年——像一部书的章节：底色不变，主题更替。解读时，大运的干支会与原局相互参照，看它扶起了什么、约束了什么。"
          : "The natal four pillars describe the moment of birth; luck pillars describe the decades after it. The traditional method starts from the month pillar and steps through the sexagenary cycle one pillar at a time, each governing roughly ten years — like chapters of a book: the underlying voice stays, the theme turns. In reading, each luck pillar is weighed against the natal chart to see what it supports and what it restrains."}
      </p>

      <section className="mt-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {lo === "zh" ? "顺排还是逆排：方向规则" : "Forward or backward: the direction rule"}
        </h2>
        <p className="mt-3 leading-relaxed">
          {lo === "zh"
            ? "推移的方向由两个因素决定：出生性别，与年柱天干的阴阳。阳年出生的男性与阴年出生的女性顺排（沿甲子次序向前）；阳年出生的女性与阴年出生的男性逆排（向后）。这是子平传统的既定规则——本站按原样实现并如实说明，不对其作现代性别观念的引申。"
            : "The direction is set by two factors: sex at birth, and the polarity of the year stem. A male born in a yang year, or a female born in a yin year, runs forward through the cycle; a female born in a yang year, or a male born in a yin year, runs backward. This is the received Ziping rule — we implement it as the tradition states it, and describe it plainly rather than reinterpreting it."}
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)]">
          <table className="w-full min-w-[28rem] border-collapse bg-[var(--bg-raised)] text-sm">
            <caption className="sr-only">
              {lo === "zh" ? "大运方向规则一览" : "The luck-pillar direction rule"}
            </caption>
            <thead>
              <tr className="border-b border-[var(--line)] text-[var(--fg-muted)]">
                <th scope="col" className={th}>
                  {lo === "zh" ? "年柱天干" : "Year stem"}
                </th>
                <th scope="col" className={th}>
                  {lo === "zh" ? "出生性别" : "Sex at birth"}
                </th>
                <th scope="col" className={th}>
                  {lo === "zh" ? "方向" : "Direction"}
                </th>
              </tr>
            </thead>
            <tbody>
              {DIRECTION_ROWS.map((r, i) => (
                <tr key={i} className="border-b border-[var(--line)] last:border-b-0">
                  <td className={td}>{r.stem[lo]}</td>
                  <td className={td}>{r.sex[lo]}</td>
                  <td className={td}>{r.dir[lo]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {lo === "zh" ? "几岁起运：节气距离" : "The onset age: distance to a solar term"}
        </h2>
        <p className="mt-3 leading-relaxed">
          {lo === "zh"
            ? "第一柱大运从几岁开始，由出生时刻到节气（节，而非中气）的距离换算而来：顺排数到出生后的下一个节，逆排数到出生前的上一个节。传统换算是三天折一岁——即一天约合四个月。因此起运岁数因人而异，多在一岁到十岁之间；在此之前的童年，传统上依本命盘与流年来读。"
            : "When the first pillar begins is converted from the distance between the birth moment and a solar term (a jie 节, the month-opening term): counting forward to the next term for forward-running charts, backward to the previous term otherwise. The traditional conversion is three days to one year of age — about four months per day. Onset ages therefore differ from person to person, commonly landing between one and ten; the years before onset are traditionally read from the natal chart and the annual pillars."}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {lo === "zh" ? "换运可能是什么感觉" : "What a pillar shift may feel like"}
        </h2>
        <p className="mt-3 leading-relaxed">
          {lo === "zh"
            ? "传统上，换运被读作人生主题的更替：新的一柱带来新的五行与十神组合，原局中某些部分像是被调亮，另一些被调暗。你不妨把它当作季节的转换来体会——不是命运在某个生日突然改写，而是同一片土地迎来不同的天气。有人在回望时发现，兴趣、处境或用力的方向恰好在那几年悄悄转了向；也有人几乎没有感觉。两种经验都真实。"
            : "Traditionally, a pillar change is read as a turning of life's theme: the incoming pillar brings a new pairing of element and Ten God, and parts of the natal chart seem turned up while others dim. It may help to hold it the way you hold a change of season — not fate rewriting itself on a birthday, but different weather arriving over the same land. Some people, looking back, notice that their interests or circumstances quietly changed course around those years; others feel nothing much at all. Both experiences are real."}
        </p>
        <p className="mt-3 leading-relaxed text-[var(--fg-muted)]">
          {lo === "zh"
            ? "无论哪种读法，大运描述的都是可能的主题，而不是既定的事件。它不预告吉凶，也不替你做任何决定。"
            : "However it is read, a luck pillar describes possible themes, never scheduled events. It forecasts no fortunes and makes no decisions for you."}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {lo === "zh" ? "如果不知道出生时间" : "If you do not know your birth time"}
        </h2>
        <div className="mt-3">
          <Alert>
            {lo === "zh"
              ? "大运的次序与方向来自月柱和年干，不需要时辰；但起运岁数取决于出生时刻到节气的精确距离——按三天折一岁计算，一天的不确定就意味着约四个月的偏差。若出生日期恰好紧邻节气，连月柱本身都可能随具体时刻改变。缺少出生时间时，本站会如实标注这些不确定，而不是替你猜一个。"
              : "The sequence and direction of the pillars come from the month pillar and year stem — no birth hour needed. But the onset age depends on the exact distance from birth to a solar term: at three days per year, one day of uncertainty means roughly four months of blur. And a birth date right beside a term can shift the month pillar itself with the exact minute. Without a birth time, we label these uncertainties honestly instead of guessing for you."}
          </Alert>
        </div>
      </section>

      <div className="mt-10">
        <Link
          href={`/${lo}/bazi/calculator`}
          className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {lo === "zh" ? "排出你的大运" : "Calculate your luck pillars"}
        </Link>
      </div>
    </div>
  );
}
