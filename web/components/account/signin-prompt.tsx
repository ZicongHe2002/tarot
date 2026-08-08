import Link from "next/link";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/** Server-safe block shown on auth-required pages when no session exists. */
export function SignInPrompt({ locale }: { locale: Locale }) {
  return (
    <Card className="mx-auto max-w-xl text-center">
      <h2 className="font-display text-xl font-semibold">{t(M.signInTitle, locale)}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
        {locale === "zh"
          ? "登录后即可查看这一页。只需邮箱即可登录，无需设置密码。"
          : "Sign in to view this page. All you need is your email — no password required."}
      </p>
      <div className="mt-5">
        <Link href={`/${locale}/account/signin`}>
          <Button>{t(M.signIn, locale)}</Button>
        </Link>
      </div>
    </Card>
  );
}
