import { cn } from "@/lib/utils";

/**
 * The landing page's vertical rhythm lives here so every band shares one
 * scale. `tone="inverse"` is the single dark band (features); in dark mode it
 * resolves to an elevated card surface so it still reads as distinct.
 */
export function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  tone = "default",
}) {
  const isInverse = tone === "inverse";

  return (
    <section
      className={cn(
        "relative w-full scroll-mt-24 overflow-hidden px-5 md:px-10 lg:px-[60px]",
        // Most sections now sit on the same cream ground, so their padding
        // stacks into the gap between them. The inverse band is a distinct
        // surface and carries more.
        isInverse
          ? "bg-surface-inverse py-16 text-surface-inverse-foreground md:py-20 lg:py-24"
          : "py-12 md:py-14 lg:py-16",
        className,
      )}
      id={id}
    >
      {isInverse && (
        <div aria-hidden="true" className="absolute inset-0 dark-grain" />
      )}
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-[1200px]",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Every section opens the same way: a small eyebrow with a rule running to the
 * right edge, a serif headline, and an optional one-line deck. Left-aligned,
 * which is what gives the page its editorial rhythm.
 */
export function SectionOpener({
  className = "",
  deck,
  eyebrow,
  title,
  tone = "default",
}) {
  const isInverse = tone === "inverse";

  return (
    <div className={cn("mb-12 flex flex-col gap-3.5 md:mb-14", className)}>
      {eyebrow ? (
        <p
          className={cn(
            // The eyebrow labels the band rather than introducing the
            // headline, so it sits further off the title than the column gap.
            "mb-4 flex items-center gap-3 font-sans text-[11px] font-bold uppercase leading-none tracking-[0.16em] md:mb-6",
            // brand-brown resolves to tan in dark, so the eyebrow keeps its
            // brand tint on both grounds instead of going plain white.
            isInverse ? "text-brand-tan" : "text-brand-brown",
          )}
        >
          {eyebrow}
          <span
            aria-hidden="true"
            className={cn(
              "h-px flex-1",
              isInverse ? "bg-surface-inverse-border" : "bg-border",
            )}
          />
        </p>
      ) : null}

      <h2 className="max-w-[20ch] text-balance whitespace-pre-line font-heading text-[34px] font-medium leading-[1.05] tracking-[-0.015em] md:text-[44px] lg:text-[52px]">
        {title}
      </h2>

      {deck ? (
        <p
          className={cn(
            "max-w-[58ch] font-sans text-base leading-relaxed",
            isInverse ? "text-surface-inverse-muted" : "text-muted-foreground",
          )}
        >
          {deck}
        </p>
      ) : null}
    </div>
  );
}
