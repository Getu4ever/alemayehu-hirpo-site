"use client";

import Link from "next/link";
import { getRecentEvents } from "@/data/events";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/events/EventCard";

export function EventsPreview() {
  const { t } = useLanguage();
  const recent = getRecentEvents(4);

  return (
    <section className="section-pad">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            eyebrow={t.livePerformances}
            title={t.liveEvents}
            titleAm="ቀጥታ ዝግጅቶች"
            className="mb-0"
          />
          <Link
            href="/events"
            className="text-sm text-brass hover:text-gold-soft mb-10 md:mb-14 shrink-0"
          >
            {t.viewAllEvents} →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="space-y-6">
            <EmptyState message={t.noEvents} />
            <div className="text-center">
              <Button href="/contact" variant="secondary">
                {t.bookingCta}
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
