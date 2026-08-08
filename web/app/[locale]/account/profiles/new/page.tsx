import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { getSessionUser } from "@/lib/session";
import { SignInPrompt } from "@/components/account/signin-prompt";
import { ProfileForm } from "@/components/account/profile-form";

export const metadata = { robots: { index: false, follow: false } };

export default async function NewProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getSessionUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <a href={`/${locale}/account/profiles`} className="hover:underline">
              {t(M.accountProfiles, locale)}
            </a>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{t(M.profileNew, locale)}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {t(M.profileNew, locale)}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--fg-muted)]">
        {locale === "zh"
          ? "填写一次出生信息，塔罗、占星、八字与每日指引都会使用同一份档案。"
          : "Enter your birth details once — tarot, astrology, BaZi, and daily guidance all read from the same profile."}
      </p>
      <div className="mt-8">
        {!user ? <SignInPrompt locale={locale} /> : <ProfileForm locale={locale} />}
      </div>
    </div>
  );
}
