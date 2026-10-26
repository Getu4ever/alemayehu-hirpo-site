import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { events, getEventBySlug } from "@/data/events";
import { createPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return createPageMetadata({
    title: event.title.en,
    description: event.description.en,
    path: `/events/${event.slug}`,
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <article className="pt-32 pb-20">
      <Container>
        <Link
          href="/events"
          className="text-sm text-gold hover:text-gold-soft mb-8 inline-block"
        >
          ← Events
        </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start">
          {event.image ? (
            <div className="relative aspect-[4/5] overflow-hidden border border-border/50 bg-charcoal">
              <Image
                src={event.image}
                alt={event.title.en}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 22rem"
                className="object-cover object-top"
              />
            </div>
          ) : null}

          <div>
            <h1 className="font-display text-4xl md:text-5xl text-ivory mb-3">
              {event.title.en}
            </h1>
            <p className="amharic text-xl text-gold mb-6">{event.title.am}</p>
            <dl className="grid gap-4 text-sm mb-8 border border-border p-6">
              {event.date ? (
                <div>
                  <dt className="text-gold uppercase tracking-widest text-xs mb-1">
                    Date
                  </dt>
                  <dd className="text-ivory">
                    {event.date}
                    {event.time ? ` · ${event.time}` : ""}
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-gold uppercase tracking-widest text-xs mb-1">
                  Venue
                </dt>
                <dd className="text-ivory">
                  {event.venue.en}, {event.city.en}, {event.country.en}
                </dd>
              </div>
            </dl>
            <p className="text-muted leading-relaxed whitespace-pre-line">
              {event.description.en}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {event.ticketUrl ? (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-6 py-3 bg-gold text-charcoal text-sm uppercase tracking-wide hover:bg-gold-soft min-h-11 items-center"
                >
                  Get Tickets
                </a>
              ) : null}
              {event.facebookUrl ? (
                <a
                  href={event.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-6 py-3 border border-gold/50 text-gold text-sm uppercase tracking-wide hover:border-gold hover:bg-gold/10 min-h-11 items-center"
                >
                  View on Facebook
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
