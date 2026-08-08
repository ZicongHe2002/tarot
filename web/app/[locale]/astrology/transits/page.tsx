import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { TransitsFlow } from "@/components/astro/transits-flow";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/astrology/transits",
    title: t(M.astroTransits, locale),
    description:
      locale === "zh"
        ? "查看今天的行星与你本命盘形成的行运相位。"
        : "See the transit aspects today's planets form to your natal chart.",
  });
}

export default async function TransitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <a href={`/${lo}/astrology`} className="hover:underline">{t(M.navAstrology, lo)}</a>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{t(M.astroTransits, lo)}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.astroTransits, lo)}</h1>
      <div className="mt-8">
        <TransitsFlow locale={lo} />
      </div>
    </div>
  );
}
