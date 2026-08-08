import { SAFETY_POLICY_VERSION } from "../safety";
import { astrologyEngine } from "./astrology";
import { baziEngine } from "./bazi";
import { getInterpretationEngine, PROMPT_VERSION } from "./interpretation";
import { tarotEngine } from "./tarot";
import type { CalculationMeta, InterpretationOutcome } from "./types";

export { astrologyEngine, baziEngine, tarotEngine, getInterpretationEngine };

// Version metadata stored with every generated result (spec §20).
export function versionsJson(calcMeta: CalculationMeta, interp?: InterpretationOutcome): string {
  return JSON.stringify({
    calculationEngine: calcMeta.engine,
    calculationVersion: calcMeta.engineVersion,
    methodologyVersion: calcMeta.methodologyVersion,
    promptVersion: interp?.promptVersion ?? PROMPT_VERSION,
    modelProvider: interp?.modelProvider ?? null,
    modelName: interp?.modelName ?? null,
    safetyPolicyVersion: SAFETY_POLICY_VERSION,
    generatedAt: new Date().toISOString(),
  });
}
