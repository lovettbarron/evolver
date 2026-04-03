import { describe, test, expect } from 'vitest';
import { CONTROL_METADATA, SECTION_BOUNDS, midiToRotation, ControlMeta } from '@/lib/evolver-panel-data';

describe('evolver-panel-data', () => {
  test('CONTROL_METADATA has at least 100 entries', () => {
    expect(Object.keys(CONTROL_METADATA).length).toBeGreaterThanOrEqual(100);
  });

  test('CONTROL_METADATA has knob-filter-frequency with correct NRPN', () => {
    const meta = CONTROL_METADATA['knob-filter-frequency'];
    expect(meta).toBeTruthy();
    expect(meta.name).toBe('Filter Frequency');
    expect(meta.nrpn).toBe(20);
    expect(meta.section).toBe('filter');
    expect(meta.type).toBe('knob-large');
  });

  test('CONTROL_METADATA has switch-feedback-grunge (not knob)', () => {
    expect(CONTROL_METADATA['switch-feedback-grunge']).toBeTruthy();
    expect(CONTROL_METADATA['switch-feedback-grunge'].type).toBe('switch');
    expect(CONTROL_METADATA['knob-feedback-grunge']).toBeUndefined();
  });

  test('CONTROL_METADATA has LED entries with null NRPN', () => {
    const led = CONTROL_METADATA['led-seq-1'];
    expect(led).toBeTruthy();
    expect(led.nrpn).toBeNull();
    expect(led.type).toBe('led');
  });

  test('SECTION_BOUNDS has at least 15 sections', () => {
    expect(Object.keys(SECTION_BOUNDS).length).toBeGreaterThanOrEqual(15);
  });

  test('midiToRotation returns -135 for value 0', () => {
    expect(midiToRotation(0)).toBe(-135);
  });

  test('midiToRotation returns +135 for value 127', () => {
    expect(midiToRotation(127)).toBe(135);
  });

  test('midiToRotation returns ~0 for value 64 (noon)', () => {
    const rotation = midiToRotation(64);
    expect(rotation).toBeGreaterThan(-2);
    expect(rotation).toBeLessThan(2);
  });

  test('every CONTROL_METADATA entry has non-empty name and valid section', () => {
    for (const [id, meta] of Object.entries(CONTROL_METADATA)) {
      expect(meta.name.length).toBeGreaterThan(0);
      expect(meta.section.length).toBeGreaterThan(0);
      expect(['knob-large', 'knob-small', 'switch', 'led']).toContain(meta.type);
    }
  });
});
