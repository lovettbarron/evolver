/**
 * Beads Panel Control Metadata
 *
 * Maps SVG control IDs to human-readable names, module membership, control types,
 * and (for jacks) signal types. Derived from the verified Mutable Instruments Beads
 * control inventory (28 elements).
 *
 * ID naming convention:
 * - Knobs:   knob-beads-{name-kebab}
 * - Buttons: button-beads-{name-kebab}
 * - Jacks:   jack-beads-{name-kebab}
 * - LEDs:    led-beads-{name-kebab}
 *
 * Reference: Beads Manual pp. 4-14, controls labeled A-M and jacks 1-8.
 */

export interface BeadsControlMeta {
  id: string;
  name: string;
  module: string; // always 'beads'
  type: 'knob' | 'button' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

/**
 * Complete mapping of all SVG control IDs to metadata.
 * 28 entries total:
 *   4 buttons, 4 large knobs, 4 medium knobs, 4 attenurandomizers,
 *   2 audio in, 2 audio out, 2 gate in, 6 CV in, 1 LED
 *
 * Note: The plan lists 5 CV inputs but the manual shows 6 distinct CV jacks
 * (DENSITY, TIME, SIZE, SHAPE, PITCH, ASSIGN). Adjusting to match the physical panel.
 */
export const CONTROL_METADATA: Record<string, BeadsControlMeta> = {
  // ===== Buttons (4) — controls A, B, C, M =====
  'button-beads-quality': { id: 'button-beads-quality', name: 'Quality', module: 'beads', type: 'button' },
  'button-beads-freeze': { id: 'button-beads-freeze', name: 'Freeze', module: 'beads', type: 'button' },
  'button-beads-seed': { id: 'button-beads-seed', name: 'Seed', module: 'beads', type: 'button' },
  'button-beads-cv-assign': { id: 'button-beads-cv-assign', name: 'CV Assign', module: 'beads', type: 'button' },

  // ===== Large knobs (4) — controls D, E, F, G =====
  'knob-beads-density': { id: 'knob-beads-density', name: 'Density', module: 'beads', type: 'knob' },
  'knob-beads-time': { id: 'knob-beads-time', name: 'Time', module: 'beads', type: 'knob' },
  'knob-beads-pitch': { id: 'knob-beads-pitch', name: 'Pitch', module: 'beads', type: 'knob' },
  'knob-beads-size': { id: 'knob-beads-size', name: 'Size', module: 'beads', type: 'knob' },

  // ===== SHAPE knob (visible on panel, same size as SIZE) =====
  'knob-beads-shape': { id: 'knob-beads-shape', name: 'Shape', module: 'beads', type: 'knob' },

  // ===== Mixing knobs (J, K, L) — visible physical knobs on the panel =====
  'knob-beads-feedback': { id: 'knob-beads-feedback', name: 'Feedback', module: 'beads', type: 'knob' },
  'knob-beads-dry-wet': { id: 'knob-beads-dry-wet', name: 'Dry/Wet', module: 'beads', type: 'knob' },
  'knob-beads-reverb': { id: 'knob-beads-reverb', name: 'Reverb', module: 'beads', type: 'knob' },

  // ===== Attenurandomizers (4) — control I (group of 4 small knobs) =====
  'knob-beads-time-atten': { id: 'knob-beads-time-atten', name: 'Time Att', module: 'beads', type: 'knob' },
  'knob-beads-size-atten': { id: 'knob-beads-size-atten', name: 'Size Att', module: 'beads', type: 'knob' },
  'knob-beads-shape-atten': { id: 'knob-beads-shape-atten', name: 'Shape Att', module: 'beads', type: 'knob' },
  'knob-beads-pitch-atten': { id: 'knob-beads-pitch-atten', name: 'Pitch Att', module: 'beads', type: 'knob' },

  // ===== Audio input jacks (2) — jack 1 =====
  'jack-beads-in-l': { id: 'jack-beads-in-l', name: 'In L', module: 'beads', type: 'jack-in', signalType: 'audio' },
  'jack-beads-in-r': { id: 'jack-beads-in-r', name: 'In R', module: 'beads', type: 'jack-in', signalType: 'audio' },

  // ===== Gate input jacks (2) — jacks 3, 4 =====
  'jack-beads-freeze-gate': { id: 'jack-beads-freeze-gate', name: 'Freeze', module: 'beads', type: 'jack-in', signalType: 'gate' },
  'jack-beads-seed-gate': { id: 'jack-beads-seed-gate', name: 'Seed', module: 'beads', type: 'jack-in', signalType: 'gate' },

  // ===== CV input jacks (6) — jacks 5, 6, 7 =====
  'jack-beads-density-cv': { id: 'jack-beads-density-cv', name: 'Density CV', module: 'beads', type: 'jack-in', signalType: 'cv' },
  'jack-beads-time-cv': { id: 'jack-beads-time-cv', name: 'Time CV', module: 'beads', type: 'jack-in', signalType: 'cv' },
  'jack-beads-size-cv': { id: 'jack-beads-size-cv', name: 'Size CV', module: 'beads', type: 'jack-in', signalType: 'cv' },
  'jack-beads-shape-cv': { id: 'jack-beads-shape-cv', name: 'Shape CV', module: 'beads', type: 'jack-in', signalType: 'cv' },
  'jack-beads-pitch-cv': { id: 'jack-beads-pitch-cv', name: 'Pitch CV', module: 'beads', type: 'jack-in', signalType: 'cv' },
  'jack-beads-assign-cv': { id: 'jack-beads-assign-cv', name: 'Assign CV', module: 'beads', type: 'jack-in', signalType: 'cv' },

  // ===== Audio output jacks (2) — jack 8 =====
  'jack-beads-out-l': { id: 'jack-beads-out-l', name: 'L', module: 'beads', type: 'jack-out', signalType: 'audio' },
  'jack-beads-out-r': { id: 'jack-beads-out-r', name: 'R', module: 'beads', type: 'jack-out', signalType: 'audio' },

  // ===== LED (1) — control 2 =====
  'led-beads-input-level': { id: 'led-beads-input-level', name: 'Input Level', module: 'beads', type: 'led' },
};

// ===== Hand-placed control positions matching the physical Beads panel =====
// ViewBox: 0 0 210 380 (14HP eurorack module, ~4:5 aspect ratio)
//
// Layout from reference panel photo:
//
// Top (y ~15):          "Beads" title + "texture synthesizer"
// Row 1 (y ~48):        FREEZE button (green, left) + SEED button (silver, right)
// Row 2 (y ~80):        DENSITY (large knob, center)
// Row 3 (y ~118):       Input level LED (center)
// Row 4 (y ~145):       TIME (large, left) + PITCH (large, right)
// Row 4.5 (y ~172):     Feedback knob (J, left edge)
// Row 5 (y ~188):       Quality btn (centered between knobs) + CV Assign btn (left edge, below TIME)
// Row 6 (y ~200):       SIZE (large, center-left) + SHAPE (large, center-right) + Dry/Wet (K, right edge)
// Row 6.5 (y ~235):     Reverb knob (L, right edge)
// Row 7 (y ~262):       4 attenurandomizer small knobs
// Row 8 (y ~310):       Jack row 1: IN L, IN R, FREEZE, SEED, PITCH CV, ASSIGN CV
// Row 9 (y ~345):       Jack row 2: DENSITY CV, TIME CV, SIZE CV, SHAPE CV, L out, R out
// Bottom (y ~375):      Mutable Instruments brand
//
// NOTE: feedback, dry-wet, reverb are not visible physical knobs on the panel.
// They may be secondary functions accessed via button combos.

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // ===== Top buttons =====
  'button-beads-freeze':    { x: 28, y: 48 },
  'button-beads-seed':      { x: 182, y: 48 },

