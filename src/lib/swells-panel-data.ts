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

// ===== Placeholder control positions — hand-place from manual PDF when available =====
// ViewBox: 0 0 420 380 (20HP eurorack module)
//
// Approximate layout (to be refined with PDF):
//
// Top row (y ~30-40):   Model select buttons, algorithm display LEDs
// Row 1 (y ~60-170):    8 reverb parameter faders (PRE-DELAY through FLOW)
// Row 2 (y ~180-220):   INPUT/MIX faders, DRIVE/TRIM knobs, performance buttons
// Row 3 (y ~230-270):   Swell Generator knobs (RISE, FALL, THRESHOLD, EF GAIN, EF HIGH CUT)
// Row 4 (y ~280-310):   Switches (LO-FI, EF SOURCE)
// Bottom (y ~320-360):  CV input jacks, Audio I/O jacks, SWELL CV output

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // ===== Reverb Parameter Faders — top row (y: 80-150, spaced across width) =====
  'slider-swells-pre-delay': { x: 30, y: 100 },
  'slider-swells-size':      { x: 75, y: 100 },
  'slider-swells-decay':     { x: 120, y: 100 },
  'slider-swells-hi-damp':   { x: 165, y: 100 },
  'slider-swells-lo-damp':   { x: 210, y: 100 },
  'slider-swells-eq':        { x: 255, y: 100 },
  'slider-swells-ebb':       { x: 300, y: 100 },
  'slider-swells-flow':      { x: 345, y: 100 },

  // ===== Level Faders + Drive/Trim (y: 100, right side) =====
  'slider-swells-input':     { x: 30, y: 200 },
  'slider-swells-mix':       { x: 75, y: 200 },
  'knob-swells-drive':       { x: 120, y: 200 },
  'knob-swells-trim':        { x: 165, y: 200 },

  // ===== Performance Buttons (y: 200, center-right) =====
  'button-swells-swell':     { x: 220, y: 200 },
  'button-swells-freeze':    { x: 260, y: 200 },
  'button-swells-burst':     { x: 300, y: 200 },
  'button-swells-reverse':   { x: 340, y: 200 },

  // ===== Model Select Buttons (y: 35) =====
  'button-swells-model-up':  { x: 380, y: 35 },
  'button-swells-model-down': { x: 380, y: 60 },

  // ===== Swell Generator Knobs (y: 260) =====
  'knob-swells-rise':        { x: 50, y: 260 },
  'knob-swells-fall':        { x: 100, y: 260 },
  'knob-swells-threshold':   { x: 150, y: 260 },
  'knob-swells-ef-gain':     { x: 210, y: 260 },
  'knob-swells-ef-high-cut': { x: 270, y: 260 },

  // ===== Switches (y: 260, right side) =====
  'switch-swells-lo-fi':     { x: 340, y: 250 },
  'switch-swells-ef-source': { x: 390, y: 250 },

  // ===== CV Input Jacks — bottom area (y: 320) =====
  'jack-swells-pre-delay-cv': { x: 30, y: 320 },
  'jack-swells-size-cv':      { x: 65, y: 320 },
  'jack-swells-decay-cv':     { x: 100, y: 320 },
  'jack-swells-hi-damp-cv':   { x: 135, y: 320 },
  'jack-swells-lo-damp-cv':   { x: 170, y: 320 },
  'jack-swells-ebb-cv':       { x: 205, y: 320 },
  'jack-swells-flow-cv':      { x: 240, y: 320 },
  'jack-swells-trig':         { x: 275, y: 320 },
  'jack-swells-ef-in':        { x: 310, y: 320 },

  // ===== Audio I/O Jacks — bottom row (y: 355) =====
  'jack-swells-in-l':         { x: 50, y: 355 },
  'jack-swells-in-r':         { x: 90, y: 355 },
  'jack-swells-sidechain':    { x: 140, y: 355 },
  'jack-swells-out-l':        { x: 230, y: 355 },
  'jack-swells-out-r':        { x: 270, y: 355 },

  // ===== Other Output Jacks =====
  'jack-swells-swell-cv':     { x: 340, y: 355 },
};

// ===== Section bounds for zoom and tint calculations =====

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'swells': { x: 0, y: 0, width: 420, height: 380 },
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
