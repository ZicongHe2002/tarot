import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { getSessionUser } from "@/lib/session";
import { Alert, Card } from "@/components/ui/card";
import { SignInPrompt } from "@/components/account/signin-prompt";
import { DeleteAccount } from "@/components/account/delete-account";

export const metadata = { robots: { index: false, follow: false } };

export default async function DeleteAccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getSessionUser();

  const deleted =
    locale === "zh"
      ? ["出生档案与出生数据", "塔罗、占星、八字与每日指引记录", "手记与收藏", "同意记录与登录信息"]
      : [
          "Birth profiles and birth data",
          "Tarot, astrology, BaZi, and daily guidance records",
          "Journal entries and favorites",
          "Consent records and sign-in details",
        ];
  const retained =
    locale === "zh"
      ? ["会计与税务所需的订单及付款记录（匿名化保留，不再关联到你）"]
      : ["Order and payment records required for accounting and tax (kept anonymized, no longer linked to you)"];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {t(M.deleteConfirmTitle, locale)}
      </h1>

      {!user ? (
        <div className="mt-8">
          <SignInPrompt locale={locale} />
        </div>
      ) : (
        <>
          <Alert tone="warn" className="mt-6 max-w-xl">
            {t(M.deleteConfirmBody, locale)}
          </Alert>

          <div className="mt-6 grid max-w-xl gap-4 sm:grid-cols-2">
            <Card>
              <h2 className="text-sm font-semibold">
                {locale === "zh" ? "将被删除" : "What is deleted"}
              </h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--fg-muted)]">
                {deleted.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="text-sm font-semibold">
                {locale === "zh" ? "将被保留" : "What is retained"}
              </h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--fg-muted)]">
                {retained.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="mt-6">
            <DeleteAccount locale={locale} />
          </div>
        </>
      )}
    </div>
  );
}
