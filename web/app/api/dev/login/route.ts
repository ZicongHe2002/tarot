import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newAccessToken } from "@/lib/ids";

// DEVELOPMENT-ONLY instant login. Creates a database session for a seeded
// account and sets the Auth.js session cookie — no email round-trip. Hard
// 404 in production; never ships as a usable endpoint there.
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const as = req.nextUrl.searchParams.get("as") === "admin" ? "admin" : "test";
  const email = as === "admin" ? "admin@localhost.dev" : "test@luminary.dev";
  const locale = req.nextUrl.searchParams.get("locale") === "zh" ? "zh" : "en";

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: "seed_first", hint: "Run: npm run db:seed" },
      { status: 404 }
    );
  }

  const sessionToken = newAccessToken() + newAccessToken();
  const expires = new Date(Date.now() + 30 * 24 * 3600 * 1000);
  await prisma.session.create({ data: { sessionToken, userId: user.id, expires } });

  const res = NextResponse.redirect(new URL(`/${locale}/account`, req.url));
  // Auth.js v5 default cookie name over http (localhost). HTTPS would use the
  // __Secure- prefix, but dev-login is disabled outside development anyway.
  res.cookies.set("authjs.session-token", sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires,
  });
  return res;
}
