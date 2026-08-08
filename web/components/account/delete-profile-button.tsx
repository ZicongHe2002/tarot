"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { deleteProfile } from "@/app/[locale]/account/profiles/actions";

/** Two-step confirm delete for a birth profile (no accidental one-click loss). */
export function DeleteProfileButton({ id, locale }: { id: string; locale: Locale }) {
  const router = useRouter();
  const [arming, setArming] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  if (!arming) {
    return (
      <Button variant="outline" size="sm" onClick={() => setArming(true)}>
        {t(M.delete, locale)}
      </Button>
    );
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className="text-sm text-[var(--fg-muted)]">
        {locale === "zh" ? "确定删除该档案？" : "Delete this profile?"}
      </span>
      <Button
        variant="danger"
        size="sm"
        disabled={pending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            const res = await deleteProfile(id, locale);
            if ("error" in res) {
              setError(locale === "zh" ? "删除失败，请重试。" : "Could not delete. Please try again.");
            } else {
              router.refresh();
            }
          });
        }}
      >
        {pending ? (locale === "zh" ? "删除中…" : "Deleting…") : t(M.confirm, locale)}
      </Button>
      <Button variant="ghost" size="sm" disabled={pending} onClick={() => setArming(false)}>
        {t(M.cancel, locale)}
      </Button>
      {error && (
        <span role="alert" className="text-sm text-el-fire">
          {error}
        </span>
      )}
    </span>
  );
}
