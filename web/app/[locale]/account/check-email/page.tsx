import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Alert, Card } from "@/components/ui/card";

export const metadata = { robots: { index: false, follow: false } };

export default async function CheckEmailPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const devHint = process.env.NODE_ENV !== "production" && !process.env.RESEND_API_KEY;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <Card className="mx-auto max-w-md text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {t(M.checkEmailTitle, locale)}
        </h1>
        <p className="mt-3 leading-relaxed text-[var(--fg-muted)]">{t(M.checkEmailBody, locale)}</p>
        {devHint && (
          <Alert tone="info" className="mt-6 text-left text-xs">
            {locale === "zh"
              ? "开发模式：未配置 RESEND_API_KEY 时，登录链接会打印到服务器控制台，也可通过 "
              : "Dev mode: without RESEND_API_KEY, the sign-in link is printed to the server console and is also available at "}
            <code className="break-all">/api/dev/magic-link?email=…</code>
            {locale === "zh" ? " 获取。" : "."}
          </Alert>
        )}
      </Card>
    </div>
  );
}
