"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MusicPageClient() {
  const { t } = useLanguage();
  return (
    <SectionHeading
      eyebrow={t.allReleases}
      title={t.allReleases}
      titleAm="ሁሉም ሥራዎች"
    />
  );
}
