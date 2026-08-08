"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioPrimitive from "@radix-ui/react-radio-group";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export const Label = ({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) => (
  <LabelPrimitive.Root className={cn("block text-sm font-medium mb-1.5", className)} {...props} />
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full min-h-11 rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] px-3 text-sm",
        "placeholder:text-[var(--fg-muted)] aria-[invalid=true]:border-el-fire",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] px-3 py-2.5 text-sm min-h-24",
        "placeholder:text-[var(--fg-muted)] aria-[invalid=true]:border-el-fire",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

/** Accessible inline error, referenced from inputs via aria-describedby. */
export function FieldError({ id, children }: { id: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-el-fire">
      {children}
    </p>
  );
}

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "h-5 w-5 shrink-0 rounded border border-[var(--line)] bg-[var(--bg-raised)]",
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
        <Check className="h-3.5 w-3.5" aria-hidden />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioPrimitive.Root>) {
  return <RadioPrimitive.Root className={cn("grid gap-2", className)} {...props} />;
}

export function RadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioPrimitive.Item> & { children: React.ReactNode }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] px-3 text-sm has-[[data-state=checked]]:border-primary">
      <RadioPrimitive.Item
        className={cn(
          "h-4.5 w-4.5 shrink-0 rounded-full border border-[var(--line)]",
          "data-[state=checked]:border-primary",
          className
        )}
        {...props}
      >
        <RadioPrimitive.Indicator className="flex h-full w-full items-center justify-center">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Item>
      {children}
    </label>
  );
}

export function Select({
  value,
  onValueChange,
  placeholder,
  options,
  triggerLabel,
  className,
  name,
  required,
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  triggerLabel: string; // screen-reader label
  className?: string;
  name?: string;
  required?: boolean;
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} name={name} required={required}>
      <SelectPrimitive.Trigger
        aria-label={triggerLabel}
        className={cn(
          "flex w-full min-h-11 items-center justify-between rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] px-3 text-sm data-[placeholder]:text-[var(--fg-muted)]",
          className
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown className="h-4 w-4 opacity-60" aria-hidden />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className="z-50 max-h-72 w-[var(--radix-select-trigger-width)] overflow-y-auto rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] py-1 shadow-lg"
        >
          <SelectPrimitive.Viewport>
            {options.map((o) => (
              <SelectPrimitive.Item
                key={o.value}
                value={o.value}
                className="flex min-h-10 cursor-pointer items-center gap-2 px-3 text-sm outline-none data-[highlighted]:bg-primary-soft data-[highlighted]:text-primary-strong dark:data-[highlighted]:bg-primary/20"
              >
                <SelectPrimitive.ItemIndicator>
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>{o.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
