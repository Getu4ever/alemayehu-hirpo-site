# Alemayehu Hirpo — Official Website

Premium official website for Ethiopian singer and songwriter **Alemayehu Hirpo (አለማየሁ ሂርጶ)**.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and a bilingual English / Amharic experience.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide icons
- Google fonts: Cormorant Garamond (display), Outfit (body), Noto Sans Ethiopic (Amharic)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Project structure

```text
src/
  app/                 # Routes (home, about, music, videos, news, events, gallery, contact)
  components/          # Layout, home sections, feature modules, UI primitives
  data/                # Centralized artist, releases, videos, news, events, gallery
  i18n/                # EN/AM translations + language provider
  lib/                 # Utilities and metadata helpers
public/images/artist/  # Official photographs
public/images/placeholders/
docs/artist-research.md
```

## Content updates

Edit structured data — do not hardcode facts into components:

- `src/data/artist.ts` — name, bio, social, streaming, milestones, image paths
- `src/data/releases.ts` — discography
- `src/data/videos.ts` — video library
- `src/data/news.ts` — articles (add entries for `/news/[slug]`)
- `src/data/events.ts` — concerts (add entries for `/events/[slug]`)
- `src/data/gallery.ts` — photo gallery
- `src/i18n/translations.ts` — UI strings (EN / AM)

Research notes and verification status: `docs/artist-research.md`.

## Language switcher

EN / አማ toggle in the header persists via `localStorage` (`ah-locale`) and updates `document.documentElement.lang`.

## Contact & newsletter forms

Forms validate on the client and show integration-ready success messaging. Before production:

1. Add an API route (e.g. `src/app/api/contact/route.ts`) or a form service (Resend, Formspree, etc.).
2. Wire `ContactForm` and `NewsletterSection` submit handlers to that endpoint.
3. Add spam protection (honeypot / Turnstile / similar).
4. Populate real booking and media emails in `src/data/artist.ts` when confirmed.

## SEO

- Per-page metadata via `createPageMetadata`
- Open Graph / Twitter cards using artist photography
- `src/app/sitemap.ts` and `src/app/robots.ts`
- Update `metadataBase` in `src/app/layout.tsx` and sitemap/robots URLs when the production domain is confirmed (currently `https://www.alemayehu-hirpo.com` as a placeholder)

## Deployment

Deploy on Vercel (recommended):

```bash
npm run build
```

Or connect the Git repository to Vercel for continuous deployment. No secrets are required for the current static content site.

## Design direction

**Ethiopian Heritage Meets Contemporary Music** — charcoal cinematic surfaces, forest green depth, antique gold accents, ivory editorial sections, bilingual typography, artist photography as the visual centerpiece.

## Remaining integrations

- Official streaming URLs beyond Apple Music / SoundCloud (Spotify, YouTube Music)
- Confirmed social accounts
- Full discography artwork and tracklists
- Official video embeds
- Confirmed events and news posts
- Form delivery backend
- Production domain / analytics (optional)
