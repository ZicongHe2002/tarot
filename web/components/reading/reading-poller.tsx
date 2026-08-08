"use client";

import * as React from "react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Alert, Spinner } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InterpretationView, type VersionsInfo } from "./interpretation-view";
import { TarotSpreadView, AstroCalcView, BaziCalcView } from "./calc-views";
import { SaveToJournal } from "@/components/journal/save-button";
import type { InterpretationResult } from "@/lib/providers/types";

export interface ReadingPayload {
  kind: "tarot" | "astrology" | "bazi";
  mode?: string;
  status: string;
  calc: unknown;
  interpretation: InterpretationResult | null;
  isMock: boolean;
  versions: VersionsInfo;
  safetyLevel: string;
  topic?: string | null;
}

/** Polls the unified reading endpoint until interpretation settles. */
export function usePollReading(token: string, locale: Locale) {
  const [data, setData] = React.useState<ReadingPayload | null>(null);
  const [error, setError] = React.useState(false);
  const stop = React.useRef(false);

  const load = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/reading/${token}?locale=${locale}`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const json = (await res.json()) as ReadingPayload;
      setData(json);
      return json.status;
    } catch {
      setError(true);
      return "error";
    }
  }, [token, locale]);

  React.useEffect(() => {
    stop.current = false;
    let timer: ReturnType<typeof setTimeout>;
    async function tick() {
      const status = await load();
      if (stop.current) return;
      if (status === "pending" || status === "generating") timer = setTimeout(tick, 2500);
    }
    tick();
    return () => {
      stop.current = true;
      clearTimeout(timer);
    };
  }, [load]);

  const retry = React.useCallback(async () => {
    await fetch(`/api/reading/${token}`, { method: "POST" });
    setError(false);
    setData((d) => (d ? { ...d, status: "pending" } : d));
    const status = await load();
    if (status === "pending" || status === "generating") setTimeout(load, 2500);
  }, [token, load]);

  return { data, error, retry };
}

export function ReadingView({
  token,
  locale,
  refId,
  enableJournalSave,
}: {
  token: string;
  locale: Locale;
  refId?: string;
  enableJournalSave?: boolean;
}) {
  const { data, error, retry } = usePollReading(token, locale);

  if (error) {
    return (
      <Alert tone="warn">
        {t(M.errorGeneric, locale)}
        <div className="mt-2">
          <Button variant="outline" size="sm" onClick={() => location.reload()}>
            {t(M.retry, locale)}
          </Button>
        </div>
      </Alert>
    );
  }
  if (!data) {
    return (
      <div className="py-10 text-center">
        <Spinner label={t(M.loading, locale)} />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {data.kind === "tarot" && <TarotSpreadView calc={data.calc as never} locale={locale} />}
      {data.kind === "astrology" && data.mode !== "transits" && <AstroCalcView calc={data.calc as never} locale={locale} />}
      {data.kind === "astrology" && data.mode === "transits" && <AstroTransitsBlock calc={data.calc as never} locale={locale} />}
      {data.kind === "bazi" && <BaziBlock calc={data.calc as never} locale={locale} />}

      {(data.status === "pending" || data.status === "generating") && (
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-8 text-center">
          <Spinner label={t(M.generating, locale)} />
        </div>
      )}
      {data.status === "failed" && (
        <Alert tone="warn">
          {t(M.generationFailed, locale)}
          <div className="mt-2">
            <Button variant="outline" size="sm" onClick={retry}>
              {t(M.retry, locale)}
            </Button>
          </div>
        </Alert>
      )}
      {data.status === "blocked" && <Alert tone="warn">{t(M.errorGeneric, locale)}</Alert>}
      {data.status === "completed" && data.interpretation && (
        <>
          <InterpretationView
            interpretation={data.interpretation}
            isMock={data.isMock}
            locale={locale}
            versions={data.versions}
          />
          {enableJournalSave && refId && (
            <SaveToJournal
              locale={locale}
              kind={data.kind === "tarot" ? "tarot" : data.kind}
              refId={refId}
              title={data.interpretation.title}
            />
          )}
        </>
      )}
    </div>
  );
}

function AstroTransitsBlock({
  calc,
  locale,
}: {
  calc: { at: string; planets: never; aspects_to_natal: Array<{ transiting: string; natal: string; aspect: string; aspect_zh: string; orb: number }> };
  locale: Locale;
}) {
  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-6">
        <h3 className="text-sm font-semibold text-[var(--fg-muted)]">
          {t(M.astroTransits, locale)} · {calc.at.slice(0, 10)}
        </h3>
        <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
          {calc.aspects_to_natal.slice(0, 16).map((a, i) => (
            <li key={i}>
              {a.transiting} {locale === "zh" ? a.aspect_zh : a.aspect} {locale === "zh" ? "本命" : "natal"} {a.natal}{" "}
              <span className="tabular-nums text-[var(--fg-muted)]">({a.orb.toFixed(1)}°)</span>
            </li>
          ))}
          {calc.aspects_to_natal.length === 0 && (
            <li className="text-[var(--fg-muted)]">{locale === "zh" ? "今日无紧密行运相位。" : "No tight transit aspects today."}</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function BaziBlock({ calc, locale }: { calc: unknown; locale: Locale }) {
  const c = calc as { natal?: never; annual?: { year: number; year_ganzhi_zh: string; ten_god_vs_day_master: string | null; ten_god_vs_day_master_zh: string | null } };
  if (c && typeof c === "object" && "natal" in (c as object) && (c as { natal?: unknown }).natal) {
    return (
      <div className="grid gap-4">
        <BaziCalcView calc={(c as { natal: never }).natal} locale={locale} />
        {c.annual && (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-6 text-sm">
            <h3 className="font-semibold">
              {c.annual.year} · {c.annual.year_ganzhi_zh}
            </h3>
            <p className="mt-1 text-[var(--fg-muted)]">
              {locale === "zh"
                ? `流年天干对日主为「${c.annual.ten_god_vs_day_master_zh}」。`
                : `The year stem relates to your Day Master as ${c.annual.ten_god_vs_day_master}.`}
            </p>
          </div>
        )}
      </div>
    );
  }
  return <BaziCalcView calc={calc as never} locale={locale} />;
}
