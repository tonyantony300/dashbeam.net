"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
  { value: "dark", label: "Dark", Icon: Moon },
];

const subscribe = () => () => {};

export default function ThemeToggle({ className = "" }) {
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
        className={`h-8 w-26 rounded-lg border border-input ${className}`}
      />
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
