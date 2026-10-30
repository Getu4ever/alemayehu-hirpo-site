"use client";

import type { Track } from "@/data/releases";
import { TrackPlayerList } from "@/components/music/TrackPlayerList";

export function TrackList({
  tracks,
  releaseTitle,
  coverImage,
}: {
  tracks: Track[];
  releaseTitle?: { en: string; am?: string };
  coverImage?: string;
}) {
  return (
    <div className="border border-border">
      <TrackPlayerList
        tracks={tracks}
        releaseTitle={releaseTitle}
        coverImage={coverImage}
        className="px-2 sm:px-3"
      />
    </div>
  );
}
