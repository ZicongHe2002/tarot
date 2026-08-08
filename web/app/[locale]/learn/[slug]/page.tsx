import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, BRAND } from "@/lib/config";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { t, M } from "@/lib/i18n/messages";
import { ARTICLES } from "@/content/articles";
import { Badge, Card } from "@/components/ui/card";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => ARTICLES.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: lo, slug } = await params;
  if (!isLocale(lo)) return {};
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return {};
  return pageMetadata({
    locale: lo,
    path: `/learn/${a.slug}`,
    title: a.title[lo],
    description: a.description[lo],
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: lo, slug } = await params;
  if (!isLocale(lo)) notFound();
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) notFound();

  const tools = [
    { href: `/${lo}/tarot`, label: t(M.ctaDrawCard, lo) },
    { href: `/${lo}/astrology/birth-chart`, label: t(M.ctaBirthChart, lo) },
    { href: `/${lo}/bazi/calculator`, label: t(M.ctaExploreBazi, lo) },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title[lo],
            description: a.description[lo],
            inLanguage: lo === "zh" ? "zh" : "en",
            dateModified: "2026-07-16",
            author: { "@type": "Organization", name: BRAND[lo] },
          }),
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={`/${lo}/learn`} className="hover:text-[var(--fg)] hover:underline">
              {t(M.navLearn, lo)}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{a.title[lo]}</li>
        </ol>
      </nav>

      <article>
        <header>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            {a.title[lo]}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <Badge>{lo === "zh" ? `约 ${a.minutes} 分钟` : `${a.minutes} min read`}</Badge>
          </div>
          <p className="mt-4 leading-relaxed text-[var(--fg-muted)]">{a.description[lo]}</p>
        </header>

        {a.sections.map((s) => (
          <section key={s.heading.en} className="mt-10">
            <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
              {s.heading[lo]}
            </h2>
            {s.body[lo].split("\n\n").map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>

      <footer className="mt-12 border-t border-[var(--line)] pt-8">
        <h2 className="font-display text-lg font-semibold">
          {lo === "zh" ? "相关工具" : "Related tools"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
          {lo === "zh"
            ? "读完之后，不妨亲自试一试——每一项计算都是确定性的，并附有方法说明。"
            : "When you are done reading, consider trying the tools themselves — every calculation is deterministic and documented."}
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {tools.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className="group block h-full rounded-2xl">
                <Card className="h-full p-4 text-sm font-medium transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                  {tool.label}
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
