export {};

declare global {
  interface SoundCloudWidget {
    bind(
      event: string,
      listener: (data?: {
        currentPosition?: number;
        relativePosition?: number;
      }) => void,
    ): void;
    unbind(event: string): void;
    load(url: string, options?: { auto_play?: boolean }): void;
    play(): void;
    pause(): void;
    toggle(): void;
    seekTo(ms: number): void;
    setVolume(volume: number): void;
    getVolume(cb: (volume: number) => void): void;
    getPosition(cb: (ms: number) => void): void;
    getDuration(cb: (ms: number) => void): void;
    isPaused(cb: (paused: boolean) => void): void;
  }

  interface YTPlayer {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    loadVideoById(videoId: string): void;
    cueVideoById(videoId: string): void;
    seekTo(seconds: number, allowSeekAhead?: boolean): void;
    setVolume(volume: number): void;
    getVolume(): number;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    getCurrentTime(): number;
    getDuration(): number;
    getPlayerState(): number;
    destroy(): void;
  }

  interface Window {
    SC?: {
      Widget: {
        (iframe: HTMLIFrameElement | string): SoundCloudWidget;
        Events: {
          READY: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
          PLAY_PROGRESS: string;
        };
      };
    };
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          height?: string | number;
          width?: string | number;
          videoId?: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: { target: YTPlayer }) => void;
            onStateChange?: (e: {
              data: number;
              target: YTPlayer;
            }) => void;
          };
        },
      ) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}
