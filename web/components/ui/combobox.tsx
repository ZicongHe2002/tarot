"use client";

// Accessible searchable combobox (WAI-ARIA combobox pattern): typeahead input,
// listbox popup, full keyboard support (arrows/Enter/Escape/Tab), works with
// sync or async option sources.
import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ComboOption {
  value: string;
  label: string;
  hint?: string;
}

export function Combobox({
  id,
  label,
  placeholder,
  value,
  displayValue,
  onSelect,
  onQueryChange,
  options,
  loading,
  emptyText,
  clearText,
  disabled,
  className,
}: {
  id: string;
  label: string; // accessible label (rendered by parent <Label htmlFor>)
  placeholder?: string;
  value: string | null; // selected option value
  displayValue: string; // text shown when closed/selected
  onSelect: (opt: ComboOption | null) => void;
  onQueryChange?: (q: string) => void; // async sources hook here
  options: ComboOption[];
  loading?: boolean;
  emptyText: string;
  clearText: string;
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listId = `${id}-listbox`;

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  React.useEffect(() => {
    if (active >= options.length) setActive(0);
  }, [options.length, active]);

  function openWith(q: string) {
    setOpen(true);
    setQuery(q);
    onQueryChange?.(q);
  }

  function choose(opt: ComboOption) {
    onSelect(opt);
    setOpen(false);
    setQuery("");
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault();
      openWith("");
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (options[active]) choose(options[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && options[active] ? `${id}-opt-${active}` : undefined}
          aria-label={label}
          disabled={disabled}
          className={cn(
            "w-full min-h-11 rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] px-3 pr-16 text-sm",
            "placeholder:text-[var(--fg-muted)] disabled:opacity-50"
          )}
          placeholder={placeholder}
          value={open ? query : displayValue}
          onChange={(e) => openWith(e.target.value)}
          onFocus={() => {
            if (!displayValue) openWith("");
          }}
          onClick={() => {
            if (!open) openWith("");
          }}
          onKeyDown={onKeyDown}
        />
        <div className="absolute inset-y-0 right-1.5 flex items-center gap-0.5">
          {value && !disabled && (
            <button
              type="button"
              aria-label={clearText}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--bg)]"
              onClick={() => {
                onSelect(null);
                setQuery("");
                setOpen(false);
                inputRef.current?.focus();
              }}
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          )}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--bg)]"
            onClick={() => (open ? setOpen(false) : (openWith(""), inputRef.current?.focus()))}
          >
            <ChevronDown className="h-4 w-4 opacity-60" />
          </button>
        </div>
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="absolute z-50 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] py-1 shadow-lg"
        >
          {loading && (
            <li className="px-3 py-2.5 text-sm text-[var(--fg-muted)]" role="presentation">
              …
            </li>
          )}
          {!loading && options.length === 0 && (
            <li className="px-3 py-2.5 text-sm text-[var(--fg-muted)]" role="presentation">
              {emptyText}
            </li>
          )}
          {!loading &&
            options.map((opt, i) => (
              <li
                key={opt.value}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={opt.value === value}
                className={cn(
                  "flex min-h-10 cursor-pointer items-baseline justify-between gap-3 px-3 py-2 text-sm",
                  i === active && "bg-primary-soft text-primary-strong dark:bg-primary/20 dark:text-[var(--fg)]"
                )}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault(); // keep input focus
                  choose(opt);
                }}
              >
                <span>{opt.label}</span>
                {opt.hint && <span className="shrink-0 text-xs text-[var(--fg-muted)]">{opt.hint}</span>}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
