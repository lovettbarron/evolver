import { describe, test, expect } from 'vitest';
import {
  CONTROL_METADATA,
  SECTION_BOUNDS,
  midiToRotation,
  midiToSliderPosition,
} from '@/lib/cascadia-panel-data';

const VALID_TYPES = new Set(['knob', 'slider', 'switch', 'jack-in', 'jack-out', 'led']);
const VALID_SIGNAL_TYPES = new Set(['audio', 'cv', 'gate', 'modulation']);
const MODULE_NAMES = [
  'midi-cv',
  'vco-a',
  'vco-b',
  'envelope-a',
  'envelope-b',
  'line-in',
  'mixer',
  'vcf',
  'wave-folder',
  'vca-a',
  'push-gate',
  'utilities',
  'lfo-xyz',
  'patchbay',
  'vca-b-lpf',
  'fx-send-return',
  'output-control',
];

describe('cascadia-panel-data', () => {
  test('CONTROL_METADATA has 179 entries', () => {
    expect(Object.keys(CONTROL_METADATA).length).toBe(179);
  });

  test('every entry has required fields as non-empty strings', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(meta.id, `${key} missing id`).toBeTruthy();
      expect(meta.id.length, `${key} id empty`).toBeGreaterThan(0);
      expect(meta.name, `${key} missing name`).toBeTruthy();
      expect(meta.name.length, `${key} name empty`).toBeGreaterThan(0);
      expect(meta.module, `${key} missing module`).toBeTruthy();
      expect(meta.module.length, `${key} module empty`).toBeGreaterThan(0);
      expect(meta.type, `${key} missing type`).toBeTruthy();
      expect(meta.type.length, `${key} type empty`).toBeGreaterThan(0);
    }
  });

  test('every entry type is valid', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(VALID_TYPES.has(meta.type), `${key} has invalid type: ${meta.type}`).toBe(true);
    }
  });

  test('every jack has signalType', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      if (meta.type.startsWith('jack-')) {
        expect(meta.signalType, `${key} jack missing signalType`).toBeTruthy();
        expect(
          VALID_SIGNAL_TYPES.has(meta.signalType!),
          `${key} has invalid signalType: ${meta.signalType}`
        ).toBe(true);
      }
    }
  });

  test('every module is a known module', () => {
    const moduleSet = new Set(MODULE_NAMES);
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(moduleSet.has(meta.module), `${key} has unknown module: ${meta.module}`).toBe(true);
    }
  });

  test('SECTION_BOUNDS has 17 entries', () => {
    expect(Object.keys(SECTION_BOUNDS).length).toBe(17);
  });

  test('all 17 module names present in SECTION_BOUNDS', () => {
    for (const name of MODULE_NAMES) {
      expect(SECTION_BOUNDS[name], `missing SECTION_BOUNDS for ${name}`).toBeDefined();
    }
  });

  test('section bounds have valid dimensions', () => {
    for (const [name, bounds] of Object.entries(SECTION_BOUNDS)) {
      expect(bounds.x, `${name} x`).toBeGreaterThan(0);
      expect(bounds.y, `${name} y`).toBeGreaterThan(0);
      expect(bounds.width, `${name} width`).toBeGreaterThan(0);
      expect(bounds.height, `${name} height`).toBeGreaterThan(0);
    }
  });

  test('midiToRotation boundary values', () => {
    expect(midiToRotation(0)).toBe(-135);
    expect(midiToRotation(127)).toBe(135);
    const noon = midiToRotation(64);
    expect(noon).toBeGreaterThan(0);
    expect(noon).toBeLessThan(2);
  });

  test('midiToSliderPosition boundary values', () => {
    expect(midiToSliderPosition(0)).toBe(0);
    expect(midiToSliderPosition(127)).toBe(1);
  });

  test('module control counts match inventory', () => {
    const counts: Record<string, number> = {};
    for (const meta of Object.values(CONTROL_METADATA)) {
      counts[meta.module] = (counts[meta.module] || 0) + 1;
    }

    expect(counts['vco-a']).toBe(17);
    expect(counts['patchbay']).toBe(18);
    expect(counts['mixer']).toBe(15);
    expect(counts['vcf']).toBe(16);
    expect(counts['midi-cv']).toBe(12);
    expect(counts['vco-b']).toBe(11);
    expect(counts['envelope-a']).toBe(14);
    expect(counts['envelope-b']).toBe(15);
    expect(counts['line-in']).toBe(2);
    expect(counts['wave-folder']).toBe(4);
    expect(counts['vca-a']).toBe(6);
    expect(counts['push-gate']).toBe(2);
    expect(counts['utilities']).toBe(17);
    expect(counts['lfo-xyz']).toBe(8);
    expect(counts['vca-b-lpf']).toBe(7);
    expect(counts['fx-send-return']).toBe(7);
    expect(counts['output-control']).toBe(8);
  });
});
