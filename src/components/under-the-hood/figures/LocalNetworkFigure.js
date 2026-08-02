"use client";

import { useState } from "react";
import { FigureChrome } from "@/components/under-the-hood/ArticleParts";
import { cn } from "@/lib/utils";

const MODES = ["everyone", "paired", "off"];

const DESC = {
  everyone: "Discoverable by name on the local network.",
  paired:
    "Announces its presence, but doesn’t hand its display name to strangers on the segment.",
  off: "No advertising at all. Can still see and send to others who are discoverable.",
};

function ModeSeg({ value, onChange, name }) {
  return (
    <div
      className="inline-flex w-full flex-wrap rounded-lg border border-border p-0.5"
      role="radiogroup"
    >
      {MODES.map((mode) => (
        <button
          aria-checked={value === mode}
          className={cn(
            "flex-1 rounded-md px-2 py-1.5 font-sans text-xs capitalize transition-colors",
            value === mode
              ? "bg-brand-brown text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
          key={mode}
          onClick={() => onChange(mode)}
          role="radio"
          type="button"
        >
          {mode === "everyone"
            ? "Everyone"
            : mode === "paired"
              ? "Paired only"
              : "Off"}
          <span className="sr-only"> ({name})</span>
        </button>
      ))}
    </div>
  );
}

function seen(mode, name, blocked) {
  if (blocked) return "Empty – multicast doesn’t cross this network.";
  if (mode === "off") return "Empty.";
  if (mode === "paired")
    return "One unnamed DashBeam device. Send needs a code or a pairing.";
  return `${name} – ready to send.`;
}

export default function LocalNetworkFigure() {
  const [a, setA] = useState("everyone");
  const [b, setB] = useState("everyone");
  const [blocked, setBlocked] = useState(false);

  return (
    <FigureChrome
      hint="Set each side"
      note='Try “Paired only” on one side and notice what still gets through.'
      number="4"
      title="Two devices, one network"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border p-3">
          <div className="mb-2.5 font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            Your laptop
          </div>
          <ModeSeg name="laptop discovery" onChange={setA} value={a} />
          <p className="mt-3 mb-0 font-sans text-[13.5px] leading-relaxed text-foreground">
            {DESC[a]}
          </p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="mb-2.5 font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            Their phone
          </div>
          <ModeSeg name="phone discovery" onChange={setB} value={b} />
          <p className="mt-3 mb-0 font-sans text-[13.5px] leading-relaxed text-foreground">
            {DESC[b]}
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-3 md:grid-cols-2">
        <div>
          <div className="mb-1.5 font-sans text-[10px] uppercase tracking-[0.1em] text-brand-brown">
            Laptop’s Nearby list
          </div>
          <div className="font-sans text-sm text-foreground">
            {seen(b, "Pixel 9", blocked)}
          </div>
        </div>
        <div>
          <div className="mb-1.5 font-sans text-[10px] uppercase tracking-[0.1em] text-brand-brown">
            Phone’s Nearby list
          </div>
          <div className="font-sans text-sm text-foreground">
            {seen(a, "Ada’s MacBook", blocked)}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-3">
        <label className="inline-flex cursor-pointer items-center gap-2 font-sans text-sm text-foreground">
          <input
            checked={blocked}
            className="size-4 accent-[var(--brand-brown)]"
            onChange={() => setBlocked((v) => !v)}
            type="checkbox"
          />
          Guest Wi-Fi blocks multicast
        </label>
        <span className="font-sans text-[12.5px] text-muted-foreground">
          {blocked
            ? "Nearby is empty on both sides. Not broken – there’s no setting that fixes it. Use a ticket instead."
            : "Plenty of guest networks and VPNs do."}
        </span>
      </div>
    </FigureChrome>
  );
}
