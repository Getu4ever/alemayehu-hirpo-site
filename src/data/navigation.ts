export const mainNav = [
  { href: "/", label: { en: "Home", am: "መነሻ" } },
  { href: "/about", label: { en: "About", am: "ስለ እኔ" } },
  { href: "/music", label: { en: "Music", am: "ሙዚቃ" } },
  { href: "/videos", label: { en: "Videos", am: "ቪዲዮዎች" } },
  { href: "/news", label: { en: "News", am: "ዜና" } },
  { href: "/events", label: { en: "Events", am: "ዝግጅቶች" } },
  { href: "/gallery", label: { en: "Gallery", am: "ጋለሪ" } },
  { href: "/contact", label: { en: "Contact", am: "ያግኙን" } },
] as const;

export type NavItem = (typeof mainNav)[number];
