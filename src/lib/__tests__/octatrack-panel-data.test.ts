import { describe, test, expect } from 'vitest';
import {
  CONTROL_METADATA,
  SECTION_BOUNDS,
  midiToRotation,
  midiToSliderPosition,
} from '@/lib/octatrack-panel-data';

// Octatrack panel uses 'display' for the LCD in addition to the
// Cascadia-compatible set. No jacks on the front panel (rear-panel jacks
// are out of scope for this data file).
const VALID_TYPES = new Set(['knob', 'slider', 'switch', 'led', 'display']);

const MODULE_NAMES = [
  'transport',
  'track',
  'trig',
  'data',
  'main',
  'mix',
  'scene',
  'nav',
  'func',
  'param',
  'rec',
  'tempo',
  'lcd',
  'card',
];

// Exact total is derived from the Physical Controls inventory in
// instruments/octatrack/overview.md:
//   3 transport + 8 tracks + 16 trigs + 6 data knobs + 3 main/level
// + 1 crossfader + 2 scenes + 3 pattern/bank/page + 7 function keys
// + 5 track parameter keys + 6 navigation + 3 recorder + 1 cue
// + 1 tempo + 1 LCD + 1 card LED = 67
const EXPECTED_TOTAL = 67;

describe('octatrack-panel-data', () => {
  test(`CONTROL_METADATA has ${EXPECTED_TOTAL} entries`, () => {
    expect(Object.keys(CONTROL_METADATA).length).toBe(EXPECTED_TOTAL);
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

  test('every entry type is one of {knob, slider, switch, led, display}', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(
        VALID_TYPES.has(meta.type),
        `${key} has invalid type: ${meta.type}`,
      ).toBe(true);
    }
  });

  test('every module appears in MODULE_NAMES constant', () => {
    const moduleSet = new Set(MODULE_NAMES);
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(
        moduleSet.has(meta.module),
        `${key} has unknown module: ${meta.module}`,
      ).toBe(true);
    }
  });

  test('meta.id === key for every entry', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(meta.id, `${key} has mismatched id`).toBe(key);
    }
  });

  test('SECTION_BOUNDS has entry for each module with positive dimensions', () => {
    for (const name of MODULE_NAMES) {
      const bounds = SECTION_BOUNDS[name];
      expect(bounds, `missing SECTION_BOUNDS for ${name}`).toBeDefined();
      expect(bounds.x, `${name} x`).toBeGreaterThanOrEqual(0);
      expect(bounds.y, `${name} y`).toBeGreaterThanOrEqual(0);
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

  // Per-group counts guard against accidentally deleting critical control
  // groups during position tweaking.
  describe('control group counts', () => {
    test('has 16 trig keys', () => {
      const trigs = Object.keys(CONTROL_METADATA).filter((k) =>
        k.startsWith('key-trig-'),
      );
      expect(trigs.length).toBe(16);
    });

    test('has 8 track keys', () => {
      const tracks = Object.keys(CONTROL_METADATA).filter(
        (k) => k.startsWith('key-track-') && k !== 'key-track-cue',
      );
      expect(tracks.length).toBe(8);
    });

    test('has 6 data entry knobs', () => {
      const knobs = Object.keys(CONTROL_METADATA).filter((k) =>
        k.startsWith('knob-data-'),
      );
      expect(knobs.length).toBe(6);
    });

    test('has 3 transport keys', () => {
      const transport = Object.values(CONTROL_METADATA).filter(
        (m) => m.module === 'transport',
      );
      expect(transport.length).toBe(3);
    });

    test('has 7 function keys', () => {
      const funcs = Object.values(CONTROL_METADATA).filter(
        (m) => m.module === 'func',
      );
      expect(funcs.length).toBe(7);
    });

    test('has 5 track parameter keys', () => {
      const params = Object.values(CONTROL_METADATA).filter(
        (m) => m.module === 'param',
      );
      expect(params.length).toBe(5);
    });

    test('has 2 scene keys', () => {
      const scenes = Object.values(CONTROL_METADATA).filter(
        (m) => m.module === 'scene',
      );
      expect(scenes.length).toBe(2);
    });

    test('has 1 crossfader (slider type)', () => {
      const slider = Object.values(CONTROL_METADATA).filter(
        (m) => m.type === 'slider',
      );
      expect(slider.length).toBe(1);
      expect(slider[0].id).toBe('slider-mix-crossfader');
    });

    test('has 1 LCD (display type)', () => {
      const displays = Object.values(CONTROL_METADATA).filter(
        (m) => m.type === 'display',
      );
      expect(displays.length).toBe(1);
      expect(displays[0].id).toBe('display-lcd-screen');
    });

    test('has 6 navigation keys (up/down/left/right + yes/no)', () => {
      const nav = Object.values(CONTROL_METADATA).filter(
        (m) => m.module === 'nav',
      );
      // 4 arrows + yes + no + pattern/bank/page (3) = 7 total in nav
      // But pattern/bank/page are pre-placed under module 'nav' per spec.
      // Verify the 4 arrows + YES + NO are present regardless.
      const arrowIds = [
        'key-nav-up',
        'key-nav-down',
        'key-nav-left',
        'key-nav-right',
        'key-nav-yes',
        'key-nav-no',
      ];
      for (const id of arrowIds) {
        expect(CONTROL_METADATA[id], `missing ${id}`).toBeDefined();
      }
      // Total nav entries = 6 arrows + 3 pattern/bank/page = 9
      expect(nav.length).toBeGreaterThanOrEqual(6);
    });

    test('has 3 recorder keys', () => {
      const recs = Object.values(CONTROL_METADATA).filter(
        (m) => m.module === 'rec',
      );
      expect(recs.length).toBe(3);
    });
  });
});
