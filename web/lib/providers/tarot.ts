import { drawSpread, dailyCard, DECK, SPREADS } from "../engines/tarot";
import type { CalculationMeta, TarotDrawInput, TarotDrawResult, TarotEngine } from "./types";

export const TAROT_METHODOLOGY_VERSION = "crypto-fisher-yates-1.0.0";

/**
 * Secure deterministic tarot engine: crypto.randomInt Fisher–Yates shuffle,
 * no duplicate physical card per spread, orientation stored independently.
 * Daily draws are deterministic per (seed, date) so refreshes never redraw.
 * The AI can never select or replace cards.
 */
export class SecureTarotEngine implements TarotEngine {
  meta(): CalculationMeta {
    return {
      engine: "secure-tarot",
      engineVersion: "1.0.0",
      methodologyVersion: TAROT_METHODOLOGY_VERSION,
      isDemo: false,
      generatedAt: new Date().toISOString(),
    };
  }

  async draw(input: TarotDrawInput): Promise<TarotDrawResult> {
    if (input.mode === "daily" && input.seed) {
      const { cardIndex, reversed } = dailyCard(input.seed.key, input.seed.dateISO);
      const card = DECK[cardIndex];
      const pos = SPREADS.single.positions[0];
      return {
        calc: {
          spread: "single",
          cards: [
            {
              deck_index: card.index,
              name_en: card.name.en,
              name_zh: card.name.zh,
              arcana: card.arcana,
              orientation: reversed ? "reversed" : "upright",
              position: 1,
              position_en: pos.en,
              position_zh: pos.zh,
            },
          ],
          calculation_warnings: [],
        },
        meta: this.meta(),
      };
    }
    return { calc: drawSpread(input.spread), meta: this.meta() };
  }
}

export const tarotEngine: TarotEngine = new SecureTarotEngine();
