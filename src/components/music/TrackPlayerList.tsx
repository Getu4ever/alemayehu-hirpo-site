"use client";

import type { Track } from "@/data/releases";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import {
  trackKey,
  useMusicPlayer,
  type PlayableTrack,
} from "@/components/music/MusicPlayerProvider";
import { EqualizerBars } from "@/components/music/EqualizerBars";

export function TrackPlayerList({
  tracks,
  releaseTitle,
  coverImage,
  className,
}: {
  tracks: Track[];
  releaseTitle?: { en: string; am?: string };
  coverImage?: string;
  className?: string;
}) {
  const { bilingual, locale } = useLanguage();
  const { current, isPlaying, playTrack } = useMusicPlayer();

  const queue: PlayableTrack[] = tracks
    .filter((track) => track.soundcloudUrl || track.youtubeId)
    .map((track) => ({
      ...track,
      releaseTitle,
      coverImage,
    }));

  return (
    <ol className={cn("space-y-2", className)}>
      {tracks.map((track) => {
        const playable = Boolean(track.soundcloudUrl || track.youtubeId);
        const item: PlayableTrack = {
          ...track,
          releaseTitle,
          coverImage,
        };
        const active =
          current != null && trackKey(current) === trackKey(item);
        const playing = active && isPlaying;

        return (
          <li key={track.number}>
            <button
              type="button"
              disabled={!playable}
              onClick={() => {
                if (!playable) return;
                playTrack(item, queue);
              }}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm transition-all",
                playable ? "cursor-pointer" : "opacity-50 cursor-not-allowed",
                active
                  ? "border border-brass bg-brass/10"
                  : "border border-transparent hover:border-white/10 hover:bg-white/[0.03]",
              )}
              aria-label={
                playing ? `Pause ${track.title.en}` : `Play ${track.title.en}`
              }
            >
              <span className="flex w-7 shrink-0 items-center justify-center">
                {playing ? (
                  <EqualizerBars />
                ) : (
                  <span
                    className={cn(
                      "font-display text-sm tabular-nums",
                      active ? "text-brass" : "text-muted",
                    )}
                  >
                    {track.number}
                  </span>
                )}
              </span>

              <span
                className={cn(
                  "min-w-0 flex-1 truncate font-display text-base",
                  active ? "text-brass" : "text-ivory",
                )}
              >
                {bilingual(track.title)}
              </span>

              {locale === "en" && track.title.am ? (
                <span className="amharic text-muted text-xs hidden sm:inline">
                  {track.title.am}
                </span>
              ) : null}

              {track.duration ? (
                <span className="shrink-0 font-display text-sm tabular-nums text-muted">
                  {track.duration}
                </span>
              ) : null}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
