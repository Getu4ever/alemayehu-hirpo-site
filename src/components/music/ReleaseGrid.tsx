"use client";

import { useMemo, useState } from "react";
import { releases, type Release } from "@/data/releases";
import { useLanguage } from "@/i18n/LanguageProvider";
import { AlbumCard } from "./AlbumCard";
import { cn } from "@/lib/utils";

type Filter = "all" | "album" | "single" | "collaboration" | "ep" | "featured";

export function ReleaseGrid() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.filterAll },
    { id: "featured", label: t.featuredRelease },
    { id: "album", label: t.albums },
    { id: "collaboration", label: "Collaborations" },
    { id: "single", label: t.singles },
  ];

  const filtered = useMemo(() => {
    return releases.filter((r: Release) => {
      if (filter === "all") return true;
      if (filter === "featured") return Boolean(r.featured);
      return r.type === filter;
    });
  }, [filter]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="tablist"
        aria-label="Release filters"
      >
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "px-4 py-2 text-xs uppercase tracking-[0.16em] border min-h-10 transition-colors",
              filter === f.id
                ? "border-gold text-gold bg-gold/10"
                : "border-border text-muted hover:text-ivory",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((release) => (
          <div key={release.id} id={release.id}>
            <AlbumCard release={release} />
          </div>
        ))}
      </div>
    </div>
  );
}
