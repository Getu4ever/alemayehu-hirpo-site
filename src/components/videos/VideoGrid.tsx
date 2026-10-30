"use client";

import { useMemo, useState } from "react";
import {
  videos,
  videoCategories,
  type VideoCategory,
} from "@/data/videos";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EmptyState } from "@/components/ui/EmptyState";
import { VideoCard } from "./VideoCard";
import { cn } from "@/lib/utils";

export function VideoGrid() {
  const { t, bilingual } = useLanguage();
  const [filter, setFilter] = useState<VideoCategory | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return videos;
    return videos.filter((v) => v.category === filter);
  }, [filter]);

  const visibleCategories = useMemo(() => {
    return videoCategories.filter(
      (cat) =>
        cat.id === "all" || videos.some((video) => video.category === cat.id),
    );
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10" role="tablist">
        {visibleCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={filter === cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "px-4 py-2 text-xs uppercase tracking-[0.16em] border min-h-10 transition-colors",
              filter === cat.id
                ? "border-gold text-gold bg-gold/10"
                : "border-border text-muted hover:text-ivory",
            )}
          >
            {bilingual(cat.label)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState message={t.noVideos} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
