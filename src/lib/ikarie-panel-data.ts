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

// ===== Placeholder control positions -- hand-place from Ikarie manual p.7 annotated panel diagram =====
// ViewBox: 0 0 170 380 (8HP eurorack module)
//
// Approximate layout (to be refined with manual PDF):
//
// Top (y ~30-50):     INPUT knob
// Row 1 (y ~80-120):  CUTOFF (large knob, center), RESONANCE fader (right)
// Row 2 (y ~140-180): MOD knob, STEREO knob, PAN/SPREAD switch
// Row 3 (y ~200-230): FOLLOW SPEED switch
// Bottom (y ~260-350): Input/output jacks, CV jacks

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // ===== Knobs =====
  'knob-ikarie-input':    { x: 42, y: 50 },
  'knob-ikarie-cutoff':   { x: 60, y: 110 },
  'knob-ikarie-mod':      { x: 42, y: 170 },
  'knob-ikarie-stereo':   { x: 110, y: 170 },

  // ===== Fader =====
  'slider-ikarie-resonance': { x: 130, y: 80 },

  // ===== Switches =====
  'switch-ikarie-pan-spread':   { x: 130, y: 170 },
  'switch-ikarie-follow-speed': { x: 85, y: 220 },

  // ===== Audio Input Jacks =====
  'jack-ikarie-l-in':  { x: 25, y: 270 },
  'jack-ikarie-r-in':  { x: 55, y: 270 },

  // ===== CV Input Jacks =====
  'jack-ikarie-v-oct':      { x: 85, y: 270 },
  'jack-ikarie-mod-in':     { x: 115, y: 270 },
  'jack-ikarie-vca-cv':     { x: 145, y: 270 },
  'jack-ikarie-stereo-cv':  { x: 25, y: 310 },
  'jack-ikarie-res-cv':     { x: 55, y: 310 },

  // ===== Output Jacks =====
  'jack-ikarie-l-out':   { x: 25, y: 350 },
  'jack-ikarie-r-out':   { x: 55, y: 350 },
  'jack-ikarie-beyond':  { x: 100, y: 350 },
  'jack-ikarie-follow':  { x: 145, y: 350 },
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
