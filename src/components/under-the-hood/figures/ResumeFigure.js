"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FigureChrome } from "@/components/under-the-hood/ArticleParts";

export default function ResumeFigure() {
  const [held, setHeld] = useState(18);
  const [bad, setBad] = useState(-1);
  const [running, setRunning] = useState(true);
  const [resumed, setResumed] = useState(false);

  const chunks = Array.from({ length: 28 }, (_, i) => {
    let fill = "var(--muted)";
    let title = `chunk ${i + 1} – not received`;
    if (i === bad) {
      fill = "var(--foreground)";
      title = `chunk ${i + 1} – failed verification against the root`;
    } else if (i < held) {
      fill = "color-mix(in srgb, var(--brand-brown) 55%, transparent)";
      title = `chunk ${i + 1} – held and verified`;
    }
    return { fill, title };
  });

  let caption =
    "A transfer in progress. Each chunk is checked against the root as it lands – not at the end.";
  if (bad >= 0) {
    caption = `Chunk ${bad + 1} didn’t match its leaf hash. The failure is localized to that chunk; everything before it is still trusted. It gets re-requested, and nothing else is thrown away.`;
  } else if (!running && !resumed) {
    caption =
      "Lid closed, network gone, app quit. The receiver still knows exactly which chunks it holds and has verified – that knowledge is just the tree.";
  } else if (resumed) {
    caption =
      "Back online. The receiver asks only for the chunks it doesn’t have. Nothing already arrived is re-sent, and nothing already arrived is taken on faith.";
  }

  const heldCount = bad >= 0 ? bad : held;
  const stateLabel =
    bad >= 0
      ? `chunk ${bad + 1} rejected`
      : running
        ? "receiving"
        : resumed
          ? "resumed"
          : "interrupted";

  return (
    <FigureChrome
      note="Corruption localizes to one leaf. A resume asks only for what’s missing."
      number="6"
      title="The same tree, under load"
    >
      <div className="flex h-[52px] items-stretch gap-0.5">
        {chunks.map((c, i) => (
          <div
            className="flex-1 rounded-sm border border-border transition-colors duration-300"
            key={i}
            style={{ background: c.fill }}
            title={c.title}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-sans text-[11.5px] tabular-nums text-muted-foreground">
        <span>{heldCount} of 28 chunks held and verified</span>
        <span>{stateLabel}</span>
      </div>
      <p className="mt-4 mb-0 min-h-11 font-sans text-[14.5px] leading-relaxed text-foreground">
        {caption}
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5 border-t border-border pt-3">
        <Button
          onClick={() => {
            setBad(11);
            setRunning(false);
            setResumed(false);
          }}
          size="sm"
          type="button"
          variant="outline"
        >
          Corrupt a chunk
        </Button>
        <Button
          onClick={() => {
            setBad(-1);
            setRunning(false);
            setResumed(false);
          }}
          size="sm"
          type="button"
          variant="outline"
        >
          Interrupt
        </Button>
        <Button
          onClick={() => {
            setHeld(28);
            setBad(-1);
            setRunning(false);
            setResumed(true);
          }}
          size="sm"
          type="button"
        >
          Resume
        </Button>
        <Button
          onClick={() => {
            setHeld(18);
            setBad(-1);
            setRunning(true);
            setResumed(false);
          }}
          size="sm"
          type="button"
          variant="ghost"
        >
          Reset
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-5 font-sans text-[11.5px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="size-3 rounded-sm border border-border"
            style={{
              background:
                "color-mix(in srgb, var(--brand-brown) 55%, transparent)",
            }}
          />
          held & verified
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded-sm border border-border bg-muted" />
          not yet received
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded-sm border border-border bg-foreground" />
          failed verification
        </span>
      </div>
    </FigureChrome>
  );
}
