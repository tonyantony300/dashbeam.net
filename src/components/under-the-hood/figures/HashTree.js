"use client";

import { useState } from "react";
import { FigureChrome } from "@/components/under-the-hood/ArticleParts";

function pathPoints(i) {
  const lc = 108 + 72 * i;
  const l1 = 144 + 144 * Math.floor(i / 2);
  const l2 = 216 + 288 * Math.floor(i / 4);
  return [
    [lc, 240],
    [l1, 194],
    [l1, 170],
    [l2, 134],
    [l2, 110],
    [360, 78],
  ]
    .map((p) => p.join(","))
    .join(" ");
}

export default function HashTree() {
  const [leaf, setLeaf] = useState(3);

  return (
    <FigureChrome
      hint="Click any chunk"
      note="Notice how little of the tree has to change."
      number="1"
      title="The fingerprint tree"
    >
      <svg
        aria-label="Interactive hash tree. Click a leaf chunk to highlight the path to the root."
        className="block h-auto w-full"
        role="img"
        viewBox="0 0 720 300"
      >
        <g
          className="stroke-border"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ color: "var(--border)" }}
        >
          <path d="M108 240 L144 194 M180 240 L144 194 M252 240 L288 194 M324 240 L288 194 M396 240 L432 194 M468 240 L432 194 M540 240 L576 194 M612 240 L576 194" />
          <path d="M144 170 L216 134 M288 170 L216 134 M432 170 L504 134 M576 170 L504 134" />
          <path d="M216 110 L360 78 M504 110 L360 78" />
        </g>
        <polyline
          fill="none"
          points={pathPoints(leaf)}
          stroke="var(--brand-brown)"
          strokeWidth="2"
        />
        <g fill="none" stroke="var(--muted-foreground)">
          <rect
            height="28"
            rx="3"
            stroke="var(--brand-brown)"
            width="64"
            x="328"
            y="50"
          />
          <rect height="24" rx="3" width="40" x="196" y="110" />
          <rect height="24" rx="3" width="40" x="484" y="110" />
          <rect height="24" rx="3" width="40" x="124" y="170" />
          <rect height="24" rx="3" width="40" x="268" y="170" />
          <rect height="24" rx="3" width="40" x="412" y="170" />
          <rect height="24" rx="3" width="40" x="556" y="170" />
        </g>
        <g
          fill="var(--muted-foreground)"
          fontSize="10"
          style={{ fontVariantNumeric: "tabular-nums" }}
          textAnchor="middle"
        >
          <text x="360" y="68">
            ROOT · 32 B
          </text>
          <text x="216" y="126">
            hash
          </text>
          <text x="504" y="126">
            hash
          </text>
          <text x="144" y="186">
            hash
          </text>
          <text x="288" y="186">
            hash
          </text>
          <text x="432" y="186">
            hash
          </text>
          <text x="576" y="186">
            hash
          </text>
        </g>
        <g>
          {Array.from({ length: 8 }, (_, i) => (
            <rect
              className="cursor-pointer"
              fill="var(--muted)"
              height="30"
              key={i}
              onClick={() => setLeaf(i)}
              rx="3"
              stroke="var(--border)"
              width="60"
              x={78 + 72 * i}
              y="240"
            />
          ))}
        </g>
        <rect
          fill="color-mix(in srgb, var(--brand-brown) 22%, transparent)"
          height="30"
          pointerEvents="none"
          rx="3"
          stroke="var(--brand-brown)"
          width="60"
          x={78 + 72 * leaf}
          y="240"
        />
        <text
          fill="var(--muted-foreground)"
          fontSize="11"
          textAnchor="middle"
          x="360"
          y="292"
        >
          chunks of the folder, in order
        </text>
      </svg>
      <p className="mt-3 mb-0 text-center font-sans text-[13.5px] text-foreground">
        Chunk {leaf + 1} changed. Only 4 hashes on the path to the root are
        recomputed – the other 11 nodes are untouched, and the 32-byte value at
        the top is now a different address entirely.
      </p>
    </FigureChrome>
  );
}
