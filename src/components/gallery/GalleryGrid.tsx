"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  galleryItems,
  galleryCategories,
  type GalleryItem,
} from "@/data/gallery";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ImageLightbox } from "./ImageLightbox";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const { bilingual } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10" role="tablist">
        {galleryCategories.map((cat) => (
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

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item: GalleryItem, index) => (
          <button
            key={item.id}
            type="button"
            className="relative block w-full break-inside-avoid overflow-hidden group border border-transparent hover:border-gold/30 focus-visible:outline-gold"
            onClick={() => setActiveIndex(index)}
            aria-label={bilingual(item.alt)}
          >
            <Image
              src={item.src}
              alt={bilingual(item.alt)}
              width={item.width}
              height={item.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <ImageLightbox
          items={filtered}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
        />
      ) : null}
    </div>
  );
}
