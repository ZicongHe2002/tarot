import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Source_Serif_4 } from "next/font/google";
import { BRAND, TAGLINE, isLocale, LOCALES } from "@/lib/config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { M, t } from "@/lib/i18n/messages";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" });

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lo = isLocale(locale) ? locale : "en";
  return {
    title: { default: `${BRAND[lo]} — ${TAGLINE[lo]}`, template: `%s · ${BRAND[lo]}` },
    description: t(M.heroSub, lo),
  };
}

// Sets the theme class before paint to avoid a flash; respects stored choice
// then falls back to the system preference.
const themeInit = `try{const s=localStorage.getItem("theme");const d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale === "zh" ? "zh-Hans" : "en"} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${serif.variable} min-h-dvh flex flex-col`}>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a href="#main" className="skip-link">
          {t(M.skipToContent, locale)}
        </a>
        <SiteHeader locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
