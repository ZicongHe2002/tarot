import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ACCESS_GRANT_COOKIE = "luminary_unlimited";
export const ACCESS_GRANT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export type AccessCodeConfig = {
  code: string;
  secret: string;
};

function runtimeConfig(): AccessCodeConfig {
  return {
    code: (process.env.UNLIMITED_ACCESS_CODE || "").trim(),
    secret: process.env.AUTH_SECRET || "",
  };
}

function digest(value: string): Buffer {
  return crypto.createHash("sha256").update(value, "utf8").digest();
}

function safeEqual(a: string, b: string): boolean {
  return crypto.timingSafeEqual(digest(a), digest(b));
}

function signature(payload: string, config: AccessCodeConfig): string {
  const fingerprint = digest(config.code).toString("base64url");
  return crypto.createHmac("sha256", config.secret).update(`${payload}.${fingerprint}`, "utf8").digest("base64url");
}

export function isAccessCodeConfigured(config: AccessCodeConfig = runtimeConfig()): boolean {
  return config.code.length >= 8 && config.secret.length >= 16;
}

export function isValidAccessCode(candidate: string, config: AccessCodeConfig = runtimeConfig()): boolean {
  if (!isAccessCodeConfigured(config)) return false;
  return safeEqual(candidate.trim(), config.code);
}

export function issueAccessGrant(
  candidate: string,
  config: AccessCodeConfig = runtimeConfig(),
  nowMs = Date.now(),
): string | null {
  if (!isValidAccessCode(candidate, config)) return null;
  const expiresAt = Math.floor(nowMs / 1000) + ACCESS_GRANT_MAX_AGE_SECONDS;
  const payload = `v1.${expiresAt}`;
  return `${payload}.${signature(payload, config)}`;
}

export function verifyAccessGrant(
  token: string | null | undefined,
  config: AccessCodeConfig = runtimeConfig(),
  nowMs = Date.now(),
): boolean {
  if (!token || !isAccessCodeConfigured(config)) return false;
  const [version, expiresRaw, suppliedSignature, ...extra] = token.split(".");
  if (version !== "v1" || !expiresRaw || !suppliedSignature || extra.length > 0) return false;
  const expiresAt = Number(expiresRaw);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(nowMs / 1000)) return false;
  const expectedSignature = signature(`${version}.${expiresRaw}`, config);
  return safeEqual(suppliedSignature, expectedSignature);
}

export async function hasAccessCodeGrant(): Promise<boolean> {
  const token = (await cookies()).get(ACCESS_GRANT_COOKIE)?.value;
  return verifyAccessGrant(token);
}
