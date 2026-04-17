import { describe, it, expect } from 'vitest';
import {
  TOKEN_MAP,
  PAIRINGS,
  wcagContrast,
  isDisplayable,
  validateAll,
} from '../validate-contrast.mjs';

describe('validate-contrast', () => {
  describe('WCAG AA contrast pairings', () => {
    it('has all critical pairings including octatrack-specific tokens', () => {
      expect(PAIRINGS).toHaveLength(28);
    });

    it('checks text/bg pairing', () => {
      expect(PAIRINGS.some((p: any) => p.fg === 'text' && p.bg === 'bg')).toBe(true);
    });

    it('checks text/surface pairing', () => {
      expect(PAIRINGS.some((p: any) => p.fg === 'text' && p.bg === 'surface')).toBe(true);
    });

    it('checks text/surface-raised pairing', () => {
      expect(PAIRINGS.some((p: any) => p.fg === 'text' && p.bg === 'surface-raised')).toBe(true);
    });

    it('checks muted/bg pairing', () => {
      expect(PAIRINGS.some((p: any) => p.fg === 'muted' && p.bg === 'bg')).toBe(true);
    });

    it('checks muted/surface pairing', () => {
      expect(PAIRINGS.some((p: any) => p.fg === 'muted' && p.bg === 'surface')).toBe(true);
    });

    it('checks accent/bg pairing', () => {
      expect(PAIRINGS.some((p: any) => p.fg === 'accent' && p.bg === 'bg')).toBe(true);
    });

    it('checks accent/surface pairing', () => {
      expect(PAIRINGS.some((p: any) => p.fg === 'accent' && p.bg === 'surface')).toBe(true);
    });

    it('checks param/surface pairing', () => {
      expect(PAIRINGS.some((p: any) => p.fg === 'param' && p.bg === 'surface')).toBe(true);
    });
  });

  describe('all defined pairings pass AA (4.5:1)', () => {
    const results = validateAll();
    for (const r of results) {
      it(`${r.fg} on ${r.bg} passes AA (ratio: ${r.ratio}:1)`, () => {
        expect(r.ratio).toBeGreaterThanOrEqual(4.5);
        expect(r.pass).toBe(true);
      });
    }
  });

  describe('failing pairing detection', () => {
    it('correctly identifies a known-failing pairing as below 4.5:1', () => {
      // Two very similar dark colors should fail AA
      const ratio = wcagContrast('oklch(0.13 0.01 85)', 'oklch(0.12 0.01 85)');
      expect(ratio).toBeLessThan(4.5);
    });
  });

  describe('sRGB gamut check', () => {
    it('accent is sRGB displayable', () => {
      expect(isDisplayable(TOKEN_MAP.accent)).toBe(true);
    });

    it('param is sRGB displayable', () => {
      expect(isDisplayable(TOKEN_MAP.param)).toBe(true);
    });
  });
});
