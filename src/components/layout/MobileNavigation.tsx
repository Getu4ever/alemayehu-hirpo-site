"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function MobileNavigation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { bilingual } = useLanguage();

  if (!open) return null;

  return (
    <div
      id="mobile-nav"
      className="lg:hidden border-t border-border bg-charcoal animate-fade-in"
    >
      <nav
        className="mx-auto max-w-7xl px-5 py-6 flex flex-col gap-1"
        aria-label="Mobile"
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
              onClick={onClose}
              className={cn(
                "py-3 text-base tracking-wide border-b border-white/5 min-h-12 flex items-center",
                active ? "text-ethio-yellow" : "text-ivory/90",
              )}
            >
              {bilingual(item.label)}
            </Link>
          );
        })}
        <div className="pt-5">
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}
