import { describe, test, expect } from 'vitest';
import {
  CONTROL_METADATA,
  CONTROL_POSITIONS,
  SECTION_BOUNDS,
  midiToRotation,
} from '@/lib/plaits-panel-data';

const VALID_TYPES = new Set(['knob', 'button', 'jack-in', 'jack-out', 'led']);
const VALID_SIGNAL_TYPES = new Set(['audio', 'cv', 'gate', 'modulation']);

describe('plaits-panel-data', () => {
  test('CONTROL_METADATA has at least 19 entries', () => {
    expect(Object.keys(CONTROL_METADATA).length).toBeGreaterThanOrEqual(19);
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

  test('every entry module is plaits', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(meta.module, `${key} has wrong module: ${meta.module}`).toBe('plaits');
    }
  });

  test('SECTION_BOUNDS has entry for plaits with positive width and height', () => {
    expect(SECTION_BOUNDS['plaits'], 'missing SECTION_BOUNDS for plaits').toBeDefined();
    const bounds = SECTION_BOUNDS['plaits'];
    expect(bounds.width, 'plaits width').toBeGreaterThan(0);
    expect(bounds.height, 'plaits height').toBeGreaterThan(0);
  });

  test('midiToRotation boundary values', () => {
    expect(midiToRotation(0)).toBe(-135);
    expect(midiToRotation(127)).toBe(135);
    const mid = midiToRotation(63);
    expect(mid).toBeGreaterThan(-2);
    expect(mid).toBeLessThan(2);
  });

  test('CONTROL_POSITIONS has an entry for every key in CONTROL_METADATA', () => {
    for (const key of Object.keys(CONTROL_METADATA)) {
      expect(CONTROL_POSITIONS[key], `missing position for ${key}`).toBeDefined();
    }
  });
});
