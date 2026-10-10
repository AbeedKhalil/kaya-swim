import type { APIRoute } from 'astro';
import { withBase } from '../i18n';

/** robots.txt, pointing crawlers at the sitemap on the configured domain. */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase('/sitemap-index.xml'), site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
