import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EventsPageContent } from "./EventsPageContent";

export const metadata = createPageMetadata({
  title: "Live Events",
  description: `Live performances and club nights featuring ${artist.name.en}.`,
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Performances"
        title="Live"
        titleAccent="Events"
        titleAm="ቀጥታ"
        titleAccentAm="ዝግጅቶች"
        description="Club nights, live band shows, and confirmed stage appearances."
        descriptionAm="የክለብ ምሽቶች፣ ላይቭ ባንድ ትርኢቶች እና የተረጋገጡ መድረክ ትርኢቶች።"
        image="/images/events/palmy-2026-10-22.jpg"
      />
      <section className="section-pad pt-0">
        <Container>
          <EventsPageContent />
          <div className="reveal-up mt-16 border border-brass/20 bg-surface/40 p-8 md:p-10 text-center">
            <div className="flag-stripe mx-auto mb-6 max-w-[5.5rem]" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <h2 className="font-display text-3xl text-ivory mb-3">
              Booking inquiries
            </h2>
            <p className="text-muted max-w-xl mx-auto mb-2">
              For concert bookings and event appearances, use the contact form.
            </p>
            <p className="amharic text-muted/80 text-sm max-w-xl mx-auto mb-6">
              ለኮንሰርት ቦታ ማስያዝና ዝግጅቶች የእውቂያ ቅጹን ይጠቀሙ።
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm uppercase tracking-wide bg-brass text-charcoal hover:bg-[#c4a609] min-h-11"
            >
              Contact for Booking
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
