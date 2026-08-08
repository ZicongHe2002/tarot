import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import crypto from "crypto";
import { createTarotReading, type TarotMode } from "@/lib/readings";
import { getSessionUser } from "@/lib/session";
import { hasUnlimitedAccess, freeInterpretationsUsed, FREE_MONTHLY_INTERPRETATIONS } from "@/lib/entitlements";
import { prisma } from "@/lib/prisma";

const Body = z.object({
  mode: z.enum(["daily", "one_card", "three_card", "yes_no"]),
  topic: z.enum(["love", "career", "growth", "general", "daily_guidance"]).default("general"),
  question: z.string().max(2000).optional(),
  locale: z.enum(["en", "zh"]).default("en"),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }
  const { mode, topic, question, locale } = parsed.data;
  const user = await getSessionUser();
  const jar = await cookies();

  // Daily card: free, deterministic per (seed, date), one per day.
  if (mode === "daily") {
    let seed = jar.get("ds")?.value;
    if (!seed) {
      seed = crypto.randomBytes(16).toString("hex");
      jar.set("ds", seed, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 400 });
    }
    const dateISO = new Date().toISOString().slice(0, 10);
    const existingToken = jar.get(`daily_${dateISO}`)?.value;
    if (existingToken) {
      const existing = await prisma.tarotReading.findUnique({ where: { accessToken: existingToken } });
      if (existing) return NextResponse.json({ token: existing.accessToken, kind: "tarot" });
    }
    const created = await createTarotReading({
      mode,
      topic: "daily_guidance",
      locale,
      userId: user?.id,
      dailySeed: { key: seed, dateISO },
    });
    jar.set(`daily_${dateISO}`, created.accessToken, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 36 });
    return NextResponse.json({ token: created.accessToken, kind: "tarot" });
  }

  // Free-tier metering for non-daily interpretations (server-enforced).
  const premium = await hasUnlimitedAccess(user?.id);
  if (!premium) {
    if (user) {
      const used = await freeInterpretationsUsed(user.id);
      if (used >= FREE_MONTHLY_INTERPRETATIONS) {
        return NextResponse.json({ error: "quota_exceeded", upgrade: true }, { status: 402 });
      }
    } else {
      const used = Number(jar.get("fi")?.value || "0");
      if (used >= FREE_MONTHLY_INTERPRETATIONS) {
        return NextResponse.json({ error: "quota_exceeded", upgrade: true, signin: true }, { status: 402 });
      }
      jar.set("fi", String(used + 1), { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
    }
  }

  const created = await createTarotReading({
    mode: mode as TarotMode,
    topic,
    question,
    locale,
    userId: user?.id,
  });
  if (created.blocked) {
    // Crisis content: no reading, no charge; the client shows support resources.
    return NextResponse.json({ blocked: true }, { status: 200 });
  }
  return NextResponse.json({ token: created.accessToken, kind: "tarot" });
}
