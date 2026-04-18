/**
 * Just Friends Panel Control Metadata
 *
 * Maps SVG control IDs to human-readable names, module membership, control types,
 * and (for jacks) signal types. Derived from the verified Mannequins Just Friends
 * control inventory (30 elements across 4 module groups).
 *
 * ID naming convention:
 * - Knobs:    knob-jf-{name-kebab}
 * - Switches: switch-jf-{name-kebab}
 * - Jacks:    jack-jf-{name-kebab}
 * - LEDs:     led-jf-{name-kebab}
 */

export interface JustFriendsControlMeta {
  id: string;
  name: string;
  module: string; // 'controls' | 'triggers' | 'outputs' | 'io'
  type: 'knob' | 'switch' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

/**
 * Complete mapping of all SVG control IDs to metadata.
 * 30 entries across 4 module groups.
 *
 * Controls (7): 5 knobs + 2 switches
 * Triggers (6): 6 trigger gate inputs
 * Outputs (7): 6 channel outputs + MIX
 * IO (10): 4 CV inputs + 6 LEDs
 */
export const CONTROL_METADATA: Record<string, JustFriendsControlMeta> = {
  // ===== Controls: Knobs (5) =====
  'knob-jf-time': { id: 'knob-jf-time', name: 'TIME', module: 'controls', type: 'knob' },
  'knob-jf-intone': { id: 'knob-jf-intone', name: 'INTONE', module: 'controls', type: 'knob' },
  'knob-jf-curve': { id: 'knob-jf-curve', name: 'CURVE', module: 'controls', type: 'knob' },
  'knob-jf-ramp': { id: 'knob-jf-ramp', name: 'RAMP', module: 'controls', type: 'knob' },
  'knob-jf-fm': { id: 'knob-jf-fm', name: 'FM', module: 'controls', type: 'knob' },

  // ===== Controls: Switches (2) =====
  'switch-jf-sound-shape': { id: 'switch-jf-sound-shape', name: 'SOUND/SHAPE', module: 'controls', type: 'switch' },
  'switch-jf-mode': { id: 'switch-jf-mode', name: 'MODE', module: 'controls', type: 'switch' },

  // ===== Trigger Inputs (6) — gate signals =====
  'jack-jf-identity-trig': { id: 'jack-jf-identity-trig', name: 'IDENTITY', module: 'triggers', type: 'jack-in', signalType: 'gate' },
  'jack-jf-2n-trig': { id: 'jack-jf-2n-trig', name: '2N', module: 'triggers', type: 'jack-in', signalType: 'gate' },
  'jack-jf-3n-trig': { id: 'jack-jf-3n-trig', name: '3N', module: 'triggers', type: 'jack-in', signalType: 'gate' },
  'jack-jf-4n-trig': { id: 'jack-jf-4n-trig', name: '4N', module: 'triggers', type: 'jack-in', signalType: 'gate' },
  'jack-jf-5n-trig': { id: 'jack-jf-5n-trig', name: '5N', module: 'triggers', type: 'jack-in', signalType: 'gate' },
  'jack-jf-6n-trig': { id: 'jack-jf-6n-trig', name: '6N', module: 'triggers', type: 'jack-in', signalType: 'gate' },

  // ===== CV Inputs (4) =====
  'jack-jf-time-in': { id: 'jack-jf-time-in', name: 'V/8 TIME', module: 'io', type: 'jack-in', signalType: 'cv' },
  'jack-jf-intone-in': { id: 'jack-jf-intone-in', name: 'INTONE', module: 'io', type: 'jack-in', signalType: 'cv' },
  'jack-jf-fm-in': { id: 'jack-jf-fm-in', name: 'FM', module: 'io', type: 'jack-in', signalType: 'cv' },
  'jack-jf-run-in': { id: 'jack-jf-run-in', name: 'RUN', module: 'io', type: 'jack-in', signalType: 'cv' },

  // ===== Channel Outputs (7) =====
  'jack-jf-identity-out': { id: 'jack-jf-identity-out', name: 'IDENTITY', module: 'outputs', type: 'jack-out', signalType: 'cv' },
  'jack-jf-2n-out': { id: 'jack-jf-2n-out', name: '2N', module: 'outputs', type: 'jack-out', signalType: 'cv' },
  'jack-jf-3n-out': { id: 'jack-jf-3n-out', name: '3N', module: 'outputs', type: 'jack-out', signalType: 'cv' },
  'jack-jf-4n-out': { id: 'jack-jf-4n-out', name: '4N', module: 'outputs', type: 'jack-out', signalType: 'cv' },
  'jack-jf-5n-out': { id: 'jack-jf-5n-out', name: '5N', module: 'outputs', type: 'jack-out', signalType: 'cv' },
  'jack-jf-6n-out': { id: 'jack-jf-6n-out', name: '6N', module: 'outputs', type: 'jack-out', signalType: 'cv' },
  'jack-jf-mix-out': { id: 'jack-jf-mix-out', name: 'MIX', module: 'outputs', type: 'jack-out', signalType: 'cv' },

  // ===== LEDs (6) =====
  'led-jf-identity': { id: 'led-jf-identity', name: 'IDENTITY LED', module: 'io', type: 'led' },
  'led-jf-2n': { id: 'led-jf-2n', name: '2N LED', module: 'io', type: 'led' },
  'led-jf-3n': { id: 'led-jf-3n', name: '3N LED', module: 'io', type: 'led' },
  'led-jf-4n': { id: 'led-jf-4n', name: '4N LED', module: 'io', type: 'led' },
  'led-jf-5n': { id: 'led-jf-5n', name: '5N LED', module: 'io', type: 'led' },
  'led-jf-6n': { id: 'led-jf-6n', name: '6N LED', module: 'io', type: 'led' },
};

// ===== Hand-placed control positions matching the physical Mannequins Just Friends panel =====
// ViewBox: 0 0 210 380 (14HP eurorack module)
//
// Layout from the physical panel photo (top to bottom):
//
// Row 1 (y ~15):      "JUST FRIENDS" title
// Row 2 (y ~55-90):   INTONE knob (left), TIME knob (right, large)
// Row 3 (y ~135-160): RAMP knob (left), FM knob (center), CURVE knob (right)
// Row 4 (y ~195-210): MODE 3-way switch (far left), SOUND/SHAPE 2-way switch (center-left)
// Row 5 (y ~240-250): CV input jacks: RUN, RAMP, FM, V/8 TIME, INTONE, CURVE + MIX output
// Row 6 (y ~285-295): TRIGGERS label, 6 trigger input jacks + LEDs
// Row 7 (y ~335-345): 6 channel output jacks (IDENTITY through 6N)
// Row 8 (y ~370):     MANNEQUINS brand

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // ===== Upper knobs row 1: INTONE (left) and TIME (right) =====
  'knob-jf-intone':        { x: 58, y: 68 },
  'knob-jf-time':          { x: 165, y: 58 },

