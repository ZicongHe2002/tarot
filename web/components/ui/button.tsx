import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-strong focus-visible:outline-primary disabled:opacity-50",
  secondary:
    "bg-gold/15 text-[var(--fg)] border border-gold/40 hover:bg-gold/25 disabled:opacity-50",
  outline:
    "border border-[var(--line)] bg-transparent hover:bg-[var(--bg-raised)] disabled:opacity-50",
  ghost: "bg-transparent hover:bg-[var(--bg-raised)] disabled:opacity-50",
  danger: "bg-el-fire text-white hover:opacity-90 disabled:opacity-50",
};

// min-h keeps touch targets ≥44px (WCAG 2.5.8 practical target).
const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-7 text-base",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
