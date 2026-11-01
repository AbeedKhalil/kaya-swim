// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * The public address of the site. Used for canonical URLs, the sitemap and the
 * Open Graph images that WhatsApp shows in link previews.
 * Set SITE_URL when building with your own domain. Without it, the production
 * address of Vercel or Netlify is used automatically, then a placeholder.
 */
const SITE_URL =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  process.env.URL || // Netlify
  'https://kayaswim.example';

/**
 * Sub-path the site is served from: "/" at a domain root (Vercel, Netlify, a custom
 * domain), "/kaya-swim" on a GitHub Pages project site. Set by the deploy workflow.
 */
const BASE_PATH = process.env.BASE_PATH || '/';

/**
 * Fonts come from the installed @fontsource packages (no network at build time).
 * Each subset is its own variant, always Hebrew first then Latin: BaseLayout
 * relies on that order to preload exactly the files the first screen needs.
 */
const HEBREW = ['U+0307-0308', 'U+0590-05FF', 'U+20AA', 'U+25CC', 'U+FB1D-FB4F'];
const LATIN = [
  'U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+02BB-02BC', 'U+02C6', 'U+02DA', 'U+02DC', 'U+0304', 'U+0308',
  'U+0329', 'U+2000-206F', 'U+20AC', 'U+2122', 'U+2191', 'U+2193', 'U+2212', 'U+2215', 'U+FEFF', 'U+FFFD',
];

/**
 * Each role is one family made of two scripts: Assistant draws the Hebrew, Funnel
 * draws the Latin (Funnel has no Hebrew). Variants are Hebrew first, Latin second:
 * BaseLayout relies on that order to preload exactly the files the first screen needs.
 * @param {string} latinPkg @param {string} latinFile
 * @returns {[any, any]} the Hebrew variant, then the Latin variant
 */
const pair = (latinPkg, latinFile) => [
  {
    src: ['@fontsource-variable/assistant/files/assistant-hebrew-wght-normal.woff2'],
    weight: '300 800',
    style: 'normal',
    unicodeRange: HEBREW,
  },
  { src: [`${latinPkg}/files/${latinFile}`], weight: '300 800', style: 'normal', unicodeRange: LATIN },
];

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  compressHTML: true,

  i18n: {
    locales: ['he', 'en'],
    defaultLocale: 'he',
    routing: { prefixDefaultLocale: false },
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Kaya Display',
      cssVariable: '--font-kaya-display',
      // Metric-matched fallback defined in src/styles/global.css.
      fallbacks: ['Kaya Display Fallback', 'sans-serif'],
      optimizedFallbacks: false,
      options: { variants: pair('@fontsource-variable/funnel-display', 'funnel-display-latin-wght-normal.woff2') },
    },
    {
      provider: fontProviders.local(),
      name: 'Kaya Sans',
      cssVariable: '--font-kaya-sans',
      fallbacks: ['Kaya Sans Fallback', 'sans-serif'],
      optimizedFallbacks: false,
      options: { variants: pair('@fontsource-variable/funnel-sans', 'funnel-sans-latin-wght-normal.woff2') },
    },
  ],

  build: {
    // One HTML response carries all CSS: no render-blocking stylesheet request.
    inlineStylesheets: 'always',
  },

  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'he',
        locales: { he: 'he-IL', en: 'en-US' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