  // ===== Upper knobs row 2: RAMP (left), FM (center), CURVE (right) =====
  'knob-jf-ramp':          { x: 42, y: 148 },
  'knob-jf-fm':            { x: 110, y: 148 },
  'knob-jf-curve':         { x: 178, y: 148 },

  // ===== Switches: MODE (far left), SOUND/SHAPE (center-left) =====
  'switch-jf-mode':        { x: 22, y: 208 },
  'switch-jf-sound-shape': { x: 78, y: 208 },

  // ===== CV input row (y: 248) — left to right: RUN, RAMP, FM, V/8 TIME =====
  'jack-jf-run-in':        { x: 18, y: 248 },
  'jack-jf-fm-in':         { x: 78, y: 248 },
  'jack-jf-time-in':       { x: 108, y: 248 },
  'jack-jf-intone-in':     { x: 138, y: 248 },

  // ===== MIX output (top-right of jack area, distinctive dark background) =====
  'jack-jf-mix-out':       { x: 190, y: 248 },

  // ===== Trigger input row (y: 295) — 6 jacks across =====
  'jack-jf-identity-trig': { x: 18, y: 295 },
  'jack-jf-2n-trig':       { x: 50, y: 295 },
  'jack-jf-3n-trig':       { x: 82, y: 295 },
  'jack-jf-4n-trig':       { x: 114, y: 295 },
  'jack-jf-5n-trig':       { x: 146, y: 295 },
  'jack-jf-6n-trig':       { x: 178, y: 295 },

  // ===== LEDs — above trigger jacks (y: 278) =====
  'led-jf-identity':       { x: 18, y: 278 },
  'led-jf-2n':             { x: 50, y: 278 },
  'led-jf-3n':             { x: 82, y: 278 },
  'led-jf-4n':             { x: 114, y: 278 },
  'led-jf-5n':             { x: 146, y: 278 },
  'led-jf-6n':             { x: 178, y: 278 },

  // ===== Output row (y: 345) — 6 channel outputs across =====
  'jack-jf-identity-out':  { x: 18, y: 345 },
  'jack-jf-2n-out':        { x: 50, y: 345 },
  'jack-jf-3n-out':        { x: 82, y: 345 },
  'jack-jf-4n-out':        { x: 114, y: 345 },
  'jack-jf-5n-out':        { x: 146, y: 345 },
  'jack-jf-6n-out':        { x: 178, y: 345 },
};

// ===== Section bounds for zoom and tint calculations =====

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  controls:  { x: 5, y: 35, width: 200, height: 195 },
  triggers:  { x: 5, y: 268, width: 200, height: 40 },
  outputs:   { x: 5, y: 325, width: 200, height: 40 },
  io:        { x: 5, y: 230, width: 200, height: 35 },
};

// ===== Switch type sets =====

/** 2-way switches render as 2 circles; everything else defaults to 3-way */
export const TWO_WAY_SWITCHES = new Set(['switch-jf-sound-shape']);

// ===== Jack positions lookup (for cable rendering) =====

export const JACK_POSITIONS: Record<string, { x: number; y: number }> = {};
for (const [id, meta] of Object.entries(CONTROL_METADATA)) {
  if (meta.type === 'jack-in' || meta.type === 'jack-out') {
    const pos = CONTROL_POSITIONS[id];
    if (pos) JACK_POSITIONS[id] = pos;
  }
}

/**
 * Convert a MIDI value (0-127) to knob rotation in degrees.
 * 0 = -135deg (fully CCW), 127 = +135deg (fully CW), ~63 = 0deg (noon).
 */
export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}
