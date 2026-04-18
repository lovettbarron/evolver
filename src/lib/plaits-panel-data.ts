/**
 * Plaits Panel Control Metadata
 *
 * Maps SVG control IDs to human-readable names, module membership, control types,
 * and (for jacks) signal types. Derived from the verified Mutable Instruments Plaits
 * control inventory (19 functional controls + 2 LED column entries).
 *
 * ID naming convention:
 * - Knobs:   knob-plaits-{name-kebab}
 * - Buttons: button-plaits-{name-kebab}
 * - Jacks:   jack-plaits-{name-kebab}
 * - LEDs:    led-plaits-{name-kebab}
 *
 * Reference: Plaits Manual pp. 3-5 (front plate diagram, controls A-F, jacks 1-7)
 */

export interface PlaitsControlMeta {
  id: string;
  name: string;
  module: string; // always 'plaits' (single-module panel)
  type: 'knob' | 'button' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

/**
 * Complete mapping of all SVG control IDs to metadata.
 * 21 entries: 5 knobs + 3 attenuverter knobs + 2 buttons + 7 input jacks + 2 output jacks + 2 LED columns.
 */
export const CONTROL_METADATA: Record<string, PlaitsControlMeta> = {
  // ===== Knobs (5 — controls B, C, D, E from manual) =====
  'knob-plaits-frequency': { id: 'knob-plaits-frequency', name: 'FREQUENCY', module: 'plaits', type: 'knob' },
  'knob-plaits-harmonics': { id: 'knob-plaits-harmonics', name: 'HARMONICS', module: 'plaits', type: 'knob' },
  'knob-plaits-timbre': { id: 'knob-plaits-timbre', name: 'TIMBRE', module: 'plaits', type: 'knob' },
  'knob-plaits-morph': { id: 'knob-plaits-morph', name: 'MORPH', module: 'plaits', type: 'knob' },

  // ===== Attenuverters (3 small knobs — control F from manual) =====
  // When CV input is unpatched and TRIG is patched, attenuverter controls
  // internal decaying envelope modulation amount (see Pitfall 9).
  'knob-plaits-timbre-attenuverter': { id: 'knob-plaits-timbre-attenuverter', name: 'TIMBRE ATT', module: 'plaits', type: 'knob' },
  'knob-plaits-fm-attenuverter': { id: 'knob-plaits-fm-attenuverter', name: 'FM ATT', module: 'plaits', type: 'knob' },
  'knob-plaits-morph-attenuverter': { id: 'knob-plaits-morph-attenuverter', name: 'MORPH ATT', module: 'plaits', type: 'knob' },

  // ===== Buttons (2 — control A from manual) =====
  'button-plaits-model-1': { id: 'button-plaits-model-1', name: 'MODEL 1', module: 'plaits', type: 'button' },
  'button-plaits-model-2': { id: 'button-plaits-model-2', name: 'MODEL 2', module: 'plaits', type: 'button' },

  // ===== Input Jacks (7 — jacks 1-5 from manual) =====
  'jack-plaits-model-cv': { id: 'jack-plaits-model-cv', name: 'MODEL', module: 'plaits', type: 'jack-in', signalType: 'cv' },
  'jack-plaits-timbre-cv': { id: 'jack-plaits-timbre-cv', name: 'TIMBRE', module: 'plaits', type: 'jack-in', signalType: 'cv' },
  'jack-plaits-fm-cv': { id: 'jack-plaits-fm-cv', name: 'FM', module: 'plaits', type: 'jack-in', signalType: 'cv' },
  'jack-plaits-morph-cv': { id: 'jack-plaits-morph-cv', name: 'HARMO', module: 'plaits', type: 'jack-in', signalType: 'cv' },
  'jack-plaits-trig': { id: 'jack-plaits-trig', name: 'TRIG', module: 'plaits', type: 'jack-in', signalType: 'gate' },
  'jack-plaits-level': { id: 'jack-plaits-level', name: 'LEVEL', module: 'plaits', type: 'jack-in', signalType: 'cv' },
  'jack-plaits-v-oct': { id: 'jack-plaits-v-oct', name: 'V/OCT', module: 'plaits', type: 'jack-in', signalType: 'cv' },

  // ===== Output Jacks (2 — jacks 6-7 from manual) =====
  'jack-plaits-out': { id: 'jack-plaits-out', name: 'OUT', module: 'plaits', type: 'jack-out', signalType: 'audio' },
  'jack-plaits-aux': { id: 'jack-plaits-aux', name: 'AUX', module: 'plaits', type: 'jack-out', signalType: 'audio' },

  // ===== LEDs (2 column entries — decorative model-selection indicators) =====
  'led-plaits-bank-1': { id: 'led-plaits-bank-1', name: 'Bank 1 LEDs', module: 'plaits', type: 'led' },
  'led-plaits-bank-2': { id: 'led-plaits-bank-2', name: 'Bank 2 LEDs', module: 'plaits', type: 'led' },
};

// ===== Hand-placed control positions matching the physical Plaits panel =====
// ViewBox: 0 0 180 560 (12HP eurorack module, vertically oriented)
//
// Layout from manual front plate diagram (pp. 3-5):
// Top area (y ~30-50):     Model selection buttons (A) + LED columns
// Row 1 (y ~100-130):      FREQUENCY (B, large, left) + HARMONICS (C, large, right)
// Row 2 (y ~200-230):      TIMBRE (D, medium, left) + MORPH (E, medium, right)
// Row 3 (y ~290-310):      Attenuverters (F, 3 small knobs in a row)
// Row 4 (y ~360-380):      CV input jacks: MODEL, TIMBRE, FM, HARMO
// Row 5 (y ~430-460):      TRIG, LEVEL, V/OCT input jacks
// Row 6 (y ~500-530):      OUT, AUX output jacks
//
// Placeholder positions — hand-place from Plaits manual pp. 3-5 when panel renderer is ready

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // Buttons + LEDs (top)
  'button-plaits-model-1':          { x: 50, y: 40 },
  'button-plaits-model-2':         { x: 130, y: 40 },
  'led-plaits-bank-1':             { x: 75, y: 100 },
  'led-plaits-bank-2':             { x: 105, y: 100 },

