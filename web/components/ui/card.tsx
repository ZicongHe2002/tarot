import * as React from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-6",
        className
      )}
      {...props}
    />
  );
}

export function Badge({
  className,
  tone = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: "default" | "gold" | "info" | "warn" }) {
  const tones = {
    default: "bg-[var(--bg)] border-[var(--line)] text-[var(--fg-muted)]",
    gold: "bg-gold/10 border-gold/40 text-[var(--gold-text)]",
    info: "bg-primary-soft border-primary/30 text-primary-strong dark:bg-primary/15 dark:text-[var(--accent)]",
    warn: "bg-el-fire/10 border-el-fire/40 text-[var(--fire-text)]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}

export function Alert({
  className,
  tone = "info",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { tone?: "info" | "warn" | "success" }) {
  const tones = {
    info: "border-primary/30 bg-primary-soft/60 dark:bg-primary/10",
    warn: "border-el-fire/40 bg-el-fire/10",
    success: "border-el-wood/40 bg-el-wood/10",
  };
  return (
    <div
      role={tone === "warn" ? "alert" : "note"}
      className={cn("rounded-xl border px-4 py-3 text-sm leading-relaxed", tones[tone], className)}
      {...props}
    />
  );
}

export function Spinner({ label }: { label: string }) {
  return (
    <span role="status" className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)]">
      <span
        aria-hidden
        className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)] motion-reduce:animate-none"
      />
      {label}
    </span>
  );
}
