"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { Release } from "@/data/releases";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  trackKey,
  useMusicPlayer,
  type PlayableTrack,
} from "@/components/music/MusicPlayerProvider";
import { EqualizerBars } from "@/components/music/EqualizerBars";

function formatMs(ms: number) {
  if (!ms || Number.isNaN(ms)) return "0:00";
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function parseDuration(label?: string) {
  if (!label) return 0;
  const [m, s] = label.split(":").map(Number);
  if (Number.isNaN(m) || Number.isNaN(s)) return 0;
  return (m * 60 + s) * 1000;
}

export function FeaturedAlbumPlayer({ release }: { release: Release }) {
  const { t, bilingual } = useLanguage();
  const {
    current,
    isPlaying,
    progress,
    durationMs,
    volume,
    playTrack,
    playNext,
    playPrev,
    toggle,
    seekRatio,
    setVolume,
  } = useMusicPlayer();

  const playableTracks = (release.tracks ?? []).filter(
    (track) => track.soundcloudUrl || track.youtubeId,
  );
  const queue: PlayableTrack[] = playableTracks.map((track) => ({
    ...track,
    releaseTitle: release.title,
    coverImage: release.coverImage,
  }));

  const displayTrack =
    current && queue.some((t) => trackKey(t) === trackKey(current))
      ? current
      : queue[0] ?? null;

  const activePlaying =
    Boolean(
      displayTrack && current && trackKey(displayTrack) === trackKey(current),
    ) && isPlaying;

  const fallbackDuration = parseDuration(displayTrack?.duration);
  const effectiveDuration = durationMs || fallbackDuration;
  const effectiveProgress =
    current && displayTrack && trackKey(current) === trackKey(displayTrack)
      ? progress
      : 0;

  const startOrToggle = (track: PlayableTrack) => {
    playTrack(track, queue);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a120e] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Left — artwork */}
        <div className="relative border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background: `
                radial-gradient(ellipse 70% 55% at 50% 18%, rgba(212,180,10,0.16), transparent 60%),
                radial-gradient(ellipse 50% 40% at 10% 90%, rgba(7,137,48,0.12), transparent 55%)
              `,
            }}
            aria-hidden
          />
          <div className="relative mx-auto aspect-square w-full max-w-[24rem] overflow-hidden rounded-xl border border-brass/25 bg-forest/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <Image
              src={release.coverImage}
              alt={bilingual(release.title)}
              fill
              sizes="(max-width: 1024px) 90vw, 380px"
              className={cn(
                "object-cover transition-transform duration-700",
                activePlaying && "scale-[1.02]",
              )}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            {activePlaying ? (
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 backdrop-blur-sm">
                <EqualizerBars />
                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-brass">
                  Now playing
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Right — song titles, then player underneath */}
        <div className="flex flex-col p-5 sm:p-7 lg:p-8">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-brass">
                {t.tracklist}
              </p>
              <h3 className="mt-1 font-display text-xl text-ivory sm:text-2xl">
                {bilingual(release.title)}
              </h3>
            </div>
            <p className="text-xs text-muted tabular-nums">
              {playableTracks.length} tracks
            </p>
          </div>

          <ol className="space-y-2">
            {playableTracks.map((track) => {
              const item: PlayableTrack = {
                ...track,
                releaseTitle: release.title,
                coverImage: release.coverImage,
              };
              const active =
                current != null && trackKey(current) === trackKey(item);
              const playing = active && isPlaying;

              return (
                <li key={track.number}>
                  <button
                    type="button"
                    onClick={() => startOrToggle(item)}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-all",
                      active
                        ? "border border-brass bg-brass/10 shadow-[0_0_24px_rgba(212,180,10,0.08)]"
                        : "border border-transparent hover:border-white/10 hover:bg-white/[0.03]",
                    )}
                    aria-label={
                      playing
                        ? `Pause ${track.title.en}`
                        : `Play ${track.title.en}`
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
                        "min-w-0 flex-1 truncate font-display text-base sm:text-lg",
                        active ? "text-brass" : "text-ivory",
                      )}
                    >
                      {bilingual(track.title)}
                    </span>

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

          {/* Player — directly under song titles */}
          <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4 sm:p-5">
            <div className="min-w-0">
              <p className="truncate font-display text-lg text-ivory sm:text-xl">
                {displayTrack
                  ? bilingual(displayTrack.title)
                  : bilingual(release.title)}
              </p>
              <p className="mt-0.5 text-sm text-muted">
                {bilingual(release.title)}
                {release.year ? ` · ${release.year}` : ""}
              </p>
            </div>

            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={1000}
                value={Math.round(effectiveProgress * 1000)}
                onChange={(e) => {
                  if (!displayTrack) return;
                  if (!current || trackKey(current) !== trackKey(displayTrack)) {
                    startOrToggle(displayTrack);
                  }
                  seekRatio(Number(e.target.value) / 1000);
                }}
                className="player-range w-full"
                style={
                  {
                    ["--player-progress"]: `${effectiveProgress * 100}%`,
                  } as CSSProperties
                }
                aria-label="Seek"
              />
              <div className="mt-2 flex justify-between text-[0.7rem] tabular-nums text-muted">
                <span>{formatMs(effectiveProgress * effectiveDuration)}</span>
                <span>{formatMs(effectiveDuration)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={playPrev}
                  className="flex h-10 w-10 items-center justify-center text-ivory/80 transition-colors hover:text-brass"
                  aria-label="Previous track"
                >
                  <SkipBack size={20} fill="currentColor" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!displayTrack) return;
                    if (
                      current &&
                      trackKey(current) === trackKey(displayTrack)
                    ) {
                      toggle();
                    } else {
                      startOrToggle(displayTrack);
                    }
                  }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-brass text-charcoal shadow-[0_0_0_5px_rgba(212,180,10,0.15)] transition-transform hover:scale-[1.04] hover:bg-[#e0c020]"
                  aria-label={activePlaying ? "Pause" : "Play"}
                >
                  {activePlaying ? (
                    <Pause size={24} fill="currentColor" />
                  ) : (
                    <Play size={24} fill="currentColor" className="ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={playNext}
                  className="flex h-10 w-10 items-center justify-center text-ivory/80 transition-colors hover:text-brass"
                  aria-label="Next track"
                >
                  <SkipForward size={20} fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVolume(volume > 0 ? 0 : 0.85)}
                  className="text-ivory/70 transition-colors hover:text-brass"
                  aria-label={volume > 0 ? "Mute" : "Unmute"}
                >
                  {volume > 0 ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(volume * 100)}
                  onChange={(e) => setVolume(Number(e.target.value) / 100)}
                  className="player-range player-range--volume w-20 sm:w-28"
                  style={
                    {
                      ["--player-volume"]: `${volume * 100}%`,
                    } as CSSProperties
                  }
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>

          <Button href="/music" className="mt-5 w-full justify-center rounded-xl">
            {t.viewAllAlbums}
          </Button>
        </div>
      </div>
    </div>
  );
}
