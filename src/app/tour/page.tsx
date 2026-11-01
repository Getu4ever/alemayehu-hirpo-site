import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TourEmpty } from "./TourEmpty";

export const metadata = createPageMetadata({
  title: "Tour",
  description: `Tour dates for ${artist.name.en} — next dates TBA.`,
  path: "/tour",
});

export default function TourPage() {
  return (
    <>
      <PageHero
        eyebrow="Road"
        title="On"
        titleAccent="Tour"
        titleAm="በጉብኝት"
        titleAccentAm="ላይ"
        description="Major tour dates will appear here when announced."
        descriptionAm="ዋና የጉብኝት ቀናት ሲታወቁ እዚህ ይታያሉ።"
      />
      <section className="section-pad pt-0">
        <Container>
          <TourEmpty />
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-3">
            <Button href="/events">Live Events</Button>
            <Button href="/contact" variant="secondary">
              Booking
            </Button>
            <Button href="/news" variant="ghost">
              News
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
