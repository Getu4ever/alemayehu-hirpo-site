"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Track } from "@/data/releases";
import { getFeaturedRelease } from "@/data/releases";

export type PlayableTrack = Track & {
  releaseTitle?: { en: string; am?: string };
  coverImage?: string;
};

type PlayerSource = "soundcloud" | "youtube";

type MusicPlayerContextValue = {
  current: PlayableTrack | null;
  queue: PlayableTrack[];
  isPlaying: boolean;
  progress: number;
  durationMs: number;
  volume: number;
  playTrack: (track: PlayableTrack, queue?: PlayableTrack[]) => void;
  playNext: () => void;
  playPrev: () => void;
  toggle: () => void;
  pause: () => void;
  seekRatio: (ratio: number) => void;
  setVolume: (volume: number) => void;
};

const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null);

export function trackKey(track: PlayableTrack) {
  return `${track.number}-${track.title.en}-${track.soundcloudUrl ?? track.youtubeId ?? ""}`;
}

function sourceFor(track: PlayableTrack): PlayerSource | null {
  if (track.soundcloudUrl) return "soundcloud";
  if (track.youtubeId) return "youtube";
  return null;
}

function loadScript(src: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

function withMeta(
  track: Track,
  releaseTitle?: { en: string; am?: string },
  coverImage?: string,
): PlayableTrack {
  return { ...track, releaseTitle, coverImage };
}

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<PlayableTrack | null>(null);
  const [queue, setQueue] = useState<PlayableTrack[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [volume, setVolumeState] = useState(0.85);

  const scIframeRef = useRef<HTMLIFrameElement>(null);
  const scWidgetRef = useRef<SoundCloudWidget | null>(null);
  const scReadyRef = useRef(false);
  const ytHostRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<YTPlayer | null>(null);
  const ytReadyRef = useRef(false);
  const currentRef = useRef<PlayableTrack | null>(null);
  const queueRef = useRef<PlayableTrack[]>([]);
  const sourceRef = useRef<PlayerSource | null>(null);
  const pendingPlayRef = useRef<PlayableTrack | null>(null);
  const volumeRef = useRef(0.85);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  const applyVolume = useCallback((v: number) => {
    const pct = Math.round(v * 100);
    scWidgetRef.current?.setVolume(pct);
    ytPlayerRef.current?.setVolume(pct);
    if (v <= 0.001) ytPlayerRef.current?.mute();
    else ytPlayerRef.current?.unMute();
  }, []);

  const setVolume = useCallback(
    (v: number) => {
      const clamped = Math.min(1, Math.max(0, v));
      volumeRef.current = clamped;
      setVolumeState(clamped);
      applyVolume(clamped);
    },
    [applyVolume],
  );

  const pauseAll = useCallback(() => {
    scWidgetRef.current?.pause();
    ytPlayerRef.current?.pauseVideo();
    setIsPlaying(false);
  }, []);

  const playSoundCloud = useCallback(
    (track: PlayableTrack) => {
      const widget = scWidgetRef.current;
      if (!widget || !track.soundcloudUrl || !scReadyRef.current) {
        pendingPlayRef.current = track;
        return;
      }
      sourceRef.current = "soundcloud";
      ytPlayerRef.current?.pauseVideo();
      widget.load(track.soundcloudUrl, { auto_play: true });
      widget.setVolume(Math.round(volumeRef.current * 100));
    },
    [],
  );

  const playYouTube = useCallback((track: PlayableTrack) => {
    const player = ytPlayerRef.current;
    if (!player || !track.youtubeId || !ytReadyRef.current) {
      pendingPlayRef.current = track;
      return;
    }
    sourceRef.current = "youtube";
    scWidgetRef.current?.pause();
    player.loadVideoById(track.youtubeId);
    player.setVolume(Math.round(volumeRef.current * 100));
    if (volumeRef.current <= 0.001) player.mute();
    else player.unMute();
    player.playVideo();
    setIsPlaying(true);
  }, []);

  const startTrack = useCallback(
    (track: PlayableTrack) => {
      const source = sourceFor(track);
      if (!source) return;
      setCurrent(track);
      setProgress(0);
      setDurationMs(0);
      setIsPlaying(true);
      if (source === "soundcloud") playSoundCloud(track);
      else playYouTube(track);
    },
    [playSoundCloud, playYouTube],
  );

  const playTrack = useCallback(
    (track: PlayableTrack, nextQueue?: PlayableTrack[]) => {
      if (nextQueue) {
        setQueue(nextQueue);
        queueRef.current = nextQueue;
      }

      const source = sourceFor(track);
      if (!source) return;

      if (currentRef.current && trackKey(currentRef.current) === trackKey(track)) {
        if (sourceRef.current === "soundcloud") {
          scWidgetRef.current?.toggle();
        } else {
          const state = ytPlayerRef.current?.getPlayerState();
          if (state === window.YT?.PlayerState.PLAYING) {
            ytPlayerRef.current?.pauseVideo();
          } else {
            ytPlayerRef.current?.playVideo();
          }
        }
        return;
      }

      startTrack(track);
    },
    [startTrack],
  );

  const playAdjacent = useCallback(
    (delta: number) => {
      const list = queueRef.current;
      if (!list.length) return;
      const cur = currentRef.current;
      const idx = cur
        ? list.findIndex((t) => trackKey(t) === trackKey(cur))
        : -1;
      const nextIdx =
        idx < 0
          ? 0
          : (idx + delta + list.length) % list.length;
      const next = list[nextIdx];
      if (next) startTrack(next);
    },
    [startTrack],
  );

  const playNext = useCallback(() => playAdjacent(1), [playAdjacent]);
  const playPrev = useCallback(() => playAdjacent(-1), [playAdjacent]);

  const toggle = useCallback(() => {
    if (!currentRef.current) {
      const featured = getFeaturedRelease();
      const playable =
        featured?.tracks?.filter((t) => t.soundcloudUrl || t.youtubeId) ?? [];
      if (!featured || !playable.length) return;
      const queueItems = playable.map((t) =>
        withMeta(t, featured.title, featured.coverImage),
      );
      setQueue(queueItems);
      queueRef.current = queueItems;
      startTrack(queueItems[0]);
      return;
    }
    if (sourceRef.current === "soundcloud") {
      scWidgetRef.current?.toggle();
    } else if (sourceRef.current === "youtube") {
      const state = ytPlayerRef.current?.getPlayerState();
      if (state === window.YT?.PlayerState.PLAYING) {
        ytPlayerRef.current?.pauseVideo();
      } else {
        ytPlayerRef.current?.playVideo();
      }
    }
  }, [startTrack]);

  const seekRatio = useCallback((ratio: number) => {
    const clamped = Math.min(1, Math.max(0, ratio));
    if (sourceRef.current === "soundcloud" && durationMs > 0) {
      scWidgetRef.current?.seekTo(clamped * durationMs);
    } else if (sourceRef.current === "youtube" && ytPlayerRef.current) {
      const d = ytPlayerRef.current.getDuration();
      if (d) ytPlayerRef.current.seekTo(clamped * d, true);
    }
    setProgress(clamped);
  }, [durationMs]);

  // SoundCloud widget bootstrap
  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        await loadScript(
          "https://w.soundcloud.com/player/api.js",
          "soundcloud-widget-api",
        );
        if (cancelled || !scIframeRef.current || !window.SC) return;
        const widget = window.SC.Widget(scIframeRef.current);
        scWidgetRef.current = widget;
        widget.bind(window.SC.Widget.Events.READY, () => {
          scReadyRef.current = true;
          widget.setVolume(Math.round(volumeRef.current * 100));
          const pending = pendingPlayRef.current;
          if (pending && sourceFor(pending) === "soundcloud") {
            pendingPlayRef.current = null;
            playSoundCloud(pending);
          }
        });
        widget.bind(window.SC.Widget.Events.PLAY, () => {
          setIsPlaying(true);
          widget.getDuration((ms) => setDurationMs(ms || 0));
        });
        widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false));
        widget.bind(window.SC.Widget.Events.FINISH, () => {
          setProgress(1);
          const list = queueRef.current;
          const cur = currentRef.current;
          if (!list.length || !cur) {
            setIsPlaying(false);
            return;
          }
          const idx = list.findIndex((t) => trackKey(t) === trackKey(cur));
          const next = list[(idx + 1) % list.length];
          if (next && idx < list.length - 1) startTrack(next);
          else setIsPlaying(false);
        });
        widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data) => {
          if (sourceRef.current !== "soundcloud") return;
          if (typeof data?.relativePosition === "number") {
            setProgress(data.relativePosition);
          }
        });
      } catch {
        // Widget unavailable
      }
    }
    void init();
    return () => {
      cancelled = true;
    };
  }, [playSoundCloud, startTrack]);

  // YouTube iframe API bootstrap
  useEffect(() => {
    let cancelled = false;
    let poll: number | undefined;

    async function init() {
      try {
        if (!window.YT?.Player) {
          await new Promise<void>((resolve, reject) => {
            const prev = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
              prev?.();
              resolve();
            };
            loadScript(
              "https://www.youtube.com/iframe_api",
              "youtube-iframe-api",
            ).catch(reject);
            poll = window.setInterval(() => {
              if (window.YT?.Player) {
                window.clearInterval(poll);
                resolve();
              }
            }, 100);
          });
        }
        if (cancelled || !ytHostRef.current || !window.YT) return;

        ytPlayerRef.current = new window.YT.Player(ytHostRef.current, {
          height: "0",
          width: "0",
          playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: () => {
              ytReadyRef.current = true;
              ytPlayerRef.current?.setVolume(
                Math.round(volumeRef.current * 100),
              );
              const pending = pendingPlayRef.current;
              if (pending && sourceFor(pending) === "youtube") {
                pendingPlayRef.current = null;
                playYouTube(pending);
              }
            },
            onStateChange: (e) => {
              if (sourceRef.current !== "youtube" || !window.YT) return;
              if (e.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setDurationMs((e.target.getDuration() || 0) * 1000);
              } else if (e.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (e.data === window.YT.PlayerState.ENDED) {
                setProgress(1);
                const list = queueRef.current;
                const cur = currentRef.current;
                if (!list.length || !cur) {
                  setIsPlaying(false);
                  return;
                }
                const idx = list.findIndex(
                  (t) => trackKey(t) === trackKey(cur),
                );
                if (idx >= 0 && idx < list.length - 1) {
                  startTrack(list[idx + 1]);
                } else {
                  setIsPlaying(false);
                }
              }
            },
          },
        });
      } catch {
        // YouTube unavailable
      }
    }
    void init();
    return () => {
      cancelled = true;
      if (poll) window.clearInterval(poll);
      ytPlayerRef.current?.destroy();
    };
  }, [playYouTube, startTrack]);

  useEffect(() => {
    if (!isPlaying || sourceRef.current !== "youtube") return;
    const id = window.setInterval(() => {
      const player = ytPlayerRef.current;
      if (!player) return;
      const d = player.getDuration();
      const t = player.getCurrentTime();
      if (d > 0) {
        setDurationMs(d * 1000);
        setProgress(t / d);
      }
    }, 400);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  const value = useMemo(
    () => ({
      current,
      queue,
      isPlaying,
      progress,
      durationMs,
      volume,
      playTrack,
      playNext,
      playPrev,
      toggle,
      pause: pauseAll,
      seekRatio,
      setVolume,
    }),
    [
      current,
      queue,
      isPlaying,
      progress,
      durationMs,
      volume,
      playTrack,
      playNext,
      playPrev,
      toggle,
      pauseAll,
      seekRatio,
      setVolume,
    ],
  );

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <iframe
        ref={scIframeRef}
        title="SoundCloud player"
        allow="autoplay"
        className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
        src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Falemayehu_hirpo%2Fbaytewar&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false"
      />
      <div className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0">
        <div ref={ytHostRef} id="yt-music-host" />
      </div>
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) {
    throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  }
  return ctx;
}

export function useMusicPlayerOptional() {
  return useContext(MusicPlayerContext);
}
