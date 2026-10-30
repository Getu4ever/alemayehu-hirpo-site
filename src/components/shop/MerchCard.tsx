"use client";

import Link from "next/link";
import type { MerchItem } from "@/data/merch";
import { formatPrice } from "@/data/merch";
import { useLanguage } from "@/i18n/LanguageProvider";

export function MerchCard({ item }: { item: MerchItem }) {
  const { bilingual } = useLanguage();

  return (
    <article className="group flex flex-col">
      <Link
        href="/shop"
        className="relative aspect-square overflow-hidden bg-surface border border-border/50 transition-colors group-hover:border-brass/40"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={bilingual(item.name)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </Link>
      <div className="mt-4 space-y-1">
        <h3 className="font-display text-lg text-ivory group-hover:text-brass transition-colors">
          <Link href="/shop">{bilingual(item.name)}</Link>
        </h3>
        <p className="text-sm text-muted line-clamp-2">
          {bilingual(item.description)}
        </p>
        <p className="pt-1 text-brass font-medium tabular-nums">
          {formatPrice(item.price)}
        </p>
      </div>
    </article>
  );
}
