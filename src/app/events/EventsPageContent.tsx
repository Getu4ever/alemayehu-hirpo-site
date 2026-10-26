"use client";

import { getPastEvents, getUpcomingEvents } from "@/data/events";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EmptyState } from "@/components/ui/EmptyState";
import { EventCard } from "@/components/events/EventCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EventsPageContent() {
  const { t } = useLanguage();
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <div className="space-y-16">
      <div>
        <SectionHeading
          title={t.upcomingEvents}
          titleAm="መጪ ዝግጅቶች"
        />
        {upcoming.length === 0 ? (
          <EmptyState message={t.noEvents} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      {past.length > 0 ? (
        <div>
          <SectionHeading
            title={t.pastPerformances}
            titleAm="ያለፉ ትርኢቶች"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
