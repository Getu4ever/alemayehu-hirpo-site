import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactAside } from "./ContactAside";

export const metadata = createPageMetadata({
  title: "Contact",
  description: `Contact ${artist.name.en} for bookings, media, and professional inquiries.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Connect"
        title="Contact"
        titleAm="ያግኙን"
        description="Concert bookings, media requests, partnerships, and fan inquiries."
        descriptionAm="የኮንሰርት ቦታ ማስያዝ፣ የሚዲያ ጥያቄዎች፣ አጋርነቶች እና የደጋፊ ጥያቄዎች።"
      />
      <section className="section-pad pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="border border-border p-6 md:p-10 bg-surface/40">
              <ContactForm />
            </div>
            <ContactAside />
          </div>
        </Container>
      </section>
    </>
  );
}
