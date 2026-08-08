import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, Star, Compass, Shield, BookOpen, Heart, NotebookPen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { isLocale, LOCALES, BRAND, TAGLINE, env } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { Card, Badge, Alert } from "@/components/ui/card";
import { ARTICLES } from "@/content/articles";

// Product prices are database configuration. Keeping the home page dynamic
// also lets a fresh Render service build before its database is initialized.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "",
    title: t(M.heroTitle, locale),
    description: t(M.heroSub, locale),
  });
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-6xl px-4 py-12 sm:py-16 ${className}`}>{children}</section>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">{children}</h2>;
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;

  const premium = await prisma.product.findUnique({ where: { slug: "premium" }, include: { prices: true } });
  const monthly = premium?.prices.find((p) => p.interval === "month");
  const annual = premium?.prices.find((p) => p.interval === "year");
  const reports = await prisma.product.findMany({
    where: { kind: "one_time", active: true },
    include: { prices: { where: { active: true } } },
    take: 4,
  });

  const org = jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: BRAND[lo], url: env.appBaseUrl() },
      { "@type": "WebSite", name: BRAND[lo], url: `${env.appBaseUrl()}/${lo}`, inLanguage: lo === "zh" ? "zh-Hans" : "en" },
    ],
  });

  const tools = [
    { href: `/${lo}/tarot`, icon: Sparkles, title: t(M.navTarot, lo), body: t(M.homeTarotCard, lo), cta: t(M.ctaDrawCard, lo) },
    { href: `/${lo}/astrology`, icon: Star, title: t(M.navAstrology, lo), body: t(M.homeAstroCard, lo), cta: t(M.ctaBirthChart, lo) },
    { href: `/${lo}/bazi`, icon: Compass, title: t(M.navBazi, lo), body: t(M.homeBaziCard, lo), cta: t(M.ctaExploreBazi, lo) },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: org }} />

      {/* 1 — Hero (dark celestial section) */}
      <section className="dark relative overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
        <CelestialBackdrop />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="mb-3 text-sm tracking-widest text-gold-soft uppercase">{TAGLINE[lo]}</p>
          <h1 className="font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t(M.heroTitle, lo)}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">{t(M.heroSub, lo)}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/${lo}/account/profiles/new`}
              className="inline-flex min-h-12 items-center rounded-full bg-gold px-7 text-base font-medium text-midnight hover:bg-gold-soft"
            >
              {t(M.ctaCreateProfile, lo)}
            </Link>
            <Link
              href={`/${lo}/tarot/daily`}
              className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 text-sm hover:bg-white/10"
            >
              {t(M.ctaDrawCard, lo)}
            </Link>
            <Link
              href={`/${lo}/astrology/birth-chart`}
              className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 text-sm hover:bg-white/10"
            >
              {t(M.ctaBirthChart, lo)}
            </Link>
            <Link
              href={`/${lo}/bazi/calculator`}
              className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 text-sm hover:bg-white/10"
            >
              {t(M.ctaExploreBazi, lo)}
            </Link>
          </div>
        </div>
      </section>

      {/* 2 — Three tool cards */}
      <Section>
        <H2>{t(M.homeToolsTitle, lo)}</H2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.href} className="flex flex-col">
              <tool.icon className="h-6 w-6 text-gold" aria-hidden />
              <h3 className="font-display mt-3 text-xl font-semibold">{tool.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">{tool.body}</p>
              <Link href={tool.href} className="mt-4 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
                {tool.cta} →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* 3 — Profile preview */}
      <Section className="border-y border-[var(--line)]">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <H2>{t(M.homeProfileTitle, lo)}</H2>
            <p className="mt-3 max-w-xl leading-relaxed text-[var(--fg-muted)]">{t(M.homeProfileBody, lo)}</p>
            <p className="mt-3 text-sm text-[var(--fg-muted)]">{t(M.profilePrivacyNote, lo)}</p>
            <Link href={`/${lo}/account/profiles/new`} className="mt-5 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
              {t(M.ctaCreateProfile, lo)} →
            </Link>
          </div>
          <ProfilePreview lo={lo} />
        </div>
      </Section>

      {/* 4 — Daily guidance preview */}
      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Card className="order-2 lg:order-1">
            <Badge tone="gold">{t(M.dailyTheme, lo)}</Badge>
            <p className="font-display mt-3 text-lg">
              {lo === "zh" ? "把注意力放回可控的事情上" : "Return attention to what you can influence"}
            </p>
            <dl className="mt-4 grid gap-2 text-sm text-[var(--fg-muted)]">
              <div className="flex gap-2"><dt className="font-medium text-[var(--fg)]">{t(M.dailyAstroLens, lo)}:</dt><dd>{lo === "zh" ? "水星视角提示沟通宜慢不宜急。" : "A Mercury lens favors slower, clearer conversations."}</dd></div>
              <div className="flex gap-2"><dt className="font-medium text-[var(--fg)]">{t(M.dailyBaziLens, lo)}:</dt><dd>{lo === "zh" ? "流日之气利于整理与收尾。" : "The day's element favors tidying and finishing."}</dd></div>
              <div className="flex gap-2"><dt className="font-medium text-[var(--fg)]">{t(M.dailyTarotLens, lo)}:</dt><dd>{lo === "zh" ? "抽到的牌会出现在这里。" : "Your drawn card appears here."}</dd></div>
            </dl>
            <p className="mt-4 text-xs text-[var(--fg-muted)]">{t(M.disclosureDailySynthesis, lo)}</p>
          </Card>
          <div className="order-1 lg:order-2">
            <H2>{t(M.homeDailyTitle, lo)}</H2>
            <p className="mt-3 max-w-xl leading-relaxed text-[var(--fg-muted)]">{t(M.homeDailyBody, lo)}</p>
            <Link href={`/${lo}/daily-guidance`} className="mt-5 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
              {t(M.navDaily, lo)} →
            </Link>
          </div>
        </div>
      </Section>

      {/* 5 — Tarot interaction preview */}
      <Section className="border-t border-[var(--line)]">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <H2>{t(M.tarotTitle, lo)}</H2>
            <p className="mt-3 max-w-xl leading-relaxed text-[var(--fg-muted)]">{t(M.tarotIntro, lo)}</p>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{t(M.tarotCentering, lo)}</p>
            <Link href={`/${lo}/tarot/daily`} className="mt-5 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
              {t(M.tarotDaily, lo)} →
            </Link>
          </div>
          <div className="flex justify-center gap-3" aria-hidden>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-40 w-26 rounded-xl border border-gold/40 bg-gradient-to-b from-midnight to-ink shadow-md sm:h-48 sm:w-32 ${i === 1 ? "-translate-y-3" : ""}`}
              >
                <div className="flex h-full items-center justify-center">
                  <Star className="h-6 w-6 text-gold-soft/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6 — Why BaZi is different */}
      <Section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-3xl text-center">
          <H2>{t(M.homeWhyBaziTitle, lo)}</H2>
          <p className="mt-4 leading-relaxed text-[var(--fg-muted)]">{t(M.homeWhyBaziBody, lo)}</p>
          <div className="mt-6 flex justify-center gap-2 text-2xl" aria-hidden>
            {["甲", "乙", "丙", "丁", "戊"].map((c) => (
              <span key={c} className="font-display inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--bg-raised)]">
                {c}
              </span>
            ))}
          </div>
          <Link href={`/${lo}/bazi`} className="mt-6 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
            {t(M.navBazi, lo)} →
          </Link>
        </div>
      </Section>

      {/* 7 — Birth chart preview */}
      <Section className="border-t border-[var(--line)]">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <MiniWheel />
          <div>
            <H2>{t(M.astroBirthChart, lo)}</H2>
            <p className="mt-3 max-w-xl leading-relaxed text-[var(--fg-muted)]">{t(M.astroIntro, lo)}</p>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{t(M.unknownTimeNotice, lo)}</p>
            <Link href={`/${lo}/astrology/birth-chart`} className="mt-5 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
              {t(M.ctaBirthChart, lo)} →
            </Link>
          </div>
        </div>
      </Section>

      {/* 8 — Compatibility preview */}
      <Section className="border-t border-[var(--line)]">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <H2>{t(M.homeCompatTitle, lo)}</H2>
            <p className="mt-3 max-w-xl leading-relaxed text-[var(--fg-muted)]">{t(M.homeCompatBody, lo)}</p>
            <Link href={`/${lo}/compatibility`} className="mt-5 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
              {t(M.navCompatibility, lo)} →
            </Link>
          </div>
          <Card>
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-el-fire" aria-hidden />
              <p className="font-medium">{t(M.compatCatCommunication, lo)} · {t(M.compatCatValues, lo)} · {t(M.compatCatRhythm, lo)}</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{t(M.compatShareNote, lo)}</p>
          </Card>
        </div>
      </Section>

      {/* 9 — Journal preview */}
      <Section className="border-t border-[var(--line)]">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Card className="order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <NotebookPen className="h-5 w-5 text-gold" aria-hidden />
              <p className="font-medium">{t(M.journalRepeatCards, lo)}</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{t(M.journalPrivacyNote, lo)}</p>
          </Card>
          <div className="order-1 lg:order-2">
            <H2>{t(M.homeJournalTitle, lo)}</H2>
            <p className="mt-3 max-w-xl leading-relaxed text-[var(--fg-muted)]">{t(M.homeJournalBody, lo)}</p>
            <Link href={`/${lo}/journal`} className="mt-5 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
              {t(M.navJournal, lo)} →
            </Link>
          </div>
        </div>
      </Section>

      {/* 10 — Methodology & trust */}
      <Section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-el-wood" aria-hidden />
            <H2>{t(M.homeMethodTitle, lo)}</H2>
          </div>
          <p className="mt-3 leading-relaxed text-[var(--fg-muted)]">{t(M.homeMethodBody, lo)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>astronomy-engine 2.1.19</Badge>
            <Badge>lunar-javascript 1.7.7</Badge>
            <Badge>{lo === "zh" ? "加密安全洗牌" : "crypto-secure shuffle"}</Badge>
          </div>
          <Link href={`/${lo}/bazi/methodology`} className="mt-4 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
            {t(M.baziMethodology, lo)} →
          </Link>
        </div>
      </Section>

      {/* 11 — Pricing */}
      <Section className="border-t border-[var(--line)]">
        <H2>{t(M.homePricingTitle, lo)}</H2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <p className="font-display text-lg font-semibold">{t(M.pricingFree, lo)}</p>
            <p className="mt-1 font-display text-3xl">$0</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{t(M.pricingFreeFeatures, lo)}</p>
          </Card>
          <Card className="border-gold/50">
            <p className="font-display text-lg font-semibold">{t(M.pricingPremium, lo)}</p>
            <p className="mt-1 font-display text-3xl">
              {monthly ? `$${(monthly.unitAmountCents / 100).toFixed(2)}` : "—"}
              <span className="text-sm text-[var(--fg-muted)]"> / {t(M.pricingMonthly, lo)}</span>
            </p>
            {annual && (
              <p className="text-sm text-[var(--fg-muted)]">
                ${(annual.unitAmountCents / 100).toFixed(2)} / {t(M.pricingAnnual, lo)}
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{t(M.pricingPremiumFeatures, lo)}</p>
          </Card>
          <Card>
            <p className="font-display text-lg font-semibold">{t(M.pricingReports, lo)}</p>
            <p className="mt-1 font-display text-3xl">
              ${Math.min(...reports.flatMap((r) => r.prices.map((p) => p.unitAmountCents))) / 100}+
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
              {reports.map((r) => JSON.parse(r.nameJson)[lo]).join(" · ")}
            </p>
          </Card>
        </div>
        <Link href={`/${lo}/pricing`} className="mt-5 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
          {t(M.pricingTitle, lo)} →
        </Link>
      </Section>

      {/* 12 — Learning articles */}
      <Section className="border-t border-[var(--line)]">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-el-water" aria-hidden />
          <H2>{t(M.homeLearnTitle, lo)}</H2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {ARTICLES.slice(0, 3).map((a) => (
            <Card key={a.slug} className="flex flex-col">
              <h3 className="font-display text-lg font-semibold">{a.title[lo]}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">{a.description[lo]}</p>
              <Link href={`/${lo}/learn/${a.slug}`} className="mt-4 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline">
                {t(M.navLearn, lo)} →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* 13 — Disclaimer */}
      <Section>
        <Alert tone="info" className="mx-auto max-w-3xl">
          {t(M.disclaimerGeneral, lo)} {t(M.footerAge, lo)}
        </Alert>
      </Section>
    </>
  );
}

function ProfilePreview({ lo }: { lo: "en" | "zh" }) {
  const rows = [
    [lo === "zh" ? "太阳" : "Sun", lo === "zh" ? "狮子座 16.0°" : "Leo 16.0°"],
    [lo === "zh" ? "日主" : "Day Master", lo === "zh" ? "丙火（阳）" : "Bing Fire (Yang)"],
    [lo === "zh" ? "今日牌" : "Card today", lo === "zh" ? "隐士 · 正位" : "The Hermit · upright"],
  ];
  return (
    <Card aria-hidden>
      <p className="text-sm font-medium text-[var(--fg-muted)]">{lo === "zh" ? "示例档案" : "Sample profile"}</p>
      <dl className="mt-3 grid gap-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between rounded-lg border border-[var(--line)] px-3 py-2.5 text-sm">
            <dt className="text-[var(--fg-muted)]">{k}</dt>
            <dd className="font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function CelestialBackdrop() {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="glow" cx="70%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#3b4a8f" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#glow)" />
      <g stroke="#d9c290" strokeOpacity="0.25" fill="none">
        <circle cx="950" cy="140" r="90" />
        <circle cx="950" cy="140" r="130" strokeDasharray="2 6" />
        <circle cx="200" cy="480" r="60" strokeDasharray="2 6" />
      </g>
      <g fill="#e8e6df">
        {[
          [120, 80, 1.2], [340, 160, 0.8], [520, 60, 1], [720, 220, 0.9], [880, 380, 1.1],
          [1050, 300, 0.8], [240, 320, 0.7], [640, 420, 1], [430, 500, 0.8], [1120, 90, 1.3],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} opacity={0.8} />
        ))}
      </g>
    </svg>
  );
}

function MiniWheel() {
  const glyphs = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
  return (
    <svg aria-hidden viewBox="0 0 300 300" className="mx-auto w-64 sm:w-80">
      <circle cx="150" cy="150" r="140" fill="none" stroke="var(--line)" />
      <circle cx="150" cy="150" r="110" fill="none" stroke="var(--line)" />
      <circle cx="150" cy="150" r="55" fill="none" stroke="var(--line)" strokeDasharray="2 5" />
      {glyphs.map((g, i) => {
        const a = ((i * 30 - 75) * Math.PI) / 180;
        const x = 150 + 125 * Math.cos(a);
        const y = 150 + 125 * Math.sin(a);
        const lx1 = 150 + 110 * Math.cos(((i * 30 - 90) * Math.PI) / 180);
        const ly1 = 150 + 110 * Math.sin(((i * 30 - 90) * Math.PI) / 180);
        const lx2 = 150 + 140 * Math.cos(((i * 30 - 90) * Math.PI) / 180);
        const ly2 = 150 + 140 * Math.sin(((i * 30 - 90) * Math.PI) / 180);
        return (
          <g key={g}>
            <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="var(--line)" />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="14" fill="var(--fg-muted)">
              {g}
            </text>
          </g>
        );
      })}
      <circle cx="195" cy="105" r="4" fill="var(--color-gold)" />
      <circle cx="110" cy="185" r="4" fill="var(--color-primary)" />
      <circle cx="170" cy="205" r="3" fill="var(--color-el-fire)" />
    </svg>
  );
}
