"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Moon, Sun, Languages, Menu, X } from "lucide-react";

export function HeaderControls({
  locale,
  localeSwitchLabel,
  themeLabel,
}: {
  locale: "en" | "zh";
  localeSwitchLabel: string;
  themeLabel: string;
}) {
  const pathname = usePathname() || `/${locale}`;
  const other = locale === "en" ? "zh" : "en";
  const switched = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${other}`);

  const [dark, setDark] = React.useState<boolean | null>(null);
  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={toggleTheme}
        aria-label={themeLabel}
        aria-pressed={dark === true}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-[var(--bg-raised)]"
      >
        {dark ? <Sun className="h-4.5 w-4.5" aria-hidden /> : <Moon className="h-4.5 w-4.5" aria-hidden />}
      </button>
      <Link
        href={switched}
        aria-label={localeSwitchLabel}
        onClick={() => {
          document.cookie = `locale=${other};path=/;max-age=31536000;samesite=lax`;
        }}
        className="inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-2 text-sm hover:bg-[var(--bg-raised)]"
      >
        <Languages className="h-4.5 w-4.5" aria-hidden />
        <span>{locale === "en" ? "中文" : "EN"}</span>
      </Link>
    </div>
  );
}

export function MobileNav({ label, items }: { label: string; items: Array<{ href: string; label: string }> }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label={label}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-[var(--bg-raised)] lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-72 bg-[var(--bg)] p-6 shadow-xl focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-lg">{label}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                aria-label={label === "菜单" ? "关闭菜单" : "Close menu"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-[var(--bg-raised)]"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>
          <nav className="mt-4">
            <ul className="grid gap-1">
              {items.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm hover:bg-[var(--bg-raised)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
