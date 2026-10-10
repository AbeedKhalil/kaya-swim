import { links, PLACEHOLDER_SITE_URL, site } from '../config/site';
import { getCopy, locales } from '../i18n';
import { getLogo, getPhoto, logoSlots, photoSlots } from './media';

let reported = false;

/**
 * Prints a launch checklist once per build (and once per dev-server start):
 * everything that still holds placeholder content.
 */
export function launchCheck(siteUrl: URL | undefined): void {
  if (reported) return;
  reported = true;

  const items: string[] = [];

  if (!siteUrl || siteUrl.href.startsWith(PLACEHOLDER_SITE_URL)) {
    items.push('Domain: set SITE_URL (or `site` in astro.config.mjs) to the real address.');
  }

  const samples = locales.reduce(
    (count, locale) => count + getCopy(locale).testimonials.items.filter((t) => t.sample).length,
    0,
  );
  if (samples > 0) {
    items.push(`Testimonials: ${samples} sample testimonials still show (src/i18n/he.ts, src/i18n/en.ts).`);
  }

  const missingLogos = logoSlots.filter((s) => s.required && !getLogo(s.name)).map((s) => s.name);
  if (missingLogos.length > 0) {
    items.push(`Logos: add ${missingLogos.join(', ')} to src/assets/logos/.`);
  }

  const missingPhotos = photoSlots.filter((s) => !getPhoto(s.name)).map((s) => s.name);
  if (missingPhotos.length > 0) {
    items.push(`Photos: add ${missingPhotos.join(', ')} to src/assets/images/.`);
  }

  const placeholders = links.filter((link) => link.placeholder).map((link) => link.id);
  if (placeholders.length > 0) {
    items.push(`Links still pointing to a placeholder: ${placeholders.join(', ')} — set the URL in src/config/site.ts (links) and delete "placeholder: true".`);
  }

  const pool = site.accessibility.poolArrangements;
  if (!pool.he || !pool.en) {
    items.push('Accessibility statement: describe the pool’s accessibility arrangements (src/config/site.ts).');
  }

  if (items.length > 0) {
    console.warn(`\n[KAYA SWIM] Launch checklist:\n${items.map((item) => `  • ${item}`).join('\n')}\n`);
  }
}
