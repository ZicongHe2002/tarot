import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BIG_THREE, type BigThreeRole } from "@/lib/big-three";
import { signGlyph } from "@/lib/sky";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/astrology/big-three",
    title: t(M.bigThreeTitle, locale),
    description: t(M.bigThreeIntro, locale),
  });
}

const ROLES: Array<{ role: BigThreeRole; key: keyof typeof M }> = [
  { role: "sun", key: "bigThreeSun" },
  { role: "moon", key: "bigThreeMoon" },
  { role: "rising", key: "bigThreeRising" },
];

export default async function BigThreePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <Link href={`/${lo}/astrology`} className="hover:underline">{t(M.navAstrology, lo)}</Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{t(M.bigThreeTitle, lo)}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.bigThreeTitle, lo)}</h1>
      <p className="mt-2 max-w-2xl text-[var(--fg-muted)]">{t(M.bigThreeIntro, lo)}</p>
      <div className="mt-5">
        <Link href={`/${lo}/astrology/birth-chart`}>
          <Button>{t(M.ctaBirthChart, lo)}</Button>
        </Link>
      </div>

      {ROLES.map(({ role, key }) => (
        <section key={role} className="mt-10">
          <h2 className="font-display text-2xl font-semibold">{t(M[key] as { en: string; zh: string }, lo)}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BIG_THREE.filter((e) => e.role === role).map((e) => (
              <Card key={`${role}-${e.sign}`} className="p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-base font-semibold">
                    {lo === "zh" ? e.sign_zh : e.sign}
                  </h3>
                  <span aria-hidden className="text-lg text-[var(--fg-muted)]">{signGlyph(e.sign)}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--accent)]">{e.headline[lo]}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">{e.body[lo]}</p>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
