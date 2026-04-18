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

  // ===== Medium knobs (4) — controls H, J, K, L =====
  'knob-beads-shape': { id: 'knob-beads-shape', name: 'Shape', module: 'beads', type: 'knob' },
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

// ===== Placeholder control positions =====
// All entries at { x: 0, y: 0 } — hand-placement from reference photos is a future step.
// ViewBox: 0 0 200 380 (14HP eurorack module)

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // Buttons
  'button-beads-quality':   { x: 0, y: 0 },
  'button-beads-freeze':    { x: 0, y: 0 },
  'button-beads-seed':      { x: 0, y: 0 },
  'button-beads-cv-assign': { x: 0, y: 0 },

  // Large knobs
  'knob-beads-density':     { x: 0, y: 0 },
  'knob-beads-time':        { x: 0, y: 0 },
  'knob-beads-pitch':       { x: 0, y: 0 },
  'knob-beads-size':        { x: 0, y: 0 },

  // Medium knobs
  'knob-beads-shape':       { x: 0, y: 0 },
  'knob-beads-feedback':    { x: 0, y: 0 },
  'knob-beads-dry-wet':     { x: 0, y: 0 },
  'knob-beads-reverb':      { x: 0, y: 0 },

  // Attenurandomizers
  'knob-beads-time-atten':  { x: 0, y: 0 },
  'knob-beads-size-atten':  { x: 0, y: 0 },
  'knob-beads-shape-atten': { x: 0, y: 0 },
  'knob-beads-pitch-atten': { x: 0, y: 0 },

  // Audio inputs
  'jack-beads-in-l':        { x: 0, y: 0 },
  'jack-beads-in-r':        { x: 0, y: 0 },

  // Gate inputs
  'jack-beads-freeze-gate': { x: 0, y: 0 },
  'jack-beads-seed-gate':   { x: 0, y: 0 },

  // CV inputs
  'jack-beads-density-cv':  { x: 0, y: 0 },
  'jack-beads-time-cv':     { x: 0, y: 0 },
  'jack-beads-size-cv':     { x: 0, y: 0 },
  'jack-beads-shape-cv':    { x: 0, y: 0 },
  'jack-beads-pitch-cv':    { x: 0, y: 0 },
  'jack-beads-assign-cv':   { x: 0, y: 0 },

  // Audio outputs
  'jack-beads-out-l':       { x: 0, y: 0 },
  'jack-beads-out-r':       { x: 0, y: 0 },

  // LED
  'led-beads-input-level':  { x: 0, y: 0 },
};

// ===== Section bounds (placeholder) =====

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'beads': { x: 0, y: 0, width: 200, height: 380 },
};

/**
 * Convert a MIDI value (0-127) to knob rotation in degrees.
 * 0 = -135deg (fully CCW), 127 = +135deg (fully CW), ~63 = 0deg (noon).
 */
export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}
