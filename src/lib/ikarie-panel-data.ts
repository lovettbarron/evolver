/**
 * Ikarie Panel Control Metadata
 *
 * Maps SVG control IDs to human-readable names, module membership, control types,
 * and (for jacks) signal types. Derived from the Ikarie manual PDF (page 7 annotated
 * panel diagram) and verified against Bastl Instruments product photos.
 *
 * ID naming convention:
 * - Knobs:    knob-ikarie-{name-kebab}
 * - Sliders:  slider-ikarie-{name-kebab}
 * - Switches: switch-ikarie-{name-kebab}
 * - Jacks:    jack-ikarie-{name-kebab}
 *
 * Note: Ikarie uses a vertical fader (type: 'slider') for RESONANCE, a 2-position
 * toggle switch for PAN/SPREAD, and a 3-position toggle for FOLLOW SPEED.
 *
 * Key architectural feature: FOLLOW output is normalled to MOD input -- the filter
 * auto-wahs by default without any patching. Patching a cable to MOD breaks this.
 */

export interface IkarieControlMeta {
  id: string;
  name: string;
  module: string; // always 'ikarie'
  type: 'knob' | 'slider' | 'switch' | 'jack-in' | 'jack-out';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

/**
 * Complete mapping of all SVG control IDs to metadata.
 * 18 entries covering knobs, fader, switches, and jacks.
 */
export const CONTROL_METADATA: Record<string, IkarieControlMeta> = {
  // ===== Knobs (4) =====
  'knob-ikarie-cutoff': { id: 'knob-ikarie-cutoff', name: 'CUTOFF', module: 'ikarie', type: 'knob' },
  'knob-ikarie-stereo': { id: 'knob-ikarie-stereo', name: 'STEREO', module: 'ikarie', type: 'knob' },
  'knob-ikarie-mod': { id: 'knob-ikarie-mod', name: 'MOD', module: 'ikarie', type: 'knob' },
  'knob-ikarie-input': { id: 'knob-ikarie-input', name: 'INPUT', module: 'ikarie', type: 'knob' },

  // ===== Fader (1) =====
  'slider-ikarie-resonance': { id: 'slider-ikarie-resonance', name: 'RESONANCE', module: 'ikarie', type: 'slider' },

  // ===== Switches (2) =====
  'switch-ikarie-pan-spread': { id: 'switch-ikarie-pan-spread', name: 'PAN/SPREAD', module: 'ikarie', type: 'switch' },
  'switch-ikarie-follow-speed': { id: 'switch-ikarie-follow-speed', name: 'FOLLOW SPEED', module: 'ikarie', type: 'switch' },

  // ===== Audio Input Jacks (2) =====
  'jack-ikarie-l-in': { id: 'jack-ikarie-l-in', name: 'L IN', module: 'ikarie', type: 'jack-in', signalType: 'audio' },
  'jack-ikarie-r-in': { id: 'jack-ikarie-r-in', name: 'R IN', module: 'ikarie', type: 'jack-in', signalType: 'audio' },

  // ===== CV Input Jacks (5) =====
  'jack-ikarie-v-oct': { id: 'jack-ikarie-v-oct', name: 'V/OCT', module: 'ikarie', type: 'jack-in', signalType: 'cv' },
  'jack-ikarie-mod-in': { id: 'jack-ikarie-mod-in', name: 'MOD', module: 'ikarie', type: 'jack-in', signalType: 'modulation' },
  'jack-ikarie-vca-cv': { id: 'jack-ikarie-vca-cv', name: 'VCA CV', module: 'ikarie', type: 'jack-in', signalType: 'cv' },
  'jack-ikarie-stereo-cv': { id: 'jack-ikarie-stereo-cv', name: 'STEREO CV', module: 'ikarie', type: 'jack-in', signalType: 'cv' },
  'jack-ikarie-res-cv': { id: 'jack-ikarie-res-cv', name: 'RES CV', module: 'ikarie', type: 'jack-in', signalType: 'cv' },

  // ===== Audio Output Jacks (3) =====
  'jack-ikarie-l-out': { id: 'jack-ikarie-l-out', name: 'L', module: 'ikarie', type: 'jack-out', signalType: 'audio' },
  'jack-ikarie-r-out': { id: 'jack-ikarie-r-out', name: 'R', module: 'ikarie', type: 'jack-out', signalType: 'audio' },
  'jack-ikarie-beyond': { id: 'jack-ikarie-beyond', name: 'BEYOND', module: 'ikarie', type: 'jack-out', signalType: 'audio' },

  // ===== CV Output Jack (1) =====
  'jack-ikarie-follow': { id: 'jack-ikarie-follow', name: 'FOLLOW', module: 'ikarie', type: 'jack-out', signalType: 'cv' },
};

// ===== Control positions — hand-placed from Ikarie panel photo & manual =====
// ViewBox: 0 0 170 380 (8HP eurorack module)
//
// Layout (top to bottom, per physical panel):
//
// Row 1 (y ~55):    CUTOFF (large knob, center) with LP/HP labels
// Row 2 (y ~100):   STEREO knob (left) | VCA CV jack (right)
// Row 3 (y ~130):   STEREO CV jack (45° upper-left) | PAN/SPREAD switch
// Row 4 (y ~165):   RESONANCE diagonal slider (low-left → high-right)
// Row 5 (y ~200):   RES CV jack (45° below slider left end) | MOD knob (right)
// Row 6 (y ~240):   INPUT knob (left, aligned with STEREO) | FOLLOW SPEED horizontal switch (right, aligned with MOD)
// Jack row 1 (y ~285): L IN, R IN, V/OCT, MOD
// Jack row 2 (y ~325): L OUT, R OUT, BEYOND, FOLLOW

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // ===== Row 1: CUTOFF =====
  'knob-ikarie-cutoff':   { x: 85, y: 55 },

