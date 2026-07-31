"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

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

    return (
      <Button
        aria-label={`Color theme: ${current.label}. Switch to ${next.label}.`}
        className={className}
        onClick={() => setTheme(next.value)}
        size="icon-sm"
        title={`Theme: ${current.label}`}
        variant="ghost"
      >
        <current.Icon aria-hidden="true" />
      </Button>
    );
  }

  return (
    <ToggleGroup
      aria-label="Color theme"
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
          aria-label={label}
          key={value}
          size="sm"
          title={label}
          value={value}
        >
          <Icon aria-hidden="true" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
