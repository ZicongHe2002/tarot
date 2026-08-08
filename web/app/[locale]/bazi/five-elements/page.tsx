import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, type Locale } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { t, M } from "@/lib/i18n/messages";
import { Card } from "@/components/ui/card";

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
    path: "/bazi/five-elements",
    title: lo === "zh" ? "五行：木火土金水与相生相克" : "The Five Elements (Wuxing 五行)",
    description:
      lo === "zh"
        ? "认识五行：木、火、土、金、水五种运动状态，相生与相克两个循环，以及它们如何出现在八字的天干地支之中。"
        : "An introduction to Wuxing: the five phases of Wood, Fire, Earth, Metal, and Water, the generation and control cycles, and how the elements appear in a BaZi chart.",
  });
}

const ELEMENTS = [
  {
    key: "wood",
    en: "Wood",
    zh: "木",
    phase: { en: "Rising, expanding, beginning", zh: "生发、伸展、开始" },
    season: { en: "Spring", zh: "春" },
  },
  {
    key: "fire",
    en: "Fire",
    zh: "火",
    phase: { en: "Flourishing, full expression", zh: "升腾、绽放、外显" },
    season: { en: "Summer", zh: "夏" },
  },
  {
    key: "earth",
    en: "Earth",
    zh: "土",
    phase: { en: "Centering, holding, transforming", zh: "承载、居中、转化" },
    season: { en: "Late summer", zh: "长夏" },
  },
  {
    key: "metal",
    en: "Metal",
    zh: "金",
    phase: { en: "Contracting, refining, finishing", zh: "收敛、精炼、收尾" },
    season: { en: "Autumn", zh: "秋" },
  },
  {
    key: "water",
    en: "Water",
    zh: "水",
    phase: { en: "Sinking, storing, resting", zh: "沉潜、蓄养、休息" },
    season: { en: "Winter", zh: "冬" },
  },
] as const;

const GENERATION = [
  { en: "Wood generates Fire", zh: "木生火", image: { en: "kindling feeds a flame", zh: "柴薪助燃" } },
  { en: "Fire generates Earth", zh: "火生土", image: { en: "ash settles into soil", zh: "灰烬归土" } },
  { en: "Earth generates Metal", zh: "土生金", image: { en: "ore forms in the ground", zh: "土中藏金" } },
  { en: "Metal generates Water", zh: "金生水", image: { en: "dew condenses on metal", zh: "金面凝露" } },
  { en: "Water generates Wood", zh: "水生木", image: { en: "rain grows the forest", zh: "雨润林木" } },
];

const CONTROL = [
  { en: "Wood controls Earth", zh: "木克土", image: { en: "roots split the soil", zh: "根系破土" } },
  { en: "Earth controls Water", zh: "土克水", image: { en: "a dam holds the river", zh: "堤坝拦水" } },
  { en: "Water controls Fire", zh: "水克火", image: { en: "water quenches flame", zh: "水能灭火" } },
  { en: "Fire controls Metal", zh: "火克金", image: { en: "fire melts metal", zh: "烈火熔金" } },
  { en: "Metal controls Wood", zh: "金克木", image: { en: "the axe fells the tree", zh: "斧斤伐木" } },
];

const STEM_BRANCH_ROWS = [
  { el: "wood", yang: "甲 Jia", yin: "乙 Yi", branches: "寅 卯" },
  { el: "fire", yang: "丙 Bing", yin: "丁 Ding", branches: "巳 午" },
  { el: "earth", yang: "戊 Wu", yin: "己 Ji", branches: "辰 戌 丑 未" },
  { el: "metal", yang: "庚 Geng", yin: "辛 Xin", branches: "申 酉" },
  { el: "water", yang: "壬 Ren", yin: "癸 Gui", branches: "亥 子" },
];

