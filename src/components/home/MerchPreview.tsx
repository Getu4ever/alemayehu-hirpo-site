"use client";

import Link from "next/link";
import { getFeaturedMerch } from "@/data/merch";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MerchCard } from "@/components/shop/MerchCard";

export function MerchPreview() {
  const { t } = useLanguage();
  const items = getFeaturedMerch(4);

  return (
    <section className="section-pad bg-surface/40">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            eyebrow={t.officialMerch}
            title={t.shopCollection}
            titleAm="ዘፈኖቹን ይልበሱ"
            className="mb-0"
          />
          <Button href="/shop" variant="secondary" className="mb-10 md:mb-14 shrink-0">
            {t.viewAllProducts}
          </Button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <MerchCard key={item.id} item={item} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted sm:hidden">
          <Link href="/shop" className="text-brass hover:text-gold-soft">
            {t.viewAllProducts} →
          </Link>
        </p>
      </Container>
    </section>
  );
}
