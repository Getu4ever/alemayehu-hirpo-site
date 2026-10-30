export type MerchCategory = "apparel" | "accessories" | "music";

export type MerchItem = {
  id: string;
  slug: string;
  name: { en: string; am: string };
  description: { en: string; am: string };
  price: number;
  category: MerchCategory;
  image: string;
  featured?: boolean;
};

export const merchItems: MerchItem[] = [
  {
    id: "tee-evangadi-baytewar",
    slug: "evangadi-baytewar-tshirt",
    name: {
      en: "Evangadi Baytewar T-Shirt",
      am: "ኤቫንጋዲ ባይተዋር ቲሸርት",
    },
    description: {
      en: "Soft black tee with Evangadi Baytewar wordmark across the chest.",
      am: "በደረት ላይ ኤቫንጋዲ ባይተዋር ጽሑፍ ያለው ጥቁር ቲሸርት።",
    },
    price: 34.99,
    category: "apparel",
    image: "/images/merch/tee-evangadi-baytewar.svg",
    featured: true,
  },
  {
    id: "tee-baytewar",
    slug: "baytewar-classic-tee",
    name: {
      en: "Baytewar Classic Tee",
      am: "ባይተዋር ክላሲክ ቲሸርት",
    },
    description: {
      en: "Bold red tee with a clean Baytewar title print.",
      am: "ባይተዋር በደረት ላይ የተጻፈ ቀይ ቲሸርት።",
    },
    price: 32.99,
    category: "apparel",
    image: "/images/merch/tee-baytewar.svg",
    featured: true,
  },
  {
    id: "cap-baytewar",
    slug: "baytewar-baseball-cap",
    name: {
      en: "Baytewar Baseball Cap",
      am: "ባይተዋር ቤዝቦል ካፕ",
    },
    description: {
      en: "Structured cap with embroidered Baytewar wordmark.",
      am: "ባይተዋር ጽሑፍ ያለው ቤዝቦል ካፕ።",
    },
    price: 28.99,
    category: "accessories",
    image: "/images/merch/cap-baytewar.svg",
    featured: true,
  },
  {
    id: "hoodie-evangadi",
    slug: "evangadi-hoodie",
    name: {
      en: "Evangadi Hoodie",
      am: "ኤቫንጋዲ ሁዲ",
    },
    description: {
      en: "Heavyweight hoodie nodding to the Evangadi collaboration.",
      am: "የኤቫንጋዲ ትብብርን የሚያስታውስ ከባድ ሁዲ።",
    },
    price: 64.99,
    category: "apparel",
    image: "/images/merch/hoodie-evangadi.svg",
    featured: true,
  },
  {
    id: "tote-yasebshale",
    slug: "yasebshale-tote",
    name: {
      en: "Yasebshale Tote",
      am: "ያስብሻል ቶት",
    },
    description: {
      en: "Canvas tote with Yasebshale from the Evangadi catalogue.",
      am: "ከኤቫንጋዲ ካታሎግ ያስብሻል ስያሜ ያለው ካንቫስ ቶት።",
    },
    price: 24.99,
    category: "accessories",
    image: "/images/merch/tote-yasebshale.svg",
  },
  {
    id: "vinyl-evangadi",
    slug: "evangadi-vinyl",
    name: {
      en: "Evangadi Vinyl",
      am: "ኤቫንጋዲ ቪኒል",
    },
    description: {
      en: "Collector presentation of Evangadi with Gossaye Tesfaye.",
      am: "ከጎሳዬ ተስፋዬ ጋር የኤቫንጋዲ አልበም የቪኒል ስብስብ።",
    },
    price: 44.99,
    category: "music",
    image: "/images/merch/vinyl-evangadi.svg",
  },
];

export function getFeaturedMerch(limit = 4): MerchItem[] {
  const featured = merchItems.filter((item) => item.featured);
  return (featured.length ? featured : merchItems).slice(0, limit);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
