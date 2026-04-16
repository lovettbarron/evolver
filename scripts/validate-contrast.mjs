/**
 * WCAG AA contrast validation for OKLCH design tokens.
 * Validates all foreground/background pairings meet 4.5:1 minimum ratio.
 *
 * TOKEN_MAP reflects the current Phase 24 palette (olive neutrals, blue
 * Evolver cascade, steel Cascadia cascade) plus Phase 25 starter values
 * for the Octatrack orange cascade. Starter orange values are an educated
 * guess based on the Elektron panel hue (≈40°); plan 25-01 Task 1.3 will
 * iterate chroma/lightness until every octatrack-* pairing passes.
 *
 * Usage: node scripts/validate-contrast.mjs
 */

import { parse, displayable, converter } from 'culori';

const toRgb = converter('rgb');

// === Token map: exact OKLCH values from UI-SPEC ===
// Mirrors @theme primitives + cascade block overrides in src/app/globals.css.
export const TOKEN_MAP = {
  // Base olive neutrals (home / non-instrument routes)
  bg: 'oklch(0.12 0.01 85)',
  sunken: 'oklch(0.10 0.01 85)',
  surface: 'oklch(0.16 0.01 85)',
  'surface-raised': 'oklch(0.20 0.015 85)',
  overlay: 'oklch(0.24 0.015 85)',
  text: 'oklch(0.93 0.01 85)',
  muted: 'oklch(0.58 0.01 85)',

  // Neutral accent (hardware aluminum — non-instrument routes)
  accent: 'oklch(0.70 0.03 250)',
  param: 'oklch(0.78 0.02 250)',

  // Evolver blue (DSI panel Lexan)
  'evolver-bg': 'oklch(0.12 0.02 245)',
  'evolver-surface': 'oklch(0.16 0.02 245)',
  'evolver-surface-raised': 'oklch(0.20 0.02 245)',
  'evolver-accent': 'oklch(0.70 0.15 245)',
  'evolver-param': 'oklch(0.78 0.10 250)',

  // Cascadia steel (Intellijel aluminum)
  'cascadia-bg': 'oklch(0.12 0.01 250)',
  'cascadia-surface': 'oklch(0.16 0.01 250)',
  'cascadia-surface-raised': 'oklch(0.20 0.01 250)',
  'cascadia-accent': 'oklch(0.70 0.04 250)',
  'cascadia-param': 'oklch(0.78 0.03 250)',

  // Octatrack Elektron orange (Phase 25 — starting OKLCH values; iterated in plan 25-01)
  'octatrack-bg': 'oklch(0.12 0.03 40)',
  'octatrack-sunken': 'oklch(0.10 0.03 40)',
  'octatrack-surface': 'oklch(0.16 0.03 40)',
  'octatrack-surface-raised': 'oklch(0.20 0.03 40)',
  'octatrack-overlay': 'oklch(0.24 0.03 40)',
  'octatrack-accent': 'oklch(0.72 0.16 40)',
  'octatrack-param': 'oklch(0.80 0.12 42)',
};

