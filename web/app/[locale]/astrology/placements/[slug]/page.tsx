import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { t, M } from "@/lib/i18n/messages";
import { SUN_PLACEMENTS } from "@/content/sun-placements";
import { Alert, Badge } from "@/components/ui/card";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => SUN_PLACEMENTS.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: lo, slug } = await params;
  if (!isLocale(lo)) return {};
  const p = SUN_PLACEMENTS.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata({
    locale: lo,
    path: `/astrology/placements/${p.slug}`,
    title: p.title[lo],
    description:
      lo === "zh"
        ? `太阳落在${p.sign_zh}可能意味着什么：核心倾向、优势所在、可能的摩擦，以及一个值得琢磨的反思提问。`
        : `What the Sun in ${p.sign} may suggest: core tendencies, strengths, likely frictions, and one reflection question worth sitting with.`,
  });
}

export default async function PlacementPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: lo, slug } = await params;
  if (!isLocale(lo)) notFound();
  const idx = SUN_PLACEMENTS.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const p = SUN_PLACEMENTS[idx];
  const prev = SUN_PLACEMENTS[(idx + SUN_PLACEMENTS.length - 1) % SUN_PLACEMENTS.length];
  const next = SUN_PLACEMENTS[(idx + 1) % SUN_PLACEMENTS.length];

  const signLabel = (s: (typeof SUN_PLACEMENTS)[number]) =>
    lo === "zh" ? `太阳${s.sign_zh}` : `Sun in ${s.sign}`;

  const sections = [
    { heading: lo === "zh" ? "总览" : "Overview", body: p.overview[lo] },
    { heading: lo === "zh" ? "优势所在" : "Strengths", body: p.strengths[lo] },
    { heading: lo === "zh" ? "可能的摩擦" : "Where friction may appear", body: p.frictions[lo] },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={`/${lo}/astrology`} className="hover:text-[var(--fg)] hover:underline">
              {t(M.navAstrology, lo)}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{signLabel(p)}</li>
        </ol>
      </nav>

      <Badge>{lo === "zh" ? `${p.sign_zh} · ${p.sign}` : `${p.sign} · ${p.sign_zh}`}</Badge>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        {p.title[lo]}
      </h1>

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
          <p className="mt-1">{p.reflection[lo]}</p>
        </Alert>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-[var(--fg-muted)]">
        {lo === "zh"
          ? "太阳只是星盘的一部分：月亮、上升与其他行星共同构成完整的图景。"
          : "The Sun is one part of the picture: the Moon, Ascendant, and other planets round out the full chart."}
      </p>

      <div className="mt-4">
        <Link
          href={`/${lo}/astrology/birth-chart`}
          className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {lo === "zh" ? "排出你的完整星盘" : "Calculate your full chart"}
        </Link>
      </div>

      <nav
        aria-label={lo === "zh" ? "相邻星座" : "Adjacent signs"}
        className="mt-12 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-6 text-sm"
      >
        <Link
          href={`/${lo}/astrology/placements/${prev.slug}`}
          className="text-[var(--accent)] hover:underline"
        >
          <span aria-hidden="true">← </span>
          {signLabel(prev)}
        </Link>
        <Link
          href={`/${lo}/astrology/placements/${next.slug}`}
          className="text-right text-[var(--accent)] hover:underline"
        >
          {signLabel(next)}
          <span aria-hidden="true"> →</span>
        </Link>
      </nav>
    </div>
  );
}
