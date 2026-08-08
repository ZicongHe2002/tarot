import { describe, it, expect } from "vitest";
import { drawSpread, dailyCard, DECK } from "@/lib/engines/tarot";
import { tarotEngine } from "@/lib/providers/tarot";

describe("tarot engine", () => {
  it("has exactly 78 unique cards", () => {
    expect(DECK).toHaveLength(78);
    expect(new Set(DECK.map((c) => c.name.en)).size).toBe(78);
    expect(new Set(DECK.map((c) => c.name.zh)).size).toBe(78);
  });

  it("never draws a duplicate physical card in one spread", () => {
    for (let i = 0; i < 200; i++) {
      const spread = drawSpread("celtic_cross");
      const ids = spread.cards.map((c) => c.deck_index);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("stores orientation independently of card identity", () => {
    const seen = new Set<string>();
    for (let i = 0; i < 300; i++) {
      const { cards } = drawSpread("single");
      seen.add(cards[0].orientation);
    }
    expect(seen).toEqual(new Set(["upright", "reversed"]));
  });

  it("daily card is deterministic per seed+date and varies by date", () => {
    const a1 = dailyCard("seed", "2026-07-16");
    const a2 = dailyCard("seed", "2026-07-16");
    const b = dailyCard("seed", "2026-07-17");
    expect(a1).toEqual(a2);
    expect(a1.cardIndex !== b.cardIndex || a1.reversed !== b.reversed).toBe(true);
  });

  it("adapter reports a real (non-demo) engine with versions", async () => {
    const res = await tarotEngine.draw({ spread: "three_card", mode: "three_card" });
    expect(res.meta.isDemo).toBe(false);
    expect(res.meta.engineVersion).toBeTruthy();
    expect(res.calc.cards).toHaveLength(3);
  });
});
