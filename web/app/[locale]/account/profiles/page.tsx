import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { getSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Badge, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignInPrompt } from "@/components/account/signin-prompt";
import { DeleteProfileButton } from "@/components/account/delete-profile-button";

export const metadata = { robots: { index: false, follow: false } };

function interestLabel(v: string, locale: Locale): string {
  switch (v) {
    case "tarot":
      return t(M.navTarot, locale);
    case "astrology":
      return t(M.navAstrology, locale);
    case "bazi":
      return t(M.navBazi, locale);
    default:
      return t(M.topicGeneral, locale);
  }
}

export default async function ProfilesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getSessionUser();

  const profiles = user
    ? await prisma.birthProfile.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "asc" },
      })
    : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t(M.accountProfiles, locale)}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--fg-muted)]">
            {t(M.profilePrivacyNote, locale)}
          </p>
        </div>
        {user && (
          <Link href={`/${locale}/account/profiles/new`}>
            <Button>{t(M.profileNew, locale)}</Button>
          </Link>
        )}
      </div>

      <div className="mt-8">
        {!user ? (
          <SignInPrompt locale={locale} />
        ) : profiles.length === 0 ? (
          <Card className="text-center">
            <p className="text-[var(--fg-muted)]">
              {locale === "zh"
                ? "还没有出生档案。创建第一份档案，即可解锁个性化的星盘、八字与每日指引。"
                : "No birth profiles yet. Create your first profile to unlock personalized charts, pillars, and daily guidance."}
            </p>
            <div className="mt-4">
              <Link href={`/${locale}/account/profiles/new`}>
                <Button>{t(M.ctaCreateProfile, locale)}</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <ul className="grid gap-4">
            {profiles.map((p) => (
              <li key={p.id}>
                <Card>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-lg font-semibold">{p.label}</h2>
                        <Badge tone="info">{interestLabel(p.primaryInterest, locale)}</Badge>
                        {p.timeKnown ? (
                          <Badge>{locale === "zh" ? `时间 ${p.time}` : `Time ${p.time}`}</Badge>
                        ) : (
                          <Badge tone="warn">
                            {locale === "zh" ? "时间未知" : "Time unknown"}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-[var(--fg-muted)]">
                        {p.dateISO}
                        {" · "}
                        {p.cityLabel ??
                          (locale === "zh"
                            ? `坐标 ${p.lat.toFixed(2)}, ${p.lon.toFixed(2)}`
                            : `Coordinates ${p.lat.toFixed(2)}, ${p.lon.toFixed(2)}`)}
                        {" · "}
                        {p.tz}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <Link href={`/${locale}/account/profiles/${p.id}`}>
                        <Button variant="outline" size="sm">
                          {t(M.edit, locale)}
                        </Button>
                      </Link>
                      <DeleteProfileButton id={p.id} locale={locale} />
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
