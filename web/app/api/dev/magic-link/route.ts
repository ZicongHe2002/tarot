import { NextRequest, NextResponse } from "next/server";
import { getDevMagicLink } from "@/lib/dev-mailbox";

// Development-only helper so the email sign-in flow (and Playwright) can
// complete without SMTP. Hard-disabled in production.
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const email = req.nextUrl.searchParams.get("email") || "";
  const url = getDevMagicLink(email);
  if (!url) return NextResponse.json({ error: "no_link" }, { status: 404 });
  return NextResponse.json({ url });
}
