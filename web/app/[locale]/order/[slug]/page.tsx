import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isLocale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { OrderFlow } from "@/components/payments/order-flow";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const lo = locale;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { prices: { where: { active: true } } },
  });
  const price = product?.prices.find((p) => !p.interval);
  if (!product || product.kind !== "one_time" || !price) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-muted)]">
        <ol className="flex gap-2">
          <li>
            <a href={`/${lo}/pricing`} className="hover:underline">{t(M.pricingTitle, lo)}</a>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{JSON.parse(product.nameJson)[lo]}</li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {JSON.parse(product.nameJson)[lo]}
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--fg-muted)]">{JSON.parse(product.descriptionJson)[lo]}</p>
      <div className="mt-8">
        <OrderFlow
          locale={lo}
          product={{
            slug: product.slug,
            name: JSON.parse(product.nameJson)[lo],
            description: JSON.parse(product.descriptionJson)[lo],
            priceCents: price.unitAmountCents,
          }}
        />
      </div>
    </div>
  );
}
