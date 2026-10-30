import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { merchItems } from "@/data/merch";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { MerchCard } from "@/components/shop/MerchCard";

export const metadata = createPageMetadata({
  title: "Shop",
  description: `Official merchandise from ${artist.name.en} — Evangadi Baytewar tees, caps, and more.`,
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Merchandise"
        title="Shop"
        titleAccent="Collection"
        titleAm="ሱቅ"
        titleAccentAm="ስብስብ"
        description="Evangadi Baytewar tees, caps, and catalogue pieces."
        descriptionAm="ኤቫንጋዲ ባይተዋር ቲሸርቶች፣ ካፖች እና የካታሎግ እቃዎች።"
        image="/images/page-heroes/shop.svg"
      />
      <section className="section-pad pt-0">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {merchItems.map((item) => (
              <MerchCard key={item.id} item={item} />
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-muted max-w-lg mx-auto">
            Checkout is coming soon. For bulk or press inquiries, use the contact
            page.
          </p>
        </Container>
      </section>
    </>
  );
}
