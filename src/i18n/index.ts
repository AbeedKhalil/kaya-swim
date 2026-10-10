import he from './he';
import en from './en';
import type { Locale, SiteCopy } from './types';

export type { Locale, SiteCopy } from './types';

export const locales = ['he', 'en'] as const satisfies readonly Locale[];
export const defaultLocale: Locale = 'he';

const copies: Record<Locale, SiteCopy> = { he, en };

export const getCopy = (locale: Locale): SiteCopy => copies[locale];

export const dirOf = (locale: Locale): 'rtl' | 'ltr' => (locale === 'he' ? 'rtl' : 'ltr');

/** Open Graph locale codes. */
export const ogLocale: Record<Locale, string> = { he: 'he_IL', en: 'en_US' };

export const otherLocale = (locale: Locale): Locale => (locale === 'he' ? 'en' : 'he');

/** The site's base path: "" at a domain root, e.g. "/kaya-swim" on a GitHub Pages project site. */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a root-relative path ("/og/og-he.png") with the base path. */
export const withBase = (path: string): string => `${BASE}${path.startsWith('/') ? path : `/${path}`}`;

/**
 * Turns a locale-neutral path ("/", "/tracks/excellence/", "/#faq") into the
 * URL for a locale. Hebrew lives at the root; English under /en/.
 * Page paths always end with "/" to match `trailingSlash: 'always'`.
 */
export function localizePath(path: string, locale: Locale): string {
  const [rawPath, hash] = path.split('#');
  let pathname = rawPath || '/';
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  if (!pathname.endsWith('/')) pathname = `${pathname}/`;
  const prefixed = withBase(locale === defaultLocale ? pathname : `/${locale}${pathname}`);
  return hash !== undefined ? `${prefixed}#${hash}` : prefixed;
}
