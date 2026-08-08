import { describe, expect, it } from "vitest";
import {
  ACCESS_GRANT_MAX_AGE_SECONDS,
  accessAccountId,
  isAccessCodeConfigured,
  isValidAccessCode,
  issueAccessGrant,
  verifyAccessGrant,
  type AccessCodeConfig,
} from "@/lib/access-code";

const config: AccessCodeConfig = {
  codes: ["friends-only-code-2026", "second-person-code-2026"],
  secret: "test-auth-secret-with-enough-entropy",
};

describe("personal token account grants", () => {
  it("requires a meaningful code and signing secret", () => {
    expect(isAccessCodeConfigured(config)).toBe(true);
    expect(isAccessCodeConfigured({ ...config, codes: ["short"] })).toBe(false);
    expect(isAccessCodeConfigured({ ...config, secret: "short" })).toBe(false);
  });

  it("compares codes exactly after trimming outer whitespace", () => {
    expect(isValidAccessCode(" friends-only-code-2026 ", config)).toBe(true);
    expect(isValidAccessCode("FRIENDS-ONLY-CODE-2026", config)).toBe(false);
  });

  it("issues a signed grant that expires after one year", () => {
    const now = Date.UTC(2026, 7, 8);
    const token = issueAccessGrant(config.codes[0], config, now);
    expect(token).toBeTruthy();
    expect(verifyAccessGrant(token, config, now + 1_000)).toBe(true);
    expect(verifyAccessGrant(token, config, now + ACCESS_GRANT_MAX_AGE_SECONDS * 1_000 + 1)).toBe(false);
  });

  it("rejects wrong codes, tampered grants, and grants after code rotation", () => {
    const token = issueAccessGrant(config.codes[0], config)!;
    expect(issueAccessGrant("wrong-code", config)).toBeNull();
    expect(verifyAccessGrant(`${token}x`, config)).toBe(false);
    expect(verifyAccessGrant(token, { ...config, codes: ["rotated-friends-code"] })).toBe(false);
  });

  it("maps different tokens to different persistent account identities", () => {
    const first = accessAccountId("friends-only-code-2026", config);
    const second = accessAccountId("second-person-code-2026", config);
    expect(first).toBeTruthy();
    expect(second).toBeTruthy();
    expect(first).not.toBe(second);
    expect(accessAccountId("friends-only-code-2026", config)).toBe(first);
  });
});
