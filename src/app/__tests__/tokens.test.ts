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

/**
 * Extract the lightness (L) from an oklch() value.
 */
function extractLightness(oklchValue: string): number | null {
  const match = oklchValue.match(/oklch\(\s*([\d.]+)\s+/);
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
      it(`${token} exists and references a primitive`, () => {
        const value = getTokenValue(token);
        expect(value).not.toBeNull();
        // Should reference a primitive or contain oklch
        expect(value).toMatch(/oklch\(|var\(--color-(olive|neutral)/);
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

  describe('Accent color audit', () => {
    it('--shadow-card-hover uses oklch(from var(--color-accent)) not hardcoded lime', () => {
      const shadowLine = globalsContent
        .split('\n')
        .find((line) => line.includes('--shadow-card-hover'));
      expect(shadowLine).toBeTruthy();
      expect(shadowLine).toContain('oklch(from var(--color-accent)');
      expect(shadowLine).not.toContain('oklch(0.85 0.18 105');
    });

    it('@keyframes pulse-glow uses oklch(from var(--color-accent)) not hardcoded lime', () => {
      // Extract the pulse-glow keyframe block
      const pulseGlowMatch = globalsContent.match(
        /@keyframes pulse-glow\s*\{[\s\S]*?\n\}/
      );
      expect(pulseGlowMatch).toBeTruthy();
      const block = pulseGlowMatch![0];
      expect(block).toContain('oklch(from var(--color-accent)');
      expect(block).not.toContain('oklch(0.85 0.18 105');
    });

    it('panel glow circles do not use hardcoded #c8ff00', () => {
      const evolverPanel = fs.readFileSync(
        path.resolve(__dirname, '../../components/evolver-panel.tsx'),
        'utf-8'
      );
      const cascadiaPanel = fs.readFileSync(
        path.resolve(__dirname, '../../components/cascadia-panel.tsx'),
        'utf-8'
      );
      expect(evolverPanel).not.toContain('fill="#c8ff00"');
      expect(cascadiaPanel).not.toContain('fill="#c8ff00"');
    });
  });

  describe('Per-instrument color primitives', () => {
    const primitives: [string, number, number][] = [
      ['--color-blue-500', 240, 255],
      ['--color-blue-400', 245, 255],
      ['--color-steel-500', 245, 255],
      ['--color-steel-400', 245, 255],
      ['--color-neutral-500', 235, 255],
      ['--color-neutral-400', 235, 255],
    ];

    for (const [token, hueMin, hueMax] of primitives) {
      it(`${token} exists with oklch hue in range ${hueMin}-${hueMax}`, () => {
        const value = getTokenValue(token);
        expect(value).not.toBeNull();
        const hue = extractHue(value!);
        expect(hue).not.toBeNull();
        expect(hue!).toBeGreaterThanOrEqual(hueMin);
        expect(hue!).toBeLessThanOrEqual(hueMax);
      });
    }
  });

  describe('Per-instrument cascade overrides', () => {
    it('[data-instrument="evolver"] sets --color-accent and --color-param', () => {
      expect(globalsContent).toMatch(
        /\[data-instrument="evolver"\]\s*\{[^}]*--color-accent:\s*var\(--color-blue-500\)/
      );
      expect(globalsContent).toMatch(
        /\[data-instrument="evolver"\]\s*\{[^}]*--color-param:\s*var\(--color-blue-400\)/
      );
    });

    it('[data-instrument="cascadia"] sets --color-accent and --color-param', () => {
      expect(globalsContent).toMatch(
        /\[data-instrument="cascadia"\]\s*\{[^}]*--color-accent:\s*var\(--color-steel-500\)/
      );
      expect(globalsContent).toMatch(
        /\[data-instrument="cascadia"\]\s*\{[^}]*--color-param:\s*var\(--color-steel-400\)/
      );
    });
  });

  describe('Legacy lime/teal cleanup', () => {
    it('no --color-lime primitives remain in @theme', () => {
      const theme = getThemeBlock();
      expect(theme).not.toContain('--color-lime');
    });

    it('no --color-teal primitives remain in @theme', () => {
      const theme = getThemeBlock();
      expect(theme).not.toContain('--color-teal');
    });

    it('no --color-accent-cascadia semantic token remains', () => {
      const theme = getThemeBlock();
      expect(theme).not.toContain('--color-accent-cascadia');
    });
  });

  describe('WCAG AA contrast estimation', () => {
    const accentTokens = [
      '--color-blue-500',
      '--color-steel-500',
      '--color-neutral-500',
    ];

    for (const token of accentTokens) {
      it(`${token} lightness >= 0.65 for WCAG AA against dark bg`, () => {
        const value = getTokenValue(token);
        expect(value).not.toBeNull();
        const lightness = extractLightness(value!);
        expect(lightness).not.toBeNull();
        expect(lightness!).toBeGreaterThanOrEqual(0.65);
      });
    }

    const paramTokens = [
      '--color-blue-400',
      '--color-steel-400',
      '--color-neutral-400',
    ];

    for (const token of paramTokens) {
      it(`${token} lightness >= 0.70 for higher readability`, () => {
        const value = getTokenValue(token);
        expect(value).not.toBeNull();
        const lightness = extractLightness(value!);
        expect(lightness).not.toBeNull();
        expect(lightness!).toBeGreaterThanOrEqual(0.70);
      });
    }

    const palettePairs: [string, string][] = [
      ['--color-blue-500', '--color-blue-400'],
      ['--color-steel-500', '--color-steel-400'],
      ['--color-neutral-500', '--color-neutral-400'],
    ];

    for (const [accent, param] of palettePairs) {
      it(`${param} is lighter than ${accent} (param > accent lightness)`, () => {
        const accentValue = getTokenValue(accent);
        const paramValue = getTokenValue(param);
        expect(accentValue).not.toBeNull();
        expect(paramValue).not.toBeNull();
        const accentL = extractLightness(accentValue!);
        const paramL = extractLightness(paramValue!);
        expect(accentL).not.toBeNull();
        expect(paramL).not.toBeNull();
        expect(paramL!).toBeGreaterThan(accentL!);
      });
    }
  });
});
