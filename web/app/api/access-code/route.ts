import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  ACCESS_GRANT_COOKIE,
  ACCESS_GRANT_MAX_AGE_SECONDS,
  accessAccountId,
  isAccessCodeConfigured,
  issueAccessGrant,
} from "@/lib/access-code";
import { ensureAccessAccountUser } from "@/lib/access-account";

const Body = z.object({ code: z.string().min(1).max(256), locale: z.enum(["en", "zh"]).default("en") });
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 8;
const failures = new Map<string, { count: number; resetAt: number }>();

function requestKey(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string, now = Date.now()): boolean {
  const entry = failures.get(key);
  if (!entry || entry.resetAt <= now) {
    failures.delete(key);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(key: string, now = Date.now()) {
  const entry = failures.get(key);
  failures.set(key, entry && entry.resetAt > now ? { ...entry, count: entry.count + 1 } : { count: 1, resetAt: now + WINDOW_MS });
  if (failures.size > 2_000) {
    for (const [candidate, value] of failures) {
      if (value.resetAt <= now) failures.delete(candidate);
    }
  }
}

export async function POST(req: NextRequest) {
  if (!isAccessCodeConfigured()) {
    return NextResponse.json({ error: "access_code_not_configured" }, { status: 503 });
  }

  const key = requestKey(req);
  if (isRateLimited(key)) {
    return NextResponse.json({ error: "too_many_attempts" }, { status: 429 });
  }

  const parsed = Body.safeParse(await req.json().catch(() => null));
  const token = parsed.success ? issueAccessGrant(parsed.data.code) : null;
  const accountId = parsed.success ? accessAccountId(parsed.data.code) : null;
  if (!token || !accountId || !parsed.success) {
    recordFailure(key);
    return NextResponse.json({ error: "invalid_access_code" }, { status: 401 });
  }

  failures.delete(key);
  await ensureAccessAccountUser(accountId, parsed.data.locale);
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ACCESS_GRANT_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_GRANT_MAX_AGE_SECONDS,
    priority: "high",
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ACCESS_GRANT_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
