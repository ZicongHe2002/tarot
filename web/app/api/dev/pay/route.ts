import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/config";
import { markOrderPaid } from "@/lib/payments/fulfill";

// Simulated payment for local development and e2e tests ONLY.
// Blocked in production by code (NODE_ENV) and by flag (DEV_FAKE_PAYMENTS).
export async function POST(req: NextRequest) {
  if (!env.devFakePayments()) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const parsed = z.object({ orderToken: z.string() }).safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  const order = await prisma.order.findUnique({ where: { token: parsed.data.orderToken } });
  if (!order) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const ok = await markOrderPaid({ orderId: order.id, provider: "mock", providerRef: `dev_${Date.now()}` });
  return NextResponse.json({ ok });
}
