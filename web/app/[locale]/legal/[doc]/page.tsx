import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, type Locale } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { LEGAL_DOCS, getLegalDoc } from "@/content/legal";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => LEGAL_DOCS.map((d) => ({ locale, doc: d.slug })));
}

function formatUpdated(iso: string, lo: Locale): string {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  if (lo === "zh") return `${y}年${m}月${d}日`;
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale: lo, doc } = await params;
  if (!isLocale(lo)) return {};
  const d = getLegalDoc(doc);
  if (!d) return {};
  const lede = d.sections[0].body[lo].split("\n\n")[0];
  return pageMetadata({
    locale: lo,
    path: `/legal/${d.slug}`,
    title: d.title[lo],
    description: lede.length > 158 ? `${lede.slice(0, 155)}…` : lede,
  });
}

export default async function LegalDocPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { locale: lo, doc } = await params;
  if (!isLocale(lo)) notFound();
  const d = getLegalDoc(doc);
  if (!d) notFound();

  const others = LEGAL_DOCS.filter((x) => x.slug !== d.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={`/${lo}`} className="hover:text-[var(--fg)] hover:underline">
              {lo === "zh" ? "首页" : "Home"}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{d.title[lo]}</li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        {d.title[lo]}
      </h1>
      <p className="mt-3 text-sm text-[var(--fg-muted)]">
        {lo === "zh" ? "最后更新：" : "Last updated: "}
        <time dateTime={d.updated}>{formatUpdated(d.updated, lo)}</time>
      </p>

      {d.sections.map((s) => (
        <section key={s.heading.en} className="mt-9">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
            {s.heading[lo]}
          </h2>
          {s.body[lo].split("\n\n").map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed">
              {p}
            </p>
          ))}
        </section>
      ))}

      <footer className="mt-12 border-t border-[var(--line)] pt-6">
        <h2 className="text-sm font-medium text-[var(--fg-muted)]">
          {lo === "zh" ? "其他政策" : "Other policies"}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/${lo}/legal/${o.slug}`}
                className="text-[var(--accent)] hover:underline"
              >
                {o.title[lo]}
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
