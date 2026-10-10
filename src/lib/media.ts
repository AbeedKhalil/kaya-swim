import type { ImageMetadata } from 'astro';

/**
 * Drop-in media. Save a file under one of the slot names below and it appears
 * on the site automatically — no code changes. Any extension works:
 *   photos: .jpg .jpeg .png .webp .avif   (optimized to AVIF/WebP at build)
 *   logos:  .svg (recommended) .png .webp
 * Empty slots show the water-art fallback instead.
 */
export const photoSlots = [
  { name: 'founder-portrait', where: 'Founder story and the hero avatar', ratio: '4:5', size: '1200×1500' },
  { name: 'track-water-experience', where: 'Water Experience page', ratio: '4:3', size: '1600×1200' },
  { name: 'track-excellence', where: 'Swimming Excellence page', ratio: '4:3', size: '1600×1200' },
  { name: 'track-fear-of-water', where: 'Fear-of-water page', ratio: '4:3', size: '1600×1200' },
  { name: 'pool-givat-ela', where: 'Location section', ratio: '3:2', size: '1600×1067' },
] as const;

export const logoSlots = [
  { name: 'logo-kids', where: 'Hero, kids & teens board', required: true },
  { name: 'logo-main', where: 'Header, mobile menu, and the hero adults board', required: true },
  { name: 'logo-adults', where: 'Hero adults board (optional: the main logo is used otherwise)', required: false },
] as const;

export type PhotoSlot = (typeof photoSlots)[number]['name'];
export type LogoSlot = (typeof logoSlots)[number]['name'];

const photoFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);
const rasterLogoFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/logos/*.{png,webp,PNG,WEBP}',
  { eager: true },
);
const svgLogoFiles = import.meta.glob<string>('/src/assets/logos/*.{svg,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const slotOf = (path: string) =>
  (path.split('/').pop() ?? '').replace(/\.[^.]+$/, '').toLowerCase();

function bySlot<T>(files: Record<string, T>): Map<string, T> {
  return new Map(Object.entries(files).map(([path, value]) => [slotOf(path), value]));
}

const photos = bySlot(photoFiles);
const rasterLogos = bySlot(rasterLogoFiles);
const svgLogos = bySlot(svgLogoFiles);

export function getPhoto(slot: PhotoSlot): ImageMetadata | undefined {
  return photos.get(slot)?.default;
}

export type LogoAsset = { kind: 'svg'; src: string } | { kind: 'raster'; image: ImageMetadata };

export function getLogo(slot: LogoSlot): LogoAsset | undefined {
  const svg = svgLogos.get(slot);
  if (svg) return { kind: 'svg', src: svg };
  const raster = rasterLogos.get(slot);
  if (raster) return { kind: 'raster', image: raster.default };
  return undefined;
}
