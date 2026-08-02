"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FigureChrome } from "@/components/under-the-hood/ArticleParts";
import { cn } from "@/lib/utils";

const CAPS = [
  "Two machines, each behind a router doing address translation. From the outside neither has a reachable address. Neither can dial the other.",
  "Both dial out to a relay – an outbound connection their routers are happy to allow. The transfer starts here. Bytes are already moving.",
  "Each side collects the addresses it might be reachable at: local interfaces, and what the relay reports seeing.",
  "The relay coordinates a moment. Both machines fire a packet at the other’s candidate addresses at the same time. Each router notes an outbound conversation and starts expecting a reply.",
];

export default function HolePunchFigure() {
  const [step, setStep] = useState(0);
  const [strict, setStrict] = useState(false);

  const lastCap = strict
    ? "Strict routers assign a fresh outside port per destination, so the address each side was aiming at is already wrong. No direct path – and the transfer carries on over the relay, slower, uninterrupted."
    : "The replies arrive into holes each router now believes it opened itself. Neither router thinks it accepted an inbound connection. Both did. Traffic moves to the direct path and the relay steps back.";

  const caption = step < 4 ? CAPS[step] : lastCap;
  const relayOp = step >= 1 ? (step >= 4 && !strict ? 0.3 : 1) : 0.12;

  return (
    <FigureChrome
      hint={`Step ${step + 1} of 5`}
      note="Set both routers strict and watch the direct connection fail – then watch the transfer carry on anyway."
      number="3"
      title="Punching through"
    >
      <svg
        aria-label="Hole punching walkthrough"
        className="block h-auto w-full"
        role="img"
        viewBox="0 0 760 280"
      >
        <g style={{ opacity: relayOp }}>
          <path
            d="M115 120 L330 62 M645 120 L430 62"
            fill="none"
            stroke="var(--brand-brown)"
            strokeWidth="2"
          />
          <text
            fill="var(--brand-brown)"
            fontSize="11"
            textAnchor="middle"
            x="380"
            y="98"
          >
            data is already flowing here
          </text>
        </g>
        <g style={{ opacity: step >= 2 ? 1 : 0 }}>
          <text
            fill="var(--muted-foreground)"
            fontSize="10.5"
            textAnchor="middle"
            x="115"
            y="205"
          >
            candidate addrs · 3
          </text>
          <text
            fill="var(--muted-foreground)"
            fontSize="10.5"
            textAnchor="middle"
            x="645"
            y="205"
          >
            candidate addrs · 2
          </text>
        </g>
        <g style={{ opacity: step === 3 ? 1 : 0 }}>
          <path
            d="M170 140 L330 140 M590 140 L430 140"
            fill="none"
            stroke="var(--brand-brown)"
            strokeDasharray="5 5"
            strokeWidth="2"
          />
          <path
            d="M330 140 l-9 -5 v10 z M430 140 l9 -5 v10 z"
            fill="var(--brand-brown)"
          />
          <text
            fill="var(--brand-brown)"
            fontSize="11"
            textAnchor="middle"
            x="380"
            y="132"
          >
            both send, at once
          </text>
        </g>
        <g style={{ opacity: step >= 4 && !strict ? 1 : 0 }}>
          <path
            d="M170 140 L590 140"
            fill="none"
            stroke="var(--brand-brown)"
            strokeWidth="3"
          />
          <rect
            fill="var(--card)"
            height="20"
            rx="3"
            width="124"
            x="318"
            y="126"
          />
          <text
            fill="var(--brand-brown)"
            fontSize="11.5"
            textAnchor="middle"
            x="380"
            y="141"
          >
            direct path open
          </text>
        </g>
        <g style={{ opacity: step >= 4 && strict ? 1 : 0 }}>
          <path
            d="M170 140 L590 140"
            fill="none"
            stroke="var(--border)"
            strokeDasharray="4 6"
            strokeWidth="2"
          />
          <path
            d="M368 128 l24 24 M392 128 l-24 24"
            stroke="var(--muted-foreground)"
            strokeWidth="2"
          />
          <text
            fill="var(--muted-foreground)"
            fontSize="11"
            textAnchor="middle"
            x="380"
            y="172"
          >
            no direct path – the relay stays
          </text>
        </g>
        <g fill="none" stroke="var(--muted-foreground)">
          <rect
            height="44"
            rx="3"
            stroke="var(--brand-brown)"
            width="100"
            x="330"
            y="36"
          />
          <rect height="40" rx="3" width="110" x="60" y="120" />
          <rect height="40" rx="3" width="110" x="590" y="120" />
          <rect height="42" rx="3" width="140" x="45" y="220" />
          <rect height="42" rx="3" width="140" x="575" y="220" />
          <path d="M115 160 L115 220 M645 160 L645 220" stroke="var(--border)" />
        </g>
        <g fill="var(--foreground)" fontSize="11.5" textAnchor="middle">
          <text x="380" y="63">
            RELAY
          </text>
          <text x="115" y="145">
            router A
          </text>
          <text x="645" y="145">
            router B
          </text>
          <text x="115" y="246">
            your machine
          </text>
          <text x="645" y="246">
            their machine
          </text>
        </g>
      </svg>
      <p className="mt-4 mb-0 min-h-11 font-sans text-[14.5px] leading-relaxed text-foreground">
        {caption}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2.5 border-t border-border pt-3">
        <Button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          size="sm"
          type="button"
          variant="outline"
        >
          ← Back
        </Button>
        <Button
          onClick={() => setStep((s) => (s >= 4 ? 0 : s + 1))}
          size="sm"
          type="button"
        >
          {step >= 4 ? "Start over" : "Next →"}
        </Button>
        <label
          className={cn(
            "ms-3 inline-flex cursor-pointer items-center gap-2 font-sans text-sm text-foreground",
          )}
        >
          <input
            checked={strict}
            className="size-4 accent-[var(--brand-brown)]"
            onChange={() => setStrict((v) => !v)}
            type="checkbox"
          />
          Both routers at their strictest
        </label>
      </div>
    </FigureChrome>
  );
}
