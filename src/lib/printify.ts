import { merchItems, type MerchItem } from "@/data/merch";

const PRINTIFY_API = "https://api.printify.com/v1";
const USER_AGENT = "AlemayehuHirpoSite/1.0 (Node.js)";

export type ShopProduct = {
  id: string;
  title: string;
  titleAm?: string;
  description: string;
  descriptionAm?: string;
  image: string;
  /** Retail price in USD cents (lowest enabled variant) */
  priceCents: number;
  /** Highest enabled variant price in USD cents */
  priceMaxCents: number;
  colors: string[];
  sizes: string[];
  source: "printify" | "static";
};

type PrintifyOptionValue = {
  id: number;
  title: string;
  colors?: string[];
};

type PrintifyOption = {
  name: string;
  type: string;
  values: PrintifyOptionValue[];
};

type PrintifyVariant = {
  id: number;
  title: string;
  price: number;
  is_enabled: boolean;
  is_available?: boolean;
  is_default?: boolean;
  options?: number[];
};

type PrintifyImage = {
  src: string;
  variant_ids: number[];
  position: string;
  is_default: boolean;
};

type PrintifyProduct = {
  id: string;
  title: string;
  description: string;
  visible: boolean;
  options?: PrintifyOption[];
  variants: PrintifyVariant[];
  images: PrintifyImage[];
};

type PrintifyProductList = {
  data: PrintifyProduct[];
  current_page: number;
  last_page: number;
};

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function optionTitles(
  options: PrintifyOption[] | undefined,
  type: string,
): string[] {
  const match = options?.find(
    (opt) => opt.type.toLowerCase() === type || opt.name.toLowerCase().includes(type),
  );
  if (!match) return [];
  return match.values.map((v) => v.title).filter(Boolean);
}

function defaultImage(product: PrintifyProduct): string {
  const images = product.images ?? [];
  const preferred =
    images.find((img) => img.is_default) ||
    images.find((img) => img.position === "front") ||
    images[0];
  return preferred?.src ?? "/images/merch/tee-evangadi-baytewar.png";
}

function mapPrintifyProduct(product: PrintifyProduct): ShopProduct | null {
  // Custom API stores often keep drafts as visible=false until a sales-channel
  // publish — still show any product that has enabled, sellable variants.
  const enabled = (product.variants ?? []).filter(
    (v) => v.is_enabled && v.is_available !== false,
  );
  if (!enabled.length) return null;

  const prices = enabled.map((v) => v.price);
  const priceCents = Math.min(...prices);
  const priceMaxCents = Math.max(...prices);

  return {
    id: product.id,
    title: product.title,
    description: stripHtml(product.description || ""),
    image: defaultImage(product),
    priceCents,
    priceMaxCents,
    colors: optionTitles(product.options, "color"),
    sizes: optionTitles(product.options, "size"),
    source: "printify",
  };
}

function staticAsShopProduct(item: MerchItem): ShopProduct {
  return {
    id: item.id,
    title: item.name.en,
    titleAm: item.name.am,
    description: item.description.en,
    descriptionAm: item.description.am,
    image: item.image,
    priceCents: Math.round(item.price * 100),
    priceMaxCents: Math.round(item.price * 100),
    colors: [],
    sizes: [],
    source: "static",
  };
}

export function isPrintifyConfigured() {
  return Boolean(
    process.env.PRINTIFY_API_TOKEN?.trim() &&
      process.env.PRINTIFY_STORE_ID?.trim(),
  );
}

async function printifyFetch<T>(path: string): Promise<T> {
  const token = process.env.PRINTIFY_API_TOKEN?.trim();
  if (!token) {
    throw new Error("PRINTIFY_API_TOKEN is not set.");
  }

  const res = await fetch(`${PRINTIFY_API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": USER_AGENT,
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Printify API ${res.status} for ${path}: ${body.slice(0, 200)}`,
    );
  }

  return res.json() as Promise<T>;
}

/** Fetch all published products from the configured Printify shop. */
export async function fetchPrintifyProducts(): Promise<ShopProduct[]> {
  const storeId = process.env.PRINTIFY_STORE_ID?.trim();
  if (!storeId) {
    throw new Error("PRINTIFY_STORE_ID is not set.");
  }

  const products: PrintifyProduct[] = [];
  let page = 1;
  let lastPage = 1;

  do {
    const payload = await printifyFetch<PrintifyProductList>(
      `/shops/${storeId}/products.json?limit=50&page=${page}`,
    );
    products.push(...(payload.data ?? []));
    lastPage = payload.last_page ?? 1;
    page += 1;
  } while (page <= lastPage);

  return products
    .map(mapPrintifyProduct)
    .filter((p): p is ShopProduct => Boolean(p));
}

/**
 * Shop catalogue: original static merch first, Printify products below.
 */
export async function getShopProducts(): Promise<ShopProduct[]> {
  const staticProducts = merchItems.map(staticAsShopProduct);

  if (!isPrintifyConfigured()) {
    return staticProducts;
  }

  try {
    const live = await fetchPrintifyProducts();
    return [...staticProducts, ...live];
  } catch (error) {
    console.error("[printify]", error);
    return staticProducts;
  }
}

export function formatPriceFromCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatPriceRange(product: ShopProduct): string {
  if (product.priceMaxCents > product.priceCents) {
    return `${formatPriceFromCents(product.priceCents)} – ${formatPriceFromCents(product.priceMaxCents)}`;
  }
  return formatPriceFromCents(product.priceCents);
}
