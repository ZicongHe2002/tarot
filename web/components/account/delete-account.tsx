"use client";

import * as React from "react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Alert, Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/form";

export function DeleteAccount({ locale }: { locale: Locale }) {
  const lo = locale;
  const [word, setWord] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const ready = word === "DELETE";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: "DELETE" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      // Session is gone — full reload to the localized home page.
      window.location.href = "/" + lo;
    } catch {
      setError(
        lo === "zh"
          ? "注销失败。请刷新页面后重试；若持续失败请联系我们。"
          : "Deletion failed. Please refresh and try again; contact us if it keeps failing."
      );
      setBusy(false);
    }
  }

  return (
    <Card className="max-w-xl border-el-fire/40">
      <form onSubmit={submit} noValidate>
        <Label htmlFor="delete-word">{t(M.deleteConfirmWord, lo)}</Label>
        <Input
          id="delete-word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          aria-describedby="delete-word-hint"
          placeholder="DELETE"
        />
        <p id="delete-word-hint" className="mt-1.5 text-xs text-[var(--fg-muted)]">
          {lo === "zh"
            ? "为防止误操作，请输入大写的 DELETE。"
            : "To prevent accidents, type DELETE in capital letters."}
        </p>
        {error && (
          <Alert tone="warn" className="mt-4">
            {error}
          </Alert>
        )}
        <Button type="submit" variant="danger" className="mt-5" disabled={!ready || busy}>
          {busy
            ? lo === "zh"
              ? "正在删除…"
              : "Deleting…"
            : t(M.accountDelete, lo)}
        </Button>
      </form>
    </Card>
  );
}