  // Large knobs (FREQUENCY left, HARMONICS right)
  'knob-plaits-frequency':         { x: 45, y: 130 },
  'knob-plaits-harmonics':         { x: 135, y: 130 },

  // Medium knobs (TIMBRE left, MORPH right)
  'knob-plaits-timbre':            { x: 35, y: 220 },
  'knob-plaits-morph':             { x: 145, y: 220 },

  // Attenuverters (3 small knobs in a row)
  'knob-plaits-timbre-attenuverter': { x: 45, y: 300 },
  'knob-plaits-fm-attenuverter':     { x: 90, y: 300 },
  'knob-plaits-morph-attenuverter':  { x: 135, y: 300 },

  // CV input jacks row 1: MODEL, TIMBRE, FM, HARMO
  'jack-plaits-model-cv':          { x: 25, y: 370 },
  'jack-plaits-timbre-cv':         { x: 65, y: 370 },
  'jack-plaits-fm-cv':             { x: 105, y: 370 },
  'jack-plaits-morph-cv':          { x: 155, y: 370 },

  // Input jacks row 2: TRIG, LEVEL, V/OCT
  'jack-plaits-trig':              { x: 25, y: 450 },
  'jack-plaits-level':             { x: 65, y: 450 },
  'jack-plaits-v-oct':             { x: 105, y: 450 },

  // Output jacks: OUT, AUX
  'jack-plaits-out':               { x: 120, y: 520 },
  'jack-plaits-aux':               { x: 155, y: 520 },
};

// ===== Section bounds for zoom and tint calculations =====
// Single-module panel — one section covering the entire panel.

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'plaits': { x: 0, y: 0, width: 180, height: 560 },
};

/**
 * Convert a MIDI value (0-127) to knob rotation in degrees.
 * 0 = -135deg (fully CCW), 127 = +135deg (fully CW), ~63 = 0deg (noon).
 */
export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}
