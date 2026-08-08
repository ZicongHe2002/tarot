import { prisma } from "./prisma";

export async function audit(kind: string, ref: string, detail: string, actorId?: string) {
  await prisma.auditEvent.create({ data: { kind, ref, detail, actorId: actorId ?? null } });
}

/** Category labels only — never raw user text (spec §16, md §6.4.4). */
export async function safetyEvent(kind: string, detail: string, opts?: { userId?: string; refId?: string }) {
  await prisma.safetyEvent.create({
    data: { kind, detail, userId: opts?.userId ?? null, refId: opts?.refId ?? null },
  });
}
