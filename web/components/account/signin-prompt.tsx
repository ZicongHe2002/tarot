import Link from "next/link";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { isAccessCodeConfigured } from "@/lib/access-code";

/** Server-safe block shown on auth-required pages when no session exists. */
export function SignInPrompt({ locale }: { locale: Locale }) {
  const tokenEnabled = isAccessCodeConfigured();
  return (
    <Card className="mx-auto max-w-xl text-center">
      <h2 className="font-display text-xl font-semibold">{t(M.signInTitle, locale)}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
        {locale === "zh"
          ? tokenEnabled
            ? "使用你的专属 token 登录，即可查看自己的档案与记录。"
            : "登录后即可查看这一页。"
          : tokenEnabled
            ? "Sign in with your personal token to view your profiles and history."
            : "Sign in to view this page."}
      </p>
      <div className="mt-5">
        <Link href={tokenEnabled ? `/${locale}/access` : `/${locale}/account/signin`}>
          <Button>{tokenEnabled ? (locale === "zh" ? "Token 登录" : "Token sign-in") : t(M.signIn, locale)}</Button>
        </Link>
      </div>
    </Card>
  );
}
