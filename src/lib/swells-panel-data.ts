/**
 * Swells Panel Control Metadata
 *
 * Maps SVG control IDs to human-readable names, module membership, control types,
 * and (for jacks) signal types. Derived from the Intellijel Swells panel photo.
 *
 * ID naming convention:
 * - Sliders:  slider-swells-{name-kebab}
 * - Knobs:    knob-swells-{name-kebab}
 * - Buttons:  button-swells-{name-kebab}
 * - Switches: switch-swells-{name-kebab}
 * - Jacks:    jack-swells-{name-kebab}
 *
 * Note: Swells uses vertical faders (type: 'slider') for its 8 main reverb
 * parameters, 3-position toggle switches (type: 'switch') for MODEL and LO-FI,
 * and alt-function controls where one physical control has primary + secondary
 * labels (activated by holding the ALT button).
 */

export interface SwellsControlMeta {
  id: string;
  name: string;
  altName?: string;    // Secondary function label (shown when ALT is held)
  module: string; // always 'swells'
  type: 'knob' | 'slider' | 'switch' | 'button' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

/**
 * Complete mapping of all SVG control IDs to metadata.
 * ~50 entries covering reverb faders, attenuverters, knobs, buttons, switches, and jacks.
 */
export const CONTROL_METADATA: Record<string, SwellsControlMeta> = {
  // ===== Reverb Parameter Faders (8 sliders) =====
  'slider-swells-pre-delay': { id: 'slider-swells-pre-delay', name: 'PREDLY', module: 'swells', type: 'slider' },
  'slider-swells-size': { id: 'slider-swells-size', name: 'SIZE', module: 'swells', type: 'slider' },
  'slider-swells-decay': { id: 'slider-swells-decay', name: 'DECAY', module: 'swells', type: 'slider' },
  'slider-swells-hi-damp': { id: 'slider-swells-hi-damp', name: 'DAMP', module: 'swells', type: 'slider' },
  'slider-swells-lo-damp': { id: 'slider-swells-lo-damp', name: 'DAMP', module: 'swells', type: 'slider' },
  'slider-swells-ebb': { id: 'slider-swells-ebb', name: 'EBB', module: 'swells', type: 'slider' },
  'slider-swells-flow': { id: 'slider-swells-flow', name: 'FLOW', module: 'swells', type: 'slider' },
  'slider-swells-eq': { id: 'slider-swells-eq', name: 'EQ', module: 'swells', type: 'slider' },

  // ===== Attenuverter knobs (8 small knobs, one per fader, with ± labels) =====
  'knob-swells-pre-delay-att': { id: 'knob-swells-pre-delay-att', name: '±', module: 'swells', type: 'knob' },
  'knob-swells-size-att': { id: 'knob-swells-size-att', name: '±', module: 'swells', type: 'knob' },
  'knob-swells-decay-att': { id: 'knob-swells-decay-att', name: '±', module: 'swells', type: 'knob' },
  'knob-swells-hi-damp-att': { id: 'knob-swells-hi-damp-att', name: '±', module: 'swells', type: 'knob' },
  'knob-swells-lo-damp-att': { id: 'knob-swells-lo-damp-att', name: '±', module: 'swells', type: 'knob' },
  'knob-swells-ebb-att': { id: 'knob-swells-ebb-att', name: '±', module: 'swells', type: 'knob' },
  'knob-swells-flow-att': { id: 'knob-swells-flow-att', name: '±', module: 'swells', type: 'knob' },
  'knob-swells-eq-att': { id: 'knob-swells-eq-att', name: '±', module: 'swells', type: 'knob' },

  // ===== Parameter LEDs (8, one per fader column, between attenuverter and slider) =====
  'led-swells-pre-delay': { id: 'led-swells-pre-delay', name: 'Pre-Delay', module: 'swells', type: 'led' },
  'led-swells-size': { id: 'led-swells-size', name: 'Size', module: 'swells', type: 'led' },
  'led-swells-decay': { id: 'led-swells-decay', name: 'Decay', module: 'swells', type: 'led' },
  'led-swells-hi-damp': { id: 'led-swells-hi-damp', name: 'Hi Damp', module: 'swells', type: 'led' },
  'led-swells-lo-damp': { id: 'led-swells-lo-damp', name: 'Lo Damp', module: 'swells', type: 'led' },
  'led-swells-ebb': { id: 'led-swells-ebb', name: 'Ebb', module: 'swells', type: 'led' },
  'led-swells-flow': { id: 'led-swells-flow', name: 'Flow', module: 'swells', type: 'led' },
  'led-swells-eq': { id: 'led-swells-eq', name: 'EQ', module: 'swells', type: 'led' },

  // ===== Level/Mix knobs (small knobs, not faders) with alt functions =====
  'knob-swells-input': { id: 'knob-swells-input', name: 'INPUT', altName: 'TRIM', module: 'swells', type: 'knob' },
  'knob-swells-mix': { id: 'knob-swells-mix', name: 'MIX', altName: '→VERB', module: 'swells', type: 'knob' },

  // ===== Swell Generator knobs (bottom row, with alt functions) =====
  'knob-swells-rise': { id: 'knob-swells-rise', name: 'RISE', altName: 'EF GAIN', module: 'swells', type: 'knob' },
  'knob-swells-fall': { id: 'knob-swells-fall', name: 'FALL', altName: '→EF', module: 'swells', type: 'knob' },
  'knob-swells-threshold': { id: 'knob-swells-threshold', name: 'THRESH', module: 'swells', type: 'knob' },
  'knob-swells-swell-mode': { id: 'knob-swells-swell-mode', name: 'SWELL', altName: 'MODE', module: 'swells', type: 'knob' },

  // ===== Buttons (with alt functions) =====
  'button-swells-swell': { id: 'button-swells-swell', name: 'SWELL', module: 'swells', type: 'button' },
  'button-swells-freeze': { id: 'button-swells-freeze', name: 'FREEZE', altName: 'TRIG', module: 'swells', type: 'button' },
  'button-swells-reverse': { id: 'button-swells-reverse', name: 'REVERSE', altName: 'DRIVE', module: 'swells', type: 'button' },
  'button-swells-burst': { id: 'button-swells-burst', name: 'BURST', altName: 'TYPE', module: 'swells', type: 'button' },
  'button-swells-alt': { id: 'button-swells-alt', name: 'ALT', module: 'swells', type: 'button' },

  // ===== Switches (3-position toggles) =====
  'switch-swells-model-xyz': { id: 'switch-swells-model-xyz', name: 'MODEL', module: 'swells', type: 'switch' },
  'switch-swells-model-123': { id: 'switch-swells-model-123', name: 'MODEL', module: 'swells', type: 'switch' },
  'switch-swells-lo-fi': { id: 'switch-swells-lo-fi', name: 'LO-FI', module: 'swells', type: 'switch' },
  'switch-swells-ef-source': { id: 'switch-swells-ef-source', name: 'EF SRC', module: 'swells', type: 'switch' },

  // ===== CV Input Jacks (7 — one per reverb fader except EQ) =====
  'jack-swells-pre-delay-cv': { id: 'jack-swells-pre-delay-cv', name: 'PREDLY', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-size-cv': { id: 'jack-swells-size-cv', name: 'SIZE', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-decay-cv': { id: 'jack-swells-decay-cv', name: 'DECAY', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-hi-damp-cv': { id: 'jack-swells-hi-damp-cv', name: 'DAMP', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-lo-damp-cv': { id: 'jack-swells-lo-damp-cv', name: 'DAMP', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-ebb-cv': { id: 'jack-swells-ebb-cv', name: 'EBB', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-flow-cv': { id: 'jack-swells-flow-cv', name: 'FLOW', module: 'swells', type: 'jack-in', signalType: 'cv' },

  // ===== Top row jacks =====
  'jack-swells-in-l': { id: 'jack-swells-in-l', name: 'IN L', module: 'swells', type: 'jack-in', signalType: 'audio' },
  'jack-swells-in-r': { id: 'jack-swells-in-r', name: 'IN R', module: 'swells', type: 'jack-in', signalType: 'audio' },
  'jack-swells-trig': { id: 'jack-swells-trig', name: 'TRIG', module: 'swells', type: 'jack-in', signalType: 'gate' },
  'jack-swells-sidechain': { id: 'jack-swells-sidechain', name: 'SC', module: 'swells', type: 'jack-in', signalType: 'audio' },
  'jack-swells-ef-in': { id: 'jack-swells-ef-in', name: 'LEVEL', module: 'swells', type: 'jack-in', signalType: 'cv' },
  'jack-swells-out-l': { id: 'jack-swells-out-l', name: 'OUT L', module: 'swells', type: 'jack-out', signalType: 'audio' },
  'jack-swells-out-r': { id: 'jack-swells-out-r', name: 'OUT R', module: 'swells', type: 'jack-out', signalType: 'audio' },

  // ===== Swell CV output =====
  'jack-swells-swell-cv': { id: 'jack-swells-swell-cv', name: 'SWELL', module: 'swells', type: 'jack-out', signalType: 'cv' },
};

// ===== Hand-placed control positions matching the physical Intellijel Swells panel =====
// ViewBox: 0 0 300 380 (20HP eurorack module, ~4:5 aspect ratio)
//
// Physical layout from reference photo (top to bottom):
//
// Title "Swells" (y ~10, centered)
// Row 1 (y ~25):       Jack row: IN L, IN R, TRIG, SC, LEVEL, SWELL btn, OUT L, OUT R
// 8 Columns (y 42-190): Each column = CV jack (y:42) → attenuverter (y:58) → LED (y:72) → slider (y:130)
// Row 5 (y ~235):      INPUT knob, MODEL switches, LO-FI switch, MIX knob
// Row 6 (y ~330):      FREEZE, REVERSE, RISE, EF SRC, THRESH, SWELL MODE, FALL, BURST, ALT

// Column x-positions (8 columns, evenly spaced across 300px):
// x: 20, 56, 92, 128, 164, 200, 236, 272

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // ===== Jack row (y: 25) — below title =====
  'jack-swells-in-l':          { x: 20, y: 25 },
  'jack-swells-in-r':          { x: 52, y: 25 },
  'jack-swells-trig':          { x: 84, y: 25 },
  'jack-swells-sidechain':     { x: 116, y: 25 },
  'jack-swells-ef-in':         { x: 148, y: 25 },
  'button-swells-swell':       { x: 192, y: 25 },
  'jack-swells-out-l':         { x: 240, y: 25 },
  'jack-swells-out-r':         { x: 272, y: 25 },

  // ===== 8 Columns: CV jack → attenuverter (tight pair) → LED → slider =====
  // CV jack + attenuverter are a tight pair (y:44, y:58), then LED (y:72), then slider (y:110)
  // Slider track is 90px, so slider spans y:65 to y:155 — LED sits just above slider top

  // Column 1: PREDLY
  'jack-swells-pre-delay-cv':  { x: 20, y: 44 },
  'knob-swells-pre-delay-att': { x: 20, y: 58 },
  'led-swells-pre-delay':      { x: 20, y: 70 },
  'slider-swells-pre-delay':   { x: 20, y: 110 },

  // Column 2: SIZE
  'jack-swells-size-cv':       { x: 56, y: 44 },
  'knob-swells-size-att':      { x: 56, y: 58 },
  'led-swells-size':           { x: 56, y: 70 },
  'slider-swells-size':        { x: 56, y: 110 },

  // Column 3: DECAY
  'jack-swells-decay-cv':      { x: 92, y: 44 },
  'knob-swells-decay-att':     { x: 92, y: 58 },
  'led-swells-decay':          { x: 92, y: 70 },
  'slider-swells-decay':       { x: 92, y: 110 },

  // Column 4: HI DAMP
  'jack-swells-hi-damp-cv':    { x: 128, y: 44 },
  'knob-swells-hi-damp-att':   { x: 128, y: 58 },
  'led-swells-hi-damp':        { x: 128, y: 70 },
  'slider-swells-hi-damp':     { x: 128, y: 110 },

  // Column 5: LO DAMP
  'jack-swells-lo-damp-cv':    { x: 164, y: 44 },
  'knob-swells-lo-damp-att':   { x: 164, y: 58 },
  'led-swells-lo-damp':        { x: 164, y: 70 },
  'slider-swells-lo-damp':     { x: 164, y: 110 },

  // Column 6: EBB
  'jack-swells-ebb-cv':        { x: 200, y: 44 },
  'knob-swells-ebb-att':       { x: 200, y: 58 },
  'led-swells-ebb':            { x: 200, y: 70 },
  'slider-swells-ebb':         { x: 200, y: 110 },

  // Column 7: FLOW
  'jack-swells-flow-cv':       { x: 236, y: 44 },
  'knob-swells-flow-att':      { x: 236, y: 58 },
  'led-swells-flow':           { x: 236, y: 70 },
  'slider-swells-flow':        { x: 236, y: 110 },

  // Column 8: EQ (Swell CV output instead of CV input)
  'jack-swells-swell-cv':      { x: 272, y: 44 },
  'knob-swells-eq-att':        { x: 272, y: 58 },
  'led-swells-eq':             { x: 272, y: 70 },
  'slider-swells-eq':          { x: 272, y: 110 },

  // ===== Row 5: Level knobs + MODEL switches + LO-FI (y: 200) =====
  'knob-swells-input':         { x: 56, y: 200 },
  'knob-swells-mix':           { x: 236, y: 200 },
  'switch-swells-model-xyz':   { x: 120, y: 198 },
  'switch-swells-model-123':   { x: 148, y: 198 },
  'switch-swells-lo-fi':       { x: 182, y: 198 },

  // ===== Row 6: Bottom controls (y: 280) =====
  'button-swells-freeze':      { x: 20, y: 285 },
  'button-swells-reverse':     { x: 55, y: 285 },
  'knob-swells-rise':          { x: 95, y: 280 },
  'switch-swells-ef-source':   { x: 133, y: 280 },
  'knob-swells-threshold':     { x: 163, y: 280 },
  'knob-swells-swell-mode':    { x: 195, y: 280 },
  'knob-swells-fall':          { x: 228, y: 280 },
  'button-swells-burst':       { x: 258, y: 285 },
  'button-swells-alt':         { x: 286, y: 285 },
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
