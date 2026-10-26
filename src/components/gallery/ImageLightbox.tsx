"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ImageLightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const { bilingual, t } = useLanguage();
  const item = items[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onChange((index - 1 + items.length) % items.length);
      }
      if (e.key === "ArrowRight") {
        onChange((index + 1) % items.length);
      }
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, items.length, onChange, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={bilingual(item.alt)}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-4 right-4 min-h-11 min-w-11 inline-flex items-center justify-center text-ivory hover:text-gold"
        onClick={onClose}
        aria-label={t.close}
      >
        <X size={24} />
      </button>

      <button
        type="button"
        className="absolute left-2 md:left-6 min-h-11 min-w-11 inline-flex items-center justify-center text-ivory hover:text-gold"
        onClick={(e) => {
          e.stopPropagation();
          onChange((index - 1 + items.length) % items.length);
        }}
        aria-label={t.previous}
      >
        <ChevronLeft size={28} />
      </button>

      <div
        className="relative max-w-5xl w-full max-h-[85vh] aspect-[4/5] sm:aspect-auto sm:h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.src}
          alt={bilingual(item.alt)}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </div>

      <button
        type="button"
        className="absolute right-2 md:right-6 min-h-11 min-w-11 inline-flex items-center justify-center text-ivory hover:text-gold"
        onClick={(e) => {
          e.stopPropagation();
          onChange((index + 1) % items.length);
        }}
        aria-label={t.next}
      >
        <ChevronRight size={28} />
      </button>

      <p className="absolute bottom-6 left-0 right-0 text-center text-sm text-muted px-4">
        {bilingual(item.alt)} · {index + 1} / {items.length}
      </p>
    </div>
  );
}
