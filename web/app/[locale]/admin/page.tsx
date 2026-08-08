import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isLocale } from "@/lib/config";
import { getSessionUser } from "@/lib/session";
import { Card, Badge, Alert } from "@/components/ui/card";
import { toggleFlag, toggleArticle, updatePriceCents } from "./actions";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getSessionUser();
  if (!user || user.role !== "admin") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Alert tone="warn">Admin access required. Sign in with an admin account.</Alert>
      </div>
    );
  }

  const [users, ordersByStatus, safetyEvents, failedOrders, flags, articles, products, prompts, calcVersions, dataRequests] =
    await Promise.all([
      prisma.user.count(),
      prisma.order.groupBy({ by: ["status"], _count: true }),
      prisma.safetyEvent.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
      prisma.order.findMany({ where: { status: "generation_failed" }, orderBy: { createdAt: "desc" }, take: 10 }),
      prisma.featureFlag.findMany({ orderBy: { key: "asc" } }),
      prisma.contentArticle.findMany({ orderBy: { slug: "asc" } }),
      prisma.product.findMany({ include: { prices: true }, orderBy: { slug: "asc" } }),
      prisma.promptVersion.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.calculationVersion.findMany({ orderBy: { engine: "asc" } }),
      prisma.dataRequest.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    ]);

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Admin</h1>

      <Card>
        <h2 className="font-display text-lg font-semibold">Overview</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>users: {users}</Badge>
          {ordersByStatus.map((o) => (
            <Badge key={o.status} tone={o.status === "completed" ? "gold" : "default"}>
              orders/{o.status}: {o._count}
            </Badge>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-semibold">Safety events (anonymized)</h2>
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--line)] text-left text-[var(--fg-muted)]">
              <th scope="col" className="py-1.5 pr-3 font-medium">kind</th>
              <th scope="col" className="py-1.5 pr-3 font-medium">categories</th>
              <th scope="col" className="py-1.5 font-medium">at</th>
            </tr>
          </thead>
          <tbody>
            {safetyEvents.map((e) => (
              <tr key={e.id} className="border-b border-[var(--line)]/50">
                <td className="py-1.5 pr-3">{e.kind}</td>
                <td className="py-1.5 pr-3">{e.detail}</td>
                <td className="py-1.5 tabular-nums">{e.createdAt.toISOString().slice(0, 16).replace("T", " ")}</td>
              </tr>
            ))}
            {safetyEvents.length === 0 && (
              <tr>
                <td colSpan={3} className="py-2 text-[var(--fg-muted)]">none</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-semibold">Report failures</h2>
        {failedOrders.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--fg-muted)]">none</p>
        ) : (
          <ul className="mt-2 grid gap-1 text-sm">
            {failedOrders.map((o) => (
              <li key={o.id}>
                {o.id} · {o.readingKind} · {o.lastError ?? "generation failed"} ·{" "}
                {o.createdAt.toISOString().slice(0, 16)}
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-semibold">Feature flags</h2>
          <ul className="mt-3 grid gap-2">
            {flags.map((f) => (
              <li key={f.key} className="flex items-center justify-between gap-3 text-sm">
                <span>
                  <span className="font-medium">{f.key}</span>
                  <span className="ml-2 text-[var(--fg-muted)]">{f.note}</span>
                </span>
                <form
                  action={async () => {
                    "use server";
                    await toggleFlag(f.key);
                  }}
                >
                  <button className="min-h-9 rounded-full border border-[var(--line)] px-3 text-xs font-medium hover:bg-[var(--bg)]">
                    {f.enabled ? "enabled ✓" : "disabled"}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-display text-lg font-semibold">Articles</h2>
          <ul className="mt-3 grid gap-2">
            {articles.map((a) => (
              <li key={a.slug} className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium">{a.slug}</span>
                <form
                  action={async () => {
                    "use server";
                    await toggleArticle(a.slug);
                  }}
                >
                  <button className="min-h-9 rounded-full border border-[var(--line)] px-3 text-xs font-medium hover:bg-[var(--bg)]">
                    {a.published ? "published ✓" : "hidden"}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="font-display text-lg font-semibold">Products & prices (DB configuration)</h2>
        <div className="mt-3 grid gap-3">
          {products.map((p) => (
            <div key={p.slug} className="rounded-lg border border-[var(--line)] p-3">
              <p className="text-sm font-medium">
                {p.slug} <span className="text-[var(--fg-muted)]">({p.kind})</span>
              </p>
              <ul className="mt-2 grid gap-2">
                {p.prices.map((pr) => (
                  <li key={pr.id} className="flex items-center gap-3 text-sm">
                    <span className="w-24 text-[var(--fg-muted)]">{pr.interval ?? "one-time"}</span>
                    <form
                      className="flex items-center gap-2"
                      action={async (fd: FormData) => {
                        "use server";
                        await updatePriceCents(pr.id, Number(fd.get("cents")));
                      }}
                    >
                      <label className="sr-only" htmlFor={`price-${pr.id}`}>
                        price in cents for {p.slug} {pr.interval ?? "one-time"}
                      </label>
                      <input
                        id={`price-${pr.id}`}
                        name="cents"
                        type="number"
                        defaultValue={pr.unitAmountCents}
                        min={pr.interval ? 100 : 999}
                        max={100000}
                        className="w-28 rounded-lg border border-[var(--line)] bg-[var(--bg)] px-2 py-1.5 text-sm"
                      />
                      <button className="min-h-9 rounded-full border border-[var(--line)] px-3 text-xs font-medium hover:bg-[var(--bg)]">
                        save
                      </button>
                    </form>
                    <span className="text-[var(--fg-muted)]">= ${(pr.unitAmountCents / 100).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-[var(--fg-muted)]">One-time prices are floored at $9.99 (md §7.9).</p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-semibold">Prompt & calculation versions</h2>
          <ul className="mt-3 grid gap-1 text-sm">
            {prompts.map((v) => (
              <li key={v.id}>
                prompt/{v.key}: <span className="font-medium">{v.version}</span> {v.active && <Badge tone="gold">active</Badge>}
              </li>
            ))}
            {calcVersions.map((v) => (
              <li key={v.id}>
                calc/{v.engine}: <span className="font-medium">{v.version}</span> {v.active && <Badge tone="gold">active</Badge>}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-lg font-semibold">Data requests</h2>
          <ul className="mt-3 grid gap-1 text-sm">
            {dataRequests.map((d) => (
              <li key={d.id}>
                {d.kind} · {d.status} · {d.createdAt.toISOString().slice(0, 16).replace("T", " ")}
              </li>
            ))}
            {dataRequests.length === 0 && <li className="text-[var(--fg-muted)]">none</li>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
