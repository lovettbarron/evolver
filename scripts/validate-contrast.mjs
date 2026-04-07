/**
 * WCAG AA contrast validation for OKLCH design tokens.
 * Validates all foreground/background pairings meet 4.5:1 minimum ratio.
 *
 * Usage: node scripts/validate-contrast.mjs
 */

import { parse, displayable, converter } from 'culori';

const toRgb = converter('rgb');

// === Token map: exact OKLCH values from UI-SPEC ===
export const TOKEN_MAP = {
  bg: 'oklch(0.12 0.01 85)',
  sunken: 'oklch(0.10 0.01 85)',
  surface: 'oklch(0.16 0.01 85)',
  'surface-raised': 'oklch(0.20 0.015 85)',
  overlay: 'oklch(0.24 0.015 85)',
  text: 'oklch(0.93 0.01 85)',
  muted: 'oklch(0.58 0.01 85)',
  accent: 'oklch(0.85 0.18 105)',
  param: 'oklch(0.72 0.15 120)',
};

// === 8 critical pairings from UI-SPEC ===
export const PAIRINGS = [
  { fg: 'text', bg: 'bg', purpose: 'Body text on page background' },
  { fg: 'text', bg: 'surface', purpose: 'Body text on card backgrounds' },
  { fg: 'text', bg: 'surface-raised', purpose: 'Body text on elevated cards' },
  { fg: 'muted', bg: 'bg', purpose: 'Secondary text on page background' },
  { fg: 'muted', bg: 'surface', purpose: 'Table headers on card backgrounds' },
  { fg: 'accent', bg: 'bg', purpose: 'Accent text/links on page background' },
  { fg: 'accent', bg: 'surface', purpose: 'Accent text on card backgrounds' },
  { fg: 'param', bg: 'surface', purpose: 'Code/param text on code block backgrounds' },
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

  // Gamut check
  console.log('\nGamut Check:');
  for (const name of ['accent', 'param']) {
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
