import { site } from '../config/site';

/** A wa.me link that opens a chat with KAYA SWIM, optionally with a pre-filled message. */
export function waLink(text?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
