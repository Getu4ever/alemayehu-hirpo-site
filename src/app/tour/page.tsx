import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = createPageMetadata({
  title: "Tour",
  description: `Tour dates for ${artist.name.en} — coming soon.`,
  path: "/tour",
});

export default function TourPage() {
  return (
    <>
      <PageHero
        eyebrow="Coming Soon"
        title="On"
        titleAccent="Tour"
        titleAm="በጉብኝት"
        titleAccentAm="ላይ"
        description="Major tour dates will appear here when announced."
        descriptionAm="ዋና የጉብኝት ቀናት ሲታወቁ እዚህ ይታያሉ።"
      />
      <section className="section-pad pt-0">
        <Container>
          <div className="mx-auto max-w-xl border border-border/60 bg-surface/40 px-8 py-16 text-center md:px-12 md:py-20">
            <p className="text-xs uppercase tracking-[0.28em] text-brass mb-4">
              Coming soon
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-ivory mb-4">
              Tour dates on the way
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              No tour dates are scheduled yet. For club nights and live
              performances, visit Live Events — or get in touch for booking.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/events">Live Events</Button>
              <Button href="/contact" variant="secondary">
                Booking
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
