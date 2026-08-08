import { z } from "zod";
import { checkOutputSafety } from "../safety";
import { systemPrompt } from "./prompts";
import { buildReference } from "./reference";
import type {
  InterpretationEngine,
  InterpretationInput,
  InterpretationOutcome,
  InterpretationResult,
} from "./types";

// v3: discipline-specific expert prompts + knowledge grounding (RWS card
// meanings, 子平 Ten-God/five-element framework, astrology significations).
export const PROMPT_VERSION = "2026-07-18.v3";

export { systemPrompt };

// Spec §17 contract, validated before display.
export const InterpretationResultSchema = z.object({
  title: z.string().min(1).max(200),
  summary: z.string().min(1).max(4000),
  sections: z
    .array(
      z.object({
        heading: z.string().min(1).max(200),
        body: z.string().min(1).max(12000),
        sourceTags: z.array(z.enum(["tarot", "astrology", "bazi"])).default([]),
      })
    )
    .min(1)
    .max(12),
  reflectionQuestion: z.string().min(1).max(1000),
  suggestedAction: z.string().min(1).max(1000),
  limitations: z.array(z.string()).default([]),
  safetyFlags: z.array(z.string()).default([]),
});

function validateAndGate(raw: string, parsed: unknown): { ok: true; result: InterpretationResult } | { ok: false; error: string } {
  const check = InterpretationResultSchema.safeParse(parsed);
  if (!check.success) return { ok: false, error: `schema: ${check.error.issues[0]?.message}` };
  const allText = [
    check.data.title,
    check.data.summary,
    ...check.data.sections.flatMap((s) => [s.heading, s.body]),
    check.data.reflectionQuestion,
    check.data.suggestedAction,
  ].join("\n");
  const violations = checkOutputSafety(allText + "\n" + raw.slice(0, 2000));
  if (violations.length > 0) return { ok: false, error: `unsafe output: ${violations.join(",")}` };
  return { ok: true, result: check.data };
}

/** DeepSeek adapter — interpretation only, no tools, JSON output enforced. */
export class DeepSeekInterpretationEngine implements InterpretationEngine {
  name() {
    return `deepseek:${process.env.DEEPSEEK_MODEL || "deepseek-v4-pro"}`;
  }

  async interpret(input: InterpretationInput): Promise<InterpretationOutcome> {
    const apiKey = process.env.DEEPSEEK_API_KEY || "";
    const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-pro";
    const baseUrl = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
    const timeoutMs = Number(process.env.DEEPSEEK_TIMEOUT_MS || 45000);
    const maxAttempts = 1 + Number(process.env.DEEPSEEK_MAX_RETRIES || 2);
    const base = { modelProvider: "deepseek", modelName: model, promptVersion: PROMPT_VERSION };

    // Grounding: established meanings for this tradition (RWS card meanings,
    // 子平 framework, astrology significations). The model reads FROM these.
    const reference = buildReference(input.readingType, input.calculation, input.language);
    const payload = {
      request_id: input.requestId,
      reading_type: input.readingType,
      language: input.language,
      calculation: input.calculation,
      reference,
      user_context: input.userContext,
      calculation_warnings: input.warnings,
    };

    let lastError = "";
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model,
            response_format: { type: "json_object" },
            // No tools / tool_choice — the interpreter must stay tool-free (md §4.4).
            messages: [
              { role: "system", content: systemPrompt(input.language, input.readingType) },
              { role: "user", content: JSON.stringify(payload) },
            ],
          }),
          signal: controller.signal,
        });
        clearTimeout(timer);
        if (res.status === 429 || res.status >= 500) {
          lastError = `provider ${res.status}`;
          await new Promise((r) => setTimeout(r, 500 * attempt));
          continue;
        }
        if (!res.ok) {
          // Actionable operator hints for the two most common misconfigurations.
          if (res.status === 401) {
            console.error(
              "[interpretation] DeepSeek returned 401 — DEEPSEEK_API_KEY in .env is invalid or incomplete (a real key is ~35 chars, 'sk-' + 32). Fix the key and restart the server."
            );
            return { ...base, status: "error", error: "provider 401 (invalid API key)" };
          }
          if (res.status === 402) {
            console.error(
              "[interpretation] DeepSeek returned 402 — the account has insufficient balance. Top up at platform.deepseek.com."
            );
            return { ...base, status: "error", error: "provider 402 (insufficient balance)" };
          }
          return { ...base, status: "error", error: `provider ${res.status}` };
        }
        const json = await res.json();
        const raw: string = json?.choices?.[0]?.message?.content ?? "";
        let parsed: unknown;
        try {
          parsed = JSON.parse(raw);
        } catch {
          lastError = "invalid JSON";
          continue;
        }
        const gated = validateAndGate(raw, parsed);
        if (!gated.ok) {
          // Unsafe or malformed output is blocked before display (md §4.5).
          if (gated.error.startsWith("unsafe")) {
            return { ...base, status: "invalid", error: gated.error, usage: json?.usage };
          }
          lastError = gated.error;
          continue;
        }
        return { ...base, status: "ok", result: gated.result, usage: json?.usage };
      } catch (e) {
        clearTimeout(timer);
        lastError = e instanceof Error ? (e.name === "AbortError" ? "timeout" : e.message) : String(e);
      }
    }
    return { ...base, status: "error", error: lastError || "exhausted retries" };
  }
}

