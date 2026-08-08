import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { stripeEnabled, getStripe } from "@/lib/payments/stripe";
import { audit } from "@/lib/audit";

const NO_STORE = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const sub = await prisma.subscription.findFirst({
    where: { userId: user.id, status: { in: ["active", "trialing", "past_due"] } },
    orderBy: { createdAt: "desc" },
    include: { price: { include: { product: true } } },
  });
  return NextResponse.json(
    sub
      ? {
          status: sub.status,
          interval: sub.price.interval,
          amountCents: sub.price.unitAmountCents,
          currency: sub.price.currency,
          currentPeriodEnd: sub.currentPeriodEnd,
          cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
        }
      : { status: "none" },
    { headers: NO_STORE }
  );
}

// Direct online cancellation — no dark patterns (spec §15): one call, effective
// at period end, resumable until then.
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const parsed = z.object({ action: z.enum(["cancel", "resume"]) }).safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  const sub = await prisma.subscription.findFirst({
    where: { userId: user.id, status: { in: ["active", "trialing", "past_due"] } },
    orderBy: { createdAt: "desc" },
  });
  if (!sub) return NextResponse.json({ error: "no_subscription" }, { status: 404 });

  const cancel = parsed.data.action === "cancel";
  if (sub.stripeSubscriptionId && stripeEnabled()) {
    await getStripe().subscriptions.update(sub.stripeSubscriptionId, { cancel_at_period_end: cancel });
  }
  await prisma.subscription.update({
    where: { id: sub.id },
    data: { cancelAtPeriodEnd: cancel },
  });
  await audit(cancel ? "subscription_cancel_scheduled" : "subscription_resumed", sub.id, "customer action", user.id);
  return NextResponse.json({ ok: true, cancelAtPeriodEnd: cancel, currentPeriodEnd: sub.currentPeriodEnd });
}
