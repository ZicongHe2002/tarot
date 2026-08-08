"use client";

// "Your Big Three": Sun (identity), Moon (inner world), Rising (outward style),
// each with a written interpretation. Rising appears only when the birth time
// is known (no Ascendant otherwise — the honesty rule holds).
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { bigThree, type BigThreeRole } from "@/lib/big-three";
import { signGlyph } from "@/lib/sky";
import type { NatalCalc } from "@/lib/engines/astrology";

const ROLE_LABEL: Record<BigThreeRole, { en: string; zh: string; glyph: string }> = {
  sun: { en: "Sun", zh: "太阳", glyph: "☉" },
  moon: { en: "Moon", zh: "月亮", glyph: "☽" },
  rising: { en: "Rising", zh: "上升", glyph: "ASC" },
};

const ROLE_META: Record<BigThreeRole, { en: string; zh: string }> = {
  sun: { en: "who you're becoming", zh: "你正在成为的自己" },
  moon: { en: "your inner world", zh: "你的内在世界" },
  rising: { en: "how you meet the world", zh: "你面对世界的方式" },
};

function Row({ role, signName, signZh, locale }: { role: BigThreeRole; signName: string; signZh: string; locale: Locale }) {
  const entry = bigThree(role, signName);
  const lo = locale;
  const label = ROLE_LABEL[role];
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h4 className="font-display text-lg font-semibold">
          <span aria-hidden className="mr-1.5 text-[var(--fg-muted)]">{label.glyph}</span>
          {lo === "zh" ? `${label.zh}·${signZh}` : `${label.en} in ${signName}`}
        </h4>
        <span className="text-lg" aria-hidden>{signGlyph(signName)}</span>
      </div>
      <p className="mt-0.5 text-xs uppercase tracking-wide text-[var(--fg-muted)]">
        {lo === "zh" ? ROLE_META[role].zh : ROLE_META[role].en}
      </p>
      {entry && (
        <>
          <p className="mt-2 font-medium text-[var(--accent)]">{entry.headline[lo]}</p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--fg)]/90">{entry.body[lo]}</p>
        </>
      )}
    </div>
  );
}

export function BigThreePanel({ calc, locale }: { calc: NatalCalc; locale: Locale }) {
  const sun = calc.planets.find((p) => p.planet === "sun");
  const moon = calc.planets.find((p) => p.planet === "moon");
  const lo = locale;
  return (
    <section>
      <h3 className="font-display text-xl font-semibold">{lo === "zh" ? "你的三大主星" : "Your Big Three"}</h3>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">
        {lo === "zh"
          ? "太阳、月亮与上升——认识自己最快的三个入口。"
          : "Sun, Moon, and Rising — the three fastest doorways into a chart."}
      </p>
      <div className="mt-4 grid gap-3">
        {sun && <Row role="sun" signName={sun.sign} signZh={sun.sign_zh} locale={lo} />}
        {moon && !calc.moon_range && <Row role="moon" signName={moon.sign} signZh={moon.sign_zh} locale={lo} />}
        {moon && calc.moon_range && (
          <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-4 text-sm text-[var(--fg-muted)]">
            <span aria-hidden className="mr-1.5">☽</span>
            {lo === "zh"
              ? `月亮当日在 ${calc.moon_range.start_sign_zh} 与 ${calc.moon_range.end_sign_zh} 之间，需要出生时间才能确定。`
              : `The Moon is between ${calc.moon_range.start_sign} and ${calc.moon_range.end_sign} on this date — a birth time is needed to settle it.`}
          </div>
        )}
        {calc.ascendant ? (
          <Row role="rising" signName={calc.ascendant.sign} signZh={calc.ascendant.sign_zh} locale={lo} />
        ) : (
          <div className="rounded-xl border border-dashed border-[var(--line)] p-4 text-sm text-[var(--fg-muted)]">
            <span aria-hidden className="mr-1.5">ASC</span>
            {t(M.unknownTimeNotice, lo)}
          </div>
        )}
      </div>
    </section>
  );
}