  // ===== DENSITY (large knob, center top) =====
  'knob-beads-density':     { x: 105, y: 80 },

  // ===== Quality button + LED (center, between DENSITY and TIME/PITCH) =====
  'led-beads-input-level':  { x: 88, y: 118 },
  'button-beads-quality':   { x: 105, y: 118 },

  // ===== CV Assign button (left edge, aligned with Reverb) =====
  'button-beads-cv-assign': { x: 15, y: 230 },

  // ===== Large knobs =====
  'knob-beads-time':        { x: 35, y: 115 },
  'knob-beads-pitch':       { x: 175, y: 115 },
  'knob-beads-size':        { x: 72, y: 170 },
  'knob-beads-shape':       { x: 140, y: 170 },

  // ===== Mixing knobs (J, K, L) =====
  'knob-beads-feedback':    { x: 15, y: 185 },   // J — aligned with Dry/Wet
  'knob-beads-dry-wet':     { x: 195, y: 185 },  // K — aligned with Feedback
  'knob-beads-reverb':      { x: 195, y: 230 },  // L — aligned with CV Assign

  // ===== Attenurandomizers (row below SIZE/SHAPE) =====
  'knob-beads-time-atten':  { x: 40, y: 262 },
  'knob-beads-size-atten':  { x: 82, y: 262 },
  'knob-beads-shape-atten': { x: 124, y: 262 },
  'knob-beads-pitch-atten': { x: 166, y: 262 },

  // ===== Jack row 1 (y: 310): IN L, IN R, FREEZE, SEED, PITCH CV, ASSIGN CV =====
  'jack-beads-in-l':        { x: 22, y: 310 },
  'jack-beads-in-r':        { x: 58, y: 310 },
  'jack-beads-freeze-gate': { x: 94, y: 310 },
  'jack-beads-seed-gate':   { x: 130, y: 310 },
  'jack-beads-pitch-cv':    { x: 166, y: 310 },
  'jack-beads-assign-cv':   { x: 196, y: 310 },

  // ===== Jack row 2 (y: 345): DENSITY CV, TIME CV, SIZE CV, SHAPE CV, L out, R out =====
  'jack-beads-density-cv':  { x: 22, y: 345 },
  'jack-beads-time-cv':     { x: 58, y: 345 },
  'jack-beads-size-cv':     { x: 94, y: 345 },
  'jack-beads-shape-cv':    { x: 130, y: 345 },
  'jack-beads-out-l':       { x: 166, y: 345 },
  'jack-beads-out-r':       { x: 196, y: 345 },
};

// ===== Section bounds =====

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'beads': { x: 0, y: 0, width: 210, height: 380 },
};

/**
 * Convert a MIDI value (0-127) to knob rotation in degrees.
 * 0 = -135deg (fully CCW), 127 = +135deg (fully CW), ~63 = 0deg (noon).
 */
export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}
