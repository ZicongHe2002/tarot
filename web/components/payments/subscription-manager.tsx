"use client";

import * as React from "react";
import Link from "next/link";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Alert, Badge, Card, Spinner } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SubInfo {
  status: string;
  interval?: string | null;
  amountCents?: number;
  currency?: string;
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
}

export function SubscriptionManager({ locale }: { locale: Locale }) {
  const lo = locale;
  const [sub, setSub] = React.useState<SubInfo | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);
  const [error, setError] = React.useState(false);

  const load = React.useCallback(async () => {
    const res = await fetch("/api/subscription", { cache: "no-store" });
    if (res.ok) setSub(await res.json());
    else setError(true);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  async function act(action: "cancel" | "resume") {
    setBusy(true);
    const res = await fetch("/api/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setBusy(false);
    setConfirming(false);
    if (res.ok) load();
    else setError(true);
  }

  if (error) return <Alert tone="warn">{t(M.errorGeneric, lo)}</Alert>;
  if (!sub) return <Spinner label={t(M.loading, lo)} />;

  if (sub.status === "none") {
    return (
      <Card>
        <p>{t(M.subNone, lo)}</p>
        <Link href={`/${lo}/pricing`} className="mt-4 inline-block">
          <Button>{t(M.pricingTitle, lo)}</Button>
        </Link>
      </Card>
    );
  }

  const endDate = sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString(lo === "zh" ? "zh-CN" : "en-US") : "—";

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={sub.status === "active" ? "gold" : sub.status === "past_due" ? "warn" : "info"}>
          {sub.status === "active"
            ? lo === "zh" ? "生效中" : "Active"
            : sub.status === "past_due"
              ? lo === "zh" ? "扣款失败（宽限期）" : "Past due (grace period)"
              : sub.status}
        </Badge>
        <span className="text-sm text-[var(--fg-muted)]">
          ${((sub.amountCents ?? 0) / 100).toFixed(2)} / {sub.interval === "year" ? t(M.pricingAnnual, lo) : t(M.pricingMonthly, lo)}
        </span>
      </div>
      <p className="mt-3 text-sm text-[var(--fg-muted)]">
        {sub.cancelAtPeriodEnd
          ? t(M.subCancelScheduled, lo).replace("{date}", endDate)
          : (lo === "zh" ? `下次续费日期：${endDate}。` : `Next renewal: ${endDate}.`) + " " + t(M.checkoutRenewalNote, lo)}
      </p>

      <div className="mt-5">
        {sub.cancelAtPeriodEnd ? (
          <Button onClick={() => act("resume")} disabled={busy}>
            {busy ? t(M.loading, lo) : t(M.subResume, lo)}
          </Button>
        ) : confirming ? (
          <div className="flex flex-wrap items-center gap-2">
            <p className="mr-2 text-sm">
              {lo === "zh" ? "确认取消？将于当前周期结束时生效。" : "Confirm cancellation? It takes effect at the end of the current period."}
            </p>
            <Button variant="danger" onClick={() => act("cancel")} disabled={busy}>
              {busy ? t(M.loading, lo) : t(M.confirm, lo)}
            </Button>
            <Button variant="outline" onClick={() => setConfirming(false)} disabled={busy}>
              {t(M.back, lo)}
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setConfirming(true)}>
            {t(M.subCancelButton, lo)}
          </Button>
        )}
      </div>
    </Card>
  );
}
