export const mainNav = [
  { href: "/", label: { en: "Home", am: "መነሻ" } },
  { href: "/music", label: { en: "Music", am: "ሙዚቃ" } },
  { href: "/news", label: { en: "News", am: "ዜና" } },
  { href: "/events", label: { en: "Live", am: "ቀጥታ" } },
  { href: "/tour", label: { en: "Tour", am: "ጉብኝት" } },
  { href: "/shop", label: { en: "Shop", am: "ሱቅ" } },
  { href: "/contact", label: { en: "Contact", am: "ያግኙን" } },
] as const;

export type NavItem = (typeof mainNav)[number];
