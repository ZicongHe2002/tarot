import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND, isLocale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { prisma } from "@/lib/prisma";
import { Badge, Card } from "@/components/ui/card";
import type { InterpretationResult } from "@/lib/providers/types";

// Personalized share cards must never be indexed (spec §19).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const MODE_LABEL: Record<string, { en: string; zh: string }> = {
  astrology: M.compatAstro,
  bazi: M.compatBazi,
  combined: M.compatCombined,
};

/** First sentence of a section body, capped at ~120 characters. */
function excerpt(body: string, max = 120): string {
  const text = body.replace(/\s+/g, " ").trim();
  const match = text.match(/^[^.!?。！？]*[.!?。！？]/);
  const sentence = (match ? match[0] : text).trim();
  return sentence.length > max ? `${sentence.slice(0, max - 1).trimEnd()}…` : sentence;
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;

  const row = await prisma.compatibilityReport.findUnique({ where: { shareToken: token } });
  if (!row || !row.interpretationJson) notFound();

  let interp: InterpretationResult;
  try {
    interp = JSON.parse(row.interpretationJson) as InterpretationResult;
  } catch {
    notFound();
  }
  if (!interp?.title) notFound();

  // Privacy-safe share card: interpretation language only. No birth dates,
  // times, places, calc placements, questions, or person names (spec §13).
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <Card className="mx-auto max-w-2xl p-8 sm:p-10">
        <p className="font-display text-sm font-semibold tracking-wide text-gold">{BRAND[lo]}</p>

        <div className="mt-4">
          <Badge tone="info">{t(MODE_LABEL[row.mode] ?? M.compatCombined, lo)}</Badge>
        </div>

        <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{interp.title}</h1>
        <p className="mt-3 leading-relaxed text-[var(--fg)]/90">{interp.summary}</p>

        <div className="mt-8 grid gap-5">
          {interp.sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-display text-base font-semibold">{s.heading}</h2>
              <p className="mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">{excerpt(s.body)}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-5 py-4">
          <h2 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.reflectionHeading, lo)}</h2>
          <p className="font-display mt-1.5 text-lg">{interp.reflectionQuestion}</p>
        </div>

        <div className="mt-8 border-t border-[var(--line)] pt-5">
          <p className="text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.disclaimerGeneral, lo)}</p>
          <p className="mt-2 text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.compatShareNote, lo)}</p>
          <Link
            href={`/${lo}/compatibility`}
            className="mt-4 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            {lo === "zh" ? "测测你们的契合度" : "Explore your own compatibility"} →
          </Link>
        </div>
      </Card>
    </div>
  );
}
