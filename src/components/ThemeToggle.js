"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { tx } from "@/lib/tx";

export const THEME_OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
  { value: "dark", label: "Dark", Icon: Moon },
];

const OPTIONS = THEME_OPTIONS;

const subscribe = () => () => {};

/**
 * `compact` renders a single button that cycles light → system → dark instead of
 * the three-segment group. The header uses it so a control people touch once
 * ever stops taking ~90px of the bar away from the download CTA.
 */
export default function ThemeToggle({ className = "", compact = false }) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("header");

  // The stored theme is only readable on the client, so the server renders a
  // same-sized placeholder instead of a toggle that would hydrate mismatched.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={`${compact ? "size-8 sm:size-7" : "h-8 w-26"} rounded-lg border border-input ${className}`}
      />
    );
  }

  if (compact) {
    const index = Math.max(
      0,
      OPTIONS.findIndex((option) => option.value === (theme ?? "system")),
    );
    const current = OPTIONS[index];
    const next = OPTIONS[(index + 1) % OPTIONS.length];
    const currentLabel = tx(t, `themeOptions.${current.value}`, current.label);
    const nextLabel = tx(t, `themeOptions.${next.value}`, next.label);

    return (
      <Button
        aria-label={
          t.has("themeCycle")
            ? t("themeCycle", { current: currentLabel, next: nextLabel })
            : `Color theme: ${currentLabel}. Switch to ${nextLabel}.`
        }
        className={className}
        onClick={() => setTheme(next.value)}
        size="icon-sm"
        title={
          t.has("themeTitle")
            ? t("themeTitle", { name: currentLabel })
            : `Theme: ${currentLabel}`
        }
        variant="ghost"
      >
        <current.Icon aria-hidden="true" />
      </Button>
    );
  }

  return (
    <ToggleGroup
      aria-label={tx(t, "colorTheme", "Color theme")}
      className={className}
      onValueChange={(value) => {
        const next = Array.isArray(value) ? value[0] : value;
        if (next) setTheme(next);
      }}
      value={[theme ?? "system"]}
      variant="outline"
    >
      {OPTIONS.map(({ value, label, Icon }) => (
        <ToggleGroupItem
          aria-label={tx(t, `themeOptions.${value}`, label)}
          key={value}
          size="sm"
          title={tx(t, `themeOptions.${value}`, label)}
          value={value}
        >
          <Icon aria-hidden="true" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
