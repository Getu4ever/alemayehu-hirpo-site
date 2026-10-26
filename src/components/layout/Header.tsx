"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { artist } from "@/data/artist";
import { mainNav } from "@/data/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNavigation } from "./MobileNavigation";
import { FlagStripe } from "@/components/ui/FlagStripe";

export function Header() {
  const pathname = usePathname();
  const { bilingual } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  // Close mobile menu on navigation (adjust state during render).
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-charcoal/95 backdrop-blur-md border-b border-ethio-green/30"
          : "bg-gradient-to-b from-charcoal/85 to-transparent",
      )}
    >
      {(scrolled || open) && <FlagStripe />}
      <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          aria-label={`${artist.name.en} home`}
        >
          <span className="font-display text-lg sm:text-xl tracking-[0.08em] text-ivory group-hover:text-ethio-yellow transition-colors">
            ALEMAYEHU HIRPO
          </span>
          <span className="amharic text-[0.7rem] sm:text-xs text-ethio-yellow/90 mt-0.5 tracking-wide">
            {artist.name.am}
          </span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Primary"
        >
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-xs uppercase tracking-[0.16em] transition-colors min-h-11 inline-flex items-center",
                  active
                    ? "text-ethio-yellow"
                    : "text-ivory/75 hover:text-ethio-yellow",
                )}
              >
                {bilingual(item.label)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center min-h-11 min-w-11 text-ivory"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <MobileNavigation open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
