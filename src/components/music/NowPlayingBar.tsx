"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useMusicPlayer } from "@/components/music/MusicPlayerProvider";

function formatMs(ms: number) {
  if (!ms || Number.isNaN(ms)) return "0:00";
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function NowPlayingBar() {
  const { bilingual } = useLanguage();
  const { current, isPlaying, progress, durationMs, toggle, seekRatio } =
    useMusicPlayer();

  if (!current) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-brass/25 bg-[#06140c]/95 backdrop-blur-md"
      role="region"
      aria-label="Now playing"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-forest/30 sm:h-14 sm:w-14">
          {current.coverImage ? (
            <Image
              src={current.coverImage}
              alt=""
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm text-ivory sm:text-base">
            {bilingual(current.title)}
          </p>
          <p className="truncate text-xs text-muted">
            {current.releaseTitle
              ? bilingual(current.releaseTitle)
              : "Alemayehu Hirpo"}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="tabular-nums text-[0.65rem] text-muted w-8">
              {formatMs(progress * durationMs)}
            </span>
            <input
              type="range"
              min={0}
              max={1000}
              value={Math.round(progress * 1000)}
              onChange={(e) => seekRatio(Number(e.target.value) / 1000)}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-brass"
              aria-label="Seek"
            />
            <span className="tabular-nums text-[0.65rem] text-muted w-8 text-right">
              {formatMs(durationMs)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={toggle}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brass text-charcoal hover:bg-[#c4a609] transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" className="ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}
