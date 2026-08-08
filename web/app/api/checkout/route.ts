import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { newAccessToken } from "@/lib/ids";
import { getSessionUser } from "@/lib/session";
import { env, CONSENT_WORDING_VERSION } from "@/lib/config";
import { getStripe, stripeEnabled, stripeLocale } from "@/lib/payments/stripe";
import { createLockedReading, type ReportSlug, REPORT_INPUT_SCHEMAS } from "@/lib/payments/report-inputs";
import { audit } from "@/lib/audit";

const Body = z.object({
  kind: z.enum(["one_time", "subscription"]),
  locale: z.enum(["en", "zh"]).default("en"),
  productSlug: z.string(),
  priceId: z.string().optional(), // subscriptions: which interval
  consent: z.boolean(), // §7.8 withdrawal-right waiver (one-time digital content)
  input: z.unknown().optional(),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  const { kind, locale, productSlug, consent } = parsed.data;
  const user = await getSessionUser();

  const product = await prisma.product.findUnique({
    where: { slug: productSlug },
    include: { prices: { where: { active: true } } },
  });
  if (!product || !product.active || product.kind !== kind) {
    return NextResponse.json({ error: "unknown_product" }, { status: 404 });
  }

  const base = env.appBaseUrl();

  // ---------- Subscriptions ----------
  if (kind === "subscription") {
    if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    const price = product.prices.find((p) => p.id === parsed.data.priceId) ?? product.prices.find((p) => p.interval === "month");
    if (!price || !price.interval) return NextResponse.json({ error: "unknown_price" }, { status: 404 });

    if (stripeEnabled()) {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        locale: stripeLocale(locale),
        customer_email: user.email || undefined,
        line_items: [
          price.stripePriceId
            ? { price: price.stripePriceId, quantity: 1 }
            : {
                quantity: 1,
                price_data: {
                  currency: price.currency,
                  unit_amount: price.unitAmountCents,
                  recurring: { interval: price.interval as "month" | "year" },
                  product_data: { name: JSON.parse(product.nameJson)[locale] },
                },
              },
        ],
        subscription_data: { metadata: { userId: user.id, priceId: price.id } },
        automatic_tax: env.stripeTaxEnabled() ? { enabled: true } : undefined,
        success_url: `${base}/${locale}/account/subscription?success=1`,
        cancel_url: `${base}/${locale}/pricing?cancelled=1`,
      });
      return NextResponse.json({ url: session.url });
    }
    if (env.devFakePayments()) {
      const end = new Date(Date.now() + (price.interval === "year" ? 365 : 30) * 24 * 3600 * 1000);
      await prisma.subscription.create({
        data: { userId: user.id, priceId: price.id, status: "active", currentPeriodEnd: end },
      });
      await audit("subscription_created", user.id, "dev-mock", user.id);
      return NextResponse.json({ url: `${base}/${locale}/account/subscription?success=1`, dev: true });
    }
    return NextResponse.json({ error: "payments_unconfigured" }, { status: 503 });
  }

  // ---------- One-time reports ----------
  if (!(productSlug in REPORT_INPUT_SCHEMAS)) {
    return NextResponse.json({ error: "unknown_product" }, { status: 404 });
  }
  // EU/UK instant-delivery consent is required before payment (§7.8, acceptance 19).
  if (!consent) return NextResponse.json({ error: "consent_required" }, { status: 400 });

  const price = product.prices.find((p) => !p.interval);
  if (!price) return NextResponse.json({ error: "unknown_price" }, { status: 404 });
  // md §7.9 acceptance 23: one-time floor.
  if (price.unitAmountCents < 999) {
    return NextResponse.json({ error: "price_below_floor" }, { status: 500 });
  }

  const reading = await createLockedReading(productSlug as ReportSlug, parsed.data.input, locale, user?.id ?? null);
  if (!reading) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  if (reading.blocked) return NextResponse.json({ blocked: true });

  const order = await prisma.order.create({
    data: {
      token: newAccessToken(),
      userId: user?.id ?? null,
      productId: product.id,
      priceId: price.id,
      locale,
      currency: price.currency,
      amountCents: price.unitAmountCents,
      status: "created",
      readingKind: reading.kind,
      readingRefId: reading.refId,
    },
  });
  await prisma.consentRecord.create({
    data: {
      userId: user?.id ?? null,
      orderId: order.id,
      kind: "digital_delivery_waiver",
      wordingVersion: CONSENT_WORDING_VERSION,
      locale,
    },
  });
  await audit("order_created", order.id, productSlug);

  if (stripeEnabled()) {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: stripeLocale(locale),
      customer_email: user?.email || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: price.currency,
            unit_amount: price.unitAmountCents,
            product_data: {
              name: JSON.parse(product.nameJson)[locale],
              description: JSON.parse(product.descriptionJson)[locale],
            },
          },
        },
      ],
      payment_intent_data: env.stripeStatementSuffix()
        ? { statement_descriptor_suffix: env.stripeStatementSuffix() }
        : undefined,
      automatic_tax: env.stripeTaxEnabled() ? { enabled: true } : undefined,
      metadata: { orderId: order.id },
      success_url: `${base}/${locale}/reports/${order.token}?paid=1`,
      cancel_url: `${base}/${locale}/reports/${order.token}?cancelled=1`,
    });
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "payment_pending", stripeSessionId: session.id },
    });
    return NextResponse.json({ url: session.url, orderToken: order.token });
  }

  if (env.devFakePayments()) {
    await prisma.order.update({ where: { id: order.id }, data: { status: "payment_pending" } });
    return NextResponse.json({ dev: true, orderToken: order.token, url: `${base}/${locale}/reports/${order.token}?dev=1` });
  }
  return NextResponse.json({ error: "payments_unconfigured" }, { status: 503 });
}
