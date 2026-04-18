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
 * 22 entries: 5 knobs + 3 attenuverter knobs + 2 buttons + 8 input jacks + 2 output jacks + 1 LED column.
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
  'jack-plaits-morph-cv': { id: 'jack-plaits-morph-cv', name: 'MORPH', module: 'plaits', type: 'jack-in', signalType: 'cv' },
  'jack-plaits-harmonics-cv': { id: 'jack-plaits-harmonics-cv', name: 'HARMO', module: 'plaits', type: 'jack-in', signalType: 'cv' },
  'jack-plaits-trig': { id: 'jack-plaits-trig', name: 'TRIG', module: 'plaits', type: 'jack-in', signalType: 'gate' },
  'jack-plaits-level': { id: 'jack-plaits-level', name: 'LEVEL', module: 'plaits', type: 'jack-in', signalType: 'cv' },
  'jack-plaits-v-oct': { id: 'jack-plaits-v-oct', name: 'V/OCT', module: 'plaits', type: 'jack-in', signalType: 'cv' },

  // ===== Output Jacks (2 — jacks 6-7 from manual) =====
  'jack-plaits-out': { id: 'jack-plaits-out', name: 'OUT', module: 'plaits', type: 'jack-out', signalType: 'audio' },
  'jack-plaits-aux': { id: 'jack-plaits-aux', name: 'AUX', module: 'plaits', type: 'jack-out', signalType: 'audio' },

  // ===== LEDs (single column of 8, with bank 1 icons left / bank 2 icons right) =====
  'led-plaits-model': { id: 'led-plaits-model', name: 'Model LEDs', module: 'plaits', type: 'led' },
};

// ===== Hand-placed control positions matching the physical Plaits panel =====
// ViewBox: 0 0 180 380 (12HP eurorack module, ~4:5 aspect ratio)
//
// Layout from manual front plate diagram (pp. 3-5):
//
// Top (y ~15):         MI logo + "Plaits" title
// Row A (y ~35):       Model selection buttons (left/right) + icons between
// Row B (y ~85-95):    FREQUENCY (large, left) + HARMONICS (large, right)
//                      LED columns between them (y ~55-115)
// Row C-E (y ~155):    TIMBRE (medium, left) + MORPH (medium, right)
// Row F (y ~195-215):  Attenuverters in V shape: Timbre att, FM att (lower), Morph att
// Jack row 1 (y ~260): MODEL ——— [timbre cv] [fm cv] ——— HARMO
// Jack row 2 (y ~315): TRIG, LEVEL, V/OCT (left) + OUT, AUX (right)
// Bottom (y ~360):     Mutable Instruments brand

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // ===== Model buttons + LED columns (top) =====
  'button-plaits-model-1':           { x: 45, y: 38 },
  'button-plaits-model-2':           { x: 135, y: 38 },
  'led-plaits-model':                  { x: 90, y: 58 },

  // ===== Large knobs =====
  'knob-plaits-frequency':           { x: 40, y: 95 },
  'knob-plaits-harmonics':           { x: 140, y: 95 },

  // ===== Medium knobs =====
  'knob-plaits-timbre':              { x: 35, y: 160 },
  'knob-plaits-morph':               { x: 145, y: 160 },

  // ===== Attenuverters (V shape between TIMBRE and MORPH) =====
  'knob-plaits-timbre-attenuverter': { x: 52, y: 195 },
  'knob-plaits-fm-attenuverter':     { x: 90, y: 215 },
  'knob-plaits-morph-attenuverter':  { x: 128, y: 195 },

  // ===== CV input jacks — MODEL ——— HARMO row (y: 260) =====
  'jack-plaits-model-cv':            { x: 18, y: 260 },
  'jack-plaits-timbre-cv':           { x: 58, y: 260 },
  'jack-plaits-fm-cv':               { x: 90, y: 260 },
  'jack-plaits-morph-cv':            { x: 122, y: 260 },
  'jack-plaits-harmonics-cv':        { x: 162, y: 260 },

  // ===== Input jacks (bottom left) + Output jacks (bottom right) =====
  'jack-plaits-trig':                { x: 18, y: 315 },
  'jack-plaits-level':               { x: 55, y: 315 },
  'jack-plaits-v-oct':               { x: 92, y: 315 },
  'jack-plaits-out':                 { x: 130, y: 315 },
  'jack-plaits-aux':                 { x: 162, y: 315 },
};

// ===== Section bounds for zoom and tint calculations =====
// Single-module panel — one section covering the entire panel.

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'plaits': { x: 0, y: 0, width: 180, height: 380 },
};

/**
 * Convert a MIDI value (0-127) to knob rotation in degrees.
 * 0 = -135deg (fully CCW), 127 = +135deg (fully CW), ~63 = 0deg (noon).
 */
export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}
