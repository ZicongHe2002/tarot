"use client";

import type { InterpretationResult } from "@/lib/providers/types";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Alert, Badge, Card } from "@/components/ui/card";

export interface VersionsInfo {
  calculationEngine?: string;
  calculationVersion?: string;
  methodologyVersion?: string;
  promptVersion?: string;
  modelProvider?: string | null;
  modelName?: string | null;
  safetyPolicyVersion?: string;
  generatedAt?: string;
}

export function InterpretationView({
  interpretation,
  isMock,
  locale,
  versions,
}: {
  interpretation: InterpretationResult;
  isMock: boolean;
  locale: Locale;
  versions?: VersionsInfo;
}) {
  return (
    <div className="grid gap-4">
      {isMock && (
        <Alert tone="warn">
          <strong className="font-semibold">{locale === "zh" ? "示例模式：" : "Demo mode: "}</strong>
          {t(M.disclosureDemoCalc, locale)}
        </Alert>
      )}
      <Card>
        <h2 className="font-display text-2xl font-semibold">{interpretation.title}</h2>
        <p className="mt-3 leading-relaxed">{interpretation.summary}</p>
        {interpretation.sections.map((s, i) => (
          <section key={i} className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold">{s.heading}</h3>
              {s.sourceTags.map((tag) => (
                <Badge key={tag} tone="info">
                  {tag === "tarot" ? t(M.navTarot, locale) : tag === "astrology" ? t(M.navAstrology, locale) : t(M.navBazi, locale)}
                </Badge>
              ))}
            </div>
            {s.body.split("\n\n").map((p, j) => (
              <p key={j} className="mt-2 leading-relaxed text-[var(--fg)]/90">
                {p}
              </p>
            ))}
          </section>
        ))}
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h3 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.reflectionHeading, locale)}</h3>
          <p className="font-display mt-2 text-lg">{interpretation.reflectionQuestion}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.actionHeading, locale)}</h3>
          <p className="mt-2 leading-relaxed">{interpretation.suggestedAction}</p>
        </Card>
      </div>

      {interpretation.limitations.length > 0 && (
        <Alert tone="info">
          <h3 className="mb-1 font-semibold">{t(M.limitationsHeading, locale)}</h3>
          <ul className="list-disc space-y-1 pl-5">
            {interpretation.limitations.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </Alert>
      )}

      <p className="text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.disclosureAi, locale)}</p>

      {versions && (
        <details className="text-xs text-[var(--fg-muted)]">
          <summary className="cursor-pointer font-medium">{t(M.calcMetadata, locale)}</summary>
          <dl className="mt-2 grid gap-1 sm:grid-cols-2">
            <div>engine: {versions.calculationEngine} {versions.calculationVersion}</div>
            <div>methodology: {versions.methodologyVersion}</div>
            <div>
              model: {versions.modelProvider ? `${versions.modelProvider}/${versions.modelName}` : (locale === "zh" ? "示例（未配置）" : "sample (not configured)")}
            </div>
            <div>prompt: {versions.promptVersion}</div>
            <div>safety: {versions.safetyPolicyVersion}</div>
            <div>generated: {versions.generatedAt?.slice(0, 19).replace("T", " ")} UTC</div>
          </dl>
        </details>
      )}
    </div>
  );
}
