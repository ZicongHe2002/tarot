"use client";

// Daily guidance client flow: pick a profile, auto-request today's synthesis,
// show the three deterministic lenses (facts) above the AI interpretation.
import * as React from "react";
import Link from "next/link";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import type { InterpretationResult } from "@/lib/providers/types";
import { Alert, Card, Spinner } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label, Select } from "@/components/ui/form";
import { InterpretationView } from "@/components/reading/interpretation-view";
import { SaveToJournal } from "@/components/journal/save-button";

const EL_ZH: Record<string, string> = { Wood: "木", Fire: "火", Earth: "土", Metal: "金", Water: "水" };

interface TransitFact {
  transiting: string;
  natal: string;
  aspect: string;
  aspect_zh: string;
  orb: number;
}

interface DailyFacts {
  astrology?: { top_transits?: TransitFact[] };
  bazi?: {
    natal_day_master?: { stem: string; stem_zh: string; element: string; polarity: string };
    today_day_pillar_zh?: string;
    today_ten_god_vs_day_master?: { en: string; zh: string };
  };
  tarot?: {
    card?: {
      name_en: string;
      name_zh: string;
      orientation: "upright" | "reversed";
      position_en: string;
      position_zh: string;
    };
  };
}

interface DailyData {
  date: string;
  facts: DailyFacts;
  interpretation: InterpretationResult | null;
  isMock: boolean;
  status: "completed" | "failed";
}

export function DailyView({
  locale,
  profiles,
}: {
  locale: Locale;
  profiles: Array<{ id: string; label: string }>;
}) {
  const lo = locale;
  const [profileId, setProfileId] = React.useState(profiles[0]?.id ?? "");
  const [state, setState] = React.useState<"loading" | "quota" | "error" | "done">("loading");
  const [data, setData] = React.useState<DailyData | null>(null);

  const load = React.useCallback(
    async (pid: string) => {
      setState("loading");
      setData(null);
      try {
        const res = await fetch("/api/daily", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileId: pid, locale: lo }),
        });
        if (res.status === 402) {
          setState("quota");
          return;
        }
        if (!res.ok) {
          setState("error");
          return;
        }
        const json = (await res.json()) as DailyData;
        if (json.status !== "completed" || !json.interpretation) {
          setState("error");
          return;
        }
        setData(json);
        setState("done");
      } catch {
        setState("error");
      }
    },
    [lo]
  );

  React.useEffect(() => {
    if (profileId) load(profileId);
  }, [profileId, load]);

  const dateLabel = data
    ? new Date(`${data.date}T12:00:00`).toLocaleDateString(lo === "zh" ? "zh-CN" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="grid gap-6">
      {profiles.length > 1 && (
        <div className="max-w-xs">
          <Label htmlFor="daily-profile">{t(M.accountProfiles, lo)}</Label>
          <Select
            triggerLabel={t(M.accountProfiles, lo)}
            options={profiles.map((p) => ({ value: p.id, label: p.label }))}
            value={profileId}
            onValueChange={setProfileId}
          />
        </div>
      )}

      {state === "loading" && (
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-10 text-center">
          <Spinner label={t(M.generating, lo)} />
        </div>
      )}

      {state === "quota" && (
        <Alert tone="info" className="max-w-2xl">
          {lo === "zh"
            ? "本月的免费解读次数已用完。升级会员即可获得不限次的每日指引。"
            : "You've used this month's free interpretations. Upgrade to Premium for unlimited daily guidance."}
          <div className="mt-3">
            <Link href={`/${lo}/pricing`}>
              <Button size="sm">{t(M.pricingTitle, lo)}</Button>
            </Link>
          </div>
        </Alert>
      )}

      {state === "error" && (
        <Alert tone="warn" className="max-w-2xl">
          {t(M.errorGeneric, lo)}
          <div className="mt-3">
            <Button variant="outline" size="sm" onClick={() => profileId && load(profileId)}>
              {t(M.retry, lo)}
            </Button>
          </div>
        </Alert>
      )}

      {state === "done" && data && data.interpretation && (
        <div className="grid gap-6">
          <p className="text-sm font-medium text-[var(--fg-muted)]">{dateLabel}</p>

          <FactsPanel facts={data.facts} locale={lo} />

          <InterpretationView interpretation={data.interpretation} isMock={data.isMock} locale={lo} />

          <p className="text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.disclosureDailySynthesis, lo)}</p>

          <SaveToJournal locale={lo} kind="daily_guidance" refId={data.date} title={data.interpretation.title} />
        </div>
      )}
    </div>
  );
}

/** The three deterministic lenses that fed today's synthesis (facts, not AI). */
function FactsPanel({ facts, locale }: { facts: DailyFacts; locale: Locale }) {
  const lo = locale;
  const transits = facts.astrology?.top_transits ?? [];
  const bz = facts.bazi;
  const dm = bz?.natal_day_master;
  const card = facts.tarot?.card;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.dailyAstroLens, lo)}</h2>
        {transits.length > 0 ? (
          <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed">
            {transits.map((x, i) => (
              <li key={i}>
                {lo === "zh"
                  ? `${x.transiting} ${x.aspect_zh} 本命${x.natal}（${x.orb.toFixed(1)}°）`
                  : `${x.transiting} ${x.aspect} natal ${x.natal} (${x.orb.toFixed(1)}°)`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--fg-muted)]">
            {lo === "zh" ? "今日没有显著的行运相位。" : "No notable transit aspects today."}
          </p>
        )}
      </Card>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.dailyBaziLens, lo)}</h2>
        <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed">
          {bz?.today_day_pillar_zh && (
            <li>{lo === "zh" ? `今日日柱：${bz.today_day_pillar_zh}` : `Today's Day Pillar: ${bz.today_day_pillar_zh}`}</li>
          )}
          {bz?.today_ten_god_vs_day_master && (
            <li>
              {lo === "zh"
                ? `对日主十神：${bz.today_ten_god_vs_day_master.zh}`
                : `Ten God vs Day Master: ${bz.today_ten_god_vs_day_master.en}（${bz.today_ten_god_vs_day_master.zh}）`}
            </li>
          )}
          {dm && (
            <li>
              {lo === "zh"
                ? `日主：${dm.stem_zh}（${dm.polarity === "Yang" ? "阳" : "阴"}${EL_ZH[dm.element] ?? dm.element}）`
                : `Day Master: ${dm.stem_zh} ${dm.stem} · ${dm.polarity} ${dm.element}`}
            </li>
          )}
        </ul>
      </Card>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.dailyTarotLens, lo)}</h2>
        {card ? (
          <div className="mt-2.5 text-sm leading-relaxed">
            <p className="font-medium">
              {lo === "zh" ? card.name_zh : card.name_en}
              {" · "}
              {card.orientation === "reversed" ? t(M.tarotReversed, lo) : t(M.tarotUpright, lo)}
            </p>
            <p className="mt-1 text-[var(--fg-muted)]">{lo === "zh" ? card.position_zh : card.position_en}</p>
          </div>
        ) : (
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--fg-muted)]">—</p>
        )}
      </Card>
    </div>
  );
}
