import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { getSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignInPrompt } from "@/components/account/signin-prompt";

export const metadata = { robots: { index: false, follow: false } };

function consentKindLabel(kind: string, locale: Locale): string {
  switch (kind) {
    case "digital_delivery_waiver":
      return locale === "zh" ? "数字内容立即交付同意" : "Digital delivery waiver";
    case "journal_ai_optin":
      return locale === "zh" ? "手记 AI 个性化 · 开启" : "Journal AI personalization · enabled";
    case "journal_ai_optout":
      return locale === "zh" ? "手记 AI 个性化 · 关闭" : "Journal AI personalization · disabled";
    case "terms":
      return locale === "zh" ? "服务条款同意" : "Terms acceptance";
    default:
      return kind;
  }
}

function requestKindLabel(kind: string, locale: Locale): string {
  switch (kind) {
    case "export":
      return locale === "zh" ? "数据导出" : "Data export";
    case "deletion":
      return locale === "zh" ? "账户删除" : "Account deletion";
    default:
      return kind;
  }
}

function requestStatusLabel(status: string, locale: Locale): string {
  switch (status) {
    case "requested":
      return locale === "zh" ? "已提交" : "Requested";
    case "processing":
      return locale === "zh" ? "处理中" : "Processing";
    case "completed":
      return locale === "zh" ? "已完成" : "Completed";
    default:
      return status;
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getSessionUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {t(M.accountPrivacy, locale)}
        </h1>
        <div className="mt-8">
          <SignInPrompt locale={locale} />
        </div>
      </div>
    );
  }

  const [consents, requests] = await Promise.all([
    prisma.consentRecord.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
    prisma.dataRequest.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
  ]);

  const fmt = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {t(M.accountPrivacy, locale)}
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-[var(--fg-muted)]">
        {locale === "zh"
          ? "出生信息与手记只保存在你的账户中，绝不会出现在网址、统计数据或分享卡里；除非你明确开启，AI 也不会读取你的手记。详情见"
          : "Your birth details and journal stay in your account — never in URLs, analytics, or share cards — and AI never reads your journal unless you explicitly opt in. For details, see the "}
        <Link
          href={`/${locale}/legal/privacy`}
          className="text-[var(--accent)] underline underline-offset-4"
        >
          {t(M.legalPrivacy, locale)}
        </Link>
        {locale === "zh" ? "。" : "."}
      </p>

      <Card className="mt-8">
        <h2 className="font-display text-lg font-semibold">
          {locale === "zh" ? "导出你的数据" : "Export your data"}
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-muted)]">
          {locale === "zh"
            ? "以 JSON 格式下载你的档案、解读记录、手记与同意记录。"
            : "Download your profiles, readings, journal, and consent records as JSON."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/api/account/export" download>
            <Button>{t(M.exportData, locale)}</Button>
          </a>
          <a href="/api/journal/export" download>
            <Button variant="outline">{t(M.journalExport, locale)}</Button>
          </a>
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="font-display text-lg font-semibold">
          {locale === "zh" ? "同意记录" : "Consent records"}
        </h2>
        {consents.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--fg-muted)]">
            {locale === "zh" ? "暂无同意记录。" : "No consent records yet."}
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] text-[var(--fg-muted)]">
                  <th scope="col" className="py-2 pr-4 font-medium">
                    {locale === "zh" ? "类型" : "Kind"}
                  </th>
                  <th scope="col" className="py-2 pr-4 font-medium">
                    {locale === "zh" ? "措辞版本" : "Wording version"}
                  </th>
                  <th scope="col" className="py-2 font-medium">
                    {locale === "zh" ? "时间" : "Date"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {consents.map((c) => (
                  <tr key={c.id} className="border-b border-[var(--line)] last:border-b-0">
                    <td className="py-2.5 pr-4">{consentKindLabel(c.kind, locale)}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs">{c.wordingVersion}</td>
                    <td className="py-2.5 text-[var(--fg-muted)]">{fmt.format(c.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="mt-6">
        <h2 className="font-display text-lg font-semibold">
          {locale === "zh" ? "数据请求历史" : "Data request history"}
        </h2>
        {requests.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--fg-muted)]">
            {locale === "zh" ? "暂无数据请求。" : "No data requests yet."}
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-[var(--line)] text-sm">
            {requests.map((r) => (
              <li key={r.id} className="flex flex-wrap items-baseline justify-between gap-2 py-2.5">
                <span className="font-medium">{requestKindLabel(r.kind, locale)}</span>
                <span className="text-[var(--fg-muted)]">
                  {requestStatusLabel(r.status, locale)} · {fmt.format(r.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <p className="mt-6 text-sm text-[var(--fg-muted)]">
        {locale === "zh" ? "需要彻底删除数据？前往" : "Need to remove everything? Go to "}
        <Link
          href={`/${locale}/account/delete`}
          className="text-[var(--accent)] underline underline-offset-4"
        >
          {t(M.accountDelete, locale)}
        </Link>
        {locale === "zh" ? "。" : "."}
      </p>
    </div>
  );
}