function CycleDiagram({ lo }: { lo: Locale }) {
  // Pentagon layout: Wood top, then clockwise Fire, Earth, Metal, Water.
  const nodes = [
    { key: "wood", zh: "木", en: "Wood", cx: 210, cy: 80, label: [210, 36] },
    { key: "fire", zh: "火", en: "Fire", cx: 353, cy: 184, label: [353, 140] },
    { key: "earth", zh: "土", en: "Earth", cx: 298, cy: 351, label: [298, 403] },
    { key: "metal", zh: "金", en: "Metal", cx: 122, cy: 351, label: [122, 403] },
    { key: "water", zh: "水", en: "Water", cx: 67, cy: 184, label: [67, 140] },
  ] as const;
  const gen = [
    "M242,104 L316,157",
    "M340,222 L312,307",
    "M258,351 L168,351",
    "M110,313 L81,228",
    "M99,160 L173,107",
  ];
  const ctl = [
    "M222,118 L284,307",
    "M266,328 L104,211",
    "M107,184 L307,184",
    "M321,207 L159,324",
    "M134,313 L196,124",
  ];
  return (
    <svg
      viewBox="0 0 420 416"
      role="img"
      aria-label={
        lo === "zh"
          ? "五行循环示意图：外圈实线箭头表示相生（木生火、火生土、土生金、金生水、水生木）；内部虚线箭头表示相克（木克土、土克水、水克火、火克金、金克木）。下方表格提供相同信息。"
          : "Diagram of the five-element cycles: solid arrows around the outside show the generation cycle (Wood to Fire to Earth to Metal to Water and back to Wood); dashed arrows across the middle show the control cycle (Wood controls Earth, Earth controls Water, Water controls Fire, Fire controls Metal, Metal controls Wood). The same information appears in the table below."
      }
      className="mx-auto mt-2 w-full max-w-md"
    >
      <defs>
        <marker
          id="arrowGen"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fg-muted)" />
        </marker>
        <marker
          id="arrowCtl"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fg-muted)" />
        </marker>
      </defs>
      {gen.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="var(--fg-muted)"
          strokeWidth="2.25"
          markerEnd="url(#arrowGen)"
        />
      ))}
      {ctl.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="var(--fg-muted)"
          strokeWidth="1.75"
          strokeDasharray="7 6"
          markerEnd="url(#arrowCtl)"
        />
      ))}
      {nodes.map((n) => (
        <g key={n.key}>
          <circle cx={n.cx} cy={n.cy} r="34" fill={`var(--color-el-${n.key})`} />
          <text
            x={n.cx}
            y={n.cy + 11}
            textAnchor="middle"
            fontSize="30"
            fontWeight="600"
            fill="#ffffff"
            className="font-display"
          >
            {n.zh}
          </text>
          <text
            x={n.label[0]}
            y={n.label[1]}
            textAnchor="middle"
            fontSize="14"
            fontWeight="500"
            fill="currentColor"
          >
            {n.en} {n.zh}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default async function FiveElementsPage({
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
          <li aria-current="page">{t(M.baziFiveElements, lo)}</li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        {lo === "zh" ? "五行：木、火、土、金、水" : "The Five Elements 五行"}
      </h1>
      <p className="mt-4 leading-relaxed">
        {lo === "zh"
          ? "“五行”的“行”是运行的行：与其说是五种物质，不如说是能量运动的五种状态。木生发，火绽放，土承载，金收敛，水沉潜。古人用这五种状态编织出一张对应之网——季节、方位、颜色、身体——而八字命盘，正是用它来描述一个人出生时刻的元素格局。"
          : "The xing in wuxing (五行) means to move: these are less five substances than five phases of movement. Wood rises, Fire flourishes, Earth centers, Metal contracts, Water sinks and stores. Classical Chinese thought wove these phases into a web of correspondences — seasons, directions, colors, the body — and a BaZi chart uses them to describe the elemental pattern of a birth moment."}
      </p>

      <section className="mt-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {lo === "zh" ? "五种状态" : "The five phases"}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {ELEMENTS.map((el) => (
            <li key={el.key}>
              <Card className="flex h-full items-start gap-3 p-4">
                <span
                  aria-hidden="true"
                  className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full"
                  style={{ background: `var(--color-el-${el.key})` }}
                />
                <div className="text-sm">
                  <p className="font-medium">
                    {el.en} {el.zh}
                    <span className="ml-2 font-normal text-[var(--fg-muted)]">
                      {lo === "zh" ? `季节：${el.season.zh}` : el.season.en}
                    </span>
                  </p>
                  <p className="mt-1 leading-relaxed text-[var(--fg-muted)]">{el.phase[lo]}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-[var(--fg-muted)]">
          {lo === "zh"
            ? "色块仅为辅助标识——本站中颜色从不作为唯一的信息载体。"
            : "The color swatches are a visual aid only — color is never the only signal used on this site."}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {lo === "zh" ? "两个循环：相生与相克" : "Two cycles: generation and control"}
        </h2>
        <p className="mt-3 leading-relaxed">
          {lo === "zh"
            ? "相生（实线）描述滋养的次序：每一行养育下一行。相克（虚线）描述约束的次序：每一行节制另一行。两个循环没有好坏之分——只生不克会泛滥，只克不生会枯竭。五行的平衡是动态的，更像一个生态系统，而不是一架静止的天平。"
            : "The generation cycle 相生 (solid arrows) describes how each phase feeds the next; the control cycle 相克 (dashed arrows) describes how each phase restrains another. Neither cycle is the good one — generation without control floods, control without generation starves. Balance here is dynamic, closer to an ecosystem than to a set of scales at rest."}
        </p>

        <figure className="mt-4">
          <CycleDiagram lo={lo} />
          <figcaption className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--fg-muted)]">
            <span className="inline-flex items-center gap-2">
              <svg width="32" height="10" aria-hidden="true">
                <line x1="0" y1="5" x2="32" y2="5" stroke="currentColor" strokeWidth="2.25" />
              </svg>
              {lo === "zh" ? "相生（滋养）" : "Generation 相生 (nourishes)"}
            </span>
            <span className="inline-flex items-center gap-2">
              <svg width="32" height="10" aria-hidden="true">
                <line
                  x1="0"
                  y1="5"
                  x2="32"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeDasharray="6 5"
                />
              </svg>
              {lo === "zh" ? "相克（约束）" : "Control 相克 (restrains)"}
            </span>
          </figcaption>
        </figure>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--line)]">
          <table className="w-full min-w-[26rem] border-collapse bg-[var(--bg-raised)] text-sm">
            <caption className="sr-only">
              {lo === "zh"
                ? "五行相生与相克关系一览（图示的文字版本）"
                : "The generation and control relationships in full (text version of the diagram)"}
            </caption>
            <thead>
              <tr className="border-b border-[var(--line)] text-[var(--fg-muted)]">
                <th scope="col" className={th}>
                  {lo === "zh" ? "循环" : "Cycle"}
                </th>
                <th scope="col" className={th}>
                  {lo === "zh" ? "关系" : "Relationship"}
                </th>
                <th scope="col" className={th}>
                  {lo === "zh" ? "传统意象" : "Traditional image"}
                </th>
              </tr>
            </thead>
            <tbody>
              {GENERATION.map((r) => (
                <tr key={r.zh} className="border-b border-[var(--line)] last:border-b-0">
                  <td className={td}>{lo === "zh" ? "相生" : "Generation 相生"}</td>
                  <td className={td}>
                    {lo === "zh" ? `${r.zh}（${r.en}）` : `${r.en} (${r.zh})`}
                  </td>
                  <td className={`${td} text-[var(--fg-muted)]`}>{r.image[lo]}</td>
                </tr>
              ))}
              {CONTROL.map((r) => (
                <tr key={r.zh} className="border-b border-[var(--line)] last:border-b-0">
                  <td className={td}>{lo === "zh" ? "相克" : "Control 相克"}</td>
                  <td className={td}>
                    {lo === "zh" ? `${r.zh}（${r.en}）` : `${r.en} (${r.zh})`}
                  </td>
                  <td className={`${td} text-[var(--fg-muted)]`}>{r.image[lo]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {lo === "zh" ? "五行如何出现在八字里" : "How the elements appear in a BaZi chart"}
        </h2>
        <p className="mt-3 leading-relaxed">
          {lo === "zh"
            ? "八字的八个字，每一个都携带五行属性。十个天干把五行分成阴阳两面；十二个地支也各有归属，其中辰、戌、丑、未四个土支还藏有其他天干（地支藏干）。命盘的五行分布，就是把这八个字（连同藏干）逐一清点后得到的图景。"
            : "Every one of the eight characters in a BaZi chart carries an element. The ten Heavenly Stems express each element in a yang and a yin form; the twelve Earthly Branches have their own assignments, and the four Earth branches (辰 戌 丑 未) additionally store hidden stems. A chart's elemental balance is simply the tally of all eight characters — hidden stems included."}
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)]">
          <table className="w-full min-w-[28rem] border-collapse bg-[var(--bg-raised)] text-sm">
            <caption className="sr-only">
              {lo === "zh" ? "五行与天干地支对应表" : "Elements mapped to Heavenly Stems and Earthly Branches"}
            </caption>
            <thead>
              <tr className="border-b border-[var(--line)] text-[var(--fg-muted)]">
                <th scope="col" className={th}>
                  {lo === "zh" ? "五行" : "Element"}
                </th>
                <th scope="col" className={th}>
                  {lo === "zh" ? "阳干" : "Yang stem"}
                </th>
                <th scope="col" className={th}>
                  {lo === "zh" ? "阴干" : "Yin stem"}
                </th>
                <th scope="col" className={th}>
                  {lo === "zh" ? "地支" : "Branches"}
                </th>
              </tr>
            </thead>
            <tbody>
              {STEM_BRANCH_ROWS.map((row) => {
                const el = ELEMENTS.find((e) => e.key === row.el)!;
                return (
                  <tr key={row.el} className="border-b border-[var(--line)] last:border-b-0">
                    <th scope="row" className={`${th} font-medium`}>
                      <span className="inline-flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: `var(--color-el-${row.el})` }}
                        />
                        {el.en} {el.zh}
                      </span>
                    </th>
                    <td className={td}>{row.yang}</td>
                    <td className={td}>{row.yin}</td>
                    <td className={td}>{row.branches}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {lo === "zh" ? "在日常生活里" : "In daily life"}
        </h2>
        <p className="mt-3 leading-relaxed">
          {lo === "zh"
            ? "不必先学会排盘，也能用五行观察一周的生活：开始新事的早晨带着木的气息，上台表达的午后是火，安顿身心的例行之事属于土，删减与收尾属于金，休息与独处则把你交还给水。觉察本身就有意义——不存在“正确的配比”，只有对自己节奏的更清楚的看见。"
            : "You can use the five phases as a lens long before you cast a chart: the morning you start something new has a Wood feeling, an afternoon of presenting is Fire, steadying routines belong to Earth, editing and finishing to Metal, and rest returns you to Water. The noticing itself is the point — there is no correct distribution, only a clearer view of your own rhythm."}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
          {lo === "zh" ? (
            <>
              想读得更细，可以看这篇：
              <Link
                href={`/${lo}/learn/five-elements-in-daily-life`}
                className="text-[var(--accent)] hover:underline"
              >
                《日常生活中的五行》
              </Link>
              。
            </>
          ) : (
            <>
              For a longer, gentler walk through this idea, read{" "}
              <Link
                href={`/${lo}/learn/five-elements-in-daily-life`}
                className="text-[var(--accent)] hover:underline"
              >
                The Five Elements in Daily Life
              </Link>
              .
            </>
          )}
        </p>
      </section>

      <div className="mt-10">
        <Link
          href={`/${lo}/bazi/calculator`}
          className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {lo === "zh" ? "查看你自己的五行分布" : "See your own five-element balance"}
        </Link>
      </div>
    </div>
  );
}
