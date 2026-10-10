/**
 * Generates src/assets/art/caustics.svg: a seamless, tileable "caustic light"
 * texture — the bright net of light lines on a sunlit pool floor.
 *
 * How: a periodic Voronoi diagram (sites repeated 3×3 so the tile wraps).
 * Each cell is shrunk toward its site, its edges are subdivided and bent by a
 * gentle periodic warp, then smoothed. The gaps between cells form the light
 * net: thin along edges, swelling where three cells meet, like real caustics.
 * Two nets are drawn: a wide faint "glow" and a narrow bright "core".
 *
 * Run: node scripts/make-caustics.mjs [seed]
 */
import { Delaunay } from 'd3-delaunay';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = resolve(root, 'src/assets/art/caustics.svg');

const SIZE = 480; // tile size in SVG units
const GRID = 5; // GRID × GRID cells per tile
const seed = Number(process.argv[2] ?? 11);

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(seed);

// Jittered grid keeps cells evenly sized while looking organic.
const step = SIZE / GRID;
const sites = [];
for (let i = 0; i < GRID; i++) {
  for (let j = 0; j < GRID; j++) {
    sites.push([(i + 0.1 + rand() * 0.8) * step, (j + 0.1 + rand() * 0.8) * step]);
  }
}

// Repeat the sites in a 3×3 block so the central tile is seamless.
const all = [];
for (let dx = -1; dx <= 1; dx++) {
  for (let dy = -1; dy <= 1; dy++) {
    for (const [x, y] of sites) all.push([x + dx * SIZE, y + dy * SIZE]);
  }
}

const voronoi = Delaunay.from(all).voronoi([-SIZE, -SIZE, 2 * SIZE, 2 * SIZE]);

// Periodic warp: whole-number frequencies over SIZE keep the tile seamless.
const TAU = Math.PI * 2;
const phase = Array.from({ length: 4 }, () => rand() * TAU);
const AMP = 7;
function warp([x, y]) {
  const u = x / SIZE;
  const v = y / SIZE;
  return [
    x + AMP * Math.sin(TAU * 2 * v + phase[0]) + AMP * 0.6 * Math.sin(TAU * 3 * (u + v) + phase[1]),
    y + AMP * Math.sin(TAU * 2 * u + phase[2]) + AMP * 0.6 * Math.sin(TAU * 3 * (u - v) + phase[3]),
  ];
}

const r1 = (v) => Math.round(v * 2) / 2; // half-unit precision is plenty at this scale

/** Smooth closed outline of one cell, written with relative commands to keep the file small. */
function cellPath(index, shrink) {
  const polygon = voronoi.cellPolygon(index);
  if (!polygon) return '';
  const pts = polygon.slice(0, -1);
  const pad = 16;
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  if (Math.max(...xs) < -pad || Math.min(...xs) > SIZE + pad || Math.max(...ys) < -pad || Math.min(...ys) > SIZE + pad) {
    return '';
  }

  // 1. Shrink toward the site (opens the gap that becomes the light line).
  const [sx, sy] = all[index];
  const shrunk = pts.map(([x, y]) => [sx + (x - sx) * shrink, sy + (y - sy) * shrink]);

  // 2. Subdivide edges so the warp can bend them.
  const dense = [];
  for (let i = 0; i < shrunk.length; i++) {
    const a = shrunk[i];
    const b = shrunk[(i + 1) % shrunk.length];
    const segments = Math.max(2, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / 22));
    for (let s = 0; s < segments; s++) {
      const t = s / segments;
      dense.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }

  // 3. Warp, then 4. smooth with quadratic curves through midpoints.
  const p = dense.map(warp);
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const start = mid(p[p.length - 1], p[0]);
  // Track the point actually written so rounding never accumulates.
  let cx = r1(start[0]);
  let cy = r1(start[1]);
  let d = `M${cx} ${cy}`;
  for (let j = 0; j < p.length; j++) {
    const ctrl = p[j];
    const end = mid(p[j], p[(j + 1) % p.length]);
    const ex = r1(end[0] - cx);
    const ey = r1(end[1] - cy);
    d += `q${r1(ctrl[0] - cx)} ${r1(ctrl[1] - cy)} ${ex} ${ey}`;
    cx += ex;
    cy += ey;
  }
  return `${d}z`;
}

/** The light net: the tile minus every cell outline (even-odd fill). */
function net(shrink) {
  let d = `M0 0H${SIZE}V${SIZE}H0Z`;
  for (let i = 0; i < all.length; i++) d += cellPath(i, shrink);
  return d.replace(/ -/g, '-');
}

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">` +
  `<path fill="#fff" fill-opacity=".32" fill-rule="evenodd" d="${net(0.86)}"/>` +
  `<path fill="#fff" fill-rule="evenodd" d="${net(0.945)}"/>` +
  `</svg>\n`;

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, svg);
console.log(`caustics.svg written (seed ${seed}, ${(svg.length / 1024).toFixed(1)} KB)`);
