"use client";

// One-time report purchase (md §7.2): input → consent → payment → webhook
// confirms → generation. Pre-purchase disclosures shown before checkout.
import * as React from "react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Alert, Card } from "@/components/ui/card";
import { Checkbox, Label, Textarea, RadioGroup, RadioItem } from "@/components/ui/form";
import { BirthFields, birthPayload, type BirthValue } from "@/components/birth-fields";

export interface OrderProductInfo {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
}

const emptyBirth: BirthValue = { dateISO: "", timeKnown: true };

export function OrderFlow({ locale, product }: { locale: Locale; product: OrderProductInfo }) {
  const lo = locale;
  const [topic, setTopic] = React.useState("general");
  const [question, setQuestion] = React.useState("");
  const [birth, setBirth] = React.useState<BirthValue>(emptyBirth);
  const [birthB, setBirthB] = React.useState<BirthValue>(emptyBirth);
  const [sexA, setSexA] = React.useState("");
  const [sexB, setSexB] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [blocked, setBlocked] = React.useState(false);

  const needsBirth = product.slug === "natal-report" || product.slug === "bazi-report";
  const needsTwo = product.slug === "compatibility-report";
  const isTarot = product.slug === "tarot-deep-reading";

  function validate(): string | null {
    const need = (b: BirthValue) => !b.dateISO || (!b.cityId && !(b.lat !== undefined && b.lon !== undefined && b.tz));
    if (needsBirth && need(birth)) return lo === "zh" ? "请填写出生日期与地点。" : "Please complete the birth date and place.";
    if (needsTwo && (need(birth) || need(birthB)))
      return lo === "zh" ? "请填写双方的出生日期与地点。" : "Please complete birth details for both people.";
    if (!consent) return lo === "zh" ? "请先勾选同意立即交付。" : "Please tick the immediate-delivery consent first.";
    return null;
  }

  async function pay() {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setBusy(true);
    setError(null);
    const input = isTarot
      ? { topic, question: question || undefined }
      : needsTwo
        ? { a: { ...birthPayload(birth), sex: (sexA || null) as "male" | "female" | null }, b: { ...birthPayload(birthB), sex: (sexB || null) as "male" | "female" | null } }
        : { birth: { ...birthPayload(birth), sex: (sexA || null) as "male" | "female" | null } };
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "one_time", locale: lo, productSlug: product.slug, consent, input }),
    });
    setBusy(false);
    if (res.status === 503) {
      setError(
        lo === "zh"
          ? "支付尚未配置（需要 STRIPE_SECRET_KEY，或在开发环境设置 DEV_FAKE_PAYMENTS=1）。"
          : "Payments are not configured (set STRIPE_SECRET_KEY, or DEV_FAKE_PAYMENTS=1 in development)."
      );
      return;
    }
    const j = await res.json().catch(() => null);
    if (j?.blocked) {
      setBlocked(true);
      return;
    }
    if (j?.url) {
      window.location.href = j.url;
      return;
    }
    setError(t(M.errorGeneric, lo));
  }

  if (blocked) {
    return (
      <Alert tone="info" className="max-w-2xl">
        {t(M.crisisNotice, lo)}
        <p className="mt-2 text-sm">{lo === "zh" ? "未产生任何扣费。" : "You were not charged."}</p>
      </Alert>
    );
  }

  const topics = [
    { value: "love", label: t(M.topicLove, lo) },
    { value: "career", label: t(M.topicCareer, lo) },
    { value: "growth", label: t(M.topicGrowth, lo) },
    { value: "general", label: t(M.topicGeneral, lo) },
  ];

  return (
    <Card className="max-w-2xl">
      {isTarot && (
        <>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">{t(M.tarotTopicLabel, lo)}</legend>
            <RadioGroup value={topic} onValueChange={setTopic} className="sm:grid-cols-2">
              {topics.map((tp) => (
                <RadioItem key={tp.value} value={tp.value}>
                  {tp.label}
                </RadioItem>
              ))}
            </RadioGroup>
          </fieldset>
          <div className="mt-4">
            <Label htmlFor="order-q">{t(M.tarotQuestionLabel, lo)}</Label>
            <Textarea
              id="order-q"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t(M.tarotQuestionPlaceholder, lo)}
              maxLength={2000}
              aria-describedby="order-q-note"
            />
            <p id="order-q-note" className="mt-1.5 text-xs text-[var(--fg-muted)]">
              {t(M.aiInputNotice, lo)}
            </p>
          </div>
        </>
      )}

      {(needsBirth || needsTwo) && (
        <div className="grid gap-6">
          <div>
            {needsTwo && <h2 className="font-display mb-3 text-lg font-semibold">{t(M.compatPersonA, lo)}</h2>}
            <BirthFields locale={lo} value={birth} onChange={setBirth} idPrefix="oa" />
            {(product.slug === "bazi-report" || needsTwo) && (
              <fieldset className="mt-3">
                <legend className="mb-2 text-sm font-medium">
                  {t(M.baziSexLabel, lo)} <span className="font-normal text-[var(--fg-muted)]">({t(M.optional, lo)})</span>
                </legend>
                <RadioGroup value={sexA} onValueChange={setSexA} className="sm:grid-cols-2">
                  <RadioItem value="male">{lo === "zh" ? "男" : "Male"}</RadioItem>
                  <RadioItem value="female">{lo === "zh" ? "女" : "Female"}</RadioItem>
                </RadioGroup>
              </fieldset>
            )}
          </div>
          {needsTwo && (
            <div>
              <h2 className="font-display mb-3 text-lg font-semibold">{t(M.compatPersonB, lo)}</h2>
              <BirthFields locale={lo} value={birthB} onChange={setBirthB} idPrefix="ob" />
              <fieldset className="mt-3">
                <legend className="mb-2 text-sm font-medium">
                  {t(M.baziSexLabel, lo)} <span className="font-normal text-[var(--fg-muted)]">({t(M.optional, lo)})</span>
                </legend>
                <RadioGroup value={sexB} onValueChange={setSexB} className="sm:grid-cols-2">
                  <RadioItem value="male">{lo === "zh" ? "男" : "Male"}</RadioItem>
                  <RadioItem value="female">{lo === "zh" ? "女" : "Female"}</RadioItem>
                </RadioGroup>
              </fieldset>
            </div>
          )}
        </div>
      )}

      {/* Pre-purchase disclosures (spec §15): price, delivery, refunds, consent. */}
      <div className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-medium">{product.name}</p>
          <p className="font-display text-2xl">${(product.priceCents / 100).toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">{product.description}</p>
        <p className="mt-2 text-xs text-[var(--fg-muted)]">
          {lo === "zh" ? "一次性付款，非订阅。支付确认后立即开始生成。" : "One-time payment, not a subscription. Generation starts right after payment is confirmed."}{" "}
          {t(M.checkoutRefundNote, lo)}
        </p>
        <div className="mt-3 flex items-start gap-2.5">
          <Checkbox id="consent" checked={consent} onCheckedChange={(c) => setConsent(c === true)} />
          <label htmlFor="consent" className="cursor-pointer text-sm leading-snug">
            {t(M.checkoutConsentLabel, lo)}
          </label>
        </div>
      </div>

      {error && (
        <Alert tone="warn" className="mt-4">
          {error}
        </Alert>
      )}

      <div className="mt-5">
        <Button size="lg" onClick={pay} disabled={busy}>
          {busy ? t(M.loading, lo) : t(M.checkoutPayButton, lo)}
        </Button>
      </div>
      <p className="mt-3 text-xs text-[var(--fg-muted)]">{t(M.disclosureAi, lo)}</p>
    </Card>
  );
}
