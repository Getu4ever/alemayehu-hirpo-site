export type EventItem = {
  id: string;
  slug: string;
  title: { en: string; am: string };
  date: string | null;
  time: string | null;
  city: { en: string; am: string };
  country: { en: string; am: string };
  venue: { en: string; am: string };
  ticketUrl: string | null;
  facebookUrl?: string;
  description: { en: string; am: string };
  status: "upcoming" | "past";
  image?: string;
  verified: boolean;
};

/**
 * Confirmed Palmy Lounge Atlas nights that name Alemayehu Hirpo on the poster.
 * Sources: official Palmy Lounge Facebook posts.
 */
export const events: EventItem[] = [
  {
    id: "palmy-2026-10-26",
    slug: "palmy-lounge-monday-live-oct-26-2026",
    title: {
      en: "Monday Live Band at Palmy Lounge Atlas",
      am: "ሰኞ ላይቭ ባንድ በፓልሚ ላውንጅ አትላስ",
    },
    date: "2026-10-26",
    time: "20:00",
    city: { en: "Addis Ababa", am: "አዲስ አበባ" },
    country: { en: "Ethiopia", am: "ኢትዮጵያ" },
    venue: {
      en: "Palmy Lounge Atlas",
      am: "ፓልሚ ላውንጅ አትላስ",
    },
    ticketUrl: null,
    facebookUrl:
      "https://www.facebook.com/palmylounge/posts/pfbid02tziL6id3SrN4rRe9CUsjsS2NJYMcF7tpkishZMFqGrkN6G1emM8rZo28GqB8hQEol",
    description: {
      en: "Live Band Night featuring Alemayehu Hirpo with Dibekulu, Akila, Fiker, and Milkisa. Bole Atlas, Chechnya Rd (in front of NB Business Center). Doors open 8 PM.",
      am: "ላይቭ ባንድ ምሽት — አለማየሁ ሂርጶ ከድበኩሉ፣ አኪላ፣ ፍቅር እና ሚልኪሳ ጋር። ቦሌ አትላስ ቼችኒያ መንገድ (ከኤንቢ ቢዝነስ ሴንተር ፊት ለፊት)። በር ይከፈታል ምሽት 2 ሰዓት።",
    },
    status: "upcoming",
    image: "/images/events/palmy-2026-10-26.jpg",
    verified: true,
  },
  {
    id: "palmy-2026-10-22",
    slug: "palmy-lounge-thursday-live-oct-22-2026",
    title: {
      en: "Thursday Live at Palmy Lounge Atlas",
      am: "ሐሙስ ላይቭ በፓልሚ ላውንጅ አትላስ",
    },
    date: "2026-10-22",
    time: "20:00",
    city: { en: "Addis Ababa", am: "አዲስ አበባ" },
    country: { en: "Ethiopia", am: "ኢትዮጵያ" },
    venue: {
      en: "Palmy Lounge Atlas",
      am: "ፓልሚ ላውንጅ አትላስ",
    },
    ticketUrl: null,
    facebookUrl:
      "https://www.facebook.com/palmylounge/posts/pfbid0W7p3vm8b2cqGAMrhmYSowXq3PdFNE8MYnTP38fmpdsCToVsZ41LX2xXMaHtCeQcMl",
    description: {
      en: "Thursday Live featuring Alemayehu Hirpo with Fifi Kassun, Maluda, Tariku, and Mekina Merry. Bole Atlas, Chechnya Rd (in front of NB Business Center). Doors open 8 PM.",
      am: "ሐሙስ ላይቭ — አለማየሁ ሂርጶ ከፊፊ ካሱን፣ ማሉዳ፣ ታሪኩ እና መኪና መሪ ጋር። ቦሌ አትላስ ቼችኒያ መንገድ (ከኤንቢ ቢዝነስ ሴንተር ፊት ለፊት)። በር ይከፈታል ምሽት 2 ሰዓት።",
    },
    status: "past",
    image: "/images/events/palmy-2026-10-22.jpg",
    verified: true,
  },
  {
    id: "palmy-2026-10-15",
    slug: "palmy-lounge-thursday-live-oct-15-2026",
    title: {
      en: "Thursday Live at Palmy Lounge Atlas",
      am: "ሐሙስ ላይቭ በፓልሚ ላውንጅ አትላስ",
    },
    date: "2026-10-15",
    time: "20:00",
    city: { en: "Addis Ababa", am: "አዲስ አበባ" },
    country: { en: "Ethiopia", am: "ኢትዮጵያ" },
    venue: {
      en: "Palmy Lounge Atlas",
      am: "ፓልሚ ላውንጅ አትላስ",
    },
    ticketUrl: null,
    facebookUrl:
      "https://www.facebook.com/palmylounge/posts/pfbid024TpgJxL2irhogPuYnyNNzn2jnRM5iqdbKBkoDZjPGnzHVE9XmHtPnyfU89Ebk5vZl",
    description: {
      en: "Thursday Live featuring Alemayehu Hirpo with Fikiraddis, Maluda, Tarke Gne, and Milkias Merry. Bole Atlas, Chechnya Rd (in front of NB Business Center). Doors open 8 PM.",
      am: "ሐሙስ ላይቭ — አለማየሁ ሂርጶ ከፍቅርአዲስ፣ ማሉዳ፣ ታርቄ ግኘ እና ሚልኪያስ መሪ ጋር። ቦሌ አትላስ ቼችኒያ መንገድ (ከኤንቢ ቢዝነስ ሴንተር ፊት ለፊት)። በር ይከፈታል ምሽት 2 ሰዓት።",
    },
    status: "past",
    image: "/images/events/palmy-2026-10-15.jpg",
    verified: true,
  },
  {
    id: "palmy-2026-10-08",
    slug: "palmy-lounge-thursday-live-oct-08-2026",
    title: {
      en: "Thursday Live at Palmy Lounge Atlas",
      am: "ሐሙስ ላይቭ በፓልሚ ላውንጅ አትላስ",
    },
    date: "2026-10-08",
    time: "20:00",
    city: { en: "Addis Ababa", am: "አዲስ አበባ" },
    country: { en: "Ethiopia", am: "ኢትዮጵያ" },
    venue: {
      en: "Palmy Lounge Atlas",
      am: "ፓልሚ ላውንጅ አትላስ",
    },
    ticketUrl: null,
    facebookUrl:
      "https://www.facebook.com/palmylounge/posts/pfbid0o6EP6NfyWZZwhYP3FYLJ5zH4pLHJ8LhbgdLuDUjVMtHDYBdLCSJLL5FW8x84S1VMl",
    description: {
      en: "Thursday Live featuring Alemayehu Hirpo with Meselu, Maluda, Tare, Milki, and Merry. Bole Atlas, Chechnya Rd (in front of NB Business Center). Doors open 8 PM.",
      am: "ሐሙስ ላይቭ — አለማየሁ ሂርጶ ከመሰሉ፣ ማሉዳ፣ ታሬ፣ ሚልኪ እና መሪ ጋር። ቦሌ አትላስ ቼችኒያ መንገድ (ከኤንቢ ቢዝነስ ሴንተር ፊት ለፊት)። በር ይከፈታል ምሽት 2 ሰዓት።",
    },
    status: "past",
    image: "/images/events/palmy-2026-10-08.jpg",
    verified: true,
  },
];

export function getUpcomingEvents() {
  return events
    .filter((e) => e.status === "upcoming" && e.verified)
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
}

export function getPastEvents() {
  return events
    .filter((e) => e.status === "past")
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getRecentEvents(limit = 4) {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();
  return [...upcoming, ...past].slice(0, limit);
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}
