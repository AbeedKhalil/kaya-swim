import { site } from '../config/site';
import { tracks, type TrackSlug } from '../data/tracks';
import { getCopy, localizePath, withBase, type Locale } from '../i18n';

/** schema.org structured data, so search engines understand who and what KAYA SWIM is. */

const ids = (siteUrl: URL) => {
  const root = new URL(withBase('/'), siteUrl).href;
  return { business: `${root}#business`, founder: `${root}#founder` };
};

function business(locale: Locale, siteUrl: URL) {
  const t = getCopy(locale);
  const id = ids(siteUrl);
  return [
    {
      '@type': 'SportsActivityLocation',
      '@id': id.business,
      name: site.brand,
      description: t.meta.description,
      url: new URL(localizePath('/', locale), siteUrl).href,
      telephone: site.phone.e164,
      email: site.email,
      image: new URL(withBase(`/og/og-${locale}.png`), siteUrl).href,
      address: {
        '@type': 'PostalAddress',
        addressLocality: locale === 'he' ? 'גבעת אלה' : 'Givat Ela',
        addressCountry: 'IL',
      },
      founder: { '@id': id.founder },
    },
    {
      '@type': 'Person',
      '@id': id.founder,
      name: site.founder[locale].full,
      jobTitle: locale === 'he' ? 'מייסדת KAYA SWIM' : 'Founder of KAYA SWIM',
      award:
        locale === 'he'
          ? 'מדליית ארד ב-200 מ׳ פרפר, מכביה 2017'
          : 'Bronze medal, 200 m butterfly, 2017 Maccabiah Games',
      worksFor: { '@id': id.business },
    },
  ];
}

function course(slug: TrackSlug, locale: Locale, siteUrl: URL) {
  const copy = getCopy(locale).tracks[slug];
  return {
    '@type': 'Course',
    name: copy.name,
    description: copy.pitch,
    url: new URL(localizePath(`/tracks/${slug}/`, locale), siteUrl).href,
    inLanguage: locale,
    provider: { '@id': ids(siteUrl).business },
  };
}

export function homeJsonLd(locale: Locale, siteUrl: URL) {
  return {
    '@context': 'https://schema.org',
    '@graph': [...business(locale, siteUrl), ...tracks.map((track) => course(track.slug, locale, siteUrl))],
  };
}

export function trackJsonLd(slug: TrackSlug, locale: Locale, siteUrl: URL) {
  const t = getCopy(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...business(locale, siteUrl),
      course(slug, locale, siteUrl),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: site.brand, item: new URL(localizePath('/', locale), siteUrl).href },
          {
            '@type': 'ListItem',
            position: 2,
            name: t.tracks[slug].name,
            item: new URL(localizePath(`/tracks/${slug}/`, locale), siteUrl).href,
          },
        ],
      },
    ],
  };
}
