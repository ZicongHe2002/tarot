import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ACCESS_GRANT_COOKIE = "luminary_unlimited";
export const ACCESS_GRANT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export type AccessCodeConfig = {
  codes: string[];
  secret: string;
};

function normalizeCodes(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter((value) => value.length >= 8))];
}

function runtimeConfig(): AccessCodeConfig {
  const accountTokens = (process.env.ACCESS_ACCOUNT_TOKENS || "").split(/[\n,]/);
  const legacyCode = process.env.UNLIMITED_ACCESS_CODE || "";
  return {
    codes: normalizeCodes([...accountTokens, legacyCode]),
    secret: process.env.AUTH_SECRET || "",
  };
}

function digest(value: string): Buffer {
  return crypto.createHash("sha256").update(value, "utf8").digest();
}

function safeEqual(a: string, b: string): boolean {
  return crypto.timingSafeEqual(digest(a), digest(b));
}

function accountIdForCode(code: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(`access-account:${code}`, "utf8").digest("base64url");
}

function configuredAccountIds(config: AccessCodeConfig): string[] {
  return normalizeCodes(config.codes).map((code) => accountIdForCode(code, config.secret));
}

function signature(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload, "utf8").digest("base64url");
}

export function isAccessCodeConfigured(config: AccessCodeConfig = runtimeConfig()): boolean {
  return normalizeCodes(config.codes).length > 0 && config.secret.length >= 16;
}

export function accessAccountId(candidate: string, config: AccessCodeConfig = runtimeConfig()): string | null {
  if (!isAccessCodeConfigured(config)) return null;
  const normalized = candidate.trim();
  const match = normalizeCodes(config.codes).find((code) => safeEqual(normalized, code));
  return match ? accountIdForCode(match, config.secret) : null;
}

export function isValidAccessCode(candidate: string, config: AccessCodeConfig = runtimeConfig()): boolean {
  return accessAccountId(candidate, config) !== null;
}

export function issueAccessGrant(
  candidate: string,
  config: AccessCodeConfig = runtimeConfig(),
  nowMs = Date.now(),
): string | null {
  const accountId = accessAccountId(candidate, config);
  if (!accountId) return null;
  const expiresAt = Math.floor(nowMs / 1000) + ACCESS_GRANT_MAX_AGE_SECONDS;
  const payload = `v2.${expiresAt}.${accountId}`;
  return `${payload}.${signature(payload, config.secret)}`;
}

export function accessGrantAccountId(
  token: string | null | undefined,
  config: AccessCodeConfig = runtimeConfig(),
  nowMs = Date.now(),
): string | null {
  if (!token || !isAccessCodeConfigured(config)) return null;
  const [version, expiresRaw, accountId, suppliedSignature, ...extra] = token.split(".");
  if (version !== "v2" || !expiresRaw || !accountId || !suppliedSignature || extra.length > 0) return null;
  const expiresAt = Number(expiresRaw);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(nowMs / 1000)) return null;
  if (!configuredAccountIds(config).some((configuredId) => safeEqual(accountId, configuredId))) return null;
  const payload = `${version}.${expiresRaw}.${accountId}`;
  return safeEqual(suppliedSignature, signature(payload, config.secret)) ? accountId : null;
}

export function verifyAccessGrant(
  token: string | null | undefined,
  config: AccessCodeConfig = runtimeConfig(),
  nowMs = Date.now(),
): boolean {
  return accessGrantAccountId(token, config, nowMs) !== null;
}

export async function getAccessGrantAccountId(): Promise<string | null> {
  const token = (await cookies()).get(ACCESS_GRANT_COOKIE)?.value;
  return accessGrantAccountId(token);
}

export async function hasAccessCodeGrant(): Promise<boolean> {
  return (await getAccessGrantAccountId()) !== null;
}
