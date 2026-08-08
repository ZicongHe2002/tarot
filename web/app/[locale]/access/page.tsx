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
    title: zh ? "访问码" : "Access code",
    description: zh ? "使用站长提供的访问码解锁无限解读。" : "Unlock unlimited interpretations with a site access code.",
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
        {locale === "zh" ? "使用访问码" : "Use an access code"}
      </h1>
      <p className="mt-3 max-w-xl text-[var(--fg-muted)]">
        {locale === "zh"
          ? "输入站长提供的访问码，即可在此浏览器不限次数使用 AI 解读。"
          : "Enter a code from the site owner to use AI interpretations without a monthly limit in this browser."}
      </p>
      <div className="mt-8">
        <AccessCodeForm locale={locale} configured={configured} active={active} />
      </div>
    </div>
  );
}
