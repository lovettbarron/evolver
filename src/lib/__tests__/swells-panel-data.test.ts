import { describe, test, expect } from 'vitest';
import {
  CONTROL_METADATA,
  CONTROL_POSITIONS,
  SECTION_BOUNDS,
  midiToRotation,
  midiToSliderPosition,
} from '@/lib/swells-panel-data';

const VALID_TYPES = new Set(['knob', 'slider', 'switch', 'button', 'jack-in', 'jack-out', 'led']);
const VALID_SIGNAL_TYPES = new Set(['audio', 'cv', 'gate', 'modulation']);

describe('swells-panel-data', () => {
  test('CONTROL_METADATA has at least 35 entries', () => {
    expect(Object.keys(CONTROL_METADATA).length).toBeGreaterThanOrEqual(35);
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

  test('every entry type is one of: knob, slider, switch, button, jack-in, jack-out, led', () => {
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

  test('all modules are "swells"', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(meta.module, `${key} has wrong module: ${meta.module}`).toBe('swells');
    }
  });

  test('SECTION_BOUNDS has entry for swells with positive dimensions', () => {
    expect(SECTION_BOUNDS['swells']).toBeDefined();
    const bounds = SECTION_BOUNDS['swells'];
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

  test('midiToSliderPosition boundary values', () => {
    expect(midiToSliderPosition(0)).toBe(0);
    expect(midiToSliderPosition(127)).toBe(1);
    const mid = midiToSliderPosition(64);
    expect(mid).toBeGreaterThan(0.4);
    expect(mid).toBeLessThan(0.6);
  });

  test('CONTROL_POSITIONS has an entry for every key in CONTROL_METADATA', () => {
    const metaKeys = Object.keys(CONTROL_METADATA);
    for (const key of metaKeys) {
      expect(CONTROL_POSITIONS[key], `missing position for ${key}`).toBeDefined();
    }
  });

  test('contains expected control types: sliders, knobs, buttons, switches, jacks', () => {
    const types = new Set(Object.values(CONTROL_METADATA).map((m) => m.type));
    expect(types.has('slider')).toBe(true);
    expect(types.has('knob')).toBe(true);
    expect(types.has('button')).toBe(true);
    expect(types.has('switch')).toBe(true);
    expect(types.has('jack-in')).toBe(true);
    expect(types.has('jack-out')).toBe(true);
  });

  test('contains key controls by ID', () => {
    expect(CONTROL_METADATA['slider-swells-decay']).toBeDefined();
    expect(CONTROL_METADATA['button-swells-freeze']).toBeDefined();
    expect(CONTROL_METADATA['jack-swells-out-l']).toBeDefined();
    expect(CONTROL_METADATA['switch-swells-lo-fi']).toBeDefined();
    expect(CONTROL_METADATA['knob-swells-rise']).toBeDefined();
    expect(CONTROL_METADATA['slider-swells-size']).toBeDefined();
    expect(CONTROL_METADATA['jack-swells-in-l']).toBeDefined();
  });
});
