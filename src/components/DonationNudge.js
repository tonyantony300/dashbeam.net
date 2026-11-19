"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Heart, X } from "@phosphor-icons/react";
import { DONATE_OPTIONS } from "@/components/donateOptions";
import { isReleaseDownload } from "@/constants/downloads";

const STORAGE_KEY = "dashbeam:donation-nudge-shown-at";
const QUIET_PERIOD_MS = 30 * 24 * 60 * 60 * 1000;
// Let the browser's own download UI appear first, so the card reads as a
// follow-up rather than something that got in the way of the download.
const SHOW_DELAY_MS = 1200;

function shownRecently() {
  try {
    const at = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(at) && Date.now() - at < QUIET_PERIOD_MS;
  } catch {
    return false;
  }
}

function markShown() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Storage blocked (private mode, etc.): the card may show again next
    // time, which is acceptable.
  }
}

/**
 * A small thank-you that slides into the corner after someone downloads an
 * installer — the moment they're most likely to want to give back. It never
 * covers the page, doesn't take focus, closes on one click or Esc, and stays
 * away for 30 days once seen.
 *
 * It listens for clicks on any release-asset link anywhere on the site, so the
 * hero button, the downloads page and any future download link all trigger it
 * without being wired up individually.
 */
export default function DonationNudge() {
  const t = useTranslations("donationNudge");
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    let timer;

    function onClick(event) {
      const link = event.target.closest?.("a[href]");
      if (!link || !isReleaseDownload(link.href)) return;
      if (shownRecently()) return;
      markShown();
      clearTimeout(timer);
      timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    }

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(event) {
      if (event.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <aside
      aria-labelledby="donation-nudge-title"
      className="fixed inset-x-4 bottom-4 z-50 animate-[nudge-in_300ms_ease-out] motion-reduce:animate-none sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px]"
      role="complementary"
    >
      <div className="relative rounded-2xl border border-border bg-card p-5 font-sans text-card-foreground shadow-[0_18px_50px_-12px_rgba(26,18,7,0.35)]">
        <button
          aria-label={t("close")}
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          onClick={close}
          type="button"
        >
          <X aria-hidden="true" size={16} weight="bold" />
        </button>

        <div className="flex items-start gap-3 pr-8">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e5484d]/12 text-[#e5484d]">
            <Heart aria-hidden="true" size={18} weight="fill" />
          </span>
          <div>
            <p
              className="text-base font-semibold tracking-[-0.01em]"
              id="donation-nudge-title"
            >
              {t("title")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t("body")}
            </p>
          </div>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {DONATE_OPTIONS.map(({ id, label, href, Icon, iconSize }) => (
            <li key={id}>
              <a
                className="flex h-10 items-center gap-2.5 rounded-lg border border-border bg-background px-3 text-sm font-semibold transition-colors hover:border-foreground/25 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                href={href}
                onClick={close}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon aria-hidden="true" className="shrink-0" size={iconSize} />
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="mt-3 w-full rounded-lg py-1.5 text-center text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          onClick={close}
          type="button"
        >
          {t("later")}
        </button>
      </div>
    </aside>
  );
}
