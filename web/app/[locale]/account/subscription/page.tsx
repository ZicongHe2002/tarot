import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { getSessionUser } from "@/lib/session";
import { SubscriptionManager } from "@/components/payments/subscription-manager";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function SubscriptionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  const user = await getSessionUser();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <Link href={`/${lo}/account`} className="hover:underline">{t(M.accountTitle, lo)}</Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{t(M.accountSubscription, lo)}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.accountSubscription, lo)}</h1>
      {!user ? (
        <div className="mt-8">
          <p className="text-[var(--fg-muted)]">{t(M.signInTitle, lo)}</p>
          <Link href={`/${lo}/account/signin`} className="mt-4 inline-block">
            <Button>{t(M.signIn, lo)}</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <SubscriptionManager locale={lo} />
        </div>
      )}
    </div>
  );
}
