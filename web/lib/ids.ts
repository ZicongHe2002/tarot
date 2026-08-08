import crypto from "crypto";

const ALPHABET = "0123456789abcdefghjkmnpqrstvwxyz"; // no i/l/o/u

function randomString(len: number): string {
  const bytes = crypto.randomBytes(len);
  let out = "";
  for (let i = 0; i < len; i++) out += ALPHABET[bytes[i] % 32];
  return out;
}

export function newId(prefix: string): string {
  return `${prefix}_${randomString(20)}`;
}

/** Unguessable capability token for guest result access. */
export function newAccessToken(): string {
  return randomString(40);
}

export function sha256(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}
