import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, type Locale } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { t, M } from "@/lib/i18n/messages";
import { Alert } from "@/components/ui/card";
import { BAZI_METHODOLOGY_VERSION } from "@/lib/providers/bazi";
import { ASTROLOGY_METHODOLOGY_VERSION } from "@/lib/providers/astrology";

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
    path: "/bazi/methodology",
    title: lo === "zh" ? "计算方法：引擎、边界与诚实的取舍" : "Methodology: Engines, Boundaries, and Honest Trade-offs",
    description:
      lo === "zh"
        ? "本站排盘的具体规则：lunar-javascript 与 astronomy-engine 的版本、节气月界、本地时钟、子时处理、大运方向、交界提醒，以及 v1 不使用真太阳时的说明。"
        : "The concrete rules behind every chart: engine versions (lunar-javascript, astronomy-engine), solar-term month boundaries, local birth clock, Zi-hour handling, luck direction, boundary warnings, and why v1 does not apply true solar time.",
  });
}

interface PolicyRow {
  term: { en: string; zh: string };
  def: { en: string; zh: string };
}

const BAZI_ROWS: PolicyRow[] = [
  {
    term: { en: "Calculation engine", zh: "计算引擎" },
    def: {
      en: `lunar-javascript v1.7.7 (methodology version ${BAZI_METHODOLOGY_VERSION}), verified against documented reference dates.`,
      zh: `lunar-javascript v1.7.7（方法版本 ${BAZI_METHODOLOGY_VERSION}），已对照文献参考日期验证。`,
    },
  },
  {
    term: { en: "Month boundaries", zh: "月柱分界" },
    def: {
      en: "Month pillars change at the twelve month-opening solar terms (节 jie) — not at Lunar New Year months and not at Gregorian months. The sexagenary year follows the same convention, turning at Lichun (立春) in early February.",
      zh: "月柱以十二节（节气中的“节”，而非“中气”）为界更替——不按农历月份，也不按公历月份。干支年遵循同一惯例，以二月初的立春为岁首。",
    },
  },
  {
    term: { en: "Birth clock", zh: "排盘时刻" },
    def: {
      en: "Pillars are computed from the local birth clock — the civil standard time at the birth place, converted with the historical timezone database. What the clock on the wall said is what the chart uses.",
      zh: "四柱依本地出生时钟计算——即出生地的民用标准时间，经历史时区数据库换算。墙上时钟显示的时间，就是命盘使用的时间。",
    },
  },
  {
    term: { en: "Zi hour (23:00–00:59)", zh: "子时（23:00–00:59）" },
    def: {
      en: "The day boundary within the Zi hour follows the engine's documented convention (lunar-javascript). Schools differ on births between 23:00 and midnight (the late-Zi question); we apply the engine convention consistently and recommend extra care for births in that window.",
      zh: "子时之内的日界处理遵循引擎（lunar-javascript）的既定惯例。对于 23:00 至午夜之间的出生（“夜子时”问题），各流派处理不一；本站统一采用引擎惯例，并建议这一时间段出生的命盘多加斟酌。",
    },
  },
  {
    term: { en: "Luck-pillar direction", zh: "大运方向" },
    def: {
      en: "Forward or backward per the traditional rule: sex at birth combined with the year-stem's polarity (yang-year male and yin-year female run forward; otherwise backward). Without the sex input, luck pillars are omitted rather than guessed.",
      zh: "顺逆按传统规则判定：出生性别结合年干阴阳（阳年男、阴年女顺排，其余逆排）。未提供性别时，大运直接省略，而不是代为假定。",
    },
  },
  {
    term: { en: "Solar-term boundary warning", zh: "节气交界提醒" },
    def: {
      en: "Births within ±24 hours of a solar term are flagged with a visible warning, because the exact minute can change the month (or year) pillar. Boundary charts are never silently resolved one way or the other.",
      zh: "出生时间在节气前后 24 小时以内的命盘会附带明确提醒——精确到分钟的时刻可能改变月柱（甚至年柱）的归属。交界命盘绝不会被悄悄归入某一边。",
    },
  },
  {
    term: { en: "True solar time", zh: "真太阳时" },
    def: {
      en: "Not applied in v1 — stated here plainly. Some practitioners convert the birth clock to apparent solar time (adjusting for longitude and the equation of time) before assigning the hour pillar; we currently do not. For births near a two-hour (时辰) boundary, this choice can change the hour pillar, and such charts deserve review by a professional you trust.",
      zh: "v1 版本不使用真太阳时——在此如实说明。部分命理师会先把出生钟表时间换算为视太阳时（按经度与均时差修正）再定时柱；本站目前不作此换算。对于出生在时辰交界附近的人，这一取舍可能改变时柱，此类命盘值得请你信任的专业人士复核。",
    },
  },
];

