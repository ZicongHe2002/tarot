import { describe, expect, it } from "vitest";
import {
  ACCESS_GRANT_MAX_AGE_SECONDS,
  isAccessCodeConfigured,
  isValidAccessCode,
  issueAccessGrant,
  verifyAccessGrant,
  type AccessCodeConfig,
} from "@/lib/access-code";

const config: AccessCodeConfig = {
  code: "friends-only-code-2026",
  secret: "test-auth-secret-with-enough-entropy",
};

describe("shared access code grants", () => {
  it("requires a meaningful code and signing secret", () => {
    expect(isAccessCodeConfigured(config)).toBe(true);
    expect(isAccessCodeConfigured({ ...config, code: "short" })).toBe(false);
    expect(isAccessCodeConfigured({ ...config, secret: "short" })).toBe(false);
  });

  it("compares codes exactly after trimming outer whitespace", () => {
    expect(isValidAccessCode(" friends-only-code-2026 ", config)).toBe(true);
    expect(isValidAccessCode("FRIENDS-ONLY-CODE-2026", config)).toBe(false);
  });

  it("issues a signed grant that expires after one year", () => {
    const now = Date.UTC(2026, 7, 8);
    const token = issueAccessGrant(config.code, config, now);
    expect(token).toBeTruthy();
    expect(verifyAccessGrant(token, config, now + 1_000)).toBe(true);
    expect(verifyAccessGrant(token, config, now + ACCESS_GRANT_MAX_AGE_SECONDS * 1_000 + 1)).toBe(false);
  });

  it("rejects wrong codes, tampered grants, and grants after code rotation", () => {
    const token = issueAccessGrant(config.code, config)!;
    expect(issueAccessGrant("wrong-code", config)).toBeNull();
    expect(verifyAccessGrant(`${token}x`, config)).toBe(false);
    expect(verifyAccessGrant(token, { ...config, code: "rotated-friends-code" })).toBe(false);
  });
});
