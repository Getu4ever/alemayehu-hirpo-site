import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata = createPageMetadata({
  title: "Gallery",
  description: `Official photographs of Ethiopian artist ${artist.name.en}.`,
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Photography"
        title="Gallery"
        titleAm="ጋለሪ"
        description="Portraits, promotional photography, and career imagery."
        descriptionAm="ምስሎች፣ የማስተዋወቂያ ፎቶግራፊ እና የሙያ ምስሎች።"
      />
      <section className="section-pad pt-0">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
