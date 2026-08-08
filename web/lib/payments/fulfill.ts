// Order fulfillment — driven ONLY by verified webhooks or the dev-only
// simulator, never by a browser redirect (md §7.2, acceptance 9-10).
import { prisma } from "../prisma";
import { audit } from "../audit";

/** Idempotent: safe under Stripe webhook retries. */
export async function markOrderPaid(opts: {
  orderId: string;
  provider: "stripe" | "mock";
  providerRef?: string;
  paymentIntentId?: string;
  email?: string | null;
}): Promise<boolean> {
  const claimed = await prisma.order.updateMany({
    where: { id: opts.orderId, status: { in: ["created", "payment_pending"] } },
    data: {
      status: "paid",
      paidAt: new Date(),
      ...(opts.paymentIntentId ? { stripePaymentIntentId: opts.paymentIntentId } : {}),
      ...(opts.email ? { email: opts.email } : {}),
    },
  });
  if (claimed.count !== 1) return false; // already processed (dedup)

  const order = await prisma.order.findUnique({ where: { id: opts.orderId } });
  if (!order) return false;

  await prisma.payment.create({
    data: {
      userId: order.userId,
      orderId: order.id,
      provider: opts.provider,
      providerRef: opts.providerRef ?? null,
      amountCents: order.amountCents,
      currency: order.currency,
      status: "succeeded",
    },
  });

  // Unlock the pre-calculated reading for generation. The original
  // calculation is never re-run (md §4.6.3-4).
  if (order.readingRefId && order.readingKind) {
    const table =
      order.readingKind === "tarot"
        ? prisma.tarotReading
        : order.readingKind === "astrology"
          ? prisma.astrologyChart
          : order.readingKind === "bazi"
            ? prisma.baziChart
            : null;
    if (table) {
      await (table as typeof prisma.tarotReading).updateMany({
        where: { id: order.readingRefId, interpretationStatus: "awaiting_payment" },
        data: { interpretationStatus: "pending" },
      });
    } else if (order.readingKind === "compatibility") {
      await prisma.compatibilityReport.updateMany({
        where: { id: order.readingRefId, interpretationStatus: "awaiting_payment" },
        data: { interpretationStatus: "pending" },
      });
    }
  }

  await prisma.order.update({
    where: { id: order.id },
    data: { status: "generation_pending" },
  });
  await audit("order_paid", order.id, `provider=${opts.provider} ref=${opts.providerRef ?? ""}`);
  return true;
}

export async function markOrderRefunded(paymentIntentId: string, full: boolean) {
  const order = await prisma.order.findFirst({ where: { stripePaymentIntentId: paymentIntentId } });
  if (!order) return;
  await prisma.order.update({
    where: { id: order.id },
    data: { status: full ? "refunded" : "partially_refunded" },
  });
  await prisma.payment.updateMany({
    where: { orderId: order.id, status: "succeeded" },
    data: { status: full ? "refunded" : "partially_refunded" },
  });
  await audit("order_refunded", order.id, full ? "full" : "partial");
}
