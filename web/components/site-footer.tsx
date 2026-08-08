import Link from "next/link";
import { BRAND, type Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";

const LEGAL: Array<{ slug: string; key: keyof typeof M }> = [
  { slug: "terms", key: "legalTerms" },
  { slug: "privacy", key: "legalPrivacy" },
  { slug: "cookies", key: "legalCookies" },
  { slug: "subscriptions", key: "legalSubs" },
  { slug: "refunds", key: "legalRefunds" },
  { slug: "disclaimer", key: "legalDisclaimer" },
  { slug: "ai-disclosure", key: "legalAi" },
];

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-16 border-t border-[var(--line)] bg-[var(--bg-raised)]/50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--fg-muted)]">
          {t(M.disclaimerGeneral, locale)} {t(M.footerAge, locale)}
        </p>
        <nav aria-label={locale === "zh" ? "法律条款" : "Legal"} className="mt-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {LEGAL.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/${locale}/legal/${l.slug}`}
                  className="text-[var(--fg-muted)] underline-offset-4 hover:text-[var(--fg)] hover:underline"
                >
                  {t(M[l.key] as { en: string; zh: string }, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-xs text-[var(--fg-muted)]">
          © {new Date().getFullYear()} {BRAND[locale]}
        </p>
      </div>
    </footer>
  );
}
