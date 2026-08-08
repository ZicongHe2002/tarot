"use client";

import * as React from "react";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Alert, Badge, Card, Spinner } from "@/components/ui/card";
import { BirthFields, birthPayload, type BirthValue } from "@/components/birth-fields";
import { RadioGroup, RadioItem } from "@/components/ui/form";
import { usePollReading } from "@/components/reading/reading-poller";
import { InterpretationView } from "@/components/reading/interpretation-view";
import { BaziCalcView } from "@/components/reading/calc-views";
import type { BaziCalc } from "@/lib/engines/bazi";

const EL_ZH: Record<string, string> = { Wood: "木", Fire: "火", Earth: "土", Metal: "金", Water: "水" };

export function BaziFlow({ locale }: { locale: Locale }) {
  const [birth, setBirth] = React.useState<BirthValue>({ dateISO: "", timeKnown: true });
  const [sex, setSex] = React.useState<string>("");
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
      errs.place = lo === "zh" ? "请选择出生城市，或填写完整坐标与时区。" : "Choose a birth city, or enter full coordinates and timezone.";
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    const res = await fetch("/api/bazi/chart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "natal",
        locale: lo,
        birth: birthPayload(birth),
        sex: sex || null,
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
          ? "本月的免费解读次数已用完。升级会员可获得不限次解读。"
          : "You've used this month's free interpretations. Premium includes unlimited interpretations."}
        <div className="mt-3">
          <Link href={`/${lo}/pricing`}>
            <Button size="sm">{t(M.pricingTitle, lo)}</Button>
          </Link>
        </div>
      </Alert>
    );
  }

  if (token) return <BaziLevels token={token} locale={lo} />;

  return (
    <form onSubmit={submit} className="max-w-2xl" noValidate>
      <Card>
        <BirthFields locale={lo} value={birth} onChange={setBirth} errors={errors} idPrefix="bazi" />
        <fieldset className="mt-4">
          <legend className="mb-2 text-sm font-medium">
            {t(M.baziSexLabel, lo)} <span className="font-normal text-[var(--fg-muted)]">({t(M.optional, lo)})</span>
          </legend>
          <RadioGroup value={sex} onValueChange={setSex} className="sm:grid-cols-2">
            <RadioItem value="male">{lo === "zh" ? "男" : "Male"}</RadioItem>
            <RadioItem value="female">{lo === "zh" ? "女" : "Female"}</RadioItem>
          </RadioGroup>
          <p className="mt-1.5 text-xs text-[var(--fg-muted)]">
            {lo === "zh" ? "不填则不排大运。" : "Leave empty to skip luck pillars."}
          </p>
        </fieldset>
        <p className="mt-4 text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.profilePrivacyNote, lo)}</p>
        <div className="mt-5">
          <Button type="submit" disabled={busy}>
            {busy ? t(M.loading, lo) : t(M.ctaExploreBazi, lo)}
          </Button>
        </div>
      </Card>
    </form>
  );
}

export function BaziLevels({ token, locale }: { token: string; locale: Locale }) {
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
  const raw = data.calc as BaziCalc | { natal: BaziCalc };
  const calc: BaziCalc = "natal" in raw ? raw.natal : raw;
  const strongest = Object.entries(calc.element_distribution).sort((a, b) => b[1] - a[1])[0];
  const weakest = Object.entries(calc.element_distribution).sort((a, b) => a[1] - b[1])[0];
  const tabCls =
    "min-h-11 rounded-full px-4 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white border border-[var(--line)] data-[state=active]:border-primary";

  return (
    <Tabs.Root defaultValue="summary">
      <Tabs.List aria-label={t(M.baziTitle, lo)} className="flex flex-wrap gap-2">
        <Tabs.Trigger value="summary" className={tabCls}>
          {t(M.baziOneMinute, lo)}
        </Tabs.Trigger>
        <Tabs.Trigger value="plain" className={tabCls}>
          {t(M.baziPlain, lo)}
        </Tabs.Trigger>
        <Tabs.Trigger value="full" className={tabCls}>
          {t(M.baziFull, lo)}
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="summary" className="mt-5 focus:outline-none">
        <Card>
          <div className="flex flex-wrap gap-2">
            <Badge tone="gold">
              {t(M.baziDayMaster, lo)}: {calc.day_master.stem_zh}{" "}
              {lo === "zh"
                ? `${calc.day_master.polarity === "Yang" ? "阳" : "阴"}${EL_ZH[calc.day_master.element]}`
                : `${calc.day_master.polarity} ${calc.day_master.element}`}
            </Badge>
            <Badge>
              {lo === "zh" ? "生肖" : "Zodiac"}: {lo === "zh" ? calc.zodiac_animal.zh : calc.zodiac_animal.en}
            </Badge>
            <Badge tone="info">
              {lo === "zh"
                ? `最旺：${EL_ZH[strongest[0]]} · 最弱：${EL_ZH[weakest[0]]}`
                : `Strongest: ${strongest[0]} · Weakest: ${weakest[0]}`}
            </Badge>
          </div>
          <p className="mt-4 leading-relaxed">
            {lo === "zh"
              ? `你的日主是${calc.day_master.stem_zh}（${calc.day_master.polarity === "Yang" ? "阳" : "阴"}${EL_ZH[calc.day_master.element]}）。四柱中${EL_ZH[strongest[0]]}的力量最为明显，${EL_ZH[weakest[0]]}相对薄弱。这是一幅关于节奏与倾向的图景，不是命运判决——完整解读见下一个标签页。`
              : `Your Day Master is ${calc.day_master.stem} (${calc.day_master.polarity} ${calc.day_master.element}). ${strongest[0]} carries the most weight in your pillars while ${weakest[0]} is comparatively light. Read this as a picture of rhythms and leanings, not a verdict — the full interpretation is in the next tab.`}
          </p>
          {calc.calculation_warnings.map((w, i) => (
            <p key={i} className="mt-3 text-sm text-[var(--fg-muted)]">
              ⚠ {w}
            </p>
          ))}
        </Card>
      </Tabs.Content>

      <Tabs.Content value="plain" className="mt-5 focus:outline-none">
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
        <BaziCalcView calc={calc} locale={lo} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
