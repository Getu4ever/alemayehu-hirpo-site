"use client";

import Link from "next/link";
import type { ShopProduct } from "@/lib/printify";
import { formatPriceRange } from "@/lib/printify";
import { useLanguage } from "@/i18n/LanguageProvider";

export function MerchCard({ product }: { product: ShopProduct }) {
  const { locale } = useLanguage();
  const href = `/shop#${product.id}`;
  const title =
    locale === "am" && product.titleAm ? product.titleAm : product.title;
  const description =
    locale === "am" && product.descriptionAm
      ? product.descriptionAm
      : product.description;

  return (
    <article id={product.id} className="group flex flex-col scroll-mt-28">
      <Link
        href={href}
        className="relative aspect-square overflow-hidden bg-surface border border-border/50 transition-colors group-hover:border-brass/40"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </Link>
      <div className="mt-4 space-y-2">
        <h3
          className={`font-display text-lg text-ivory group-hover:text-brass transition-colors ${locale === "am" ? "amharic" : ""}`}
        >
          <Link href={href}>{title}</Link>
        </h3>
        {description ? (
          <p
            className={`text-sm text-muted line-clamp-2 ${locale === "am" ? "amharic" : ""}`}
          >
            {description}
          </p>
        ) : null}
        <p className="pt-0.5 text-brass font-medium tabular-nums">
          {formatPriceRange(product)}
        </p>
        {(product.colors.length > 0 || product.sizes.length > 0) && (
          <div className="flex flex-col gap-2 pt-1">
            {product.colors.length > 0 ? (
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted mb-1.5">
                  Colors
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.colors.slice(0, 8).map((color) => (
                    <span
                      key={color}
                      className="border border-border/70 px-2 py-1 text-[0.65rem] uppercase tracking-[0.08em] text-ivory/80"
                    >
                      {color}
                    </span>
                  ))}
                  {product.colors.length > 8 ? (
                    <span className="px-1 text-[0.65rem] text-muted">
                      +{product.colors.length - 8}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : null}
            {product.sizes.length > 0 ? (
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted mb-1.5">
                  Sizes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="min-w-8 border border-border/70 px-2 py-1 text-center text-[0.65rem] uppercase tracking-[0.08em] text-ivory/80"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}
