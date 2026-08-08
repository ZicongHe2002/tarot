import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readingTokenFor } from "@/lib/payments/report-inputs";
import { getInterpretationEngine, versionsJson } from "@/lib/providers";
import { RealAstrologyEngine } from "@/lib/providers/astrology";

const NO_STORE = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };

const PAID_STATUSES = ["paid", "generation_pending", "generating", "completed", "generation_failed"];

export async function GET(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const order = await prisma.order.findUnique({
    where: { token },
    include: { product: true, price: true },
  });
  if (!order) return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });

  const locale = req.nextUrl.searchParams.get("locale") === "zh" ? "zh" : "en";
  const paid = PAID_STATUSES.includes(order.status);

  // Compatibility reports generate here (the unified reading endpoint covers
  // tarot/astrology/bazi); claim is concurrency-safe.
  if (paid && order.readingKind === "compatibility" && order.readingRefId) {
    const claimed = await prisma.compatibilityReport.updateMany({
      where: { id: order.readingRefId, interpretationStatus: { in: ["pending", "failed"] } },
      data: { interpretationStatus: "generating" },
    });
    if (claimed.count === 1) {
      const row = (await prisma.compatibilityReport.findUnique({ where: { id: order.readingRefId } }))!;
      const meta = new RealAstrologyEngine().meta();
      const outcome = await getInterpretationEngine().interpret({
        requestId: row.id,
        readingType: "compatibility_combined_deep",
        language: locale,
        calculation: JSON.parse(row.calcJson),
        userContext: { topic: "compatibility" },
        warnings: (JSON.parse(row.calcJson).calculation_warnings as string[]) ?? [],
      });
      if ((outcome.status === "ok" || outcome.status === "mock") && outcome.result) {
        await prisma.compatibilityReport.update({
          where: { id: row.id },
          data: {
            interpretationStatus: "completed",
            interpretationJson: JSON.stringify(outcome.result),
            isMock: outcome.status === "mock",
            versionsJson: versionsJson(meta, outcome),
          },
        });
      } else {
        await prisma.compatibilityReport.update({
          where: { id: row.id },
          data: { interpretationStatus: "failed" },
        });
      }
    }
  }

  // Reflect reading completion onto the order status.
  let readingStatus: string | null = null;
  if (paid && order.readingKind && order.readingRefId) {
    const table =
      order.readingKind === "tarot"
        ? prisma.tarotReading
        : order.readingKind === "astrology"
          ? prisma.astrologyChart
          : order.readingKind === "bazi"
            ? prisma.baziChart
            : prisma.compatibilityReport;
    const row = await (table as typeof prisma.tarotReading).findUnique({ where: { id: order.readingRefId } });
    readingStatus = row?.interpretationStatus ?? null;
    if (readingStatus === "completed" && order.status !== "completed") {
      await prisma.order.update({ where: { id: order.id }, data: { status: "completed", completedAt: new Date() } });
      const existing = await prisma.generatedReport.findFirst({ where: { orderId: order.id } });
      if (!existing && row?.interpretationJson) {
        await prisma.generatedReport.create({
          data: {
            orderId: order.id,
            kind: order.readingKind,
            contentJson: row.interpretationJson,
            versionsJson: row.versionsJson,
          },
        });
      }
      order.status = "completed";
    }
    if (readingStatus === "failed" && ["generation_pending", "generating", "paid"].includes(order.status)) {
      await prisma.order.update({ where: { id: order.id }, data: { status: "generation_failed" } });
      order.status = "generation_failed";
    }
  }

  return NextResponse.json(
    {
      status: order.status,
      product: {
        slug: order.product.slug,
        name: JSON.parse(order.product.nameJson),
        description: JSON.parse(order.product.descriptionJson),
      },
      amountCents: order.amountCents,
      currency: order.currency,
      // The reading capability token is only exposed after verified payment.
      readingToken: paid && order.readingKind && order.readingRefId ? await readingTokenFor(order.readingKind, order.readingRefId) : null,
      readingKind: paid ? order.readingKind : null,
      createdAt: order.createdAt,
    },
    { headers: NO_STORE }
  );
}
