"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Play } from "lucide-react";
import { Section, SectionOpener } from "@/components/Section";
import { cn } from "@/lib/utils";
import { tx } from "@/lib/tx";
import poster from "../../public/video/alex-hitt-dashbeam-explainer-poster.jpg";

const VIDEO_ID = "K6tHvd79cIw";
const VIDEO_TITLE =
  "DashBeam GitHub Overview: Iroh P2P File Transfers Across Networks";
const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const VIDEO_DURATION_S = 349;
const VIDEO_UPLOAD_DATE = "2026-10-23T09:15:15-07:00";
const CREATOR_NAME = "Alex Hitt";
const CREATOR_URL = "https://www.youtube.com/@alexander-hitt";
// youtube-nocookie keeps YouTube from setting tracking cookies until the
// visitor actually plays the video.
const EMBED_ORIGIN = "https://www.youtube-nocookie.com";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${m}:${s}`;
}

/**
 * Alex Hitt's independent walkthrough, shown as a click-to-load facade so the
 * landing page pays nothing for YouTube (no scripts, no cookies, no requests)
 * until someone presses play. The chapters double as a written summary for
 * visitors who never press play, and jump the player to that moment for those
 * who do. Player commands go over the embed's postMessage API, which avoids
 * loading YouTube's iframe_api script.
 */
export default function VideoExplainer() {
  const t = useTranslations("videoExplainer");
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  // null = facade showing; a number = the second the player should open at.
  const [startAt, setStartAt] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  const chapters = [
    {
      time: 18,
      title: tx(t, "chapter1.title", "No cloud, no size cap"),
      description: tx(
        t,
        "chapter1.description",
        "Device to device. Nothing ever sits on a server.",
      ),
    },
    {
      time: 74,
      title: tx(t, "chapter2.title", "Finds devices on your Wi-Fi"),
      description: tx(
        t,
        "chapter2.description",
        "Nearby devices just appear. No codes to copy.",
      ),
    },
    {
      time: 98,
      title: tx(t, "chapter3.title", "Every chunk is verified"),
      description: tx(
        t,
        "chapter3.description",
        "BLAKE3 checks every piece, so nothing arrives corrupted.",
      ),
    },
    {
      time: 142,
      title: tx(t, "chapter4.title", "Works across the internet"),
      description: tx(
        t,
        "chapter4.description",
        "Send a link or QR. An encrypted relay gets past firewalls.",
      ),
    },
    {
      time: 162,
      title: tx(t, "chapter5.title", "Switch networks mid-transfer"),
      description: tx(
        t,
        "chapter5.description",
        "Go from Wi-Fi to 5G and the transfer keeps going.",
      ),
    },
    {
      time: 221,
      title: tx(t, "chapter6.title", "Your own devices skip the prompt"),
      description: tx(
        t,
        "chapter6.description",
        "Pair once. After that, files land straight in a folder.",
      ),
    },
  ];

  const isPlaying = startAt !== null;
  const activeIndex =
    isPlaying && currentTime !== null
      ? chapters.findLastIndex((c) => c.time <= currentTime)
      : -1;

  const postToPlayer = useCallback((payload) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify(payload),
      EMBED_ORIGIN,
    );
  }, []);

  // Once the player is up, ask it to stream its state back so the current
  // chapter can follow playback.
  const handleIframeLoad = useCallback(() => {
    postToPlayer({ event: "listening", id: VIDEO_ID });
  }, [postToPlayer]);

  useEffect(() => {
    if (!isPlaying) return undefined;

    function onMessage(event) {
      if (event.origin !== EMBED_ORIGIN) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      let data;
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : null;
      } catch {
        return;
      }
      const time = data?.info?.currentTime;
      if (typeof time === "number") setCurrentTime(time);
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [isPlaying]);

  function playFrom(seconds) {
    // On phones the chapters sit below the player, so a tap further down the
    // list would otherwise start a video the visitor can't see.
    const player = playerRef.current;
    if (player) {
      const { top, bottom } = player.getBoundingClientRect();
      if (top < 0 || bottom > window.innerHeight) {
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        player.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "center",
        });
      }
    }

    if (!isPlaying) {
      setStartAt(seconds);
      setCurrentTime(seconds);
      return;
    }
    postToPlayer({ event: "command", func: "seekTo", args: [seconds, true] });
    postToPlayer({ event: "command", func: "playVideo", args: [] });
    setCurrentTime(seconds);
  }

  const embedSrc = isPlaying
    ? `${EMBED_ORIGIN}/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&start=${startAt}`
    : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: VIDEO_TITLE,
    description: tx(
      t,
      "deck",
      "An independent walkthrough of how DashBeam moves files peer-to-peer.",
    ),
    thumbnailUrl: `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
    uploadDate: VIDEO_UPLOAD_DATE,
    duration: `PT${Math.floor(VIDEO_DURATION_S / 60)}M${VIDEO_DURATION_S % 60}S`,
    contentUrl: VIDEO_URL,
    embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`,
    author: { "@type": "Person", name: CREATOR_NAME, url: CREATOR_URL },
    hasPart: chapters.map((c, i) => ({
      "@type": "Clip",
      name: c.title,
      startOffset: c.time,
      endOffset: chapters[i + 1]?.time ?? VIDEO_DURATION_S,
      url: `${VIDEO_URL}&t=${c.time}`,
    })),
  };

  return (
    <Section id="video-explainer-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SectionOpener
        className="mb-10 md:mb-12"
        deck={tx(
          t,
          "deck",
          "An independent walkthrough of what happens under the hood.",
        )}
        eyebrow={tx(t, "eyebrow", "Explained in 6 minutes")}
        title={tx(t, "title", "How DashBeam moves files without the cloud")}
      />

      {/* Player and chapters share one measure: capped at 960px, and never
          taller than the screen leaves room for (so a 768px-tall laptop still
          sees the whole video). Left-aligned with the heading, like every
          other band on the page. */}
      <div className="max-w-[min(100%,960px,calc((100svh_-_11rem)*16/9))]">
        <div
          ref={playerRef}
          className="relative aspect-video w-full overflow-hidden rounded-2xl bg-surface-inverse shadow-card ring-1 ring-border"
        >
          {isPlaying ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              onLoad={handleIframeLoad}
              ref={iframeRef}
              referrerPolicy="strict-origin-when-cross-origin"
              src={embedSrc}
              title={`${VIDEO_TITLE}, ${CREATOR_NAME}`}
            />
          ) : (
            <button
              aria-label={`${tx(t, "play", "Play video")}: ${VIDEO_TITLE}, ${CREATOR_NAME}`}
              className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring"
              onClick={() => playFrom(0)}
              type="button"
            >
              {/* A frame from the video (the cross-continent transfer) rather
                than its YouTube thumbnail, whose oversized wordmark repeated
                the section heading right above it. */}
              <Image
                alt=""
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 960px, calc(100vw - 40px)"
                src={poster}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent via-45% to-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#452815] text-[#f5f4f0] shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-4 ring-[#fbf8f3]/70 transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none md:size-20"
              >
                <Play
                  className="ml-1 size-7 fill-current md:size-8"
                  strokeWidth={0}
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 font-sans text-xs font-medium tabular-nums text-white backdrop-blur-sm md:bottom-5 md:left-5 md:text-sm"
              >
                {formatTime(VIDEO_DURATION_S)} · {CREATOR_NAME}
              </span>
            </button>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3 font-sans text-sm text-muted-foreground">
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground"
          >
            AH
          </span>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              {tx(t, "creditPrefix", "Video by")}{" "}
              <a
                className="font-semibold text-foreground underline-offset-4 hover:underline"
                href={CREATOR_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                {CREATOR_NAME}
              </a>
            </span>
            <span aria-hidden="true">·</span>
            <a
              className="inline-flex items-center gap-0.5 text-brand-brown underline underline-offset-4 hover:opacity-80"
              href={VIDEO_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              {tx(t, "watchOnYoutube", "Watch on YouTube")}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </p>
        </div>

        <ol className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {chapters.map((chapter, i) => {
            const active = i === activeIndex;
            return (
              <li key={chapter.time}>
                <button
                  aria-current={active ? "true" : undefined}
                  aria-label={`${tx(t, "playFrom", "Play from")} ${formatTime(chapter.time)}: ${chapter.title}`}
                  className={cn(
                    "group flex h-full w-full flex-col gap-1.5 border-t-2 py-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    active
                      ? "border-brand-brown"
                      : "border-border hover:border-foreground/30",
                  )}
                  onClick={() => playFrom(chapter.time)}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "shrink-0 rounded-md px-2 py-0.5 font-sans text-xs font-semibold tabular-nums transition-colors",
                        active
                          ? "bg-brand-brown text-primary-foreground dark:text-neutral-900"
                          : "bg-secondary text-secondary-foreground",
                      )}
                    >
                      {formatTime(chapter.time)}
                    </span>
                    <span className="font-sans text-base font-semibold tracking-[-0.01em] group-hover:underline group-hover:underline-offset-4">
                      {chapter.title}
                    </span>
                  </span>
                  <span className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {chapter.description}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
