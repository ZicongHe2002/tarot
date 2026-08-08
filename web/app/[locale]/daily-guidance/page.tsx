import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { isLocale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/seo";
import { getSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DailyView } from "@/components/daily/daily-view";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/daily-guidance",
    title: t(M.dailyTitle, locale),
    description: t(M.homeDailyBody, locale),
  });
}

export default async function DailyGuidancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;

  const user = await getSessionUser();
  const profiles = user
    ? await prisma.birthProfile.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "asc" },
      })
    : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <div className="flex items-center gap-3">
        <CalendarDays className="h-7 w-7 text-gold" aria-hidden />
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t(M.dailyTitle, lo)}</h1>
      </div>
      <p className="mt-3 max-w-2xl leading-relaxed text-[var(--fg-muted)]">{t(M.homeDailyBody, lo)}</p>

      <div className="mt-8">
        {!user ? (
          <Card className="max-w-2xl">
            <p className="leading-relaxed">{t(M.dailyNeedsProfile, lo)}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/${lo}/account/signin`}>
                <Button>{t(M.signIn, lo)}</Button>
              </Link>
              <Link href={`/${lo}/account/profiles/new`}>
                <Button variant="outline">{t(M.ctaCreateProfile, lo)}</Button>
              </Link>
            </div>
          </Card>
        ) : profiles.length === 0 ? (
          <Card className="max-w-2xl">
            <p className="leading-relaxed">{t(M.dailyNeedsProfile, lo)}</p>
            <div className="mt-5">
              <Link href={`/${lo}/account/profiles/new`}>
                <Button>{t(M.ctaCreateProfile, lo)}</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <DailyView locale={lo} profiles={profiles.map((p) => ({ id: p.id, label: p.label }))} />
        )}
      </div>

      <p className="mt-10 max-w-2xl text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.disclaimerGeneral, lo)}</p>
    </div>
  );
}
