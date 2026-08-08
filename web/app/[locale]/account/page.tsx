import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { getSessionUser } from "@/lib/session";
import { Badge, Card } from "@/components/ui/card";
import { SignInPrompt } from "@/components/account/signin-prompt";
import { SignOutButton } from "@/components/account/signout-button";

export const metadata = { robots: { index: false, follow: false } };

function sections(locale: Locale, accessAccount: boolean) {
  return [
    {
      href: `/${locale}/account/profiles`,
      title: t(M.accountProfiles, locale),
      desc:
        locale === "zh"
          ? "管理用于解读的出生档案。"
          : "Manage the birth profiles your readings are based on.",
    },
    {
      href: `/${locale}/account/subscription`,
      title: t(M.accountSubscription, locale),
      desc:
        locale === "zh"
          ? "查看方案、续费与取消。"
          : "View your plan, renewal, and cancellation options.",
    },
    {
      href: `/${locale}/account/privacy`,
      title: t(M.accountPrivacy, locale),
      desc:
        locale === "zh"
          ? "导出数据，查看同意与数据请求记录。"
          : "Export your data and review consents and data requests.",
    },
    {
      href: `/${locale}/account/delete`,
      title: t(M.accountDelete, locale),
      desc:
        locale === "zh"
          ? "永久删除账户与个人数据。"
          : "Permanently delete your account and personal data.",
    },
  ].filter((section) => !accessAccount || !section.href.endsWith("/subscription"));
}

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getSessionUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {t(M.accountTitle, locale)}
      </h1>

      {!user ? (
        <div className="mt-8">
          <SignInPrompt locale={locale} />
        </div>
      ) : (
        <>
          <Card className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[var(--fg-muted)]">
                {user.authMethod === "access"
                  ? locale === "zh"
                    ? "Token 独立账号"
                    : "Independent token account"
                  : locale === "zh"
                    ? "登录邮箱"
                    : "Signed in as"}
              </p>
              <p className="mt-1 break-all font-medium">
                {user.authMethod === "access"
                  ? locale === "zh"
                    ? "档案与记录仅属于此 token"
                    : "Profiles and history belong only to this token"
                  : user.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone={user.role === "admin" ? "gold" : "default"}>
                {user.role === "admin"
                  ? locale === "zh"
                    ? "管理员"
                    : "Admin"
                  : locale === "zh"
                    ? "普通用户"
                    : "Member"}
              </Badge>
              <SignOutButton locale={locale} accessAccount={user.authMethod === "access"} />
            </div>
          </Card>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {sections(locale, user.authMethod === "access").map((s) => (
              <Link key={s.href} href={s.href} className="group block">
                <Card className="h-full transition-colors group-hover:border-primary/50">
                  <h2 className="font-display text-lg font-semibold">{s.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-muted)]">{s.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
