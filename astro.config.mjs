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
const HEBREW = ['U+0307-0308', 'U+0590-05FF', 'U+200C-2010', 'U+20AA', 'U+25CC', 'U+FB1D-FB4F'];
const LATIN = [
  'U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+02BB-02BC', 'U+02C6', 'U+02DA', 'U+02DC', 'U+0304', 'U+0308',
  'U+0329', 'U+2000-206F', 'U+20AC', 'U+2122', 'U+2191', 'U+2193', 'U+2212', 'U+2215', 'U+FEFF', 'U+FFFD',
];

/**
 * @param {string} pkg @param {string} file @param {string} weight
 * @returns {[any, any]} the Hebrew variant, then the Latin variant
 */
const subsets = (pkg, file, weight) => [
  { src: [`${pkg}/files/${file.replace('SUBSET', 'hebrew')}`], weight, style: 'normal', unicodeRange: HEBREW },
  { src: [`${pkg}/files/${file.replace('SUBSET', 'latin')}`], weight, style: 'normal', unicodeRange: LATIN },
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
      name: 'Karantina',
      cssVariable: '--font-karantina',
      // Metric-matched fallback defined in src/styles/global.css (Astro's estimate was off for these fonts).
      fallbacks: ['Karantina Fallback', 'sans-serif'],
      optimizedFallbacks: false,
      options: { variants: subsets('@fontsource/karantina', 'karantina-SUBSET-700-normal.woff2', '700') },
    },
    {
      provider: fontProviders.local(),
      name: 'Assistant',
      cssVariable: '--font-assistant',
      fallbacks: ['Assistant Fallback', 'sans-serif'],
      optimizedFallbacks: false,
      options: { variants: subsets('@fontsource-variable/assistant', 'assistant-SUBSET-wght-normal.woff2', '200 800') },
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
