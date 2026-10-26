import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EventsPageContent } from "./EventsPageContent";

export const metadata = createPageMetadata({
  title: "Events",
  description: `Upcoming concerts and performances by ${artist.name.en}.`,
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Live"
        title="Events"
        titleAm="ዝግጅቶች"
        description="Concerts, festivals, and diaspora performances."
        descriptionAm="ኮንሰርቶች፣ ፌስቲቫሎች እና የስደተኛ ትርኢቶች።"
      />
      <section className="section-pad pt-0">
        <Container>
          <EventsPageContent />
          <div className="mt-16 border border-border p-8 md:p-10 text-center bg-surface/40">
            <h2 className="font-display text-3xl text-ivory mb-3">
              Booking inquiries
            </h2>
            <p className="text-muted max-w-xl mx-auto mb-6">
              For concert bookings and event appearances, use the contact form.
              Official booking contacts will be listed once confirmed.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm uppercase tracking-wide bg-gold text-charcoal hover:bg-gold-soft min-h-11"
            >
              Contact for Booking
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
