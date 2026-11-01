import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata = createPageMetadata({
  title: "Privacy",
  description: `Privacy and booking notes for the official ${artist.name.en} website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust"
        title="Privacy"
        titleAccent="& bookings"
        titleAm="ግላዊነት"
        titleAccentAm="ና ቦታ ማስያዝ"
        description="How this official site handles inquiries and public content."
        descriptionAm="ይህ ይፋዊ ድረ-ገጽ ጥያቄዎችንና ይፋዊ ይዘትን እንዴት እንደሚይዝ።"
      />
      <section className="section-pad pt-0">
        <Container narrow>
          <div className="space-y-10 text-cream/85 leading-relaxed">
            <div>
              <h2 className="font-display text-2xl text-ivory mb-3">
                Contact messages
              </h2>
              <p>
                The contact form opens your own email application with a drafted
                message. Nothing from that form is stored on this website’s
                servers. Use it for bookings, media, partnerships, and fan
                questions.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-ivory mb-3">
                Fan photo gallery
              </h2>
              <p>
                Photos you submit for the fan gallery are held for admin review
                before they appear publicly. Approved images may be shown on the
                Gallery page with your name and caption. You can request removal
                through the contact form.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-ivory mb-3">
                Language preference
              </h2>
              <p>
                If you switch between English and Amharic, that choice is saved
                in your browser only (local storage) so the site can remember it
                next time.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-ivory mb-3">Bookings</h2>
              <p>
                Concert and event bookings should go through the contact form
                with inquiry type “Concert / Event Booking.” Please include city,
                date window, venue capacity, and organizer details when possible.
              </p>
            </div>
            <p>
              <Link href="/contact" className="text-brass hover:text-gold">
                ← Back to Contact
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
