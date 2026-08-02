import { cn } from "@/lib/utils";

/** Matches `Section` — full site column with a hard cap on ultrawide. */
export const ARTICLE_MAX = "max-w-[1200px]";
/** Body / headers / quotes sit a touch narrower than figures for line length. */
export const MEASURE_MAX = "max-w-[900px]";

export function Measure({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag
      className={cn("mx-auto w-full", MEASURE_MAX, className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Prose({ className, children }) {
  return (
    <div
      className={cn(
        "mx-auto w-full space-y-4 font-sans text-[17px] leading-[1.72] text-foreground [text-align:justify] hyphens-auto",
        MEASURE_MAX,
        "[&_strong]:font-semibold [&_em]:italic",
        "[&_a]:text-brand-brown [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:decoration-1 hover:[&_a]:opacity-80",
        "[&_ol]:list-decimal [&_ol]:pl-[22px] [&_ol]:text-left [&_li]:mb-1.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHead({ id, num, kicker, title }) {
  return (
    <header
      className={cn(
        "mx-auto mt-16 w-full scroll-mt-10 md:mt-20",
        MEASURE_MAX,
      )}
      id={id}
    >
      {num !== "01" ? (
        <hr className="mb-6 border-0 border-t border-border" />
      ) : null}
      <div className="flex items-baseline gap-5">
        <span
          aria-hidden="true"
          className="font-heading text-[46px] font-normal leading-none tabular-nums text-brand-brown/35"
        >
          {num}
        </span>
        <div>
          <div className="mb-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-brand-brown">
            {kicker}
          </div>
          <h2 className="m-0 font-heading text-[28px] font-normal leading-tight tracking-[-0.015em] text-foreground md:text-[31px]">
            {title}
          </h2>
        </div>
      </div>
    </header>
  );
}

export function PullQuote({ className, children, large }) {
  return (
    <blockquote
      className={cn(
        "mx-auto my-10 w-full border-y border-b-border border-t-brand-brown py-4 text-left font-heading font-normal leading-[1.34] text-foreground",
        MEASURE_MAX,
        large
          ? "my-12 border-b-brand-brown py-6 text-[28px] leading-[1.28] md:text-[32px]"
          : "text-[22px] md:text-[26px]",
        className,
      )}
    >
      {children}
    </blockquote>
  );
}

export function StraightAside({ children }) {
  return (
    <aside
      className={cn(
        "mx-auto my-10 w-full rounded-lg border border-border p-4 md:p-5",
        MEASURE_MAX,
      )}
    >
      <div className="mb-2.5 font-sans text-[10px] uppercase tracking-[0.1em] text-brand-brown">
        Worth being straight about
      </div>
      <div className="space-y-2 font-sans text-[14.5px] leading-[1.66] text-foreground">
        {children}
      </div>
    </aside>
  );
}

export function FigureChrome({ number, title, hint, children, note }) {
  return (
    <figure className="mx-auto my-10 w-full">
      <div className="mb-3 flex items-baseline gap-3 border-b border-border pb-1.5">
        <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-brand-brown tabular-nums">
          Figure {number}
        </span>
        <span className="font-heading text-[17px] text-foreground">{title}</span>
        {hint ? (
          <span className="ms-auto font-sans text-xs text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </div>
      <div className="rounded-lg border border-border bg-card p-3 md:p-4">
        {children}
      </div>
      {note ? (
        <p className="mt-2 m-0 font-sans text-[13px] italic text-muted-foreground">
          {note}
        </p>
      ) : null}
    </figure>
  );
}

export function StatStrip({ items }) {
  return (
    <div className="mx-auto mb-6 grid w-full grid-cols-1 border-y border-b-border border-t-brand-brown sm:grid-cols-3">
      {items.map((item, i) => (
        <div
          className={cn(
            "px-3 py-4",
            i > 0 && "border-t border-border sm:border-t-0 sm:border-s",
          )}
          key={item.label}
        >
          <div className="font-heading text-[40px] font-normal leading-none tabular-nums text-foreground md:text-[44px]">
            {item.value}
          </div>
          <div className="mt-1 font-sans text-xs text-muted-foreground">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export const TOC = [
  { id: "fingerprint", num: "01", label: "The fingerprint" },
  { id: "names", num: "02", label: "Names, not addresses" },
  { id: "hole-punching", num: "03", label: "Speed & hole punching" },
  { id: "nearby", num: "04", label: "Nearby, on your Wi-Fi" },
  { id: "roaming", num: "05", label: "Roaming across networks" },
  { id: "resume", num: "06", label: "Resuming after sleep" },
  { id: "no-accounts", num: "07", label: "No accounts, no server" },
  { id: "pairing", num: "08", label: "Pairing your own devices" },
];
