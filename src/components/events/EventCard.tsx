"use client";

import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/data/events";
import { useLanguage } from "@/i18n/LanguageProvider";
import { formatDate } from "@/lib/utils";
import { ExternalLink, MapPin, Ticket } from "lucide-react";

export function EventCard({ event }: { event: EventItem }) {
  const { bilingual, locale } = useLanguage();

  return (
    <article className="group flex flex-col bg-surface/30 border border-border/60 hover:border-gold/35 transition-colors overflow-hidden">
      {event.image ? (
        <Link
          href={`/events/${event.slug}`}
          className="relative block aspect-[4/5] overflow-hidden bg-charcoal"
        >
          <Image
            src={event.image}
            alt={bilingual(event.title)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal/80 to-transparent pointer-events-none" />
        </Link>
      ) : null}

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {event.date ? (
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">
            {formatDate(event.date, locale)}
            {event.time ? ` · ${event.time}` : ""}
          </p>
        ) : null}
        <h3 className="font-display text-xl sm:text-2xl text-ivory mb-3 leading-snug">
          <Link href={`/events/${event.slug}`} className="hover:text-gold">
            {bilingual(event.title)}
          </Link>
        </h3>
        <p className="flex items-start gap-2 text-sm text-muted mt-auto">
          <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
          <span>
            {bilingual(event.venue)}
            <br />
            {bilingual(event.city)}, {bilingual(event.country)}
          </span>
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
          {event.ticketUrl ? (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft"
            >
              <Ticket size={16} />
              Tickets
            </a>
          ) : null}
          {event.facebookUrl ? (
            <a
              href={event.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft"
            >
              <ExternalLink size={16} />
              Facebook
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
