"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FigureChrome } from "@/components/under-the-hood/ArticleParts";

const CAPS = [
  "A transfer is running over the phone’s home Wi-Fi. A relay connection is open alongside it, as it always is.",
  "The phone leaves the house. A monitor notices the interfaces and routing table have changed.",
  "Probes go out to relays to learn the new public addresses and how far away each relay is.",
  "A small signed message crosses the relay to the desktop: here’s where I am now. Data is still flowing over that same relay.",
  "The desktop updates its address book. Same key, new addresses – nothing about the connection’s identity changed.",
  "The new path validates and traffic moves onto it. The progress bar never registered any of this.",
];

const NETS = [
  "home Wi-Fi",
  "home Wi-Fi",
  "switching…",
  "cellular",
  "cellular",
  "cellular",
];

export default function RoamingFigure() {
  const [step, setStep] = useState(0);
  const pct = 34 + step * 8;

  return (
    <FigureChrome
      hint={`Step ${step + 1} of 6`}
      note="Try to break it. Notice what doesn’t happen."
      number="5"
      title="Move the machine"
    >
      <svg
        aria-label="Network roaming walkthrough"
        className="block h-auto w-full"
        role="img"
        viewBox="0 0 760 250"
      >
        <g style={{ opacity: step <= 1 ? 1 : step <= 3 ? 0.3 : 0.1 }}>
          <path
            d="M180 100 C 300 30, 460 30, 580 100"
            fill="none"
            stroke="var(--brand-brown)"
            strokeWidth="2.5"
          />
          <text
            fill="var(--brand-brown)"
            fontSize="11"
            textAnchor="middle"
            x="380"
            y="42"
          >
            path A – home Wi-Fi
          </text>
        </g>
        <g style={{ opacity: step >= 5 ? 1 : step >= 3 ? 0.45 : 0.08 }}>
          <path
            d="M180 140 C 300 215, 460 215, 580 140"
            fill="none"
            stroke="var(--brand-brown)"
            strokeDasharray={step >= 5 ? "0" : "6 6"}
            strokeWidth="2.5"
          />
          <text
            fill="var(--brand-brown)"
            fontSize="11"
            textAnchor="middle"
            x="380"
            y="212"
          >
            path B – cellular
          </text>
        </g>
        <g style={{ opacity: step >= 1 && step <= 4 ? 1 : 0.35 }}>
          <path
            d="M180 118 L330 118 M430 118 L580 118"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <rect
            fill="var(--card)"
            height="32"
            rx="3"
            stroke="var(--brand-brown)"
            width="100"
            x="330"
            y="102"
          />
          <text fill="var(--foreground)" fontSize="11" textAnchor="middle" x="380" y="122">
            RELAY
          </text>
        </g>
        <g fill="none" stroke="var(--muted-foreground)">
          <rect height="60" rx="3" width="120" x="60" y="88" />
          <rect height="60" rx="3" width="120" x="580" y="88" />
        </g>
        <g fontSize="11.5" textAnchor="middle">
          <text fill="var(--foreground)" x="120" y="115">
            your phone
          </text>
          <text fill="var(--muted-foreground)" fontSize="10" x="120" y="132">
            {NETS[step]}
          </text>
          <text fill="var(--foreground)" x="640" y="122">
            their desktop
          </text>
        </g>
      </svg>
      <div className="mt-3">
        <div className="mb-1.5 flex justify-between font-sans text-[11.5px] tabular-nums text-muted-foreground">
          <span>transfer</span>
          <span>{pct}% – never stalls</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-sm border border-border">
          <div
            className="h-full bg-brand-brown transition-[width] duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <p className="mt-4 mb-0 min-h-11 font-sans text-[14.5px] leading-relaxed text-foreground">
        {CAPS[step]}
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5 border-t border-border pt-3">
        <Button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          size="sm"
          type="button"
          variant="outline"
        >
          ← Back
        </Button>
        <Button
          onClick={() => setStep((s) => (s >= 5 ? 0 : s + 1))}
          size="sm"
          type="button"
        >
          {step >= 5 ? "Start over" : "Next →"}
        </Button>
      </div>
    </FigureChrome>
  );
}
