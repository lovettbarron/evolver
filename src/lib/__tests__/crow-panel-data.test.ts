import { describe, test, expect } from 'vitest';
import {
  CONTROL_METADATA,
  CONTROL_POSITIONS,
  SECTION_BOUNDS,
  JACK_POSITIONS,
} from '@/lib/crow-panel-data';

const VALID_TYPES = new Set(['jack-in', 'jack-out', 'led']);

describe('crow-panel-data', () => {
  test('CONTROL_METADATA has exactly 7 entries', () => {
    expect(Object.keys(CONTROL_METADATA).length).toBe(7);
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

  test('every entry type is one of: jack-in, jack-out, led', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(VALID_TYPES.has(meta.type), `${key} has invalid type: ${meta.type}`).toBe(true);
    }
  });

  test('every jack-in and jack-out has signalType', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      if (meta.type === 'jack-in' || meta.type === 'jack-out') {
        expect(meta.signalType, `${key} jack missing signalType`).toBeTruthy();
      }
    }
  });

  test('count by type: 0 knobs, 0 switches, 2 jack-in, 4 jack-out, 1 LED', () => {
    const counts: Record<string, number> = {};
    for (const meta of Object.values(CONTROL_METADATA)) {
      counts[meta.type] = (counts[meta.type] || 0) + 1;
    }
    expect(counts['knob'] || 0).toBe(0);
    expect(counts['switch'] || 0).toBe(0);
    expect(counts['jack-in']).toBe(2);
    expect(counts['jack-out']).toBe(4);
    expect(counts['led']).toBe(1);
  });

  test('CONTROL_POSITIONS has entry for every CONTROL_METADATA key', () => {
    const metaKeys = Object.keys(CONTROL_METADATA);
    for (const key of metaKeys) {
      expect(CONTROL_POSITIONS[key], `missing position for ${key}`).toBeDefined();
    }
  });

  test('all positions within viewBox (x <= 60, y <= 380)', () => {
    for (const [key, pos] of Object.entries(CONTROL_POSITIONS)) {
      expect(pos.x, `${key} x out of bounds`).toBeLessThanOrEqual(60);
      expect(pos.y, `${key} y out of bounds`).toBeLessThanOrEqual(380);
      expect(pos.x, `${key} x negative`).toBeGreaterThanOrEqual(0);
      expect(pos.y, `${key} y negative`).toBeGreaterThanOrEqual(0);
    }
  });

  test('SECTION_BOUNDS has io section with positive dimensions', () => {
    expect(SECTION_BOUNDS['io']).toBeDefined();
    expect(SECTION_BOUNDS['io'].width).toBeGreaterThan(0);
    expect(SECTION_BOUNDS['io'].height).toBeGreaterThan(0);
  });

  test('JACK_POSITIONS derived correctly from CONTROL_POSITIONS', () => {
    const jackCount = Object.values(CONTROL_METADATA).filter(
      (m) => m.type === 'jack-in' || m.type === 'jack-out'
    ).length;
    expect(Object.keys(JACK_POSITIONS).length).toBe(jackCount);
  });

  test('contains expected specific control IDs', () => {
    expect(CONTROL_METADATA['jack-crow-in-1']).toBeDefined();
    expect(CONTROL_METADATA['jack-crow-in-2']).toBeDefined();
    expect(CONTROL_METADATA['jack-crow-out-1']).toBeDefined();
    expect(CONTROL_METADATA['jack-crow-out-4']).toBeDefined();
    expect(CONTROL_METADATA['usb-crow']).toBeDefined();
  });
});
