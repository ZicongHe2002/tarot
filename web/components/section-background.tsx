// Distinct ambient background per discipline, rendered as a decorative layer
// behind each section's content. Static SVG + gradient (no animation → no
// reduced-motion concern), low opacity so text contrast is preserved, and
// tuned to read in both light and dark themes.
import type { CSSProperties } from "react";

type Kind = "tarot" | "astrology" | "bazi";

function Stars({ seed, fill }: { seed: number; fill: string }) {
  // deterministic scatter
  const pts: Array<[number, number, number]> = [];
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < 40; i++) pts.push([rnd() * 1200, rnd() * 600, 0.5 + rnd() * 1.6]);
  return (
    <g fill={fill}>
      {pts.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} opacity={0.4 + (i % 5) * 0.12} />
      ))}
    </g>
  );
}

export function SectionBackground({ kind }: { kind: Kind }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden">
      <div className="h-full w-full" style={maskStyle}>
        {kind === "tarot" && <TarotBg />}
        {kind === "astrology" && <AstrologyBg />}
        {kind === "bazi" && <BaziBg />}
      </div>
    </div>
  );
}

// Fade the whole decorative band out toward the bottom so the page body
// returns to the normal background.
const maskStyle: CSSProperties = {
  maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
};

function TarotBg() {
  // Arcane: deep violet wash, gold rays and stars.
  return (
    <svg className="h-full w-full" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMin slice">
      <defs>
        <radialGradient id="tarot-glow" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.20" />
          <stop offset="55%" stopColor="var(--color-primary)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="1200" height="640" fill="url(#tarot-glow)" />
      {/* radiating gold rays from top center */}
      <g stroke="var(--color-gold)" strokeOpacity="0.10">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI - Math.PI / 2;
          return <line key={i} x1={600} y1={-40} x2={600 + 900 * Math.cos(a)} y2={-40 + 900 * Math.sin(a)} />;
        })}
      </g>
      <circle cx="600" cy="-40" r="120" fill="none" stroke="var(--color-gold)" strokeOpacity="0.18" />
      <circle cx="600" cy="-40" r="170" fill="none" stroke="var(--color-gold)" strokeOpacity="0.10" strokeDasharray="2 8" />
      <Stars seed={7} fill="var(--color-gold-soft)" />
    </svg>
  );
}

function AstrologyBg() {
  // Celestial: indigo wash, constellation lines, faint zodiac ring.
  const nodes: Array<[number, number]> = [
    [180, 120], [300, 200], [420, 140], [520, 260], [660, 180],
    [820, 260], [960, 160], [1060, 300], [240, 340], [700, 380],
  ];
  return (
    <svg className="h-full w-full" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMin slice">
      <defs>
        <radialGradient id="astro-glow" cx="70%" cy="10%" r="70%">
          <stop offset="0%" stopColor="#3d6b8e" stopOpacity="0.22" />
          <stop offset="60%" stopColor="var(--color-primary)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="1200" height="640" fill="url(#astro-glow)" />
      {/* zodiac ring */}
      <g transform="translate(950,120)">
        <circle r="150" fill="none" stroke="var(--color-gold)" strokeOpacity="0.14" />
        <circle r="120" fill="none" stroke="var(--color-gold)" strokeOpacity="0.08" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1={120 * Math.cos(a)} y1={120 * Math.sin(a)} x2={150 * Math.cos(a)} y2={150 * Math.sin(a)} stroke="var(--color-gold)" strokeOpacity="0.14" />;
        })}
      </g>
      {/* constellation */}
      <g stroke="var(--color-el-water)" strokeOpacity="0.28" fill="none">
        {nodes.slice(0, -1).map((n, i) => (
          <line key={i} x1={n[0]} y1={n[1]} x2={nodes[i + 1][0]} y2={nodes[i + 1][1]} />
        ))}
      </g>
      <g fill="var(--color-el-water)">
        {nodes.map((n, i) => (
          <circle key={i} cx={n[0]} cy={n[1]} r={2.5} opacity={0.7} />
        ))}
      </g>
      <Stars seed={19} fill="#9fb6cf" />
    </svg>
  );
}

function BaziBg() {
  // Ink & element: warm amber/jade wash, concentric seal rings, five-element dots.
  const elements = [
    "var(--color-el-wood)", "var(--color-el-fire)", "var(--color-el-earth)",
    "var(--color-el-metal)", "var(--color-el-water)",
  ];
  return (
    <svg className="h-full w-full" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMin slice">
      <defs>
        <radialGradient id="bazi-glow" cx="30%" cy="0%" r="75%">
          <stop offset="0%" stopColor="var(--color-el-earth)" stopOpacity="0.18" />
          <stop offset="55%" stopColor="var(--color-gold)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="1200" height="640" fill="url(#bazi-glow)" />
      {/* concentric seal rings + inner square (印章 feel) */}
      <g transform="translate(950,150)" stroke="var(--color-gold)" fill="none">
        <circle r="150" strokeOpacity="0.13" />
        <circle r="110" strokeOpacity="0.09" />
        <rect x="-70" y="-70" width="140" height="140" strokeOpacity="0.12" transform="rotate(45)" />
      </g>
      {/* five-element generation pentagon */}
      <g transform="translate(240,200)">
        {elements.map((c, i) => {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          const x = 90 * Math.cos(a);
          const y = 90 * Math.sin(a);
          const nx = 90 * Math.cos(((i + 1) / 5) * Math.PI * 2 - Math.PI / 2);
          const ny = 90 * Math.sin(((i + 1) / 5) * Math.PI * 2 - Math.PI / 2);
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={nx} y2={ny} stroke="var(--color-gold)" strokeOpacity="0.12" />
              <circle cx={x} cy={y} r={6} fill={c} opacity={0.5} />
            </g>
          );
        })}
      </g>
      <Stars seed={31} fill="var(--color-gold-soft)" />
    </svg>
  );
}
