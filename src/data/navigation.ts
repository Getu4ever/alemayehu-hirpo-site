export const mainNav = [
  { href: "/", label: { en: "Home", am: "መነሻ" } },
  { href: "/music", label: { en: "Music", am: "ሙዚቃ" } },
  { href: "/tour", label: { en: "Tour", am: "ጉብኝት" } },
  { href: "/events", label: { en: "Live Events", am: "ቀጥታ ዝግጅቶች" } },
  { href: "/shop", label: { en: "Shop", am: "ሱቅ" } },
  { href: "/videos", label: { en: "Videos", am: "ቪዲዮዎች" } },
  { href: "/contact", label: { en: "Contact", am: "ያግኙን" } },
] as const;

export type NavItem = (typeof mainNav)[number];
