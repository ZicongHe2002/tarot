// Reading orchestration: deterministic calculation is stored immutably first;
// interpretation is generated from the stored calculation and never re-draws
// or re-calculates (md §4.6.3). Works for tarot, astrology, and bazi rows.
import { prisma } from "./prisma";
import { env } from "./config";
import { newAccessToken } from "./ids";
import { audit, safetyEvent } from "./audit";
import { sanitizeQuestion, type SanitizeResult } from "./safety";
import { getInterpretationEngine, versionsJson, tarotEngine } from "./providers";
import type {
  CalculationMeta,
  InterpretationInput,
  InterpretationOutcome,
  LocaleCode,
} from "./providers/types";
import type { SpreadId } from "./engines/tarot";

export type TarotMode = "daily" | "one_card" | "three_card" | "yes_no";

const MODE_TO_SPREAD: Record<TarotMode, SpreadId> = {
  daily: "single",
  one_card: "single",
  three_card: "three_card",
  yes_no: "single",
};

export interface CreatedReading {
  id: string;
  accessToken: string;
  blocked?: { categories: string[] };
}

export async function createTarotReading(opts: {
  mode: TarotMode;
  topic: string;
  question?: string;
  locale: LocaleCode;
  userId?: string | null;
  profileId?: string | null;
  dailySeed?: { key: string; dateISO: string };
  /** Paid report readings start locked until the payment webhook confirms. */
  initialStatus?: "pending" | "awaiting_payment";
  spreadOverride?: SpreadId;
}): Promise<CreatedReading> {
  const sanitized = sanitizeQuestion(opts.question);

  // Crisis path (md §6.4.1): no draw, no interpretation, never charged.
  if (sanitized.level === "crisis") {
    await safetyEvent("crisis_blocked", sanitized.categories.join(","), {
      userId: opts.userId ?? undefined,
    });
    return { id: "", accessToken: "", blocked: { categories: sanitized.categories } };
  }

  const draw = await tarotEngine.draw({
    spread: opts.spreadOverride ?? MODE_TO_SPREAD[opts.mode],
    mode: opts.mode,
    seed: opts.dailySeed,
  });

  const reading = await prisma.tarotReading.create({
    data: {
      accessToken: newAccessToken(),
      userId: opts.userId ?? null,
      profileId: opts.profileId ?? null,
      mode: opts.mode,
      topic: opts.topic,
      questionSanitized: sanitized.sanitized || null,
      safetyLevel: sanitized.level,
      spreadJson: JSON.stringify(draw.calc),
      interpretationStatus: opts.initialStatus ?? "pending",
      versionsJson: versionsJson(draw.meta),
    },
  });
  if (sanitized.level === "high_stakes") {
    await safetyEvent("high_stakes_flagged", sanitized.categories.join(","), {
      userId: opts.userId ?? undefined,
      refId: reading.id,
    });
  }
  await audit("tarot_reading_created", reading.id, `mode=${opts.mode}`);
  return { id: reading.id, accessToken: reading.accessToken };
}

type ReadingKind = "tarot" | "astrology" | "bazi";

function table(kind: ReadingKind) {
  // Prisma delegates share the fields we touch across the three tables.
  if (kind === "tarot") return prisma.tarotReading;
  if (kind === "astrology") return prisma.astrologyChart;
  return prisma.baziChart;
}

interface GenericReadingRow {
  id: string;
  interpretationStatus: string;
  interpretationJson: string | null;
  isMock: boolean;
  versionsJson: string;
  userId: string | null;
}

/**
 * Generate the interpretation for a stored reading if it is still pending.
 * Concurrency-safe via a conditional update claim; safe to call from a
 * polling endpoint. The stored calculation is reused as-is.
 */
export async function ensureInterpretation(opts: {
  kind: ReadingKind;
  id: string;
  readingType: string;
  language: LocaleCode;
  calculation: unknown;
  warnings: string[];
  userContext: { topic?: string; question?: string };
  highStakes?: SanitizeResult["categories"];
}): Promise<GenericReadingRow> {
  const t = table(opts.kind) as typeof prisma.tarotReading;
  // Sample results cached before a real API key was configured are stale:
  // once DeepSeek is available, regenerate them instead of serving samples.
  if (env.hasDeepSeek()) {
    await t.updateMany({
      where: { id: opts.id, interpretationStatus: "completed", isMock: true },
      data: { interpretationStatus: "pending" },
    });
  }
  const claimed = await t.updateMany({
    where: { id: opts.id, interpretationStatus: { in: ["pending", "failed"] } },
    data: { interpretationStatus: "generating" },
  });
  if (claimed.count === 1) {
    const input: InterpretationInput = {
      requestId: opts.id,
      readingType: opts.readingType,
      language: opts.language,
      calculation: opts.calculation,
      userContext: opts.userContext,
      warnings: opts.warnings,
    };
    let outcome: InterpretationOutcome;
    try {
      outcome = await getInterpretationEngine().interpret(input);
    } catch (e) {
      outcome = {
        status: "error",
        error: e instanceof Error ? e.message : String(e),
        modelProvider: "unknown",
        modelName: "unknown",
        promptVersion: "unknown",
      };
    }
    if ((outcome.status === "ok" || outcome.status === "mock") && outcome.result) {
      const meta: CalculationMeta = JSON.parse(await currentMeta(t, opts.id));
      await t.update({
        where: { id: opts.id },
        data: {
          interpretationStatus: "completed",
          interpretationJson: JSON.stringify(outcome.result),
          isMock: outcome.status === "mock",
          versionsJson: versionsJson(
            {
              engine: meta.engine ?? "unknown",
              engineVersion: meta.engineVersion ?? "unknown",
              methodologyVersion: meta.methodologyVersion ?? "unknown",
              isDemo: false,
              generatedAt: new Date().toISOString(),
            },
            outcome
          ),
        },
      });
      await audit("interpretation_completed", opts.id, `${opts.kind} status=${outcome.status}`);
    } else {
      if (outcome.status === "invalid") {
        await safetyEvent("output_blocked", outcome.error ?? "invalid", { refId: opts.id });
        await t.update({ where: { id: opts.id }, data: { interpretationStatus: "blocked" } });
      } else {
        await t.update({ where: { id: opts.id }, data: { interpretationStatus: "failed" } });
      }
      await audit("interpretation_failed", opts.id, outcome.error ?? outcome.status);
    }
  }
  const row = (await t.findUnique({ where: { id: opts.id } })) as GenericReadingRow | null;
  if (!row) throw new Error("reading not found");
  return row;
}

async function currentMeta(t: typeof prisma.tarotReading, id: string): Promise<string> {
  const row = await t.findUnique({ where: { id }, select: { versionsJson: true } });
  const v = row ? JSON.parse(row.versionsJson) : {};
  return JSON.stringify({
    engine: v.calculationEngine,
    engineVersion: v.calculationVersion,
    methodologyVersion: v.methodologyVersion,
  });
}
