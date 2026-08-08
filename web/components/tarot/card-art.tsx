"use client";

// Card face: the public-domain Rider-Waite-Smith image (public/images/tarot/
// <slug>.jpg), with an original generative SVG as a graceful fallback if the
// image is missing. Reversed cards rotate 180°.
import * as React from "react";
import type { Locale } from "@/lib/config";

const SUIT_COLOR: Record<string, string> = {
  wands: "var(--color-el-wood)",
  cups: "var(--color-el-water)",
  swords: "var(--color-el-metal)",
  pentacles: "var(--color-el-earth)",
  major: "var(--color-gold)",
};

function motifFor(index: number): string {
  const points = 5 + (index % 4);
  const cx = 60;
  const cy = 78;
  const rOuter = 26;
  const rInner = 11 + (index % 3) * 3;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }
  return d + "Z";
}

export function CardArt({
  index,
  slug,
  nameEn,
  nameZh,
  suit,
  reversed,
  locale,
  width = 120,
}: {
  index: number;
  slug?: string;
  nameEn: string;
  nameZh: string;
  suit: string | null;
  reversed: boolean;
  locale: Locale;
  width?: number;
}) {
  const [imgFailed, setImgFailed] = React.useState(false);
  const label =
    locale === "zh"
      ? `${nameZh}（${reversed ? "逆位" : "正位"}）`
      : `${nameEn} (${reversed ? "reversed" : "upright"})`;

  if (slug && !imgFailed) {
    return (
      // 2:3.45 card aspect ratio matches the RWS scans.
      <span
        className="inline-block overflow-hidden rounded-[8%] border border-[var(--line)] bg-[var(--bg-raised)] align-top shadow-sm"
        style={{ width, lineHeight: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/tarot/${slug}.jpg`}
          alt={label}
          width={width}
          className={reversed ? "rotate-180" : ""}
          style={{ width: "100%", height: "auto", display: "block" }}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      </span>
    );
  }

  // Fallback: generative face (used if an image is missing).
  const color = SUIT_COLOR[suit ?? "major"] ?? SUIT_COLOR.major;
  const name = locale === "zh" ? nameZh : nameEn;
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 120 190"
      width={width}
      className={reversed ? "rotate-180" : ""}
      style={{ height: "auto" }}
    >
      <rect x="2" y="2" width="116" height="186" rx="10" fill="var(--bg-raised)" stroke="var(--line)" strokeWidth="1.5" />
      <rect x="8" y="8" width="104" height="174" rx="7" fill="none" stroke={color} strokeOpacity="0.55" />
      <path d={motifFor(index)} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="60" cy="78" r="3" fill={color} />
      <text x="60" y="140" textAnchor="middle" fontSize={locale === "zh" ? 12 : 10} fill="var(--fg)" style={{ fontFamily: "var(--font-serif)" }}>
        {name.length > 18 ? name.slice(0, 17) + "…" : name}
      </text>
    </svg>
  );
}

export function CardBack({ width = 120 }: { width?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 120 190" width={width} style={{ height: "auto" }}>
      <rect x="2" y="2" width="116" height="186" rx="10" fill="var(--color-midnight)" stroke="var(--color-gold)" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="60" cy="95" r="30" fill="none" stroke="var(--color-gold)" strokeOpacity="0.5" />
      <circle cx="60" cy="95" r="20" fill="none" stroke="var(--color-gold)" strokeOpacity="0.35" strokeDasharray="2 5" />
      <circle cx="60" cy="95" r="2.5" fill="var(--color-gold)" fillOpacity="0.7" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle
          key={a}
          cx={60 + 30 * Math.cos((a * Math.PI) / 180)}
          cy={95 + 30 * Math.sin((a * Math.PI) / 180)}
          r="1.5"
          fill="var(--color-gold)"
          fillOpacity="0.6"
        />
      ))}
    </svg>
  );
}
