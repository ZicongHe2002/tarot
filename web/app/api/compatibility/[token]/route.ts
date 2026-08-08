import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newAccessToken } from "@/lib/ids";

const NO_STORE = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };

export async function GET(_req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const row = await prisma.compatibilityReport.findUnique({ where: { accessToken: token } });
  if (!row) return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
  return NextResponse.json(
    {
      mode: row.mode,
      status: row.interpretationStatus,
      calc: JSON.parse(row.calcJson),
      interpretation: row.interpretationJson ? JSON.parse(row.interpretationJson) : null,
      isMock: row.isMock,
      versions: JSON.parse(row.versionsJson),
      shareToken: row.shareToken,
    },
    { headers: NO_STORE }
  );
}

// Create a privacy-safe share token for this report.
export async function POST(_req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const row = await prisma.compatibilityReport.findUnique({ where: { accessToken: token } });
  if (!row) return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
  const shareToken = row.shareToken ?? newAccessToken();
  if (!row.shareToken) {
    await prisma.compatibilityReport.update({ where: { id: row.id }, data: { shareToken } });
  }
  return NextResponse.json({ shareToken }, { headers: NO_STORE });
}
