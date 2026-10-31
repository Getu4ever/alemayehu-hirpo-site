import { Suspense } from "react";
import { getShopProducts, isPrintifyConfigured } from "@/lib/printify";
import { MerchCard } from "@/components/shop/MerchCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

function ShopGridSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-surface border border-border/40" />
          <div className="mt-4 h-5 w-2/3 bg-surface" />
          <div className="mt-2 h-4 w-full bg-surface/70" />
          <div className="mt-3 h-4 w-20 bg-surface" />
        </div>
      ))}
    </div>
  );
}

async function ShopProducts() {
  const products = await getShopProducts();
  const staticProducts = products.filter((p) => p.source === "static");
  const printifyProducts = products.filter((p) => p.source === "printify");

  if (!products.length) {
    return (
      <EmptyState message="No products are available yet. Check back soon." />
    );
  }

  return (
    <div className="space-y-16">
      {staticProducts.length > 0 ? (
        <div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {staticProducts.map((product) => (
              <MerchCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : null}

      {printifyProducts.length > 0 ? (
        <div>
          <SectionHeading
            eyebrow="Printify"
            title="Live Catalogue"
            titleAm="ቀጥታ ካታሎግ"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {printifyProducts.map((product) => (
              <MerchCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : null}

      <p className="text-center text-sm text-muted max-w-lg mx-auto">
        {isPrintifyConfigured()
          ? "Checkout integration is next — for bulk or press inquiries, use the contact page."
          : "Add PRINTIFY_API_TOKEN and PRINTIFY_STORE_ID to load live Printify products below the catalogue."}
      </p>
    </div>
  );
}

export function ShopProductGrid() {
  return (
    <Suspense fallback={<ShopGridSkeleton />}>
      <ShopProducts />
    </Suspense>
  );
}
