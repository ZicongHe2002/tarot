"use client";

import * as React from "react";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Alert, Badge, Card, Spinner } from "@/components/ui/card";
import { BirthFields, birthPayload, type BirthValue } from "@/components/birth-fields";
import { usePollReading } from "@/components/reading/reading-poller";
import { InterpretationView } from "@/components/reading/interpretation-view";
import { AstroCalcView, AstroBalance, PlanetTable } from "@/components/reading/calc-views";
import { BigThreePanel } from "@/components/astro/big-three-panel";
import type { NatalCalc } from "@/lib/engines/astrology";

export function BirthChartFlow({ locale }: { locale: Locale }) {
  const [birth, setBirth] = React.useState<BirthValue>({ dateISO: "", timeKnown: true });
  const [token, setToken] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [errors, setErrors] = React.useState<{ date?: string; place?: string }>({});
  const [quota, setQuota] = React.useState(false);
  const lo = locale;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!birth.dateISO) errs.date = lo === "zh" ? "请填写出生日期。" : "Please enter a date of birth.";
    if (!birth.cityId && !(birth.lat !== undefined && birth.lon !== undefined && birth.tz)) {
      errs.place = lo === "zh" ? "请选择城市，或填写完整坐标与时区。" : "Choose a city, or enter full coordinates and timezone.";
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    const res = await fetch("/api/astrology/chart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "natal",
        locale: lo,
        ...(birth.profileId ? { profileId: birth.profileId } : { birth: birthPayload(birth) }),
      }),
    });
    setBusy(false);
    if (res.status === 402) {
      setQuota(true);
      return;
    }
    const j = await res.json().catch(() => null);
    if (j?.token) setToken(j.token);
  }

  if (quota) {
    return (
      <Alert tone="info" className="max-w-2xl">
        {lo === "zh"
          ? "本月的免费解读次数已用完。计算不限次，但 AI 解读需要会员或按次报告。"
          : "You've used this month's free interpretations. Calculation stays free; interpretations need Premium or a one-time report."}
        <div className="mt-3">
          <Link href={`/${lo}/pricing`}>
            <Button size="sm">{t(M.pricingTitle, lo)}</Button>
          </Link>
        </div>
      </Alert>
    );
  }

  if (token) return <ChartLevels token={token} locale={lo} />;

  return (
    <form onSubmit={submit} className="max-w-2xl" noValidate>
      <Card>
        <BirthFields locale={lo} value={birth} onChange={setBirth} errors={errors} idPrefix="astro" allowProfileSelection />
        <p className="mt-4 text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.profilePrivacyNote, lo)}</p>
        <div className="mt-5">
          <Button type="submit" disabled={busy}>
            {busy ? t(M.loading, lo) : t(M.ctaBirthChart, lo)}
          </Button>
        </div>
      </Card>
    </form>
  );
}

export function ChartLevels({ token, locale }: { token: string; locale: Locale }) {
  const { data, error, retry } = usePollReading(token, locale);
  const lo = locale;
  if (error) return <Alert tone="warn">{t(M.errorGeneric, lo)}</Alert>;
  if (!data) {
    return (
      <div className="py-10 text-center">
        <Spinner label={t(M.loading, lo)} />
      </div>
    );
  }
  const calc = data.calc as NatalCalc;
  const sun = calc.planets.find((p) => p.planet === "sun");
  const moon = calc.planets.find((p) => p.planet === "moon");
  const tabCls =
    "min-h-11 rounded-full px-4 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white border border-[var(--line)] data-[state=active]:border-primary";

  return (
    <Tabs.Root defaultValue="quick">
      <Tabs.List aria-label={t(M.astroBirthChart, lo)} className="flex flex-wrap gap-2">
        <Tabs.Trigger value="quick" className={tabCls}>
          {t(M.astroQuickProfile, lo)}
        </Tabs.Trigger>
        <Tabs.Trigger value="guided" className={tabCls}>
          {t(M.astroGuided, lo)}
        </Tabs.Trigger>
        <Tabs.Trigger value="full" className={tabCls}>
          {t(M.astroFullData, lo)}
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="quick" className="mt-5 space-y-4 focus:outline-none">
        <Card>
          <BigThreePanel calc={calc} locale={lo} />
        </Card>
        <Card>
          <div className="flex flex-wrap gap-2">
            {sun && (
              <Badge tone="gold">
                ☉ {lo === "zh" ? `太阳 ${sun.sign_zh}` : `Sun in ${sun.sign}`} {sun.degree_in_sign.toFixed(1)}°
              </Badge>
            )}
            {moon && (
              <Badge tone="info">
                ☽ {lo === "zh" ? `月亮 ${moon.sign_zh}` : `Moon in ${moon.sign}`} {moon.degree_in_sign.toFixed(1)}°
              </Badge>
            )}
            {calc.ascendant ? (
              <Badge>
                {t(M.ascendant, lo)}: {lo === "zh" ? calc.ascendant.sign_zh : calc.ascendant.sign}
              </Badge>
            ) : (
              <Badge tone="warn">{lo === "zh" ? "上升点未知（缺出生时间）" : "Ascendant unknown (no birth time)"}</Badge>
            )}
            <Badge>{lo === "zh" ? calc.moon_phase.name_zh : calc.moon_phase.name_en}</Badge>
          </div>
          {calc.moon_range && (
            <p className="mt-3 text-sm text-[var(--fg-muted)]">
              {lo === "zh"
                ? `月亮当日跨越 ${calc.moon_range.start_sign_zh} 与 ${calc.moon_range.end_sign_zh}，需出生时间方能确定。`
                : `The Moon spans ${calc.moon_range.start_sign} and ${calc.moon_range.end_sign} on this date; a birth time is needed to settle it.`}
            </p>
          )}
          <div className="mt-5">
            <AstroBalance calc={calc} locale={lo} />
          </div>
          {calc.calculation_warnings.map((w, i) => (
            <p key={i} className="mt-3 text-sm text-[var(--fg-muted)]">
              ⚠ {w}
            </p>
          ))}
        </Card>
      </Tabs.Content>

      <Tabs.Content value="guided" className="mt-5 focus:outline-none">
        {(data.status === "pending" || data.status === "generating") && (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-8 text-center">
            <Spinner label={t(M.generating, lo)} />
          </div>
        )}
        {data.status === "failed" && (
          <Alert tone="warn">
            {t(M.generationFailed, lo)}
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={retry}>
                {t(M.retry, lo)}
              </Button>
            </div>
          </Alert>
        )}
        {data.status === "completed" && data.interpretation && (
          <InterpretationView interpretation={data.interpretation} isMock={data.isMock} locale={lo} versions={data.versions} />
        )}
      </Tabs.Content>

      <Tabs.Content value="full" className="mt-5 focus:outline-none">
        <div className="grid gap-4">
          <AstroCalcView calc={calc} locale={lo} />
          <Card className="text-xs text-[var(--fg-muted)]">
            <h3 className="mb-2 text-sm font-semibold text-[var(--fg)]">{t(M.calcMetadata, lo)}</h3>
            <dl className="grid gap-1 sm:grid-cols-2">
              <div>zodiac: tropical</div>
              <div>houses: {calc.houses_system}</div>
              <div>engine: {data.versions.calculationEngine} {data.versions.calculationVersion}</div>
              <div>methodology: {data.versions.methodologyVersion}</div>
              <div>generated: {data.versions.generatedAt?.slice(0, 19).replace("T", " ")} UTC</div>
              <div>UTC birth instant: {calc.utc_datetime}</div>
            </dl>
          </Card>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
