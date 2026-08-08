import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { getDailyHoroscope, SIGN_SLUGS } from "@/lib/horoscope";
import { Alert, Badge, Card } from "@/components/ui/card";
import { SUN_PLACEMENTS } from "@/content/sun-placements";

export const dynamic = "force-dynamic"; // facts change daily

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => SIGN_SLUGS.map((sign) => ({ locale, sign })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sign: string }>;
}): Promise<Metadata> {
  const { locale, sign } = await params;
  const idx = SIGN_SLUGS.indexOf(sign);
  if (!isLocale(locale) || idx === -1) return {};
  const name = locale === "zh" ? SUN_PLACEMENTS[idx].sign_zh : SUN_PLACEMENTS[idx].sign;
  return pageMetadata({
    locale,
    path: `/horoscope/${sign}/daily`,
    title: `${name} · ${t(M.horoscopeDailyTitle, locale)}`,
    description:
      locale === "zh"
        ? `${name}今日运势：基于真实天象计算的每日反思式指引。`
        : `Today's ${name} horoscope: reflective daily guidance grounded in the real sky.`,
  });
}

export default async function HoroscopePage({
  params,
}: {
  params: Promise<{ locale: string; sign: string }>;
}) {
  const { locale, sign } = await params;
  if (!isLocale(locale) || !SIGN_SLUGS.includes(sign)) notFound();
  const lo = locale;
  const data = await getDailyHoroscope(sign, lo);
  if (!data) notFound();
  const name = lo === "zh" ? data.sign_zh : data.sign;
  const moon = data.facts.positions.find((p) => p.planet === "moon");
  const sun = data.facts.positions.find((p) => p.planet === "sun");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <Link href={`/${lo}/astrology`} className="hover:underline">{t(M.navAstrology, lo)}</Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{name}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {name} · {t(M.horoscopeDailyTitle, lo)}
      </h1>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">{data.date}</p>

      <Card className="mt-6">
        <div className="flex flex-wrap gap-2">
          {sun && <Badge tone="gold">☉ {lo === "zh" ? sun.sign_zh : sun.sign} {sun.degree_in_sign.toFixed(1)}°</Badge>}
          {moon && <Badge tone="info">☽ {lo === "zh" ? moon.sign_zh : moon.sign} {moon.degree_in_sign.toFixed(1)}°</Badge>}
          {data.facts.retrogrades.length > 0 && (
            <Badge>℞ {data.facts.retrogrades.join(", ")}</Badge>
          )}
        </div>
      </Card>

      {data.interpretation ? (
        <div className="mt-6 grid gap-4">
          {data.isMock && <Alert tone="warn">{t(M.disclosureDemoCalc, lo)}</Alert>}
          <Card>
            <h2 className="font-display text-2xl font-semibold">{data.interpretation.title}</h2>
            <p className="mt-3 leading-relaxed">{data.interpretation.summary}</p>
            {data.interpretation.sections.map((s, i) => (
              <section key={i} className="mt-5">
                <h3 className="font-display text-lg font-semibold">{s.heading}</h3>
                {s.body.split("\n\n").map((p, j) => (
                  <p key={j} className="mt-2 leading-relaxed">{p}</p>
                ))}
              </section>
            ))}
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h3 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.reflectionHeading, lo)}</h3>
              <p className="font-display mt-2 text-lg">{data.interpretation.reflectionQuestion}</p>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.actionHeading, lo)}</h3>
              <p className="mt-2">{data.interpretation.suggestedAction}</p>
            </Card>
          </div>
        </div>
      ) : (
        <Alert tone="warn" className="mt-6">{t(M.errorGeneric, lo)}</Alert>
      )}

      <p className="mt-6 text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.disclosureAi, lo)} {t(M.disclaimerGeneral, lo)}</p>
      <p className="mt-4">
        <Link href={`/${lo}/astrology/birth-chart`} className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
          {lo === "zh" ? "想要更个人化？排出完整星盘" : "Want more personal? Calculate your full chart"} →
        </Link>
      </p>
    </div>
  );
}
