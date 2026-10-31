import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestMusic } from "@/components/home/LatestMusic";
import { ArtistIntroduction } from "@/components/home/ArtistIntroduction";
import { EventsPreview } from "@/components/home/EventsPreview";
import { MerchPreview } from "@/components/home/MerchPreview";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";

export const metadata = createPageMetadata({
  title: artist.name.en,
  description: `${artist.tagline.en} Official website of Ethiopian singer and songwriter ${artist.name.en} (${artist.name.am}).`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LatestMusic />
      <ArtistIntroduction />
      <EventsPreview />
      <Suspense fallback={null}>
        <MerchPreview />
      </Suspense>
      <NewsletterSection />
    </>
  );
}
