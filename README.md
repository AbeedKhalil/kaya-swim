# KAYA SWIM — website

Course-selling site and founder CV for **KAYA SWIM**, Katrin Shafir's boutique swim center at the Givat Ela pool.
Hebrew at `/` (right-to-left), English at `/en/`. Every call to action opens WhatsApp with a message already
written for that context.

Built with **Astro 7 + Tailwind CSS 4**, static output: plain HTML, about 6 KB of JavaScript, no third-party requests.
Lighthouse (mobile) at the time of writing: 100 / 100 / 100 / 100 on the home and track pages.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321  (English: /en/)
npm run build      # static site in dist/  — also prints the launch checklist
npm run preview    # serve dist/ locally
npm run check      # type-check, including that Hebrew and English copy have the same fields
```

Requires Node 22.12 or newer.

## Before launch

`npm run build` prints a checklist of anything still holding placeholder content. In short:

1. **Domain** — set the `SITE_URL` environment variable (or the fallback in `astro.config.mjs`). Canonical
   URLs, the sitemap and WhatsApp link previews depend on it.
2. **Logos** — done: `logo-main` (header, menu, adults board) and `logo-kids` are in `src/assets/logos/`.
   To replace one, save the new file under the same name (see the README there).
3. **Photos** — add the photos listed in `src/assets/images/README.md`.
4. **Testimonials** — the Voices section is hidden until real quotes (with the person's permission) are added
   in `src/i18n/he.ts` and `src/i18n/en.ts`. If a quote is still a placeholder, keep `sample: true`.
5. **Email** — the brief listed `KAYA SWIM@gmail.com`, which isn't a valid address. The site uses
   `kayaswim@gmail.com`; confirm or change it in `src/config/site.ts`.
6. **Founder name** — confirm the Hebrew spelling `קטרין שפיר` in `src/config/site.ts`.
7. **Directions** — check that the Waze and Google Maps buttons open the right pool (`mapsQuery` in
   `src/config/site.ts`).
8. **Accessibility statement** — fill in `poolArrangements` (parking, entrance, pool access) and review the
   statement text; update `lastReviewed`. Israeli law requires the statement — have it checked by someone
   qualified.
9. **Instagram** — no profile is linked. When you have the URL, uncomment the Instagram example in `links`
   in `src/config/site.ts`, set the profile URL and `handle`. Do not point it at instagram.com's home page.
10. **Social preview images** — after changing the hero text, run `npm run og` (needs Chrome or Edge).

## Where things live

| To change…                                         | Edit                                             |
| -------------------------------------------------- | ------------------------------------------------ |
| Phone, WhatsApp number, email, founder name, socials | `src/config/site.ts`                           |
| Any Hebrew text                                    | `src/i18n/he.ts`                                 |
| Any English text                                   | `src/i18n/en.ts`                                 |
| Track ages, order, colors (water depth)            | `src/data/tracks.ts`                             |
| Photos / logos                                     | `src/assets/images/`, `src/assets/logos/`        |
| Colors, sizes, the waterline and caustics          | `src/styles/global.css` (`@theme` at the top)    |
| Fonts                                              | `astro.config.mjs` (`fonts`)                     |
| Page sections                                      | `src/components/sections/`                       |
| Page assembly                                      | `src/views/` (`HomeView`, `TrackView`, `AccessibilityView`) |

Both language files must have the same fields — `npm run check` fails if the English file misses something the
Hebrew one has.

## Common edits

**Add a real testimonial** — in `src/i18n/he.ts` (and its English version in `en.ts`):

```ts
{
  quote: 'הטקסט של ההמלצה…',
  name: 'אמא של נועה, 6',
  audience: 'parent',            // 'parent' | 'swimmer' | 'adult'
  track: 'water-experience',     // which track it's about — it also appears on that track's page
},
```

**Show a price on a track** — add `price: '₪ … לחודש'` to that track in `he.ts` / `en.ts`. Remove it to hide.

**Add an FAQ question** — add `{ q, a }` to `faq.items`. Add `tracks: ['fear-of-water']` to show it only on
specific track pages; without `tracks` it shows on every track page. The home page shows all questions.

**Add or change social / external links** — everything comes from the `links` array in `src/config/site.ts`.
Add an entry and it appears wherever its `show` list says — no layout changes:

```ts
{
  id: 'facebook',
  icon: 'facebook',          // a brand glyph from src/lib/brand-icons.ts, or 'link' for a generic icon
  label: 'Facebook',         // or { he: '…', en: '…' } when the name differs per language
  url: 'https://www.facebook.com/…',
  handle: '@kayaswim',       // optional, shown under the name in the contact list
  show: ['footer', 'contact'], // any of: header · menu · footer · contact
},
```

Brand glyphs ready to use: Instagram, Facebook, TikTok, YouTube, X, Threads, Telegram (plus WhatsApp, Waze,
Google Maps). Links open in a new tab with a screen-reader hint, and carry `data-cta="link-<id>-<placement>"`.

**Reorder the tracks** — reorder the array in `src/data/tracks.ts`.

## How WhatsApp works

- Every button is a `https://wa.me/972523440851?text=…` link with a message written for its context (the
  general message, or one per track).
