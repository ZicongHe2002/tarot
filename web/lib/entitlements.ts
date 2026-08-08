import { prisma } from "./prisma";
import { hasAccessCodeGrant } from "./access-code";

export async function hasPremium(userId: string | null | undefined): Promise<boolean> {
  if (!userId) return false;
  const sub = await prisma.subscription.findFirst({
    where: {
      userId,
      status: { in: ["active", "trialing"] },
    },
    orderBy: { createdAt: "desc" },
  });
  if (!sub) return false;
  if (sub.currentPeriodEnd && sub.currentPeriodEnd < new Date()) return false;
  return true;
}

export async function hasUnlimitedAccess(userId: string | null | undefined): Promise<boolean> {
  if (await hasAccessCodeGrant()) return true;
  return hasPremium(userId);
}

export const FREE_MONTHLY_INTERPRETATIONS = 3;

/**
 * Free-tier metering for signed-in users: interpretations this calendar month.
 * Guests are metered by cookie count in the route layer.
 */
export async function freeInterpretationsUsed(userId: string): Promise<number> {
  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);
  const [tarot, astro, bazi] = await Promise.all([
    prisma.tarotReading.count({
      where: { userId, createdAt: { gte: monthStart }, interpretationStatus: "completed" },
    }),
    prisma.astrologyChart.count({
      where: { userId, createdAt: { gte: monthStart }, interpretationStatus: "completed" },
    }),
    prisma.baziChart.count({
      where: { userId, createdAt: { gte: monthStart }, interpretationStatus: "completed" },
    }),
  ]);
  return tarot + astro + bazi;
}
