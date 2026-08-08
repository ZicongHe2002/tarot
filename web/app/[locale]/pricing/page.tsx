import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isLocale, LOCALES } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { Card, Alert } from "@/components/ui/card";
import { SubscribeButtons } from "@/components/payments/subscribe-buttons";
import { isAccessCodeConfigured } from "@/lib/access-code";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/pricing",
    title: t(M.pricingTitle, locale),
    description:
      locale === "zh"
        ? "免费方案、高级会员与单次深度报告——价格透明，随时在线取消。"
        : "Free plan, Premium membership, and one-time deep reports — transparent pricing, cancel online anytime.",
  });
}

export const dynamic = "force-dynamic"; // prices are DB configuration

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;

  const premium = await prisma.product.findUnique({
    where: { slug: "premium" },
    include: { prices: { where: { active: true } } },
  });
  const monthly = premium?.prices.find((p) => p.interval === "month");
  const annual = premium?.prices.find((p) => p.interval === "year");
  const reports = await prisma.product.findMany({
    where: { kind: "one_time", active: true },
    include: { prices: { where: { active: true } } },
    orderBy: { slug: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.pricingTitle, lo)}</h1>

      {isAccessCodeConfigured() && (
        <Alert tone="success" className="mt-6 max-w-3xl">
          {lo === "zh" ? "已有专属 token？" : "Have a personal token?"}{" "}
          <Link href={`/${lo}/access`} className="font-medium underline underline-offset-4">
            {lo === "zh" ? "登录独立账号并解锁不限次数使用" : "Sign in to your account and unlock unlimited use"}
          </Link>
        </Alert>
      )}

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Card>
          <h2 className="font-display text-xl font-semibold">{t(M.pricingFree, lo)}</h2>
          <p className="font-display mt-2 text-4xl">$0</p>
          <ul className="mt-4 grid gap-2 text-sm text-[var(--fg-muted)]">
            <li>· {lo === "zh" ? "每日一牌（免费，每天一次）" : "Daily tarot card (free, once a day)"}</li>
            <li>· {lo === "zh" ? "星盘与八字排盘不限次" : "Unlimited chart & pillar calculation"}</li>
            <li>· {lo === "zh" ? "每月 3 次 AI 解读" : "3 AI interpretations per month"}</li>
          </ul>
        </Card>

        <Card className="border-gold/60">
          <h2 className="font-display text-xl font-semibold">{t(M.pricingPremium, lo)}</h2>
          <p className="font-display mt-2 text-4xl">
            {monthly ? `$${(monthly.unitAmountCents / 100).toFixed(2)}` : "—"}
            <span className="text-base text-[var(--fg-muted)]"> / {t(M.pricingMonthly, lo)}</span>
          </p>
          {annual && (
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {lo === "zh" ? "或" : "or"} ${(annual.unitAmountCents / 100).toFixed(2)} / {t(M.pricingAnnual, lo)}
            </p>
          )}
          <ul className="mt-4 grid gap-2 text-sm text-[var(--fg-muted)]">
            <li>· {lo === "zh" ? "不限次 AI 解读" : "Unlimited AI interpretations"}</li>
            <li>· {lo === "zh" ? "每日个性化指引" : "Personalized daily guidance"}</li>
            <li>· {lo === "zh" ? "手记与主题洞察" : "Journal & theme insights"}</li>
          </ul>
          {monthly && annual && <SubscribeButtons locale={lo} monthlyPriceId={monthly.id} annualPriceId={annual.id} />}
          <p className="mt-3 text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.checkoutRenewalNote, lo)}</p>
        </Card>

        <Card>
          <h2 className="font-display text-xl font-semibold">{t(M.pricingReports, lo)}</h2>
          <ul className="mt-4 grid gap-3">
            {reports.map((r) => {
              const price = r.prices.find((p) => !p.interval);
              return (
                <li key={r.slug} className="flex items-center justify-between gap-3 text-sm">
                  <span>{JSON.parse(r.nameJson)[lo]}</span>
                  <span className="flex items-center gap-3 whitespace-nowrap">
                    <span className="font-display text-base">${((price?.unitAmountCents ?? 0) / 100).toFixed(2)}</span>
                    <Link
                      href={`/${lo}/order/${r.slug}`}
                      className="rounded-full border border-[var(--line)] px-3 py-1.5 font-medium hover:border-gold/60"
                    >
                      {lo === "zh" ? "购买" : "Buy"}
                    </Link>
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Alert tone="info" className="mt-8 max-w-4xl">
        <ul className="grid gap-1.5">
          <li>{t(M.checkoutRenewalNote, lo)}</li>
          <li>{t(M.checkoutRefundNote, lo)}</li>
          <li>
            {lo === "zh" ? "详见" : "See the"}{" "}
            <Link href={`/${lo}/legal/subscriptions`} className="underline underline-offset-4">
              {t(M.legalSubs, lo)}
            </Link>{" "}
            {lo === "zh" ? "与" : "and"}{" "}
            <Link href={`/${lo}/legal/refunds`} className="underline underline-offset-4">
              {t(M.legalRefunds, lo)}
            </Link>
            .
          </li>
        </ul>
      </Alert>

      <p className="mt-6 max-w-4xl text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.disclaimerGeneral, lo)}</p>
    </div>
  );
}
