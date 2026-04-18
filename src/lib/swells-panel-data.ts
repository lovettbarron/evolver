/**
 * Swells Panel Control Metadata
 *
 * Maps SVG control IDs to human-readable names, module membership, control types,
 * and (for jacks) signal types. Derived from ModularGrid and SYNTH ANATOMY
 * control inventories (~40 elements).
 *
 * ID naming convention:
 * - Sliders:  slider-swells-{name-kebab}
 * - Knobs:    knob-swells-{name-kebab}
 * - Buttons:  button-swells-{name-kebab}
 * - Switches: switch-swells-{name-kebab}
 * - Jacks:    jack-swells-{name-kebab}
 *
 * Note: Swells uses vertical faders (type: 'slider') for its main parameter
 * controls and 3-position toggle switches (type: 'switch'). This is unique
 * among the eurorack modules in the project.
 */

export interface SwellsControlMeta {
  id: string;
  name: string;
  module: string; // always 'swells'
  type: 'knob' | 'slider' | 'switch' | 'button' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

/**
 * Complete mapping of all SVG control IDs to metadata.
 * ~42 entries covering reverb faders, level faders, knobs, buttons, switches, and jacks.
 */
export const CONTROL_METADATA: Record<string, SwellsControlMeta> = {
  // ===== Reverb Parameter Faders (8 sliders) =====
  'slider-swells-pre-delay': { id: 'slider-swells-pre-delay', name: 'Pre-Delay', module: 'swells', type: 'slider' },
  'slider-swells-size': { id: 'slider-swells-size', name: 'Size', module: 'swells', type: 'slider' },
  'slider-swells-decay': { id: 'slider-swells-decay', name: 'Decay', module: 'swells', type: 'slider' },
  'slider-swells-hi-damp': { id: 'slider-swells-hi-damp', name: 'Hi Damp', module: 'swells', type: 'slider' },
  'slider-swells-lo-damp': { id: 'slider-swells-lo-damp', name: 'Lo Damp', module: 'swells', type: 'slider' },
  'slider-swells-eq': { id: 'slider-swells-eq', name: 'EQ', module: 'swells', type: 'slider' },
  'slider-swells-ebb': { id: 'slider-swells-ebb', name: 'Ebb', module: 'swells', type: 'slider' },
  'slider-swells-flow': { id: 'slider-swells-flow', name: 'Flow', module: 'swells', type: 'slider' },

  // ===== Level Faders (2 sliders) =====
  'slider-swells-input': { id: 'slider-swells-input', name: 'Input', module: 'swells', type: 'slider' },
  'slider-swells-mix': { id: 'slider-swells-mix', name: 'Mix', module: 'swells', type: 'slider' },

  // ===== Knobs (7) =====
  'knob-swells-drive': { id: 'knob-swells-drive', name: 'Drive', module: 'swells', type: 'knob' },
  'knob-swells-trim': { id: 'knob-swells-trim', name: 'Trim', module: 'swells', type: 'knob' },
  'knob-swells-rise': { id: 'knob-swells-rise', name: 'Rise', module: 'swells', type: 'knob' },
  'knob-swells-fall': { id: 'knob-swells-fall', name: 'Fall', module: 'swells', type: 'knob' },
  'knob-swells-threshold': { id: 'knob-swells-threshold', name: 'Threshold', module: 'swells', type: 'knob' },
  'knob-swells-ef-gain': { id: 'knob-swells-ef-gain', name: 'EF Gain', module: 'swells', type: 'knob' },
  'knob-swells-ef-high-cut': { id: 'knob-swells-ef-high-cut', name: 'EF High Cut', module: 'swells', type: 'knob' },

  // ===== Buttons (6) =====
  'button-swells-swell': { id: 'button-swells-swell', name: 'Swell', module: 'swells', type: 'button' },
  'button-swells-freeze': { id: 'button-swells-freeze', name: 'Freeze', module: 'swells', type: 'button' },
  'button-swells-burst': { id: 'button-swells-burst', name: 'Burst', module: 'swells', type: 'button' },
  'button-swells-reverse': { id: 'button-swells-reverse', name: 'Reverse', module: 'swells', type: 'button' },
  'button-swells-model-up': { id: 'button-swells-model-up', name: 'Model Up', module: 'swells', type: 'button' },
  'button-swells-model-down': { id: 'button-swells-model-down', name: 'Model Down', module: 'swells', type: 'button' },

  // ===== Switches (2) =====
  'switch-swells-lo-fi': { id: 'switch-swells-lo-fi', name: 'Lo-Fi', module: 'swells', type: 'switch' },
  'switch-swells-ef-source': { id: 'switch-swells-ef-source', name: 'EF Source', module: 'swells', type: 'switch' },

  // ===== CV Input Jacks (9) =====
  'jack-swells-pre-delay-cv': { id: 'jack-swells-pre-delay-cv', name: 'Pre-Delay CV', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-size-cv': { id: 'jack-swells-size-cv', name: 'Size CV', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-decay-cv': { id: 'jack-swells-decay-cv', name: 'Decay CV', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-hi-damp-cv': { id: 'jack-swells-hi-damp-cv', name: 'Hi Damp CV', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-lo-damp-cv': { id: 'jack-swells-lo-damp-cv', name: 'Lo Damp CV', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-ebb-cv': { id: 'jack-swells-ebb-cv', name: 'Ebb CV', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-flow-cv': { id: 'jack-swells-flow-cv', name: 'Flow CV', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-trig': { id: 'jack-swells-trig', name: 'Trig', module: 'swells', type: 'jack-in', signalType: 'gate' },
  'jack-swells-ef-in': { id: 'jack-swells-ef-in', name: 'EF In', module: 'swells', type: 'jack-in', signalType: 'cv' },

  // ===== Audio I/O (5 jacks) =====
  'jack-swells-in-l': { id: 'jack-swells-in-l', name: 'In L', module: 'swells', type: 'jack-in', signalType: 'audio' },
  'jack-swells-in-r': { id: 'jack-swells-in-r', name: 'In R', module: 'swells', type: 'jack-in', signalType: 'audio' },
  'jack-swells-sidechain': { id: 'jack-swells-sidechain', name: 'Sidechain', module: 'swells', type: 'jack-in', signalType: 'audio' },
  'jack-swells-out-l': { id: 'jack-swells-out-l', name: 'L', module: 'swells', type: 'jack-out', signalType: 'audio' },
  'jack-swells-out-r': { id: 'jack-swells-out-r', name: 'R', module: 'swells', type: 'jack-out', signalType: 'audio' },

  // ===== Other Output Jacks (1) =====
  'jack-swells-swell-cv': { id: 'jack-swells-swell-cv', name: 'Swell CV', module: 'swells', type: 'jack-out', signalType: 'cv' },
};

// ===== Hand-placed control positions matching the physical Intellijel Swells panel =====
// ViewBox: 0 0 300 380 (20HP eurorack module, ~4:5 aspect ratio)
//
// Physical layout from reference photo (top to bottom):
//
// Row 1 (y ~22):       Top jack row: IN L, IN R, TRIG, SC, LEVEL, SWELL btn, OUT L, OUT R
// Row 2 (y ~48):       8 attenuverter knobs (small, with ± labels) aligned to jacks above
// Row 3 (y ~80-160):   8 vertical faders: PREDLY, SIZE, DECAY, [saw/damp], DAMP, EBB, FLOW, EQ
// Row 4 (y ~175):      Labels: PREDLY, SIZE, DECAY, DAMP, EBB, FLOW, EQ
// Row 5 (y ~200):      LEVEL knob (left), MODEL selector, LO-FI switch, LEVEL knob (right)
// Row 6 (y ~215):      LED indicator dots (right edge)
// Row 7 (y ~260-280):  INPUT TRIM (large knob, left), center controls, MIX/VERB (large knob, right)
// Row 8 (y ~330):      Bottom buttons: FREEZE, REVERSE, RISE, EF SRC switch, THRESH, SWELL MODE, FALL, BURST, ALT
// Row 9 (y ~360):      Brand: "intellijel"

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // ===== Top jack row (y: 22) — IN L, IN R, TRIG, SC, LEVEL, SWELL, OUT L, OUT R =====
  'jack-swells-in-l':         { x: 22, y: 22 },
  'jack-swells-in-r':         { x: 56, y: 22 },
  'jack-swells-trig':         { x: 90, y: 22 },
  'jack-swells-sidechain':    { x: 124, y: 22 },
  'jack-swells-ef-in':        { x: 158, y: 22 },
  'button-swells-swell':      { x: 192, y: 22 },
  'jack-swells-out-l':        { x: 237, y: 22 },
  'jack-swells-out-r':        { x: 271, y: 22 },

  // ===== Attenuverter knobs row (y: 48) — small knobs below each top jack =====
  'jack-swells-pre-delay-cv': { x: 22, y: 48 },
  'jack-swells-size-cv':      { x: 56, y: 48 },
  'jack-swells-decay-cv':     { x: 90, y: 48 },
  'jack-swells-hi-damp-cv':   { x: 124, y: 48 },
  'jack-swells-lo-damp-cv':   { x: 158, y: 48 },
  'jack-swells-ebb-cv':       { x: 192, y: 48 },
  'jack-swells-flow-cv':      { x: 226, y: 48 },
  'jack-swells-swell-cv':     { x: 260, y: 48 },

  // ===== 8 vertical faders (y: 120 = center of fader travel) =====
  'slider-swells-pre-delay':  { x: 22, y: 120 },
  'slider-swells-size':       { x: 56, y: 120 },
  'slider-swells-decay':      { x: 90, y: 120 },
  'slider-swells-hi-damp':    { x: 124, y: 120 },
  'slider-swells-lo-damp':    { x: 158, y: 120 },
  'slider-swells-ebb':        { x: 192, y: 120 },
  'slider-swells-flow':       { x: 226, y: 120 },
  'slider-swells-eq':         { x: 260, y: 120 },

  // ===== Level faders (y: 210) — left and right of center controls =====
  'slider-swells-input':      { x: 55, y: 210 },
  'slider-swells-mix':        { x: 260, y: 210 },

  // ===== Model/Lo-Fi controls (y: 235, center) =====
  'button-swells-model-up':   { x: 120, y: 228 },
  'button-swells-model-down': { x: 140, y: 242 },
  'switch-swells-lo-fi':      { x: 175, y: 235 },

  // ===== Large knobs — INPUT TRIM (left) and MIX/VERB (right) =====
  'knob-swells-trim':         { x: 25, y: 290 },
  'knob-swells-drive':        { x: 275, y: 290 },

  // ===== Bottom controls row (y: 330) =====
  'button-swells-freeze':     { x: 18, y: 330 },
  'button-swells-reverse':    { x: 52, y: 330 },
  'knob-swells-rise':         { x: 95, y: 330 },
  'switch-swells-ef-source':  { x: 140, y: 330 },
  'knob-swells-threshold':    { x: 170, y: 330 },
  'knob-swells-ef-gain':      { x: 205, y: 330 },
  'knob-swells-fall':         { x: 235, y: 330 },
  'button-swells-burst':      { x: 265, y: 330 },
  'knob-swells-ef-high-cut':  { x: 290, y: 330 },
};

// ===== Section bounds for zoom and tint calculations =====

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'swells': { x: 0, y: 0, width: 300, height: 380 },
};

/**
 * Convert a MIDI value (0-127) to knob rotation in degrees.
 * 0 = -135deg (fully CCW), 127 = +135deg (fully CW), ~63 = 0deg (noon).
 */
export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}

/**
 * Convert a MIDI value (0-127) to slider position (0 to 1).
 * 0 = bottom of fader travel, 1 = top of fader travel.
 */
export function midiToSliderPosition(value: number): number {
  return value / 127;
}
