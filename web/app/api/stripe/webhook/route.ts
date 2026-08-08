import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/config";
import { getStripe, stripeEnabled } from "@/lib/payments/stripe";
import { markOrderPaid, markOrderRefunded } from "@/lib/payments/fulfill";
import { audit } from "@/lib/audit";

export const dynamic = "force-dynamic";

// Verified webhooks are the ONLY payment truth (md §14): signature checked,
// events deduplicated by provider id, redirects never trusted.
export async function POST(req: NextRequest) {
  if (!stripeEnabled() || !env.stripeWebhookSecret()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "missing_signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    const raw = await req.text();
    event = getStripe().webhooks.constructEvent(raw, sig, env.stripeWebhookSecret());
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  // Dedup (§14): the provider event id is the primary key.
  try {
    await prisma.webhookEvent.create({
      data: { id: event.id, type: event.type, payloadJson: JSON.stringify(event.data.object).slice(0, 60000) },
    });
  } catch {
    return NextResponse.json({ received: true, duplicate: true });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "payment" && session.metadata?.orderId && session.payment_status === "paid") {
        await markOrderPaid({
          orderId: session.metadata.orderId,
          provider: "stripe",
          providerRef: session.id,
          paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : undefined,
          email: session.customer_details?.email ?? null,
        });
      }
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.orderId) {
        await prisma.order.updateMany({
          where: { id: session.metadata.orderId, status: "payment_pending" },
          data: { status: "created" },
        });
      }
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
      if (pi) await markOrderRefunded(pi, charge.amount_refunded >= charge.amount);
      break;
    }
    case "radar.early_fraud_warning.created": {
      // md §11: refund-first posture on early fraud warnings — flag for review.
      await audit("early_fraud_warning", event.id, "review and refund proactively");
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.userId;
      const priceId = sub.metadata?.priceId;
      if (userId && priceId) {
        const status = event.type === "customer.subscription.deleted" ? "canceled" : sub.status;
        const periodEnd = sub.items?.data?.[0]?.current_period_end ?? (sub as unknown as { current_period_end?: number }).current_period_end;
        await prisma.subscription.upsert({
          where: { stripeSubscriptionId: sub.id },
          create: {
            userId,
            priceId,
            status,
            stripeSubscriptionId: sub.id,
            currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
          },
          update: {
            status,
            currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
          },
        });
      }
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId =
        typeof (invoice as unknown as { subscription?: string | { id: string } }).subscription === "string"
          ? ((invoice as unknown as { subscription: string }).subscription)
          : (invoice as unknown as { subscription?: { id: string } }).subscription?.id;
      if (subId) {
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subId },
          data: { status: "past_due" },
        });
      }
      break;
    }
    case "charge.dispute.created": {
      const dispute = event.data.object as Stripe.Dispute;
      const pi = typeof dispute.payment_intent === "string" ? dispute.payment_intent : dispute.payment_intent?.id;
      if (pi) {
        await prisma.order.updateMany({
          where: { stripePaymentIntentId: pi },
          data: { status: "disputed" },
        });
        await audit("dispute_created", pi, dispute.reason ?? "unknown");
      }
      break;
    }
    default:
      break;
  }

  await prisma.webhookEvent.update({ where: { id: event.id }, data: { processedAt: new Date() } });
  return NextResponse.json({ received: true });
}
