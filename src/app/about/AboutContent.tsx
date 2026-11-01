"use client";

import { artist } from "@/data/artist";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function AboutContent() {
  const { t, bilingual, locale } = useLanguage();
  const script = locale === "am" ? "amharic" : "";

  return (
    <>
      <section className="section-pad">
        <Container narrow>
          <div className="flag-stripe mb-8 max-w-xs" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <p className="text-xs uppercase tracking-[0.28em] text-brass mb-4">
            {locale === "am" ? "መግለጫ" : "Manifesto"}
          </p>
          <p
            className={cn(
              "font-display text-2xl md:text-3xl leading-snug text-ivory mb-10",
              script,
            )}
          >
            {bilingual(artist.manifesto)}
          </p>
          <div className="hairline mb-10" aria-hidden />
          <p className={cn("text-lg md:text-xl leading-relaxed text-cream/90", script)}>
            {bilingual(artist.biography.introduction)}
          </p>
        </Container>
      </section>

      <section className="section-pad bg-surface">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading
                title={t.beginnings}
                titleAm="መጀመሪያ"
                className="mb-6"
              />
              <p className={cn("text-muted leading-relaxed", script)}>
                {bilingual(artist.biography.beginnings)}
              </p>
            </div>
            <div>
              <SectionHeading
                title={t.musicalIdentity}
                titleAm="የሙዚቃ ማንነት"
                className="mb-6"
              />
              <p className={cn("text-muted leading-relaxed", script)}>
                {bilingual(artist.biography.identity)}
              </p>
            </div>
            <div>
              <SectionHeading
                title={t.notableWorks}
                titleAm="ታዋቂ ሥራዎች"
                className="mb-6"
              />
              <p className={cn("text-muted leading-relaxed", script)}>
                {bilingual(artist.biography.notableWorks)}
              </p>
            </div>
            <div>
              <SectionHeading
                title={t.connection}
                titleAm="ከአድማጮች ጋር ትስስር"
                className="mb-6"
              />
              <p className={cn("text-muted leading-relaxed", script)}>
                {bilingual(artist.biography.connection)}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <SectionHeading
            title={t.careerTimeline}
            titleAm="የሙያ ጊዜ መስመር"
          />
          <ol className="relative border-l border-border ml-3 space-y-10">
            {artist.milestones.map((milestone) => (
              <li key={milestone.year} className="pl-8 relative">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold" />
                <p className="text-xs uppercase tracking-[0.22em] text-gold mb-2">
                  {milestone.year}
                </p>
                <h3 className={cn("font-display text-2xl text-ivory mb-2", script)}>
                  {bilingual(milestone.title)}
                </h3>
                <p className={cn("text-muted leading-relaxed max-w-2xl", script)}>
                  {bilingual(milestone.description)}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-pad light-section">
        <Container narrow>
          <SectionHeading
            title={t.pressQuotes}
            titleAm="ፕሬስና ቃለ መጠይቆች"
            light
          />
          <div className="border border-charcoal/10 px-8 py-12 text-center">
            <p className="text-charcoal/60 italic leading-relaxed">
              {t.pressPlaceholder}
            </p>
            <p className="mt-4 text-xs uppercase tracking-widest text-brass">
              Editable placeholder
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
