import { createPageMetadata } from "@/lib/metadata";
import { artist } from "@/data/artist";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ShopProductGrid } from "@/components/shop/ShopProductGrid";

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
          <ShopProductGrid />
        </Container>
      </section>
    </>
  );
}
