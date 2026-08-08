import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { TodaySky } from "@/components/astro/today-sky";
import { Alert } from "@/components/ui/card";

export const dynamic = "force-dynamic"; // the sky changes continuously

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/astrology/today",
    title: t(M.todaySky, locale),
    description: t(M.todaySkyIntro, locale),
  });
}

export default async function TodaySkyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <a href={`/${lo}/astrology`} className="hover:underline">{t(M.navAstrology, lo)}</a>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{t(M.todaySky, lo)}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.todaySky, lo)}</h1>
      <p className="mt-2 max-w-2xl text-[var(--fg-muted)]">{t(M.todaySkyIntro, lo)}</p>
      <div className="mt-8">
        <TodaySky locale={lo} />
      </div>
      <Alert tone="info" className="mt-8">
        {t(M.disclaimerGeneral, lo)}
      </Alert>
    </div>
  );
}
