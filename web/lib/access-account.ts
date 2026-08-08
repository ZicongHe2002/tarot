import { prisma } from "./prisma";

const ACCESS_EMAIL_DOMAIN = "access.luminary.invalid";

export function accessAccountEmail(accountId: string): string {
  return `${accountId}@${ACCESS_EMAIL_DOMAIN}`;
}

export function isAccessAccountEmail(email: string): boolean {
  return email.endsWith(`@${ACCESS_EMAIL_DOMAIN}`);
}

export async function ensureAccessAccountUser(accountId: string, locale: "en" | "zh") {
  const email = accessAccountEmail(accountId);
  return prisma.user.upsert({
    where: { email },
    update: { locale },
    create: {
      email,
      emailVerified: new Date(),
      name: locale === "zh" ? "访问账号" : "Access account",
      locale,
    },
  });
}

export async function findAccessAccountUser(accountId: string) {
  return prisma.user.findUnique({ where: { email: accessAccountEmail(accountId) } });
}
