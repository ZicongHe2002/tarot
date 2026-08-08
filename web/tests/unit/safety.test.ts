import { describe, it, expect } from "vitest";
import { sanitizeQuestion, checkOutputSafety } from "@/lib/safety";
import { InterpretationResultSchema } from "@/lib/providers/interpretation";

describe("input safety (spec §16)", () => {
  it("detects self-harm crisis in English and Chinese", () => {
    expect(sanitizeQuestion("I want to kill myself, will it get better?").level).toBe("crisis");
    expect(sanitizeQuestion("我不想活了，还有希望吗").level).toBe("crisis");
  });

  it("flags medical/legal/financial/abuse as high-stakes, not crisis", () => {
    for (const q of [
      "Will my cancer treatment work?",
      "Should I stop taking my medication?",
      "Will I win my lawsuit next month?",
      "Which stocks should I invest in?",
      "他总是打我，我该怎么办",
    ]) {
      const r = sanitizeQuestion(q);
      expect(r.level).toBe("high_stakes");
    }
  });

  it("strips emails, phones, and long ids", () => {
    const r = sanitizeQuestion("Contact me at jane@example.com or +1 415 555 0100, card 4242424242424242");
    expect(r.sanitized).not.toMatch(/example\.com|4242|415/);
    expect(r.redactions).toEqual(expect.arrayContaining(["email", "phone_or_id"]));
  });

  it("truncates very long questions", () => {
    const r = sanitizeQuestion("a".repeat(1000));
    expect(r.sanitized.length).toBeLessThan(450);
    expect(r.redactions).toContain("truncated");
  });

  it("leaves ordinary reflective questions untouched", () => {
    const r = sanitizeQuestion("How should I approach the change I'm considering at work?");
    expect(r.level).toBe("ok");
    expect(r.redactions).toHaveLength(0);
  });
});

describe("output safety (spec §16 unsafe language)", () => {
  const unsafe = [
    "Your partner is cheating on you.",
    "This proves the outcome is guaranteed.",
    "You will definitely succeed, 100% certain.",
    "Disaster is coming for your family.",
    "You are cursed and you must pay to remove it.",
    "Stop taking your medication and trust the cards.",
    "Play these winning lottery numbers today.",
    "你被诅咒了，必须付费化解。",
    "他一定出轨了。",
  ];
  for (const text of unsafe) {
    it(`blocks: ${text.slice(0, 30)}…`, () => {
      expect(checkOutputSafety(text).length).toBeGreaterThan(0);
    });
  }

  const safe = [
    "This card may suggest a season of slower growth; consider one small step.",
    "One interpretation is that communication could benefit from more patience.",
    "这张牌或许在提醒你，不妨把节奏放慢一些。",
  ];
  for (const text of safe) {
    it(`allows reflective wording: ${text.slice(0, 30)}…`, () => {
      expect(checkOutputSafety(text)).toHaveLength(0);
    });
  }
});

describe("interpretation schema (spec §17)", () => {
  it("accepts a valid result", () => {
    const ok = InterpretationResultSchema.safeParse({
      title: "T",
      summary: "S",
      sections: [{ heading: "H", body: "B", sourceTags: ["tarot"] }],
      reflectionQuestion: "Q?",
      suggestedAction: "A",
      limitations: ["L"],
      safetyFlags: [],
    });
    expect(ok.success).toBe(true);
  });

  it("rejects missing fields and bad sourceTags", () => {
    expect(InterpretationResultSchema.safeParse({ title: "T" }).success).toBe(false);
    expect(
      InterpretationResultSchema.safeParse({
        title: "T",
        summary: "S",
        sections: [{ heading: "H", body: "B", sourceTags: ["palmistry"] }],
        reflectionQuestion: "Q",
        suggestedAction: "A",
      }).success
    ).toBe(false);
  });
});
