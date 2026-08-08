"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, Card } from "@/components/ui/card";
import type { Locale } from "@/lib/config";

export function AccessCodeForm({ locale, configured, active }: { locale: Locale; configured: boolean; active: boolean }) {
  const router = useRouter();
  const [code, setCode] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");

  async function redeem(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/access-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, locale }),
    }).catch(() => null);
    setBusy(false);
    if (!response?.ok) {
      const payload = await response?.json().catch(() => null);
      setError(
        payload?.error === "too_many_attempts"
          ? locale === "zh"
            ? "尝试次数过多，请 15 分钟后再试。"
            : "Too many attempts. Try again in 15 minutes."
          : locale === "zh"
            ? "访问码不正确。"
            : "That access code is not valid.",
      );
      return;
    }
    setCode("");
    router.refresh();
  }

  async function remove() {
    setBusy(true);
    await fetch("/api/access-code", { method: "DELETE" }).catch(() => null);
    setBusy(false);
    router.refresh();
  }

  if (active) {
    return (
      <Card className="max-w-xl border-el-wood/50">
        <Alert tone="success">
            {locale === "zh" ? "此 token 账号已在本浏览器登录，并启用无限访问。" : "This token account is signed in with unlimited access."}
        </Alert>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/tarot`}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-white hover:bg-primary-strong"
          >
            {locale === "zh" ? "开始使用" : "Start a reading"}
          </Link>
          <Button variant="outline" onClick={remove} disabled={busy}>
            {locale === "zh" ? "退出此 token 账号" : "Sign out of this token account"}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl">
      {!configured ? (
        <Alert tone="warn">
          {locale === "zh" ? "站长尚未配置访问码。" : "The site owner has not configured an access code yet."}
        </Alert>
      ) : (
        <form onSubmit={redeem} className="grid gap-4">
          <label htmlFor="access-code" className="text-sm font-medium">
            {locale === "zh" ? "专属 token" : "Personal token"}
          </label>
          <input
            id="access-code"
            type="password"
            autoComplete="off"
            spellCheck={false}
            maxLength={256}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="min-h-12 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 outline-none focus:border-primary"
          />
          {error && <Alert tone="warn">{error}</Alert>}
          <Button type="submit" disabled={busy || !code.trim()}>
            {busy ? (locale === "zh" ? "验证中…" : "Checking…") : locale === "zh" ? "使用 token 登录" : "Sign in with token"}
          </Button>
        </form>
      )}
    </Card>
  );
}
