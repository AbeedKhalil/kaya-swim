import type { TrackSlug } from '../data/tracks';

export type Locale = 'he' | 'en';

/** Who a testimonial speaks for — shown as a small label on the card. */
export type Audience = 'parent' | 'swimmer' | 'adult';

export type CredentialIcon = 'trophy' | 'medal' | 'school' | 'graduation' | 'globe';
export type ValueIcon = 'home' | 'video' | 'graduation';

export interface Testimonial {
  quote: string;
  /** Attribution, e.g. "הורה למשתתפת בחווית המים". */
  name: string;
  audience: Audience;
  track: TrackSlug;
  /** Placeholder text. Shows a visible "sample" badge and a build warning until replaced. */
  sample?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
  /** Track pages that show this question. Omit to show it on every track page. */
  tracks?: TrackSlug[];
}

export interface TrackCopy {
  name: string;
  tagline: string;
  /** Short description on the home-page lane. */
  pitch: string;
  /** 3–4 short benefits on the home-page lane. */
  benefits: string[];
  forWhom: string[];
  whatYouGet: string[];
  /** Pre-filled WhatsApp message for this track. */
  whatsapp: string;
  /** Optional price line. Leave empty or remove to hide. */
  price?: string;
  imageAlt: string;
  meta: { title: string; description: string };
}

export interface SiteCopy {
  locale: Locale;
  /** This language's name, written in this language. */
  languageName: string;
  /** Short label for the language switch, e.g. "EN". */
  languageShort: string;

  meta: { title: string; description: string; ogImageAlt: string };
  skipLink: string;

  nav: {
    label: string;
    tracks: string;
    story: string;
    how: string;
    testimonials: string;
    faq: string;
    contact: string;
    menuOpen: string;
    menuClose: string;
    home: string;
    /** Label for the social / external links group. */
    follow: string;
  };

  cta: {
    whatsapp: string;
    send: string;
    details: string;
    seeTracks: string;
    call: string;
    email: string;
    /** Screen-reader hint appended to links that open WhatsApp. */
    opensWhatsapp: string;
    /** Screen-reader hint for links that open in a new tab. */
    opensNewTab: string;
  };

  whatsapp: { general: string };

  hero: {
    /** The headline, set on two lines. */
    line1: string;
    line2: string;
    credential: string;
    /** One sentence under the headline. */
    sub: string;
    /** Names the three lanes floating in the hero pool. */
    lanesLabel: string;
    /** The pause control for the moving water. */
    water: { pause: string; play: string };
  };

  credentials: { icon: CredentialIcon; text: string; medal?: boolean }[];

  tracksSection: { title: string; intro: string; agesPrefix: string };

  founder: {
    title: string;
    lead: string;
    paragraphs: string[];
    timelineLabel: string;
    agePrefix: string;
    timeline: { age?: number; label?: string; text: string; medal?: boolean }[];
    portraitAlt: string;
  };

  values: {
    title: string;
    items: { icon: ValueIcon; title: string; text: string }[];
    promises: string[];
  };

  journey: {
    title: string;
    intro: string;
    steps: { title: string; text: string }[];
    phone: {
      label: string;
      contact: string;
      status: string;
      outgoing: string;
      reply: string;
      payment: { title: string; text: string };
      receipt: string;
      video: { title: string; text: string };
    };
  };

  testimonials: {
    title: string;
    regionLabel: string;
    sampleBadge: string;
    audiences: Record<Audience, string>;
    items: Testimonial[];
  };

  faq: { title: string; intro: string; items: FaqItem[] };

  location: { title: string; text: string; waze: string; maps: string; imageAlt: string };

  register: {
    title: string;
    intro: string;
    fields: {
      name: string;
      track: string;
      trackPlaceholder: string;
      trackNotSure: string;
      age: string;
      note: string;
      optional: string;
    };
    errors: { name: string; track: string; age: string };
    privacy: string;
    direct: string;
    /** Labels used to build the WhatsApp message. */
    message: { greeting: string; intro: string; name: string; track: string; age: string; note: string };
  };

  footer: { tagline: string; navTitle: string; contactTitle: string; rights: string; accessibility: string };

  a11yMenu: {
    open: string;
    title: string;
    textSize: string;
    sizes: [string, string, string];
    contrast: string;
    motion: string;
    links: string;
    reset: string;
    statement: string;
    close: string;
  };

  a11yStatement: {
    meta: { title: string; description: string };
    title: string;
    updatedLabel: string;
    intro: string[];
    sections: { title: string; paragraphs?: string[]; list?: string[]; pool?: boolean }[];
    poolFallback: string;
    contactTitle: string;
    contactIntro: string;
    coordinatorLabel: string;
    phoneLabel: string;
    emailLabel: string;
  };

  notFound: { title: string; text: string; home: string };

  trackPage: {
    allTracks: string;
    forWhom: string;
    whatYouGet: string;
    withFounder: string;
    withFounderText: string;
    storyLink: string;
    testimonials: string;
    faq: string;
    otherTracks: string;
  };

  tracks: Record<TrackSlug, TrackCopy>;
}
