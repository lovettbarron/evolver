import { describe, test, expect } from 'vitest';
import {
  CONTROL_METADATA,
  CONTROL_POSITIONS,
  SECTION_BOUNDS,
  TWO_WAY_SWITCHES,
  JACK_POSITIONS,
  midiToRotation,
} from '@/lib/just-friends-panel-data';

const VALID_TYPES = new Set(['knob', 'switch', 'jack-in', 'jack-out', 'led']);
const VALID_SIGNAL_TYPES = new Set(['audio', 'cv', 'gate', 'modulation']);
const MODULE_NAMES = ['controls', 'triggers', 'outputs', 'io'];

describe('just-friends-panel-data', () => {
  test('CONTROL_METADATA has exactly 30 entries', () => {
    expect(Object.keys(CONTROL_METADATA).length).toBe(30);
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

  test('every entry type is one of: knob, switch, jack-in, jack-out, led', () => {
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

  test('every entry module is one of: controls, triggers, outputs, io', () => {
    const moduleSet = new Set(MODULE_NAMES);
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(moduleSet.has(meta.module), `${key} has unknown module: ${meta.module}`).toBe(true);
    }
  });

  test('count by type: 5 knobs, 2 switches, 10 jack-in, 7 jack-out, 6 LEDs', () => {
    const counts: Record<string, number> = {};
    for (const meta of Object.values(CONTROL_METADATA)) {
      counts[meta.type] = (counts[meta.type] || 0) + 1;
    }
    expect(counts['knob']).toBe(5);
    expect(counts['switch']).toBe(2);
    expect(counts['jack-in']).toBe(10);
    expect(counts['jack-out']).toBe(7);
    expect(counts['led']).toBe(6);
  });

  test('SECTION_BOUNDS has entries for controls, triggers, outputs, io with positive dimensions', () => {
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
    expect(posKeys.length).toBe(30);
    for (const key of metaKeys) {
      expect(CONTROL_POSITIONS[key], `missing position for ${key}`).toBeDefined();
    }
  });

  test('TWO_WAY_SWITCHES contains only switch-jf-sound-shape', () => {
    expect(TWO_WAY_SWITCHES.size).toBe(1);
    expect(TWO_WAY_SWITCHES.has('switch-jf-sound-shape')).toBe(true);
  });

  test('JACK_POSITIONS derived correctly from CONTROL_POSITIONS', () => {
    const jackCount = Object.values(CONTROL_METADATA).filter(
      (m) => m.type === 'jack-in' || m.type === 'jack-out'
    ).length;
    expect(Object.keys(JACK_POSITIONS).length).toBe(jackCount);
  });

  test('contains expected specific control IDs', () => {
    expect(CONTROL_METADATA['knob-jf-time']).toBeDefined();
    expect(CONTROL_METADATA['jack-jf-mix-out']).toBeDefined();
    expect(CONTROL_METADATA['led-jf-identity']).toBeDefined();
    expect(CONTROL_METADATA['jack-jf-identity-trig']).toBeDefined();
    expect(CONTROL_METADATA['switch-jf-mode']).toBeDefined();
  });
});
