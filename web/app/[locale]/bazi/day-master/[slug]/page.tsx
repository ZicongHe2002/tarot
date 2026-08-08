import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { t, M } from "@/lib/i18n/messages";
import { DAY_MASTERS } from "@/content/day-masters";
import { Alert, Badge } from "@/components/ui/card";

const ELEMENT_ZH: Record<string, string> = {
  Wood: "木",
  Fire: "火",
  Earth: "土",
  Metal: "金",
  Water: "水",
};

const POLARITY_ZH: Record<string, string> = { Yang: "阳", Yin: "阴" };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => DAY_MASTERS.map((d) => ({ locale, slug: d.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: lo, slug } = await params;
  if (!isLocale(lo)) return {};
  const d = DAY_MASTERS.find((x) => x.slug === slug);
  if (!d) return {};
  return pageMetadata({
    locale: lo,
    path: `/bazi/day-master/${d.slug}`,
    title: d.title[lo],
    description:
      lo === "zh"
        ? `${d.stem_zh}${ELEMENT_ZH[d.element]}日主的传统意象、优势与值得留意之处，以及一个反思提问。仅供反思与文化探索。`
        : `The traditional imagery of the ${d.stem} ${d.element} Day Master (${d.stem_zh}), its strengths and gentle watch-outs, plus one reflection question. For reflection and cultural exploration.`,
  });
}

export default async function DayMasterPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: lo, slug } = await params;
  if (!isLocale(lo)) notFound();
  const d = DAY_MASTERS.find((x) => x.slug === slug);
  if (!d) notFound();

  const elementVar = `var(--color-el-${d.element.toLowerCase()})`;
  const elementLabel =
    lo === "zh"
      ? `${POLARITY_ZH[d.polarity]}${ELEMENT_ZH[d.element]}`
      : `${d.polarity} ${d.element}`;

  const sections = [
    { heading: lo === "zh" ? "意象与本质" : "Essence", body: d.essence[lo] },
    { heading: lo === "zh" ? "优势所在" : "Strengths", body: d.strengths[lo] },
    { heading: lo === "zh" ? "值得留意之处" : "Gentle watch-outs", body: d.watchouts[lo] },
  ];

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
          <li aria-current="page">{d.title[lo]}</li>
        </ol>
      </nav>

      <div className="flex items-start gap-5">
        <div
          aria-hidden="true"
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] font-display text-6xl font-semibold"
          style={{ color: elementVar }}
        >
          {d.stem_zh}
        </div>
        <div>
          <Badge>
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ background: elementVar }}
            />
            {elementLabel}
            {lo === "zh" ? ` · ${d.polarity} ${d.element}` : ` · ${POLARITY_ZH[d.polarity]}${ELEMENT_ZH[d.element]}`}
          </Badge>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            {d.title[lo]}
          </h1>
        </div>
      </div>

      {sections.map((s) => (
        <section key={s.heading} className="mt-9">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
            {s.heading}
          </h2>
          <p className="mt-3 leading-relaxed">{s.body}</p>
        </section>
      ))}

      <div className="mt-9">
        <Alert>
          <p className="font-medium">{t(M.reflectionHeading, lo)}</p>
          <p className="mt-1">{d.reflection[lo]}</p>
        </Alert>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-[var(--fg-muted)]">
        {lo === "zh"
          ? "日主只是命盘的中心，不是全部：月令、其余干支与大运共同构成完整的格局。想知道自己的日主，先排一张盘。"
          : "The Day Master is the chart's center, not its whole story: the month branch, the other characters, and the luck pillars complete the picture. To find your own Day Master, start with a chart."}
      </p>

      <div className="mt-4">
        <Link
          href={`/${lo}/bazi/calculator`}
          className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {lo === "zh" ? "排出你的八字命盘" : "Calculate your BaZi chart"}
        </Link>
      </div>
    </div>
  );
}
