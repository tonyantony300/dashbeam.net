import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "@/i18n/routing";
import { PAGE_OPENER_MIN_H, Section } from "@/components/Section";
import { cn } from "@/lib/utils";

/**
 * The opening band of every page that isn't the landing page.
 *
 * Four near-identical heroes used to be hand-rolled across the subpages; this
 * is the one of them. It sits on `Section` so it inherits the page gutters,
 * max-width, and — on `tone="inverse"` — the grain overlay and the dark-mode
 * inversion to an elevated surface.
 *
 * `tone="inverse"` is for the marketing pages (/compare, /under-the-hood,
 * /privacy), which have always opened on a dark band. `tone="default"` is for
 * the utility pages (/downloads, /contact), which open on the page ground and
 * take a hairline rule instead to separate the opener from the content.
 *
 * The heading sits deliberately between the landing page's h1 (42/62px) and
 * SectionOpener's h2 (34/44/52px): home stays the loudest page on the site,
 * and a page title still outranks the section headings beneath it.
 */
export default function PageHero({
  art,
  backHref,
  backLabel,
  className = "",
  containerClassName = "",
  eyebrow,
  lead,
  meta,
  title,
  tone = "default",
}) {
  const isInverse = tone === "inverse";

  const copy = (
    <div>
      {backHref ? (
        <Link
          className={cn(
            "mb-6 inline-flex items-center gap-2 font-sans text-sm transition-colors",
            isInverse
              ? "text-surface-inverse-muted hover:text-brand-tan"
              : "text-muted-foreground hover:text-brand-brown",
          )}
          href={backHref}
        >
          <ArrowLeft aria-hidden="true" size={16} weight="bold" />
          {backLabel}
        </Link>
      ) : null}

      {eyebrow ? (
        <p
          className={cn(
            "mb-4 font-sans text-[11px] font-bold uppercase leading-none tracking-[0.16em] md:mb-5",
            isInverse ? "text-brand-tan" : "text-brand-brown",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <h1 className="max-w-[20ch] text-balance font-heading text-[36px] font-medium leading-[1.05] tracking-[-0.015em] md:text-[48px] lg:text-[56px]">
        {title}
      </h1>

      {meta ? (
        <p
          className={cn(
            "mt-4 font-sans text-sm md:text-base",
            isInverse ? "text-surface-inverse-muted" : "text-muted-foreground",
          )}
        >
          {meta}
        </p>
      ) : null}

      {lead ? (
        <p
          className={cn(
            "mt-5 max-w-[58ch] font-sans text-base leading-relaxed md:text-lg",
            isInverse ? "text-surface-inverse-muted" : "text-muted-foreground",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );

  return (
    <Section
      className={cn(
        // The opener holds the shared height and centres its copy in it, so a
        // hero with art and a hero without one still occupy the same band.
        PAGE_OPENER_MIN_H,
        "flex items-center",
        // The default tone shares the page ground with the section below it,
        // so it carries a rule to mark where the opener ends. The inverse band
        // is already its own surface and needs no divider.
        isInverse ? "" : "border-b border-border pb-10 md:pb-12 lg:pb-14",
        className,
      )}
      containerClassName={containerClassName}
      tone={tone}
    >
      {art ? (
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {copy}
          {/* Capped so the artwork can't be what decides the band's height —
              at the two-column breakpoint it has to fit inside the same
              opener height the art-less heroes hold to. */}
          <div className="relative mx-auto flex w-full max-w-md items-center justify-center [&_img]:max-h-[200px] md:[&_img]:max-h-[220px] lg:max-w-none lg:[&_img]:max-h-[260px]">
            {art}
          </div>
        </div>
      ) : (
        copy
      )}
    </Section>
  );
}
