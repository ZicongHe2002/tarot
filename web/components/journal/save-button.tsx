"use client";

import * as React from "react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";

export function SaveToJournal({
  locale,
  kind,
  refId,
  title,
}: {
  locale: Locale;
  kind: string;
  refId: string;
  title: string;
}) {
  const [state, setState] = React.useState<"idle" | "saving" | "saved" | "signin">("idle");

  async function save() {
    setState("saving");
    const res = await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, refId, title }),
    });
    if (res.status === 401) {
      setState("signin");
      return;
    }
    setState(res.ok ? "saved" : "idle");
  }

  if (state === "signin") {
    return (
      <p className="text-sm text-[var(--fg-muted)]">
        <a className="text-[var(--accent)] underline underline-offset-4" href={`/${locale}/account/signin`}>
          {t(M.signIn, locale)}
        </a>{" "}
        · {t(M.saveToJournal, locale)}
      </p>
    );
  }
  return (
    <div>
      <Button variant="secondary" onClick={save} disabled={state !== "idle"}>
        {state === "saved" ? t(M.savedToJournal, locale) : t(M.saveToJournal, locale)}
      </Button>
    </div>
  );
}
