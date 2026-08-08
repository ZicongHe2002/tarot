// Server component: renders the deterministic "Today's Sky" snapshot.
// `compact` shows a summary strip (for the hub); full shows everything.
import Link from "next/link";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Card, Badge } from "@/components/ui/card";
import { getSkyNow, signGlyph, type SkyNow } from "@/lib/sky";

const PLANET_GLYPH: Record<string, string> = {
  sun: "☉", moon: "☽", mercury: "☿", venus: "♀", mars: "♂",
  jupiter: "♃", saturn: "♄", uranus: "⛢", neptune: "♆", pluto: "♇",
};

export function TodaySky({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const sky = getSkyNow();
  const lo = locale;
  const sign = (name: string, zh: string) => (lo === "zh" ? zh : name);

  if (compact) {
    return (
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">{t(M.todaySky, lo)}</h2>
          <span className="text-xs text-[var(--fg-muted)]">{sky.date}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="gold">
            ☉ {sign(sky.sun.sign, sky.sun.sign_zh)} {sky.sun.degree_in_sign.toFixed(0)}°
          </Badge>
          <Badge tone="info">
            {sky.moonPhase.emoji} {sign(sky.moon.sign, sky.moon.sign_zh)} · {lo === "zh" ? sky.moonPhase.name_zh : sky.moonPhase.name_en}
          </Badge>
          {sky.retrogrades.length > 0 ? (
            <Badge tone="warn">
              ℞ {sky.retrogrades.map((p) => sign(p.planet_en, p.planet_zh)).join(", ")}
            </Badge>
          ) : (
            <Badge>{t(M.skyNoRetrogrades, lo)}</Badge>
          )}
        </div>
        <Link
          href={`/${lo}/astrology/today`}
          className="mt-4 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          {t(M.skyViewFull, lo)} →
        </Link>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-[var(--fg-muted)]">☉ {lo === "zh" ? "太阳" : "Sun"}</p>
          <p className="font-display mt-1 text-2xl">
            {signGlyph(sky.sun.sign)} {sign(sky.sun.sign, sky.sun.sign_zh)}
          </p>
          <p className="text-sm text-[var(--fg-muted)]">{sky.sun.degree_in_sign.toFixed(1)}°</p>
        </Card>
        <Card>
          <p className="text-sm text-[var(--fg-muted)]">{t(M.skyMoonPhase, lo)}</p>
          <p className="font-display mt-1 text-2xl">
            {sky.moonPhase.emoji} {lo === "zh" ? sky.moonPhase.name_zh : sky.moonPhase.name_en}
          </p>
          <p className="text-sm text-[var(--fg-muted)]">
            {signGlyph(sky.moon.sign)} {sign(sky.moon.sign, sky.moon.sign_zh)} {sky.moon.degree_in_sign.toFixed(1)}°
          </p>
        </Card>
        <Card>
          <p className="text-sm text-[var(--fg-muted)]">{t(M.skyRetrogrades, lo)}</p>
          {sky.retrogrades.length > 0 ? (
            <p className="font-display mt-1 text-lg">
              {sky.retrogrades.map((p) => `℞ ${sign(p.planet_en, p.planet_zh)}`).join("  ")}
            </p>
          ) : (
            <p className="mt-1 text-sm text-[var(--fg-muted)]">{t(M.skyNoRetrogrades, lo)}</p>
          )}
        </Card>
      </div>

      <Card>
        <h3 className="font-display text-lg font-semibold">{t(M.skyCurrentAspects, lo)}</h3>
        {sky.aspects.length > 0 ? (
          <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
            {sky.aspects.map((a, i) => (
              <li key={i}>
                {sign(a.a, a.a_zh)} {lo === "zh" ? a.aspect_zh : a.aspect} {sign(a.b, a.b_zh)}{" "}
                <span className="tabular-nums text-[var(--fg-muted)]">({a.orb.toFixed(1)}°)</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-[var(--fg-muted)]">
            {lo === "zh" ? "今日没有紧密相位。" : "No tight aspects today."}
          </p>
        )}
      </Card>

      <Card>
        <h3 className="font-display text-lg font-semibold">{t(M.skyAllPositions, lo)}</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[24rem] text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-left text-[var(--fg-muted)]">
                <th scope="col" className="py-1.5 pr-3 font-medium">{t(M.planet, lo)}</th>
                <th scope="col" className="py-1.5 pr-3 font-medium">{t(M.sign, lo)}</th>
                <th scope="col" className="py-1.5 pr-3 font-medium">{t(M.degree, lo)}</th>
                <th scope="col" className="py-1.5 font-medium">{t(M.retrogradeCol, lo)}</th>
              </tr>
            </thead>
            <tbody>
              {sky.planets.map((p) => (
                <tr key={p.planet} className="border-b border-[var(--line)]/60">
                  <td className="py-1.5 pr-3">
                    <span aria-hidden className="mr-1.5">{PLANET_GLYPH[p.planet]}</span>
                    {sign(p.planet_en, p.planet_zh)}
                  </td>
                  <td className="py-1.5 pr-3">{signGlyph(p.sign)} {sign(p.sign, p.sign_zh)}</td>
                  <td className="py-1.5 pr-3 tabular-nums">{p.degree_in_sign.toFixed(1)}°</td>
                  <td className="py-1.5">{p.retrograde ? (lo === "zh" ? "是 ℞" : "Yes ℞") : (lo === "zh" ? "否" : "No")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export type { SkyNow };
