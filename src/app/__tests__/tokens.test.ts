import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const globalsPath = path.resolve(__dirname, '../globals.css');
const globalsContent = fs.readFileSync(globalsPath, 'utf-8');

/**
 * Extract the @theme block from globals.css.
 */
function getThemeBlock(): string {
  const match = globalsContent.match(/@theme\s*\{([\s\S]*?)\n\}/);
  if (!match) throw new Error('@theme block not found in globals.css');
  return match[1];
}

/**
 * Extract a CSS custom property value from the @theme block.
 */
function getTokenValue(token: string): string | null {
  const theme = getThemeBlock();
  const regex = new RegExp(`${token}\\s*:\\s*([^;]+);`);
  const match = theme.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * Extract the hue angle from an oklch() value.
 */
function extractHue(oklchValue: string): number | null {
  const match = oklchValue.match(/oklch\(\s*[\d.]+\s+[\d.]+\s+([\d.]+)\s*\)/);
  return match ? parseFloat(match[1]) : null;
}

describe('Design Token System', () => {
  describe('Surface elevation tokens exist with OKLCH values', () => {
    const surfaceTokens = [
      '--color-bg',
      '--color-sunken',
      '--color-surface',
      '--color-surface-raised',
      '--color-overlay',
    ];

    for (const token of surfaceTokens) {
      it(`${token} exists with oklch value`, () => {
        const value = getTokenValue(token);
        expect(value).not.toBeNull();
        // Should reference a primitive that resolves to oklch
        expect(value).toMatch(/oklch\(|var\(--color-olive/);
      });
    }
  });

  describe('Surface tokens use hue angle ~85 (range 80-90)', () => {
    // These are the primitive tokens that the surface semantic tokens reference
    const primitiveTokens = [
      '--color-olive-950',
      '--color-olive-900',
      '--color-olive-800',
      '--color-olive-700',
      '--color-olive-600',
    ];

    for (const token of primitiveTokens) {
      it(`${token} has hue in range 80-90`, () => {
        const value = getTokenValue(token);
        expect(value).not.toBeNull();
        const hue = extractHue(value!);
        expect(hue).not.toBeNull();
        expect(hue!).toBeGreaterThanOrEqual(80);
        expect(hue!).toBeLessThanOrEqual(90);
      });
    }
  });

  describe('Semantic color tokens exist with OKLCH values', () => {
    const semanticTokens = [
      '--color-text',
      '--color-muted',
      '--color-accent',
      '--color-param',
    ];

    for (const token of semanticTokens) {
      it(`${token} exists`, () => {
        const value = getTokenValue(token);
        expect(value).not.toBeNull();
        // Should reference a primitive or contain oklch
        expect(value).toMatch(/oklch\(|var\(--color-/);
      });
    }
  });

  describe('Border tokens exist with OKLCH values', () => {
    const borderTokens = ['--color-border', '--color-border-subtle'];

    for (const token of borderTokens) {
      it(`${token} exists`, () => {
        const value = getTokenValue(token);
        expect(value).not.toBeNull();
        expect(value).toMatch(/oklch\(|var\(--color-/);
      });
    }
  });

  describe('Text and muted primitives use hue ~85', () => {
    it('--color-olive-100 (text primitive) has hue in range 80-90', () => {
      const value = getTokenValue('--color-olive-100');
      expect(value).not.toBeNull();
      const hue = extractHue(value!);
      expect(hue).not.toBeNull();
      expect(hue!).toBeGreaterThanOrEqual(80);
      expect(hue!).toBeLessThanOrEqual(90);
    });

    it('--color-olive-200 (muted primitive) has hue in range 80-90', () => {
      const value = getTokenValue('--color-olive-200');
      expect(value).not.toBeNull();
      const hue = extractHue(value!);
      expect(hue).not.toBeNull();
      expect(hue!).toBeGreaterThanOrEqual(80);
      expect(hue!).toBeLessThanOrEqual(90);
    });
  });

  describe('No hex color remnants in @theme', () => {
    it('does not contain old hex tokens', () => {
      const theme = getThemeBlock();
      expect(theme).not.toContain('#0a0a0a');
      expect(theme).not.toContain('#161616');
      expect(theme).not.toContain('#e8e8e8');
      expect(theme).not.toContain('#737373');
      expect(theme).not.toContain('#c8ff00');
      expect(theme).not.toContain('#a3e635');
    });
  });
});

describe('accent color audit', () => {
  it.todo('--shadow-card-hover does not contain hardcoded lime oklch(0.85 0.18 105)');

  it.todo('@keyframes pulse-glow does not contain hardcoded lime');

  it.todo('panel glow circles use var(--color-accent) not #c8ff00');
});