const ASTRO_ROWS: PolicyRow[] = [
  {
    term: { en: "Calculation engine", zh: "计算引擎" },
    def: {
      en: `astronomy-engine v2.1.19 (methodology version ${ASTROLOGY_METHODOLOGY_VERSION}), verified against equinox and solstice geometry.`,
      zh: `astronomy-engine v2.1.19（方法版本 ${ASTROLOGY_METHODOLOGY_VERSION}），已对照二分二至的几何位置验证。`,
    },
  },
  {
    term: { en: "Zodiac", zh: "黄道坐标" },
    def: {
      en: "Tropical zodiac: signs are anchored to the seasons (0° Aries at the March equinox), the convention of Western astrology. We do not use the sidereal zodiac, so placements may differ from Vedic charts.",
      zh: "回归黄道：星座以季节为锚（春分点为白羊座 0°），即西方占星的通行惯例。本站不使用恒星黄道，因此落座可能与印度占星的结果不同。",
    },
  },
  {
    term: { en: "Planetary positions", zh: "行星位置" },
    def: {
      en: "Geocentric positions computed on the true ecliptic of date — the actual ecliptic of the birth moment, including nutation — rather than a fixed reference frame.",
      zh: "以地心视角、按“当日真黄道”计算——即出生时刻真实的黄道（含章动修正），而非固定参考系。",
    },
  },
  {
    term: { en: "Houses", zh: "宫位制" },
    def: {
      en: "Whole-sign houses: the rising sign is the first house in its entirety, the next sign the second, and so on. Without an exact birth time, no Ascendant or houses are computed at all.",
      zh: "整宫制：上升星座整个作为第一宫，下一星座为第二宫，依次类推。缺少确切出生时间时，上升与宫位一律不予计算。",
    },
  },
  {
    term: { en: "Ascendant", zh: "上升点" },
    def: {
      en: "Computed with the standard formula from Jean Meeus's Astronomical Algorithms, using local sidereal time, geographic latitude, and the obliquity of date.",
      zh: "按 Jean Meeus《天文算法》中的标准公式计算，输入为地方恒星时、地理纬度与当日黄赤交角。",
    },
  },
];

function PolicyList({ rows, lo }: { rows: PolicyRow[]; lo: Locale }) {
  return (
    <dl className="mt-4 divide-y divide-[var(--line)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)]">
      {rows.map((r) => (
        <div key={r.term.en} className="grid gap-1 px-5 py-4 sm:grid-cols-[190px_1fr] sm:gap-4">
          <dt className="text-sm font-medium">{r.term[lo]}</dt>
          <dd className="text-sm leading-relaxed text-[var(--fg-muted)]">{r.def[lo]}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: lo } = await params;
  if (!isLocale(lo)) notFound();

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
          <li aria-current="page">{t(M.baziMethodology, lo)}</li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        {lo === "zh" ? "计算方法" : "Methodology"}
      </h1>
      <p className="mt-4 leading-relaxed">
        {lo === "zh"
          ? "每一张牌、每一度、每一柱都由确定性引擎计算：相同的输入永远得到相同的结果，AI 从不参与计算。这一页列出排盘所依据的具体规则——包括我们做了什么，也包括 v1 版本诚实地没有做什么。每份结果的“计算信息”面板都会标注所用引擎与版本。"
          : "Every card, degree, and pillar is computed by deterministic engines: the same inputs always produce the same result, and AI plays no part in calculation. This page lists the concrete rules the charts rest on — both what we do and, just as honestly, what v1 does not do. Each result's calculation-details panel names the engine and version used."}
      </p>

      <section className="mt-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {lo === "zh" ? "八字（四柱）" : "BaZi (Four Pillars)"}
        </h2>
        <PolicyList rows={BAZI_ROWS} lo={lo} />
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {lo === "zh" ? "西方占星" : "Western astrology"}
        </h2>
        <PolicyList rows={ASTRO_ROWS} lo={lo} />
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          {lo === "zh" ? "为什么把这些写出来" : "Why we publish this"}
        </h2>
        <p className="mt-3 leading-relaxed">
          {lo === "zh"
            ? "排盘的每一条规则都是一次取舍，而不同的取舍会得到不同的盘。把规则写明，你才能核对我们的结果、与其他排盘工具比较差异，或者带着完整的信息去请教命理师。如果你发现任何与这些规则不符的计算结果，请告诉我们。"
            : "Every charting rule is a choice, and different choices produce different charts. Publishing ours means you can verify our results, understand why another tool may differ, or bring complete information to a practitioner you consult. If you ever find a calculation that contradicts these rules, please tell us."}
        </p>
      </section>

      <div className="mt-10">
        <Alert>{t(M.disclaimerGeneral, lo)}</Alert>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/${lo}/bazi/calculator`}
          className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {t(M.baziCalculator, lo)}
        </Link>
        <Link
          href={`/${lo}/astrology/birth-chart`}
          className="inline-flex items-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          {t(M.astroBirthChart, lo)}
        </Link>
      </div>
    </div>
  );
}
