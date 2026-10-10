/**
 * Generates the social preview images (what WhatsApp shows when a link is
 * shared) and the PNG app icons:
 *   public/og/og-he.png, public/og/og-en.png  (1200×630, rendered by headless Chrome)
 *   public/favicon-32.png, public/apple-touch-icon.png  (from public/favicon.svg)
 *
 * Fonts are embedded from node_modules, so this works offline.
 * Run: npm run og        (set CHROME_PATH if Chrome/Edge is not found)
 *
 * The card text below mirrors src/i18n — update both if the hero copy changes.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

const cards = {
  he: {
    dir: 'rtl',
    line1: 'לשחות עם',
    line2: 'אלופה',
    size: 236,
    foot: 'קטרין שפיר · אלופת ישראל · בריכת גבעת אלה',
  },
  en: {
    dir: 'ltr',
    line1: 'Swim with',
    line2: 'a champion',
    size: 212,
    foot: 'Katrin Shafir · Israeli champion · Givat Ela pool',
  },
};

const chrome =
  process.env.CHROME_PATH ??
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].find((path) => existsSync(path));

const base64 = (path) => readFileSync(join(root, path)).toString('base64');
const font = (pkg, file) => base64(`node_modules/${pkg}/files/${file}`);

const fontFaces = `
  @font-face { font-family: Display; font-weight: 700; src: url(data:font/woff2;base64,${font('@fontsource/karantina', 'karantina-hebrew-700-normal.woff2')}) format('woff2'); unicode-range: U+0590-05FF, U+FB1D-FB4F; }
  @font-face { font-family: Display; font-weight: 700; src: url(data:font/woff2;base64,${font('@fontsource/karantina', 'karantina-latin-700-normal.woff2')}) format('woff2'); unicode-range: U+0000-00FF, U+2000-206F; }
  @font-face { font-family: Body; font-weight: 200 800; src: url(data:font/woff2;base64,${font('@fontsource-variable/assistant', 'assistant-hebrew-wght-normal.woff2')}) format('woff2'); unicode-range: U+0590-05FF, U+FB1D-FB4F; }
  @font-face { font-family: Body; font-weight: 200 800; src: url(data:font/woff2;base64,${font('@fontsource-variable/assistant', 'assistant-latin-wght-normal.woff2')}) format('woff2'); unicode-range: U+0000-00FF, U+2000-206F; }
`;
const caustics = `url(data:image/svg+xml;base64,${base64('src/assets/art/caustics.svg')})`;

// The main logo (src/assets/logos/logo-main.*), if present, goes on the cards and the iPhone icon.
const mainLogo = ['png', 'webp', 'svg', 'jpg']
  .map((ext) => join(root, `src/assets/logos/logo-main.${ext}`))
  .find((path) => existsSync(path));
const logoUri = mainLogo
  ? `data:image/png;base64,${(await sharp(mainLogo).resize(360, 360, { fit: 'inside' }).png().toBuffer()).toString('base64')}`
  : null;

function cardHtml(lang, card) {
  return `<!doctype html><html lang="${lang}" dir="${card.dir}"><head><meta charset="utf-8"><style>
  ${fontFaces}
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #f4f8f9; }
  .card { position: relative; isolation: isolate; width: 1200px; height: 630px; overflow: hidden; font-family: Body, sans-serif; }
  h1 { position: absolute; inset-inline-start: 72px; top: 34px; margin: 0; color: #0b2230; font: 700 ${card.size}px/0.8 Display, sans-serif; }
  .line { display: block; }
  .waterline { --wl: 58%; position: relative; display: inline-block; }
  .water { position: absolute; top: var(--wl); inset-inline: -3000px; height: 1200px; z-index: -1;
    background: linear-gradient(180deg, #1497b5 0, #0f7d9b 32px, #0a5872 144px, #08384a 520px); }
  .water::before, .water::after { content: ""; position: absolute; inset: 0; background: #fff;
    -webkit-mask: ${caustics} 0 0 / 352px; mask: ${caustics} 0 0 / 352px; opacity: .2; }
  .water::after { -webkit-mask-size: 544px; mask-size: 544px; -webkit-mask-position: 140px 60px; mask-position: 140px 60px; opacity: .1; }
  .surface { position: absolute; top: -1px; inset-inline: 0; height: 3px; background: #fff; box-shadow: 0 0 18px 3px rgb(255 255 255 / .45); }
  .dry { display: block; clip-path: inset(-0.4em -0.3em calc(100% - var(--wl)) -0.3em); }
  .waterline::after { content: attr(data-text); position: absolute; inset: 0; color: rgb(255 255 255 / .94);
    clip-path: inset(var(--wl) -0.3em -0.4em -0.3em); transform: translateX(0.035em) scaleY(1.07); transform-origin: 50% var(--wl); }
  .foot { position: absolute; inset-inline: 72px; bottom: 48px; display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; color: #fff; }
  .meta { font: 600 30px/1.3 Body, sans-serif; }
  .brand { font: 700 70px/0.9 Display, sans-serif; letter-spacing: .08em; }
  .logo { position: absolute; top: 46px; inset-inline-end: 72px; width: 196px; height: 196px; display: grid; place-items: center;
    border-radius: 30px; background: #fff; box-shadow: 0 24px 48px -26px rgb(11 34 48 / .5); }
  .logo img { width: 86%; height: 86%; object-fit: contain; }
</style></head><body><div class="card">
  <h1><span class="line">${card.line1}</span><span class="waterline" data-text="${card.line2}"><span class="water"><span class="surface"></span></span><span class="dry">${card.line2}</span></span></h1>
  ${logoUri ? `<div class="logo"><img src="${logoUri}" alt=""></div>` : ''}
  <div class="foot"><span class="meta">${card.foot}</span>${logoUri ? '' : '<span class="brand" dir="ltr">KAYA SWIM</span>'}</div>
</div></body></html>`;
}

async function makeOgImages() {
  if (!chrome) {
    console.warn('Chrome/Edge not found — set CHROME_PATH to generate the OG images.');
    return;
  }
  const outDir = join(publicDir, 'og');
  mkdirSync(outDir, { recursive: true });
  const work = mkdtempSync(join(tmpdir(), 'kaya-og-'));
  try {
    for (const [lang, card] of Object.entries(cards)) {
      const html = join(work, `og-${lang}.html`);
      const out = join(outDir, `og-${lang}.png`);
      writeFileSync(html, cardHtml(lang, card));
      execFileSync(
        chrome,
        [
          '--headless=new',
          '--disable-gpu',
          '--hide-scrollbars',
          '--force-device-scale-factor=1',
          '--window-size=1200,630',
          '--virtual-time-budget=4000',
          `--user-data-dir=${join(work, 'profile')}`,
          `--screenshot=${out}`,
          pathToFileURL(html).href,
        ],
        { stdio: 'ignore' },
      );
      // Recompress: smaller files load faster in WhatsApp previews.
      const png = await sharp(out).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();
      writeFileSync(out, png);
      console.log(`og-${lang}.png ✓ (${(png.length / 1024).toFixed(0)} KB)`);
    }
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

async function makeIcons() {
  const svg = readFileSync(join(publicDir, 'favicon.svg'), 'utf8');
  await sharp(Buffer.from(svg)).resize(32, 32).png().toFile(join(publicDir, 'favicon-32.png'));
  // iOS rounds the corners itself and fills transparency with black, so use an opaque square:
  // the main logo on white when there is one, otherwise the waterline mark.
  const touchIcon = mainLogo
    ? sharp(mainLogo)
        .resize(150, 150, { fit: 'contain', background: '#ffffff' })
        .extend({ top: 15, bottom: 15, left: 15, right: 15, background: '#ffffff' })
        .flatten({ background: '#ffffff' })
    : sharp(Buffer.from(svg.replace('rx="15"', 'rx="0"'))).resize(180, 180).flatten({ background: '#f4f8f9' });
  await touchIcon.png().toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('favicon-32.png ✓  apple-touch-icon.png ✓');
}

await makeIcons();
await makeOgImages();
