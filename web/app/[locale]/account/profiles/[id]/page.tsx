import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { getSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { SignInPrompt } from "@/components/account/signin-prompt";
import { ProfileForm } from "@/components/account/profile-form";

export const metadata = { robots: { index: false, follow: false } };

export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getSessionUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {t(M.accountProfiles, locale)}
        </h1>
        <div className="mt-8">
          <SignInPrompt locale={locale} />
        </div>
      </div>
    );
  }

  // Ownership check server-side; unknown or foreign ids 404 (spec §18).
  const profile = await prisma.birthProfile.findFirst({ where: { id, userId: user.id } });
  if (!profile) notFound();

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
          <li aria-current="page">{profile.label}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {locale === "zh" ? "编辑档案" : "Edit profile"}
      </h1>
      <div className="mt-8">
        <ProfileForm
          locale={locale}
          profileId={profile.id}
          initial={{
            label: profile.label,
            dateISO: profile.dateISO,
            time: profile.time ?? undefined,
            timeKnown: profile.timeKnown,
            cityId: profile.cityId ?? undefined,
            lat: profile.lat,
            lon: profile.lon,
            tz: profile.tz,
            sex: profile.sex ?? undefined,
            primaryInterest: profile.primaryInterest,
          }}
        />
      </div>
    </div>
  );
}
