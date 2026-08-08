import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "zh"];

function preferredLocale(req: NextRequest): string {
  const cookie = req.cookies.get("locale")?.value;
  if (cookie && LOCALES.includes(cookie)) return cookie;
  const accept = req.headers.get("accept-language") || "";
  if (/^zh|,\s*zh/i.test(accept)) return "zh";
  return "en";
}

// Redirect unprefixed paths (spec route map) to the visitor's locale.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = `/${preferredLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except API routes, Next internals, and files with extensions.
  matcher: ["/((?!api|_next|images|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)"],
};
