"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export function NewsPreviewClientChrome({
  mode,
}: {
  mode: "heading" | "empty";
}) {
  const { t } = useLanguage();

  if (mode === "empty") {
    return <EmptyState message={t.noNews} />;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <SectionHeading
        eyebrow={t.newsUpdates}
        title={t.newsUpdates}
        titleAm="ዜናና ማሻሻያዎች"
        className="mb-0"
      />
      <Link
        href="/news"
        className="text-sm text-gold hover:text-gold-soft mb-10 md:mb-14"
      >
        {t.viewAllNews} →
      </Link>
    </div>
  );
}
