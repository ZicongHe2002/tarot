"use client";

// Deterministic-fact renderers. Everything shown here comes straight from the
// calculation engines; the AI never touches it. Every diagram has a text or
// table alternative (WCAG).
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Card, Badge } from "@/components/ui/card";
import { CardArt } from "@/components/tarot/card-art";
import type { TarotCalc } from "@/lib/engines/tarot";
import type { NatalCalc, PlanetPosition } from "@/lib/engines/astrology";
import type { BaziCalc, Pillar } from "@/lib/engines/bazi";
import { DECK, cardSlug } from "@/lib/engines/tarot";

// ---------- Tarot ----------

export function TarotSpreadView({ calc, locale }: { calc: TarotCalc; locale: Locale }) {
  return (
    <Card>
      <ul className="flex flex-wrap justify-center gap-5">
        {calc.cards.map((c) => (
          <li key={c.position} className="flex w-32 flex-col items-center gap-2 text-center">
            <CardArt
              index={c.deck_index}
              slug={cardSlug(c.deck_index)}
              nameEn={c.name_en}
              nameZh={c.name_zh}
              suit={DECK[c.deck_index].suit?.en.toLowerCase() ?? null}
              reversed={c.orientation === "reversed"}
              locale={locale}
              width={128}
            />
            <div>
              <p className="text-xs font-medium text-[var(--fg-muted)]">
                {locale === "zh" ? c.position_zh : c.position_en}
              </p>
              <p className="text-sm font-medium">
                {locale === "zh" ? c.name_zh : c.name_en}
              </p>
              <p className="text-xs text-[var(--fg-muted)]">
                {c.orientation === "reversed" ? t(M.tarotReversed, locale) : t(M.tarotUpright, locale)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ---------- Astrology ----------

const GLYPH: Record<string, string> = {
  sun: "☉", moon: "☽", mercury: "☿", venus: "♀", mars: "♂",
  jupiter: "♃", saturn: "♄", uranus: "⛢", neptune: "♆", pluto: "♇",
};
const SIGN_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

export function ChartWheel({ calc, locale }: { calc: NatalCalc; locale: Locale }) {
  const size = 340;
  const c = size / 2;
  const rot = calc.ascendant ? 180 - calc.ascendant.longitude : 90; // Asc on the left when known
  const pos = (lonDeg: number, r: number) => {
    const a = ((lonDeg + rot) * Math.PI) / 180;
    return { x: c + r * Math.cos(a), y: c - r * Math.sin(a) };
  };
  return (
    <svg
      role="img"
      aria-label={t(M.astroWheelAlt, locale)}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto w-full max-w-sm"
    >
      <circle cx={c} cy={c} r={160} fill="var(--bg-raised)" stroke="var(--line)" />
      <circle cx={c} cy={c} r={132} fill="none" stroke="var(--line)" />
      <circle cx={c} cy={c} r={70} fill="none" stroke="var(--line)" strokeDasharray="2 5" />
      {SIGN_GLYPHS.map((g, i) => {
        const mid = pos(i * 30 + 15, 146);
        const b1 = pos(i * 30, 132);
        const b2 = pos(i * 30, 160);
        return (
          <g key={g}>
            <line x1={b1.x} y1={b1.y} x2={b2.x} y2={b2.y} stroke="var(--line)" />
            <text x={mid.x} y={mid.y} textAnchor="middle" dominantBaseline="central" fontSize="13" fill="var(--fg-muted)">
              {g}
            </text>
          </g>
        );
      })}
      {/* aspect lines */}
      {calc.aspects.slice(0, 24).map((a, i) => {
        const p1 = calc.planets.find((p) => p.planet_en === a.a);
        const p2 = calc.planets.find((p) => p.planet_en === a.b);
        if (!p1 || !p2) return null;
        const q1 = pos(p1.longitude, 68);
        const q2 = pos(p2.longitude, 68);
        const color = a.aspect === "trine" || a.aspect === "sextile" ? "var(--color-el-water)" : a.aspect === "conjunction" ? "var(--color-gold)" : "var(--color-el-fire)";
        return <line key={i} x1={q1.x} y1={q1.y} x2={q2.x} y2={q2.y} stroke={color} strokeOpacity="0.45" />;
      })}
      {/* planets */}
      {calc.planets.map((p) => {
        const q = pos(p.longitude, 100);
        return (
          <g key={p.planet}>
            <circle cx={q.x} cy={q.y} r={11} fill="var(--bg)" stroke="var(--line)" />
            <text x={q.x} y={q.y + 0.5} textAnchor="middle" dominantBaseline="central" fontSize="12" fill="var(--fg)">
              {GLYPH[p.planet]}
            </text>
          </g>
        );
      })}
      {calc.ascendant && (
        <g>
          <line x1={pos(calc.ascendant.longitude, 70).x} y1={pos(calc.ascendant.longitude, 70).y} x2={pos(calc.ascendant.longitude, 160).x} y2={pos(calc.ascendant.longitude, 160).y} stroke="var(--color-gold)" strokeWidth="1.5" />
          <text {...pos(calc.ascendant.longitude, 172)} textAnchor="middle" fontSize="10" fill="var(--color-gold)">
            ASC
          </text>
        </g>
      )}
    </svg>
  );
}

export function PlanetTable({ planets, locale, showHouse }: { planets: PlanetPosition[]; locale: Locale; showHouse: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] text-sm">
        <caption className="sr-only">{t(M.astroWheelAlt, locale)}</caption>
        <thead>
          <tr className="border-b border-[var(--line)] text-left text-[var(--fg-muted)]">
            <th scope="col" className="py-2 pr-3 font-medium">{t(M.planet, locale)}</th>
            <th scope="col" className="py-2 pr-3 font-medium">{t(M.sign, locale)}</th>
            <th scope="col" className="py-2 pr-3 font-medium">{t(M.degree, locale)}</th>
            {showHouse && <th scope="col" className="py-2 pr-3 font-medium">{t(M.house, locale)}</th>}
            <th scope="col" className="py-2 font-medium">{t(M.retrogradeCol, locale)}</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((p) => (
            <tr key={p.planet} className="border-b border-[var(--line)]/60">
              <td className="py-2 pr-3">
                <span aria-hidden className="mr-1.5">{GLYPH[p.planet]}</span>
                {locale === "zh" ? p.planet_zh : p.planet_en}
              </td>
              <td className="py-2 pr-3">{locale === "zh" ? p.sign_zh : p.sign}</td>
              <td className="py-2 pr-3 tabular-nums">{p.degree_in_sign.toFixed(1)}°</td>
              {showHouse && <td className="py-2 pr-3 tabular-nums">{p.house ?? "—"}</td>}
              <td className="py-2">{p.retrograde ? (locale === "zh" ? "是 ℞" : "Yes ℞") : (locale === "zh" ? "否" : "No")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ELEMENT_OF_SIGN = ["fire", "earth", "air", "water"]; // index % 4 by sign order
const MODALITY_OF_SIGN = ["cardinal", "fixed", "mutable"]; // index % 3

export function AstroBalance({ calc, locale }: { calc: NatalCalc; locale: Locale }) {
  const elements: Record<string, number> = { fire: 0, earth: 0, air: 0, water: 0 };
  const modalities: Record<string, number> = { cardinal: 0, fixed: 0, mutable: 0 };
  for (const p of calc.planets) {
    const signIndex = Math.floor((((p.longitude % 360) + 360) % 360) / 30);
    elements[ELEMENT_OF_SIGN[signIndex % 4]]++;
    modalities[MODALITY_OF_SIGN[signIndex % 3]]++;
  }
  const elLabels: Record<string, { en: string; zh: string; color: string }> = {
    fire: { en: "Fire", zh: "火", color: "var(--color-el-fire)" },
    earth: { en: "Earth", zh: "土", color: "var(--color-el-earth)" },
    air: { en: "Air", zh: "风", color: "var(--color-el-metal)" },
    water: { en: "Water", zh: "水", color: "var(--color-el-water)" },
  };
  const moLabels: Record<string, { en: string; zh: string }> = {
    cardinal: { en: "Cardinal", zh: "基本" },
    fixed: { en: "Fixed", zh: "固定" },
    mutable: { en: "Mutable", zh: "变动" },
  };
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <h4 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.elementBalance, locale)}</h4>
        <ul className="mt-2 grid gap-1.5">
          {Object.entries(elements).map(([k, v]) => (
            <li key={k} className="flex items-center gap-2 text-sm">
              <span className="w-12">{locale === "zh" ? elLabels[k].zh : elLabels[k].en}</span>
              <span aria-hidden className="h-2 rounded-full" style={{ width: `${v * 10}%`, minWidth: v ? 8 : 0, background: elLabels[k].color }} />
              <span className="tabular-nums text-[var(--fg-muted)]">{v}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.modalityBalance, locale)}</h4>
        <ul className="mt-2 grid gap-1.5">
          {Object.entries(modalities).map(([k, v]) => (
            <li key={k} className="flex items-center gap-2 text-sm">
              <span className="w-12">{locale === "zh" ? moLabels[k].zh : moLabels[k].en}</span>
              <span aria-hidden className="h-2 rounded-full bg-primary" style={{ width: `${v * 8}%`, minWidth: v ? 8 : 0 }} />
              <span className="tabular-nums text-[var(--fg-muted)]">{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AstroCalcView({ calc, locale }: { calc: NatalCalc; locale: Locale }) {
  return (
    <Card>
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <ChartWheel calc={calc} locale={locale} />
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            {calc.ascendant && (
              <Badge tone="gold">
                {t(M.ascendant, locale)}: {locale === "zh" ? calc.ascendant.sign_zh : calc.ascendant.sign} {calc.ascendant.degree_in_sign.toFixed(1)}°
              </Badge>
            )}
            {calc.midheaven && (
              <Badge>
                {t(M.midheaven, locale)}: {locale === "zh" ? calc.midheaven.sign_zh : calc.midheaven.sign} {calc.midheaven.degree_in_sign.toFixed(1)}°
              </Badge>
            )}
            <Badge>
              {locale === "zh" ? calc.moon_phase.name_zh : calc.moon_phase.name_en}
            </Badge>
          </div>
          <PlanetTable planets={calc.planets} locale={locale} showHouse={calc.houses_system === "whole_sign"} />
          <AstroBalance calc={calc} locale={locale} />
        </div>
      </div>
      {calc.aspects.length > 0 && (
        <details className="mt-4 text-sm">
          <summary className="cursor-pointer font-medium">{t(M.aspects, locale)} ({calc.aspects.length})</summary>
          <ul className="mt-2 grid gap-1 sm:grid-cols-2">
            {calc.aspects.map((a, i) => (
              <li key={i} className="text-[var(--fg-muted)]">
                {a.a} {locale === "zh" ? a.aspect_zh : a.aspect} {a.b} <span className="tabular-nums">({a.orb.toFixed(1)}°)</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </Card>
  );
}

// ---------- BaZi ----------

const EL_COLOR: Record<string, string> = {
  Wood: "var(--color-el-wood)", Fire: "var(--color-el-fire)", Earth: "var(--color-el-earth)",
  Metal: "var(--color-el-metal)", Water: "var(--color-el-water)",
};
const EL_ZH: Record<string, string> = { Wood: "木", Fire: "火", Earth: "土", Metal: "金", Water: "水" };

function PillarCard({ pillar, title, locale }: { pillar: Pillar | null; title: string; locale: Locale }) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-3 text-center">
      <p className="text-xs font-medium text-[var(--fg-muted)]">{title}</p>
      {pillar ? (
        <>
          <p className="font-display mt-1 text-3xl leading-tight">
            <span style={{ color: EL_COLOR[pillar.stem_element] }}>{pillar.stem_zh}</span>
            <br />
            <span style={{ color: EL_COLOR[pillar.branch_element] }}>{pillar.branch_zh}</span>
          </p>
          <p className="mt-1 text-xs text-[var(--fg-muted)]">
            {pillar.stem} {locale === "zh" ? "" : `(${pillar.stem_element})`} · {pillar.branch}
          </p>
          {pillar.ten_god_stem_zh && (
            <p className="mt-0.5 text-xs text-[var(--fg-muted)]">
              {locale === "zh" ? pillar.ten_god_stem_zh : pillar.ten_god_stem}
            </p>
          )}
        </>
      ) : (
        <p className="mt-3 text-sm text-[var(--fg-muted)]">{t(M.baziHourUnknown, locale)}</p>
      )}
    </div>
  );
}

export function BaziCalcView({ calc, locale }: { calc: BaziCalc; locale: Locale }) {
  const total = Object.values(calc.element_distribution).reduce((a, b) => a + b, 0);
  return (
    <Card>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <PillarCard pillar={calc.pillars.year} title={t(M.baziYearPillar, locale)} locale={locale} />
        <PillarCard pillar={calc.pillars.month} title={t(M.baziMonthPillar, locale)} locale={locale} />
        <PillarCard pillar={calc.pillars.day} title={t(M.baziDayPillar, locale)} locale={locale} />
        <PillarCard pillar={calc.pillars.hour} title={t(M.baziHourPillar, locale)} locale={locale} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Badge tone="gold">
          {t(M.baziDayMaster, locale)}: {calc.day_master.stem_zh} {calc.day_master.stem} · {locale === "zh" ? `${calc.day_master.polarity === "Yang" ? "阳" : "阴"}${EL_ZH[calc.day_master.element]}` : `${calc.day_master.polarity} ${calc.day_master.element}`}
        </Badge>
        <Badge>
          {locale === "zh" ? "生肖" : "Zodiac"}: {locale === "zh" ? calc.zodiac_animal.zh : calc.zodiac_animal.en}
        </Badge>
        <Badge>{calc.lunar_date_zh}</Badge>
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-[var(--fg-muted)]">{t(M.baziFiveElements, locale)}</h4>
        <ul className="mt-2 grid gap-1.5">
          {Object.entries(calc.element_distribution).map(([el, count]) => (
            <li key={el} className="flex items-center gap-2 text-sm">
              <span className="w-14">{locale === "zh" ? EL_ZH[el] : el}</span>
              <span aria-hidden className="h-2 rounded-full" style={{ width: `${(count / total) * 60}%`, minWidth: count ? 8 : 0, background: EL_COLOR[el] }} />
              <span className="tabular-nums text-[var(--fg-muted)]">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {calc.luck_pillars && (
        <div className="mt-5">
          <h4 className="text-sm font-semibold text-[var(--fg-muted)]">
            {t(M.baziLuckPillars, locale)} · {locale === "zh" ? `${calc.luck_pillars.start_age_years} 岁起运 · ${calc.luck_pillars.direction === "forward" ? "顺行" : "逆行"}` : `from age ${calc.luck_pillars.start_age_years} · ${calc.luck_pillars.direction}`}
          </h4>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-[32rem] text-center text-sm">
              <caption className="sr-only">{t(M.baziLuckPillars, locale)}</caption>
              <thead>
                <tr className="text-xs text-[var(--fg-muted)]">
                  {calc.luck_pillars.pillars.map((p) => (
                    <th key={p.start_age} scope="col" className="px-2 py-1 font-medium tabular-nums">
                      {p.start_age}–{p.end_age}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {calc.luck_pillars.pillars.map((p) => (
                    <td key={p.start_age} className="font-display px-2 py-1 text-lg">
                      {p.ganzhi_zh}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {calc.calculation_warnings.length > 0 && (
        <ul className="mt-4 grid gap-1 text-sm text-[var(--fg-muted)]">
          {calc.calculation_warnings.map((w, i) => (
            <li key={i}>⚠ {w}</li>
          ))}
        </ul>
      )}
    </Card>
  );
}
