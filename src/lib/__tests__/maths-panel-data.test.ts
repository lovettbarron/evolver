import { describe, test, expect } from 'vitest';
import {
  CONTROL_METADATA,
  CONTROL_POSITIONS,
  SECTION_BOUNDS,
  midiToRotation,
} from '@/lib/maths-panel-data';

const VALID_TYPES = new Set(['knob', 'button', 'jack-in', 'jack-out', 'led']);
const VALID_SIGNAL_TYPES = new Set(['audio', 'cv', 'gate', 'modulation']);
const MODULE_NAMES = ['ch1', 'ch2', 'ch3', 'ch4', 'buses'];

describe('maths-panel-data', () => {
  test('CONTROL_METADATA has exactly 45 entries', () => {
    expect(Object.keys(CONTROL_METADATA).length).toBe(45);
  });

  test('every entry has non-empty id, name, module, and type fields', () => {
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

  test('every entry type is one of: knob, button, jack-in, jack-out, led', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(VALID_TYPES.has(meta.type), `${key} has invalid type: ${meta.type}`).toBe(true);
    }
  });

  test('every jack has a valid signalType', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      if (meta.type === 'jack-in' || meta.type === 'jack-out') {
        expect(meta.signalType, `${key} jack missing signalType`).toBeTruthy();
        expect(
          VALID_SIGNAL_TYPES.has(meta.signalType!),
          `${key} has invalid signalType: ${meta.signalType}`
        ).toBe(true);
      }
    }
  });

  test('every entry module is one of: ch1, ch2, ch3, ch4, buses', () => {
    const moduleSet = new Set(MODULE_NAMES);
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(moduleSet.has(meta.module), `${key} has unknown module: ${meta.module}`).toBe(true);
    }
  });

  test('SECTION_BOUNDS has entries for ch1, ch2, ch3, ch4, buses with positive dimensions', () => {
    for (const name of MODULE_NAMES) {
      expect(SECTION_BOUNDS[name], `missing SECTION_BOUNDS for ${name}`).toBeDefined();
      const bounds = SECTION_BOUNDS[name];
      expect(bounds.width, `${name} width`).toBeGreaterThan(0);
      expect(bounds.height, `${name} height`).toBeGreaterThan(0);
    }
  });

  test('midiToRotation boundary values', () => {
    expect(midiToRotation(0)).toBe(-135);
    expect(midiToRotation(127)).toBe(135);
    const mid = midiToRotation(63);
    expect(mid).toBeGreaterThan(-2);
    expect(mid).toBeLessThan(2);
  });

  test('CONTROL_POSITIONS has an entry for every key in CONTROL_METADATA', () => {
    const metaKeys = Object.keys(CONTROL_METADATA);
    const posKeys = Object.keys(CONTROL_POSITIONS);
    expect(posKeys.length).toBe(45);
    for (const key of metaKeys) {
      expect(CONTROL_POSITIONS[key], `missing position for ${key}`).toBeDefined();
    }
  });

  test('per-module counts: ch1=17, ch2=3, ch3=3, ch4=17, buses=5', () => {
    const counts: Record<string, number> = {};
    for (const meta of Object.values(CONTROL_METADATA)) {
      counts[meta.module] = (counts[meta.module] || 0) + 1;
    }
    expect(counts['ch1']).toBe(17);
    expect(counts['ch2']).toBe(3);
    expect(counts['ch3']).toBe(3);
    expect(counts['ch4']).toBe(17);
    expect(counts['buses']).toBe(5);
  });
});
