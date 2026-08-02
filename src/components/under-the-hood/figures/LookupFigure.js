"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FigureChrome } from "@/components/under-the-hood/ArticleParts";

export default function LookupFigure() {
  const [tampered, setTampered] = useState(false);

  return (
    <FigureChrome
      note="The lookup service can lie. It just can’t lie successfully."
      number="2"
      title="Name to location"
    >
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_44px_1.15fr]">
        <div className="rounded-lg border border-border p-3">
          <div className="mb-2 font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            The name you already have
          </div>
          <div className="break-all font-mono text-[12.5px] leading-relaxed text-brand-brown">
            k5ff3q7xr2m9wbt8ha0ncypelu6djz4svgo1ki2bxr7ad9mq3f
          </div>
          <div className="mt-2.5 font-sans text-[11.5px] text-muted-foreground">
            52 characters. A public key, not an address.
          </div>
        </div>
        <div
          aria-hidden="true"
          className="hidden text-center text-[22px] text-brand-brown md:block"
        >
          →
        </div>
        <div
          className="rounded-lg border p-3"
          style={{
            borderColor: tampered
              ? "var(--muted-foreground)"
              : "var(--brand-brown)",
          }}
        >
          <div className="mb-2 font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            The signed record that comes back
          </div>
          <div className="font-mono text-xs leading-[1.9] text-foreground">
            <div>
              relay &nbsp;={" "}
              <span className="text-brand-brown">eu-west.relay.dashbeam</span>
            </div>
            <div>
              direct ={" "}
              <span className="text-brand-brown">198.51.100.7:41641</span>
            </div>
            <div>
              direct ={" "}
              <span className="text-brand-brown">[2001:db8::4a]:41641</span>
            </div>
            <div className="mt-1.5 border-t border-dashed border-border pt-1.5">
              sig &nbsp;&nbsp;={" "}
              <span className="text-muted-foreground">
                {tampered
                  ? "ed25519:8c31…a0f2  (as delivered)"
                  : "ed25519:8c31…a0f2"}
              </span>
            </div>
          </div>
          <div
            className="mt-2.5 flex items-center gap-2 font-sans text-[12.5px]"
            style={{
              color: tampered
                ? "var(--muted-foreground)"
                : "var(--brand-brown)",
            }}
          >
            <span className="font-heading text-base">
              {tampered ? "✕" : "✓"}
            </span>
            {tampered
              ? "Signature does not match the name. Record discarded."
              : "Signature checks against the name you already had."}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-border pt-3">
        <Button
          onClick={() => setTampered((v) => !v)}
          size="sm"
          type="button"
          variant="outline"
        >
          {tampered ? "Undo the tamper" : "Flip one bit in the record"}
        </Button>
        <span className="font-sans text-[12.5px] text-muted-foreground">
          {tampered
            ? "The lookup service handed back a relay you didn’t ask for. Your device never even tries it."
            : "Nothing here has to be trusted – only available."}
        </span>
      </div>
    </FigureChrome>
  );
}
