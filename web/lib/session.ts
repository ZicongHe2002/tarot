import { auth } from "@/auth";
import { prisma } from "./prisma";
import { getAccessGrantAccountId } from "./access-code";
import { findAccessAccountUser } from "./access-account";

export interface SessionUser {
  id: string;
  email: string;
  role: string;
  locale: string;
  authMethod: "email" | "access";
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  const u = session?.user as (SessionUser & { id?: string }) | undefined;
  if (u?.id) {
    return {
      id: u.id,
      email: u.email ?? "",
      role: (u as { role?: string }).role ?? "user",
      locale: "en",
      authMethod: "email",
    };
  }

  const accountId = await getAccessGrantAccountId();
  if (!accountId) return null;
  const accessUser = await findAccessAccountUser(accountId);
  if (!accessUser) return null;
  return {
    id: accessUser.id,
    email: "",
    role: accessUser.role,
    locale: accessUser.locale,
    authMethod: "access",
  };
}

export async function requireUser(): Promise<SessionUser> {
  const u = await getSessionUser();
  if (!u) throw new Error("UNAUTHENTICATED");
  return u;
}

export async function requireAdmin(): Promise<SessionUser> {
  const u = await requireUser();
  if (u.role !== "admin") throw new Error("FORBIDDEN");
  return u;
}

/** Server-side ownership check — never trust client-supplied user ids. */
export async function assertOwnsProfile(userId: string, profileId: string) {
  const p = await prisma.birthProfile.findFirst({ where: { id: profileId, userId } });
  if (!p) throw new Error("FORBIDDEN");
  return p;
}
