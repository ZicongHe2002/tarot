"use client";

import * as React from "react";
import Link from "next/link";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Alert, Card } from "@/components/ui/card";
import { BirthFields, birthPayload, type BirthValue } from "@/components/birth-fields";
import { ReadingView } from "@/components/reading/reading-poller";

export function TransitsFlow({ locale }: { locale: Locale }) {
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
        kind: "transits",
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
        {lo === "zh" ? "本月的免费解读次数已用完。" : "You've used this month's free interpretations."}
        <div className="mt-3">
          <Link href={`/${lo}/pricing`}>
            <Button size="sm">{t(M.pricingTitle, lo)}</Button>
          </Link>
        </div>
      </Alert>
    );
  }

  if (token) return <ReadingView token={token} locale={lo} />;

  return (
    <form onSubmit={submit} className="max-w-2xl" noValidate>
      <Card>
        <BirthFields locale={lo} value={birth} onChange={setBirth} errors={errors} idPrefix="transit" allowProfileSelection />
        <div className="mt-5">
          <Button type="submit" disabled={busy}>
            {busy ? t(M.loading, lo) : t(M.astroTransits, lo)}
          </Button>
        </div>
      </Card>
    </form>
  );
}
