## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project conventions (KAYA SWIM)

- All visible text lives in `src/i18n/he.ts` and `src/i18n/en.ts` (typed by `SiteCopy` in `src/i18n/types.ts`); contact details in `src/config/site.ts`. Don't hard-code copy in components.
- Hebrew is the default locale at `/`, English at `/en/`. Build internal links with `localizePath()`; page paths end with `/` (`trailingSlash: 'always'`).
- Layout must work in both directions: use logical utilities (`ps-`, `me-`, `start-`, `text-start`), never `left`/`right` for content. Wrap number ranges in `AgeRange` (or `dir="ltr"`).
- Photos and logos are drop-in slots resolved by `src/lib/media.ts`; don't import image files directly.
- Social/external links: edit the `links` array in `src/config/site.ts`; `SiteLinks.astro` renders them per placement (header, menu, footer, contact).
- Never invent facts (prices, schedules, group sizes, quotes). Placeholder testimonials must keep `sample: true`.
- Motion: scroll reveals use the `.reveal`, `.reveal-pop`, `.reveal-wipe` and `.reveal-draw` classes (they animate `translate`/`scale`/`opacity`); hover effects use `transform`, so the two never collide. All motion must stay off under `prefers-reduced-motion` and `html.a11y-still`.
- Never put `transform`/`translate`/`filter` on `.waterline` or its ancestors: it creates a stacking context and the full-bleed water would cover the hero text.
- Keep load-time animation short (Lighthouse Speed Index): hero entrances finish within about 1s. Re-run Lighthouse after motion changes.
- Before finishing a change: `npm run check` and `npm run build` (the build prints the launch checklist).
