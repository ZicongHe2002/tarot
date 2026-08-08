import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccessCodeForm } from "@/components/access-code-form";
import { hasAccessCodeGrant, isAccessCodeConfigured } from "@/lib/access-code";
import { isLocale } from "@/lib/config";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const zh = locale === "zh";
  return {
    title: zh ? "Token 登录" : "Token sign-in",
    description: zh ? "使用站长提供的 token 登录独立账号。" : "Sign in to a separate account with a token from the site owner.",
    robots: { index: false, follow: false },
  };
}

export default async function AccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const configured = isAccessCodeConfigured();
  const active = configured && (await hasAccessCodeGrant());

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {locale === "zh" ? "使用 token 登录" : "Sign in with a token"}
      </h1>
      <p className="mt-3 max-w-xl text-[var(--fg-muted)]">
        {locale === "zh"
          ? "每个 token 对应一个独立账号，保存自己的档案、手记和解读记录，并可不限次数使用 AI 解读。请像保管密码一样保管 token。"
          : "Each token opens a separate account with its own profiles, journal, and reading history, plus unlimited AI interpretations. Treat the token like a password."}
      </p>
      <div className="mt-8">
        <AccessCodeForm locale={locale} configured={configured} active={active} />
      </div>
    </div>
  );
}
