"use client";

import * as React from "react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/card";

export function SubscribeButtons({
  locale,
  monthlyPriceId,
  annualPriceId,
}: {
  locale: Locale;
  monthlyPriceId: string;
  annualPriceId: string;
}) {
  const [busy, setBusy] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function subscribe(priceId: string) {
    setBusy(priceId);
    setError(null);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "subscription", locale, productSlug: "premium", priceId, consent: true }),
    });
    setBusy(null);
    if (res.status === 401) {
      window.location.href = `/${locale}/account/signin`;
      return;
    }
    if (res.status === 503) {
      setError(
        locale === "zh"
          ? "支付尚未配置。开发环境可在 .env 中设置 DEV_FAKE_PAYMENTS=1 体验完整流程。"
          : "Payments are not configured. In development, set DEV_FAKE_PAYMENTS=1 in .env to try the full flow."
      );
      return;
    }
    const j = await res.json().catch(() => null);
    if (j?.url) window.location.href = j.url;
    else setError(t(M.errorGeneric, locale));
  }

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => subscribe(monthlyPriceId)} disabled={!!busy}>
          {busy === monthlyPriceId ? t(M.loading, locale) : locale === "zh" ? "按月订阅" : "Subscribe monthly"}
        </Button>
        <Button variant="outline" onClick={() => subscribe(annualPriceId)} disabled={!!busy}>
          {busy === annualPriceId ? t(M.loading, locale) : locale === "zh" ? "按年订阅" : "Subscribe yearly"}
        </Button>
      </div>
      {error && (
        <Alert tone="warn" className="mt-3">
          {error}
        </Alert>
      )}
    </div>
  );
}
