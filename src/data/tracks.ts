/**
 * The three tracks, language-neutral. All visible text lives in src/i18n/{he,en}.ts.
 * Array order is display order everywhere (home lanes, menus, "other tracks").
 */
export const trackSlugs = ['water-experience', 'excellence', 'fear-of-water'] as const;
export type TrackSlug = (typeof trackSlugs)[number];

/** Water depth encodes the audience: shallow (first steps), deep end (competitive), still (calm). */
export type Depth = 'shallow' | 'deep' | 'still';

export interface Track {
  slug: TrackSlug;
  ages: readonly [min: number, max: number];
  depth: Depth;
  /** Drop-in photo slot in src/assets/images (any of .jpg .jpeg .png .webp .avif). */
  image: `track-${TrackSlug}`;
}

export const tracks: readonly Track[] = [
  { slug: 'water-experience', ages: [4, 10], depth: 'shallow', image: 'track-water-experience' },
  { slug: 'excellence', ages: [10, 18], depth: 'deep', image: 'track-excellence' },
  { slug: 'fear-of-water', ages: [4, 90], depth: 'still', image: 'track-fear-of-water' },
];

export const isTrackSlug = (value: string): value is TrackSlug =>
  (trackSlugs as readonly string[]).includes(value);

export const getTrack = (slug: TrackSlug): Track => {
  const track = tracks.find((t) => t.slug === slug);
  if (!track) throw new Error(`Unknown track: ${slug}`);
  return track;
};