  // ===== Row 2: STEREO + VCA CV =====
  'knob-ikarie-stereo':   { x: 42, y: 100 },
  'jack-ikarie-vca-cv':   { x: 138, y: 100 },

  // ===== Row 3: STEREO CV (left column, above RES CV) + PAN/SPREAD (between STEREO CV and VCA CV, angled 45°) =====
  'jack-ikarie-stereo-cv':  { x: 48, y: 148 },
  'switch-ikarie-pan-spread': { x: 93, y: 124 },

  // ===== Row 4: RESONANCE diagonal slider (center x=109, high end at x≈138 aligns with VCA CV) =====
  'slider-ikarie-resonance': { x: 109, y: 168 },

  // ===== Row 5: RES CV (below STEREO CV, same x) + MOD =====
  'jack-ikarie-res-cv':   { x: 48, y: 200 },
  'knob-ikarie-mod':      { x: 130, y: 200 },

  // ===== Row 6: INPUT + FOLLOW SPEED (horizontal switch) =====
  'knob-ikarie-input':    { x: 42, y: 242 },
  'switch-ikarie-follow-speed': { x: 130, y: 242 },

  // ===== Jack row 1: L IN, R IN, V/OCT, MOD =====
  'jack-ikarie-l-in':    { x: 25, y: 285 },
  'jack-ikarie-r-in':    { x: 65, y: 285 },
  'jack-ikarie-v-oct':   { x: 105, y: 285 },
  'jack-ikarie-mod-in':  { x: 145, y: 285 },

  // ===== Jack row 2: L OUT, R OUT, BEYOND, FOLLOW =====
  'jack-ikarie-l-out':   { x: 25, y: 325 },
  'jack-ikarie-r-out':   { x: 65, y: 325 },
  'jack-ikarie-beyond':  { x: 105, y: 325 },
  'jack-ikarie-follow':  { x: 145, y: 325 },
};

// ===== Section bounds for zoom and tint calculations =====

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'ikarie': { x: 0, y: 0, width: 170, height: 380 },
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
