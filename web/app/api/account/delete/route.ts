import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { audit } from "@/lib/audit";
import { ACCESS_GRANT_COOKIE } from "@/lib/access-code";

const Body = z.object({ confirm: z.literal("DELETE") });

// Account deletion (spec §18): cascade-deletes personal data via Prisma
// relations. Orders/payments are retained anonymized for accounting; the
// audit log records the deletion.
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "confirmation_required" }, { status: 400 });

  await prisma.dataRequest.create({ data: { userId: user.id, kind: "deletion", status: "completed" } });
  await audit("account_deleted", user.id, "user-initiated deletion", user.id);
  // Orders keep accounting data but lose the user link (SetNull relation).
  await prisma.user.delete({ where: { id: user.id } });

  const res = NextResponse.json({ ok: true });
  // Clear the session cookie(s).
  for (const name of ["authjs.session-token", "__Secure-authjs.session-token"]) {
    res.cookies.set(name, "", { maxAge: 0, path: "/" });
  }
  res.cookies.set(ACCESS_GRANT_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