/**
 * Clearly labeled mock for development and demos. Every result carries a
 * sample notice in the title and limitations; never presented as live AI.
 */
export class MockInterpretationEngine implements InterpretationEngine {
  name() {
    return "mock";
  }

  async interpret(input: InterpretationInput): Promise<InterpretationOutcome> {
    const zh = input.language === "zh";
    const tag = (input.readingType.includes("tarot")
      ? "tarot"
      : input.readingType.includes("bazi")
        ? "bazi"
        : input.readingType.includes("natal") || input.readingType.includes("astro") || input.readingType.includes("horoscope") || input.readingType.includes("transit")
          ? "astrology"
          : "tarot") as "tarot" | "astrology" | "bazi";
    const result: InterpretationResult = {
      title: zh ? "【示例解读】供界面演示" : "[Sample interpretation] For demonstration",
      summary: zh
        ? "当前未配置 AI 服务（DEEPSEEK_API_KEY 为空），这是一段结构真实的示例文本。下方每个部分引用的都是引擎真实计算出的数据；正式环境中，这里将由 AI 基于这些数据生成个性化解读。"
        : "No AI provider is configured (DEEPSEEK_API_KEY is empty), so this is a clearly labeled sample. Every section refers to the genuinely calculated data shown on this page; in production this text is generated from that data by the interpretation engine.",
      sections: [
        {
          heading: zh ? "如何阅读这份结果" : "How to read this result",
          body: zh
            ? "页面上方的牌阵或星盘数据来自确定性计算引擎，AI 不参与抽牌或排盘。解读文字只负责把这些事实转成语言，供你反思参考，而非预测。"
            : "The spread or chart data above comes from deterministic calculation engines; the AI never draws cards or computes positions. Interpretation text only turns those facts into language for reflection — it is not a prediction.",
          sourceTags: [tag],
        },
        {
          heading: zh ? "一个通用的反思方向" : "A general direction for reflection",
          body: zh
            ? "留意最近反复出现的主题。写下它，观察一周内它如何变化，再决定是否需要行动。"
            : "Notice a theme that keeps recurring lately. Write it down, watch how it shifts over a week, and only then decide whether action is needed.",
          sourceTags: [tag],
        },
      ],
      reflectionQuestion: zh ? "最近哪个决定你一直在回避？" : "What decision have you been circling without landing?",
      suggestedAction: zh ? "为其中一件小事设定一个可撤销的第一步。" : "Choose one small, reversible first step this week.",
      limitations: [
        zh ? "这是示例输出，不是真实 AI 解读。" : "This is sample output, not a real AI interpretation.",
        ...(input.warnings.length ? input.warnings : []),
        zh ? "所有解读仅供反思与娱乐。" : "All interpretations are for reflection and entertainment.",
      ],
      safetyFlags: [],
    };
    return {
      status: "mock",
      result,
      modelProvider: "mock",
      modelName: "sample",
      promptVersion: PROMPT_VERSION,
    };
  }
}

export function getInterpretationEngine(): InterpretationEngine {
  if (process.env.DEEPSEEK_API_KEY) return new DeepSeekInterpretationEngine();
  // Mock is for development/demo only; in production a missing key surfaces
  // as a recoverable generation failure at the call site for paid flows.
  return new MockInterpretationEngine();
}
