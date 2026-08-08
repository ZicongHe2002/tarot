"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { audit } from "@/lib/audit";

export async function toggleFlag(key: string) {
  const admin = await requireAdmin();
  const flag = await prisma.featureFlag.findUnique({ where: { key } });
  if (!flag) return;
  await prisma.featureFlag.update({ where: { key }, data: { enabled: !flag.enabled } });
  await audit("flag_toggled", key, String(!flag.enabled), admin.id);
  revalidatePath("/[locale]/admin", "page");
}

export async function toggleArticle(slug: string) {
  const admin = await requireAdmin();
  const a = await prisma.contentArticle.findUnique({ where: { slug } });
  if (!a) return;
  await prisma.contentArticle.update({ where: { slug }, data: { published: !a.published } });
  await audit("article_toggled", slug, String(!a.published), admin.id);
  revalidatePath("/[locale]/admin", "page");
}

export async function updatePriceCents(priceId: string, cents: number) {
  const admin = await requireAdmin();
  // md §7.9 acceptance 23: one-time prices never drop below the floor.
  const price = await prisma.price.findUnique({ where: { id: priceId } });
  if (!price) return;
  if (!price.interval && cents < 999) return;
  if (cents < 100 || cents > 100000) return;
  await prisma.price.update({ where: { id: priceId }, data: { unitAmountCents: Math.round(cents) } });
  await audit("price_updated", priceId, String(cents), admin.id);
  revalidatePath("/[locale]/admin", "page");
}
