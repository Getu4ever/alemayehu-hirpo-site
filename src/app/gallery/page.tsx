import { connection } from "next/server";
import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { readApprovedFanGallery } from "@/lib/fan-gallery";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FanPhotoSubmit } from "@/components/gallery/FanPhotoSubmit";

export const metadata = createPageMetadata({
  title: "Gallery",
  description: `Official photographs of Ethiopian artist ${artist.name.en}, plus approved fan-shared memories.`,
  path: "/gallery",
});

export default async function GalleryPage() {
  await connection();
  const fanItems = await readApprovedFanGallery();

  return (
    <>
      <PageHero
        eyebrow="Photography"
        title="Photo"
        titleAccent="Gallery"
        titleAm="ፎቶ"
        titleAccentAm="ጋለሪ"
        description="Portraits, career imagery, and memories shared by fans."
        descriptionAm="ምስሎች፣ የሙያ ፎቶዎች እና በደጋፊዎች የተጋሩ ትውስታዎች።"
        image="/images/page-heroes/gallery.svg"
      />
      <section className="section-pad pt-0">
        <Container>
          <GalleryGrid fanItems={fanItems} />
          <FanPhotoSubmit />
        </Container>
      </section>
    </>
  );
}
