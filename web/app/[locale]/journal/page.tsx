import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { getSessionUser } from "@/lib/session";
import { SignInPrompt } from "@/components/account/signin-prompt";
import { JournalList } from "@/components/journal/journal-list";

export const metadata = { robots: { index: false, follow: false } };

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getSessionUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {t(M.journalTitle, locale)}
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--fg-muted)]">{t(M.journalIntro, locale)}</p>
      <div className="mt-8">
        {user ? <JournalList locale={locale} /> : <SignInPrompt locale={locale} />}
      </div>
    </div>
  );
}
