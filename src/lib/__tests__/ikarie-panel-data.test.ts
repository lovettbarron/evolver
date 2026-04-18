import { describe, test, expect } from 'vitest';
import {
  CONTROL_METADATA,
  CONTROL_POSITIONS,
  SECTION_BOUNDS,
  midiToRotation,
  midiToSliderPosition,
} from '@/lib/ikarie-panel-data';

const VALID_TYPES = new Set(['knob', 'slider', 'switch', 'jack-in', 'jack-out']);
const VALID_SIGNAL_TYPES = new Set(['audio', 'cv', 'gate', 'modulation']);

describe('ikarie-panel-data', () => {
  test('CONTROL_METADATA has at least 17 entries', () => {
    expect(Object.keys(CONTROL_METADATA).length).toBeGreaterThanOrEqual(17);
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

  test('every entry type is one of: knob, slider, switch, jack-in, jack-out', () => {
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

  test('all modules are "ikarie"', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(meta.module, `${key} has wrong module: ${meta.module}`).toBe('ikarie');
    }
  });

  test('SECTION_BOUNDS has entry for ikarie with positive dimensions', () => {
    expect(SECTION_BOUNDS['ikarie']).toBeDefined();
    const bounds = SECTION_BOUNDS['ikarie'];
    expect(bounds.width).toBeGreaterThan(0);
    expect(bounds.height).toBeGreaterThan(0);
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
    for (const key of metaKeys) {
      expect(CONTROL_POSITIONS[key], `missing position for ${key}`).toBeDefined();
    }
  });

  test('contains expected control types: knobs, slider, switches, jacks', () => {
    const types = new Set(Object.values(CONTROL_METADATA).map((m) => m.type));
    expect(types.has('knob')).toBe(true);
    expect(types.has('slider')).toBe(true);
    expect(types.has('switch')).toBe(true);
    expect(types.has('jack-in')).toBe(true);
    expect(types.has('jack-out')).toBe(true);
  });

  test('contains key controls by ID', () => {
    expect(CONTROL_METADATA['knob-ikarie-cutoff']).toBeDefined();
    expect(CONTROL_METADATA['slider-ikarie-resonance']).toBeDefined();
    expect(CONTROL_METADATA['switch-ikarie-follow-speed']).toBeDefined();
    expect(CONTROL_METADATA['switch-ikarie-pan-spread']).toBeDefined();
    expect(CONTROL_METADATA['jack-ikarie-follow']).toBeDefined();
    expect(CONTROL_METADATA['jack-ikarie-beyond']).toBeDefined();
    expect(CONTROL_METADATA['jack-ikarie-mod-in']).toBeDefined();
    expect(CONTROL_METADATA['jack-ikarie-l-in']).toBeDefined();
  });

  test('midiToSliderPosition boundary values', () => {
    expect(midiToSliderPosition(0)).toBe(0);
    expect(midiToSliderPosition(127)).toBe(1);
    const mid = midiToSliderPosition(64);
    expect(mid).toBeGreaterThan(0.4);
    expect(mid).toBeLessThan(0.6);
  });
});
