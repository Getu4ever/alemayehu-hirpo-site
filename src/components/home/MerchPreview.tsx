import Link from "next/link";
import { getFeaturedMerch } from "@/data/merch";
import { getShopProducts } from "@/lib/printify";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MerchCard } from "@/components/shop/MerchCard";

export async function MerchPreview() {
  // Homepage preview keeps the original featured static items.
  const featured = getFeaturedMerch(4);
  const all = await getShopProducts();
  const byId = new Map(all.map((p) => [p.id, p]));
  const products = featured
    .map((item) => byId.get(item.id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (!products.length) return null;

  return (
    <section className="section-pad bg-surface/40">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            eyebrow="From the Catalogue"
            title="Wear the Songs"
            titleAm="ዘፈኖቹን ይልበሱ"
            className="mb-0"
          />
          <Button href="/shop" variant="secondary" className="mb-10 md:mb-14 shrink-0">
            Browse Shop
          </Button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <MerchCard key={product.id} product={product} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted sm:hidden">
          <Link href="/shop" className="text-brass hover:text-gold-soft">
            Browse Shop →
          </Link>
        </p>
      </Container>
    </section>
  );
}
