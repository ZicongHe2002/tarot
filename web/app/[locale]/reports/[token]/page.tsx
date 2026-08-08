import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { ReportViewer } from "@/components/payments/report-viewer";
import { env } from "@/lib/config";

// Personalized paid content: never indexed (spec §19).
export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {lo === "zh" ? "你的报告" : "Your report"}
      </h1>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">{t(M.disclosureAi, lo)}</p>
      <div className="mt-8">
        <ReportViewer orderToken={token} locale={lo} devMode={env.devFakePayments()} />
      </div>
    </div>
  );
}
