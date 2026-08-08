import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { getSessionUser } from "@/lib/session";
import { Alert } from "@/components/ui/card";
import { SignInForm } from "@/components/account/signin-form";

export const metadata = { robots: { index: false, follow: false } };

export default async function SignInPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getSessionUser();
  // Server component reads env and passes plain booleans to the client form.
  const googleEnabled = !!process.env.GOOGLE_CLIENT_ID;
  const devHint = process.env.NODE_ENV !== "production" && !process.env.RESEND_API_KEY;
  const devLogin = process.env.NODE_ENV !== "production";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <h1 className="text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {t(M.signInTitle, locale)}
      </h1>
      <div className="mt-8">
        {user ? (
          <Alert tone="success" className="mx-auto max-w-md">
            {locale === "zh" ? "你已登录为 " : "You are already signed in as "}
            <span className="font-medium break-all">{user.email}</span>
            {locale === "zh" ? "。" : "."}{" "}
            <Link
              href={`/${locale}/account`}
              className="text-[var(--accent)] underline underline-offset-4"
            >
              {t(M.accountTitle, locale)}
            </Link>
          </Alert>
        ) : (
          <>
            <SignInForm locale={locale} googleEnabled={googleEnabled} devHint={devHint} />
            {devLogin && (
              <div className="mx-auto mt-6 max-w-md rounded-xl border border-dashed border-[var(--line)] bg-[var(--bg-raised)] p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--fg-muted)]">
                  {locale === "zh" ? "开发测试" : "Development only"}
                </p>
                <p className="mt-1 text-sm text-[var(--fg-muted)]">
                  {locale === "zh"
                    ? "一键登录测试账号（含出生档案与手记）。"
                    : "One-click login as a test member (has a birth profile + journal)."}
                </p>
                <div className="mt-3 flex justify-center gap-2">
                  <a
                    href={`/api/dev/login?as=test&locale=${locale}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-white hover:bg-primary-strong"
                  >
                    {locale === "zh" ? "登录为测试用户" : "Log in as test user"}
                  </a>
                  <a
                    href={`/api/dev/login?as=admin&locale=${locale}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 text-sm font-medium hover:bg-[var(--bg)]"
                  >
                    {locale === "zh" ? "管理员" : "Admin"}
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
