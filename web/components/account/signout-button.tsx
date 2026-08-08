"use client";

import * as React from "react";
import { signOut } from "next-auth/react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";

export function SignOutButton({ locale, accessAccount = false }: { locale: Locale; accessAccount?: boolean }) {
  const [busy, setBusy] = React.useState(false);
  return (
    <Button
      variant="outline"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          if (accessAccount) {
            await fetch("/api/access-code", { method: "DELETE" });
            window.location.href = `/${locale}/access`;
          } else {
            await signOut({ callbackUrl: "/" + locale });
          }
        } catch {
          setBusy(false);
        }
      }}
    >
      {busy ? (locale === "zh" ? "正在退出…" : "Signing out…") : t(M.signOut, locale)}
    </Button>
  );
}
