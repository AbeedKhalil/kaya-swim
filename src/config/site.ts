import type { BrandIconName } from '../lib/brand-icons';

/**
 * Contact details and brand facts — the single source of truth.
 * Change a value here and it updates everywhere, in both languages.
 */
export const site = {
  brand: 'KAYA SWIM',

  phone: {
    display: '052-344-0851',
    e164: '+972523440851',
  },

  /** International format without "+", as wa.me expects. */
  whatsapp: '972523440851',

  /**
   * The brief listed "KAYA SWIM@gmail.com", which is not a valid address.
   * Gmail ignores dots, so kaya.swim@gmail.com reaches this same inbox.
   * If the real address is different, change it here.
   */
  email: 'kayaswim@gmail.com',

  /** Please confirm the Hebrew spelling. */
  founder: {
    he: { full: 'קטרין שפיר', first: 'קטרין' },
    en: { full: 'Katrin Shafir', first: 'Katrin' },
  },

  location: {
    he: 'בריכת גבעת אלה',
    en: 'Givat Ela swimming pool',
    /** Search text used for the Waze and Google Maps buttons — check that it opens the right place. */
    mapsQuery: 'בריכת גבעת אלה',
  },

  accessibility: {
    /** Contact person named in the accessibility statement. */
    coordinator: { he: 'קטרין שפיר', en: 'Katrin Shafir' },
    /** Date the accessibility statement was last reviewed (YYYY-MM-DD). */
    lastReviewed: '2026-10-10',
    /**
     * Physical accessibility arrangements at the pool (parking, entrance, pool lift…).
     * Fill in per language; while empty, the statement asks visitors to call instead.
     */
    poolArrangements: { he: '', en: '' },
  },
} as const;

/* ───────────────────────── Social & external links ─────────────────────────
   One list drives every place links appear. To add a link, add an entry —
   no layout changes needed. `show` decides where it appears:
     header  – icon in the top bar (desktop/tablet, and wider phones)
     menu    – icon + name in the mobile menu
     footer  – icon + name in the footer's contact column
     contact – full row in the sign-up section's "reach us directly" list */

export type LinkPlacement = 'header' | 'menu' | 'footer' | 'contact';

export interface SiteLink {
  /** Unique id; also used for analytics (data-cta="link-<id>-<placement>"). */
  id: string;
  /** A brand glyph from src/lib/brand-icons.ts, or 'link' for a generic icon. */
  icon: BrandIconName | 'link';
  /** Name shown to people. Use { he, en } when it differs per language. */
  label: string | { he: string; en: string };
  url: string;
  /** Optional handle shown under the name in the contact list, e.g. "@kayaswim". */
  handle?: string;
  show: readonly LinkPlacement[];
  /** Still pointing at a placeholder: the build warns until you replace the URL and remove this. */
  placeholder?: boolean;
}

export const links: readonly SiteLink[] = [
  // Instagram — uncomment when you have the real profile. Do not link to instagram.com's home page.
  // Replace the URL, add `handle`, and leave `placeholder` off once the URL is real.
  // {
  //   id: 'instagram',
  //   icon: 'instagram',
  //   label: 'Instagram',
  //   url: 'https://www.instagram.com/<handle>/',
  //   handle: '@<handle>',
  //   show: ['header', 'menu', 'footer', 'contact'],
  // },
  // More examples — uncomment and fill in:
  // { id: 'facebook', icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/…', show: ['footer', 'contact'] },
  // { id: 'tiktok', icon: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@…', show: ['menu', 'footer'] },
  // { id: 'blog', icon: 'link', label: { he: 'הבלוג', en: 'Blog' }, url: 'https://…', show: ['footer'] },
];

export const linksFor = (placement: LinkPlacement) => links.filter((link) => link.show.includes(placement));

/** The fallback domain in astro.config.mjs; the build warns while it is still in use. */
export const PLACEHOLDER_SITE_URL = 'https://kayaswim.example';

export const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(site.location.mapsQuery)}&navigate=yes`;
export const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.location.mapsQuery)}`;
export const telUrl = `tel:${site.phone.e164}`;
export const mailUrl = `mailto:${site.email}`;
