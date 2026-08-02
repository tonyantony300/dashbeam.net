import { FigureChrome } from "@/components/under-the-hood/ArticleParts";

export default function RelayViewFigure() {
  return (
    <FigureChrome number="7" title="The relay’s view">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border p-3">
          <div className="mb-2.5 font-sans text-[10px] uppercase tracking-[0.1em] text-brand-brown">
            What you sent
          </div>
          <div className="font-mono text-[12.5px] leading-[1.85] text-foreground">
            <div>Iceland-2026/</div>
            <div className="ps-3.5">
              raw/DSC_0431.NEF{" "}
              <span className="text-muted-foreground">48.2 MB</span>
            </div>
            <div className="ps-3.5">
              raw/DSC_0432.NEF{" "}
              <span className="text-muted-foreground">47.9 MB</span>
            </div>
            <div className="ps-3.5">
              edit/cover.tiff{" "}
              <span className="text-muted-foreground">210 MB</span>
            </div>
            <div className="ps-3.5">notes.md</div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-muted p-3">
          <div className="mb-2.5 font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            What the relay sees
          </div>
          <div className="font-mono text-[12.5px] leading-[1.85] text-foreground">
            <div>from &nbsp;k5ff3q7x…r7ad9mq3f</div>
            <div>to &nbsp;&nbsp;&nbsp;p2nw8ck1…y6ht0bz5e</div>
            <div>bytes 1&nbsp;204&nbsp;883&nbsp;712</div>
            <div>from 14:02 to 14:19 UTC</div>
            <div className="mt-2 break-all text-muted-foreground">
              9f2c a771 0b4e dd93 61ac 8f00 5c2b e418 7a9d 30f6 …
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 mb-0 text-center font-sans text-[13.5px] text-foreground">
        Filenames and contents are absent from the right-hand panel because they
        were never in the traffic.
      </p>
    </FigureChrome>
  );
}
