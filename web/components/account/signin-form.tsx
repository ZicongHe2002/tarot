"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Alert, Card } from "@/components/ui/card";
import { FieldError, Input, Label } from "@/components/ui/form";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignInForm({
  locale,
  googleEnabled,
  devHint,
}: {
  locale: Locale;
  googleEnabled: boolean;
  devHint: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [fieldError, setFieldError] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [sending, setSending] = React.useState(false);
  const callbackUrl = "/" + locale + "/account";

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setFieldError(
        locale === "zh" ? "请输入有效的邮箱地址。" : "Please enter a valid email address."
      );
      return;
    }
    setFieldError(null);
    setSending(true);
    try {
      const res = await signIn("resend", { email: trimmed, callbackUrl, redirect: false });
      if (res?.error) {
        setSubmitError(
          locale === "zh"
            ? "登录链接发送失败，请稍后重试。"
            : "We could not send the sign-in link. Please try again."
        );
        setSending(false);
        return;
      }
      router.push(`/${locale}/account/check-email`);
    } catch {
      setSubmitError(
        locale === "zh"
          ? "登录链接发送失败，请稍后重试。"
          : "We could not send the sign-in link. Please try again."
      );
      setSending(false);
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <form onSubmit={submitEmail} noValidate>
        <Label htmlFor="signin-email">{t(M.signInEmailLabel, locale)}</Label>
        <Input
          id="signin-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-invalid={!!fieldError}
          aria-describedby={fieldError ? "signin-email-err" : undefined}
        />
        <FieldError id="signin-email-err">{fieldError}</FieldError>
        <Button type="submit" className="mt-4 w-full" disabled={sending}>
          {sending
            ? locale === "zh"
              ? "发送中…"
              : "Sending…"
            : t(M.signInEmailButton, locale)}
        </Button>
      </form>

      {submitError && (
        <Alert tone="warn" className="mt-4">
          {submitError}
        </Alert>
      )}

      {googleEnabled && (
        <>
          <div className="my-5 flex items-center gap-3 text-xs text-[var(--fg-muted)]" aria-hidden>
            <span className="h-px flex-1 bg-[var(--line)]" />
            {locale === "zh" ? "或" : "or"}
            <span className="h-px flex-1 bg-[var(--line)]" />
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl })}
          >
            {t(M.signInGoogle, locale)}
          </Button>
        </>
      )}

      <p className="mt-5 text-xs leading-relaxed text-[var(--fg-muted)]">
        {locale === "zh"
          ? "首次使用同一邮箱登录即自动创建账户。"
          : "Signing in with a new email creates your account automatically."}
      </p>

      {devHint && (
        <Alert tone="info" className="mt-4 text-xs">
          {locale === "zh"
            ? "开发模式：未配置 RESEND_API_KEY 时，登录链接会打印到服务器控制台，也可通过 "
            : "Dev mode: without RESEND_API_KEY, the sign-in link is printed to the server console and is also available at "}
          <code className="break-all">/api/dev/magic-link?email=…</code>
          {locale === "zh" ? " 获取。" : "."}
        </Alert>
      )}
    </Card>
  );
}
