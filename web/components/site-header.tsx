import Link from "next/link";
import { BRAND, type Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { getSessionUser } from "@/lib/session";
import { HeaderControls, MobileNav } from "./header-controls";

const NAV: Array<{ href: string; key: keyof typeof M }> = [
  { href: "/tarot", key: "navTarot" },
  { href: "/astrology", key: "navAstrology" },
  { href: "/bazi", key: "navBazi" },
  { href: "/daily-guidance", key: "navDaily" },
  { href: "/compatibility", key: "navCompatibility" },
  { href: "/journal", key: "navJournal" },
  { href: "/learn", key: "navLearn" },
  { href: "/pricing", key: "navPricing" },
];

export async function SiteHeader({ locale }: { locale: Locale }) {
  const signedIn = !!(await getSessionUser());
  const items = NAV.map((n) => ({ href: `/${locale}${n.href}`, label: t(M[n.key] as { en: string; zh: string }, locale) }));

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link href={`/${locale}`} className="font-display text-xl font-semibold tracking-tight">
            <span aria-hidden className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-gold align-middle" />
            {BRAND[locale]}
          </Link>
          <nav aria-label={locale === "zh" ? "主导航" : "Main navigation"} className="hidden lg:block">
            <ul className="flex items-center gap-1 text-sm">
              {items.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="inline-flex min-h-11 items-center rounded-full px-2.5 text-[var(--fg-muted)] hover:bg-[var(--bg-raised)] hover:text-[var(--fg)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <HeaderControls
            locale={locale}
            localeSwitchLabel={t(M.localeSwitch, locale)}
            themeLabel={t(M.themeToggle, locale)}
          />
          <Link
            href={`/${locale}/account`}
            className="hidden sm:inline-flex min-h-9 items-center rounded-full border border-[var(--line)] px-4 text-sm hover:bg-[var(--bg-raised)]"
          >
            {signedIn ? t(M.navAccount, locale) : t(M.signIn, locale)}
          </Link>
          <MobileNav
            label={locale === "zh" ? "菜单" : "Menu"}
            items={[...items, { href: `/${locale}/account`, label: signedIn ? t(M.navAccount, locale) : t(M.signIn, locale) }]}
          />
        </div>
      </div>
    </header>
  );
}