// === Pairings — accent + param tested on every relevant surface per cascade ===
export const PAIRINGS = [
  // Base / neutral
  { fg: 'text', bg: 'bg', purpose: 'Body text on page background' },
  { fg: 'text', bg: 'surface', purpose: 'Body text on card backgrounds' },
  { fg: 'text', bg: 'surface-raised', purpose: 'Body text on elevated cards' },
  { fg: 'muted', bg: 'bg', purpose: 'Secondary text on page background' },
  { fg: 'muted', bg: 'surface', purpose: 'Table headers on card backgrounds' },
  { fg: 'accent', bg: 'bg', purpose: 'Neutral accent on page bg' },
  { fg: 'accent', bg: 'surface', purpose: 'Neutral accent on card surface' },
  { fg: 'accent', bg: 'surface-raised', purpose: 'Neutral accent on raised surface' },
  { fg: 'accent', bg: 'overlay', purpose: 'Neutral accent on overlay' },
  { fg: 'param', bg: 'surface', purpose: 'Neutral param on card surface' },

  // Evolver
  { fg: 'evolver-accent', bg: 'evolver-bg', purpose: 'Evolver accent on evolver bg' },
  { fg: 'evolver-accent', bg: 'evolver-surface', purpose: 'Evolver accent on evolver surface' },
  { fg: 'evolver-accent', bg: 'evolver-surface-raised', purpose: 'Evolver accent on evolver raised surface' },
  { fg: 'evolver-param', bg: 'evolver-surface', purpose: 'Evolver param on evolver surface' },

  // Cascadia
  { fg: 'cascadia-accent', bg: 'cascadia-bg', purpose: 'Cascadia accent on cascadia bg' },
  { fg: 'cascadia-accent', bg: 'cascadia-surface', purpose: 'Cascadia accent on cascadia surface' },
  { fg: 'cascadia-accent', bg: 'cascadia-surface-raised', purpose: 'Cascadia accent on cascadia raised surface' },
  { fg: 'cascadia-param', bg: 'cascadia-surface', purpose: 'Cascadia param on cascadia surface' },

  // Octatrack (Phase 25 — the reason this task exists)
  { fg: 'octatrack-accent', bg: 'octatrack-bg', purpose: 'Octatrack accent on octatrack bg' },
  { fg: 'octatrack-accent', bg: 'octatrack-sunken', purpose: 'Octatrack accent on octatrack sunken' },
  { fg: 'octatrack-accent', bg: 'octatrack-surface', purpose: 'Octatrack accent on octatrack surface' },
  { fg: 'octatrack-accent', bg: 'octatrack-surface-raised', purpose: 'Octatrack accent on octatrack raised surface' },
  { fg: 'octatrack-accent', bg: 'octatrack-overlay', purpose: 'Octatrack accent on octatrack overlay' },
  { fg: 'octatrack-param', bg: 'octatrack-surface', purpose: 'Octatrack param on octatrack surface' },
  { fg: 'octatrack-param', bg: 'octatrack-surface-raised', purpose: 'Octatrack param on octatrack raised surface' },
  { fg: 'text', bg: 'octatrack-bg', purpose: 'Body text on octatrack bg (cross-cascade readability)' },
  { fg: 'text', bg: 'octatrack-surface', purpose: 'Body text on octatrack surface' },
  { fg: 'muted', bg: 'octatrack-surface', purpose: 'Muted text on octatrack surface' },
];

/**
 * Convert a single sRGB channel from gamma to linear.
 */
function linearize(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Compute relative luminance from an RGB color object (0-1 range).
 */
function relativeLuminance(rgb) {
  const r = linearize(rgb.r);
  const g = linearize(rgb.g);
  const b = linearize(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Compute WCAG contrast ratio between two colors (as OKLCH strings).
 */
export function wcagContrast(color1Str, color2Str) {
  const rgb1 = toRgb(parse(color1Str));
  const rgb2 = toRgb(parse(color2Str));
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a color is displayable in sRGB gamut.
 */
export function isDisplayable(colorStr) {
  return displayable(parse(colorStr));
}

/**
 * Validate all pairings and return results.
 */
export function validateAll() {
  const results = [];
  for (const pairing of PAIRINGS) {
    const fgColor = TOKEN_MAP[pairing.fg];
    const bgColor = TOKEN_MAP[pairing.bg];
    const ratio = wcagContrast(fgColor, bgColor);
    const pass = ratio >= 4.5;
    results.push({
      fg: pairing.fg,
      bg: pairing.bg,
      purpose: pairing.purpose,
      ratio: Math.round(ratio * 100) / 100,
      pass,
    });
  }
  return results;
}

// === CLI execution ===
const isMainModule = process.argv[1] &&
  (process.argv[1].endsWith('validate-contrast.mjs') ||
   process.argv[1].endsWith('validate-contrast'));

if (isMainModule) {
  console.log('WCAG AA Contrast Validation\n');

  const results = validateAll();
  let allPass = true;

  for (const r of results) {
    const status = r.pass ? 'PASS' : 'FAIL';
    console.log(`  ${r.fg} on ${r.bg}: ${r.ratio}:1 ${status}`);
    if (!r.pass) allPass = false;
  }

  // Gamut check — iterate every *-accent and *-param token
  console.log('\nGamut Check:');
  const gamutTokens = Object.keys(TOKEN_MAP).filter(
    (name) => name === 'accent' || name === 'param' ||
              name.endsWith('-accent') || name.endsWith('-param'),
  );
  for (const name of gamutTokens) {
    const color = TOKEN_MAP[name];
    const ok = isDisplayable(color);
    console.log(`  ${name}: ${ok ? 'in sRGB gamut' : 'OUT OF sRGB GAMUT (warning)'}`);
    if (!ok) {
      console.warn(`  WARNING: ${name} (${color}) is outside sRGB gamut. Browser will clamp.`);
    }
  }

  console.log(`\n${allPass ? 'All pairings PASS' : 'Some pairings FAIL'}`);
  process.exit(allPass ? 0 : 1);
}