- The sign-up form doesn't send anything anywhere: it builds a tidy message from the fields and opens WhatsApp
  with it. Nothing is stored on the site.
- Each WhatsApp link has a `data-cta` attribute (`hero`, `track-excellence`, `float`, `form`, …). To measure
  clicks later, add an analytics script that listens for clicks on `[data-cta]` — no markup changes needed.

## Design notes

- **Palette:** tile white, lane-stripe ink, pool water from surface to deep end, medal bronze reserved for
  Katrin's medal. Tokens are at the top of `src/styles/global.css`.
- **Type:** Karantina (display — condensed, like lane numbers) and Assistant (body), self-hosted.
- **The waterline:** the hero headline is half submerged — "אלופה" sits on the water surface. The water layer
  hangs from the word itself, so it stays aligned at any screen size.
- **Lanes:** in Hebrew *מסלול* means both a course track and a swimming lane, so the three tracks are three
  lanes separated by lane ropes. Water depth tells the audiences apart: shallow (first steps), the deep end
  (competitive), still water (fear of water).
- **Medal:** Katrin's Maccabiah bronze hangs in the hero's dry space (desktop), swinging gently.

### Motion

All motion is CSS running on the GPU (`transform`/`opacity`), plus one tiny pointer script — it doesn't
affect load time (Lighthouse performance stays 100).

- **Hero:** the headline rises in, the water surface settles after a splash, then keeps a slow living sway
  and a glint travelling along the surface. On desktop, sunlight on the water, the caustic light and the
  submerged word follow the pointer.
- **Scroll:** sections rise into place as they enter the screen, lane ropes draw across, the founder's
  timeline stripe draws down to the "T", the WhatsApp chat in "How to join" plays message by message, photos
  fill in from the bottom like rising water, and the footer's KAYA SWIM fills with water. These use the
  browser's native scroll-driven animations; where unsupported, everything is simply shown.
- **Hover:** buttons lift with a light sheen, lanes and cards lift, the audience boards tilt, nav links
  underline, the WhatsApp button shows its label.
- **Page transitions:** native cross-document View Transitions. A lane on the home page grows into its track
  page (and back); the header and floating buttons stay put. Browsers without support navigate normally.
- **Off switches:** the system "reduce motion" setting and the accessibility menu's "stop animations" turn
  all of it off. Timing tokens (`--ease-out`, `--ease-spring`) are at the top of `src/styles/global.css`.

## Accessibility

Built to WCAG 2.1 AA: semantic structure, full keyboard use, visible focus, skip link, AA contrast (including
high-contrast mode), labeled form fields with clear errors, `lang`/`dir` on every page, reduced-motion support.
The built-in accessibility menu (bottom-left) offers text size, high contrast, stop animations and highlighted
links; choices are saved in the browser. The statement lives at `/accessibility/` and `/en/accessibility/`.

## Deploy

**GitHub Pages (live now).** Every push to `main` rebuilds and publishes the site via
`.github/workflows/deploy.yml` — live at **https://abeedkhalil.github.io/kaya-swim/**. Progress: the
repository's *Actions* tab. To use your own domain: *Settings → Pages → Custom domain*, add the DNS records
GitHub shows, and the next deploy serves the site from the domain root automatically.

**Vercel / Netlify / Cloudflare Pages (alternative).** Sign in with GitHub, choose *Import project* /
*Add new site*, and pick the `kaya-swim` repository. All three detect Astro (build `npm run build`, output
`dist`). On Vercel and Netlify the site address is picked up automatically; on Cloudflare Pages, or with a
custom domain, add an environment variable `SITE_URL=https://your-domain` so link previews and canonical URLs
use it.

## Maintenance scripts

- `npm run og` — regenerates the social preview images (`public/og/`) and PNG icons. Needs Chrome or Edge
  (set `CHROME_PATH` if it isn't found). The card text lives in `scripts/make-og.mjs`.
- `npm run caustics` — regenerates the caustic-light texture (`src/assets/art/caustics.svg`). Pass a number to
  try a different pattern: `npm run caustics -- 7`.
- Brand icons are copied from Simple Icons into `src/lib/brand-icons.ts` (instructions inside).
