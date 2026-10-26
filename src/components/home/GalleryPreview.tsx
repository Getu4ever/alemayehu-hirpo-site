"use client";

import Image from "next/image";
import Link from "next/link";
import { galleryItems } from "@/data/gallery";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function GalleryPreview() {
  const { t, bilingual } = useLanguage();
  const preview = galleryItems.slice(0, 6);

  return (
    <section className="section-pad">
      <Container>
        <SectionHeading
          eyebrow={t.galleryPreview}
          title={t.galleryPreview}
          titleAm="ጋለሪ"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {preview.map((item, index) => (
            <Link
              key={item.id}
              href="/gallery"
              className={`relative overflow-hidden group ${
                index === 0 ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"
              }`}
            >
              <Image
                src={item.src}
                alt={bilingual(item.alt)}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25 transition-colors" />
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/gallery" variant="secondary">
            {t.viewFullGallery}
          </Button>
        </div>
      </Container>
    </section>
  );
}
