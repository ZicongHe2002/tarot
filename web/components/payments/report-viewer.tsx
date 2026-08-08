"use client";

import * as React from "react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Alert, Badge, Card, Spinner } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReadingView } from "@/components/reading/reading-poller";
import { InterpretationView } from "@/components/reading/interpretation-view";
import type { InterpretationResult } from "@/lib/providers/types";

interface OrderPayload {
  status: string;
  product: { slug: string; name: Record<string, string>; description: Record<string, string> };
  amountCents: number;
  currency: string;
  readingToken: string | null;
  readingKind: string | null;
}

export function ReportViewer({ orderToken, locale, devMode }: { orderToken: string; locale: Locale; devMode: boolean }) {
  const lo = locale;
  const [order, setOrder] = React.useState<OrderPayload | null>(null);
  const [error, setError] = React.useState(false);
  const [paying, setPaying] = React.useState(false);
  const [compat, setCompat] = React.useState<{ interpretation: InterpretationResult; isMock: boolean; versions: never } | null>(null);

  const load = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${orderToken}?locale=${lo}`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const j = (await res.json()) as OrderPayload;
      setOrder(j);
      return j;
    } catch {
      setError(true);
      return null;
    }
  }, [orderToken, lo]);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;
    async function tick() {
      const j = await load();
      if (stopped || !j) return;
      if (["payment_pending", "paid", "generation_pending", "generating"].includes(j.status)) {
        timer = setTimeout(tick, 2500);
      }
      if (j.status === "completed" && j.readingKind === "compatibility" && j.readingToken) {
        const r = await fetch(`/api/compatibility/${j.readingToken}`, { cache: "no-store" });
        const jj = await r.json().catch(() => null);
        if (jj?.interpretation) setCompat(jj);
      }
    }
    tick();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [load]);

  async function devPay() {
    setPaying(true);
    await fetch("/api/dev/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderToken }),
    });
    setPaying(false);
    load();
  }

  if (error) return <Alert tone="warn">{t(M.errorGeneric, lo)}</Alert>;
  if (!order)
    return (
      <div className="py-10 text-center">
        <Spinner label={t(M.loading, lo)} />
      </div>
    );

  const name = order.product.name[lo] ?? order.product.name.en;

  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold">{name}</h2>
            <p className="text-sm text-[var(--fg-muted)]">
              ${(order.amountCents / 100).toFixed(2)} {order.currency.toUpperCase()}
            </p>
          </div>
          <Badge tone={order.status === "completed" ? "gold" : order.status.includes("refund") ? "warn" : "info"}>
            {statusLabel(order.status, lo)}
          </Badge>
        </div>
        <p className="mt-3 text-xs text-[var(--fg-muted)]">
          {lo === "zh"
            ? "请收藏本页链接——这是访问该报告的凭证。"
            : "Bookmark this page — its link is your access to the report."}
        </p>
      </Card>

      {order.status === "payment_pending" && devMode && (
        <Alert tone="warn">
          {lo === "zh" ? "开发模式：未配置 Stripe，可模拟支付以测试完整流程。" : "Dev mode: Stripe not configured — simulate the payment to exercise the full flow."}
          <div className="mt-2">
            <Button size="sm" onClick={devPay} disabled={paying}>
              {paying ? t(M.loading, lo) : t(M.checkoutDevPay, lo)}
            </Button>
          </div>
        </Alert>
      )}

      {order.status === "payment_pending" && !devMode && (
        <Alert tone="info">
          {lo === "zh"
            ? "等待支付确认。支付由收单方回执确认后自动开始生成——通常只需几秒。"
            : "Waiting for payment confirmation. Generation starts automatically once the payment webhook confirms — usually seconds."}
        </Alert>
      )}

      {/* Once paid, ReadingView polls the reading endpoint, which performs the
          generation claim itself — the order status catches up on our poll. */}
      {["paid", "generation_pending", "generating"].includes(order.status) &&
        (order.readingToken && order.readingKind !== "compatibility" ? (
          <ReadingView token={order.readingToken} locale={lo} />
        ) : (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-8 text-center">
            <Spinner label={t(M.generating, lo)} />
          </div>
        ))}

      {["refunded", "partially_refunded"].includes(order.status) && (
        <Alert tone="info">
          {lo === "zh" ? "该订单已退款，内容不再展示。" : "This order was refunded; its content is no longer displayed."}
        </Alert>
      )}

      {order.status === "generation_failed" && order.readingToken && order.readingKind !== "compatibility" && (
        <ReadingView token={order.readingToken} locale={lo} />
      )}

      {order.status === "completed" &&
        order.readingToken &&
        (order.readingKind === "compatibility" ? (
          compat ? (
            <InterpretationView interpretation={compat.interpretation} isMock={compat.isMock} locale={lo} versions={compat.versions} />
          ) : (
            <div className="py-6 text-center">
              <Spinner label={t(M.loading, lo)} />
            </div>
          )
        ) : (
          <ReadingView token={order.readingToken} locale={lo} />
        ))}
    </div>
  );
}

function statusLabel(status: string, lo: Locale): string {
  const map: Record<string, { en: string; zh: string }> = {
    created: { en: "Created", zh: "已创建" },
    payment_pending: { en: "Awaiting payment", zh: "待支付" },
    paid: { en: "Paid", zh: "已支付" },
    generation_pending: { en: "Queued", zh: "排队生成中" },
    generating: { en: "Generating", zh: "生成中" },
    completed: { en: "Completed", zh: "已完成" },
    generation_failed: { en: "Generation failed — retry available", zh: "生成失败——可重试" },
    refunded: { en: "Refunded", zh: "已退款" },
    partially_refunded: { en: "Partially refunded", zh: "已部分退款" },
    disputed: { en: "Disputed", zh: "争议中" },
  };
  return (map[status] ?? { en: status, zh: status })[lo];
}
