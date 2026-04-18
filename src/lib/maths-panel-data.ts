/**
 * Maths Panel Control Metadata
 *
 * Maps SVG control IDs to human-readable names, channel membership, control types,
 * and (for jacks) signal types. Derived from the verified Make Noise Maths control
 * inventory (45 elements across 5 channel groups).
 *
 * ID naming convention (channel-based, per D-08):
 * - Knobs:   knob-{channel}-{name-kebab}
 * - Buttons: button-{channel}-{name-kebab}
 * - Jacks:   jack-{channel}-{name-kebab}  (or jack-{bus-name} for buses)
 * - LEDs:    led-{channel}-{name-kebab}   (or led-{bus-name} for buses)
 */

export interface MathsControlMeta {
  id: string;
  name: string;
  module: string; // 'ch1' | 'ch2' | 'ch3' | 'ch4' | 'buses'
  type: 'knob' | 'button' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

/**
 * Complete mapping of all SVG control IDs to metadata.
 * 45 entries across 5 channel groups (17 + 3 + 3 + 17 + 5).
 */
export const CONTROL_METADATA: Record<string, MathsControlMeta> = {
  // ===== Channel 1 (17 elements) =====
  'knob-ch1-rise': { id: 'knob-ch1-rise', name: 'Rise', module: 'ch1', type: 'knob' },
  'knob-ch1-fall': { id: 'knob-ch1-fall', name: 'Fall', module: 'ch1', type: 'knob' },
  'knob-ch1-vari-response': { id: 'knob-ch1-vari-response', name: 'Vari-Response', module: 'ch1', type: 'knob' },
  'knob-ch1-attenuverter': { id: 'knob-ch1-attenuverter', name: 'Attenuverter', module: 'ch1', type: 'knob' },
  'button-ch1-cycle': { id: 'button-ch1-cycle', name: 'Cycle', module: 'ch1', type: 'button' },
  'led-ch1-cycle': { id: 'led-ch1-cycle', name: 'Cycle LED', module: 'ch1', type: 'led' },
  'led-ch1-unity': { id: 'led-ch1-unity', name: 'Unity LED', module: 'ch1', type: 'led' },
  'led-ch1-eor': { id: 'led-ch1-eor', name: 'EOR LED', module: 'ch1', type: 'led' },
  'jack-ch1-signal-in': { id: 'jack-ch1-signal-in', name: 'Ch 1', module: 'ch1', type: 'jack-in', signalType: 'cv' },
  'jack-ch1-trig-in': { id: 'jack-ch1-trig-in', name: 'Trig', module: 'ch1', type: 'jack-in', signalType: 'gate' },
  'jack-ch1-rise-cv-in': { id: 'jack-ch1-rise-cv-in', name: 'Rise CV', module: 'ch1', type: 'jack-in', signalType: 'cv' },
  'jack-ch1-fall-cv-in': { id: 'jack-ch1-fall-cv-in', name: 'Fall CV', module: 'ch1', type: 'jack-in', signalType: 'cv' },
  'jack-ch1-both-cv-in': { id: 'jack-ch1-both-cv-in', name: 'Both CV', module: 'ch1', type: 'jack-in', signalType: 'cv' },
  'jack-ch1-cycle-in': { id: 'jack-ch1-cycle-in', name: 'Cycle', module: 'ch1', type: 'jack-in', signalType: 'gate' },
  'jack-ch1-unity-out': { id: 'jack-ch1-unity-out', name: 'Unity', module: 'ch1', type: 'jack-out', signalType: 'cv' },
  'jack-ch1-eor-out': { id: 'jack-ch1-eor-out', name: 'EOR', module: 'ch1', type: 'jack-out', signalType: 'gate' },
  'jack-ch1-var-out': { id: 'jack-ch1-var-out', name: 'Ch1 Variable', module: 'ch1', type: 'jack-out', signalType: 'cv' },

  // ===== Channel 2 (3 elements) =====
  'knob-ch2-attenuverter': { id: 'knob-ch2-attenuverter', name: 'Attenuverter', module: 'ch2', type: 'knob' },
  'jack-ch2-signal-in': { id: 'jack-ch2-signal-in', name: 'Ch 2', module: 'ch2', type: 'jack-in', signalType: 'cv' },
  'jack-ch2-var-out': { id: 'jack-ch2-var-out', name: 'Ch2 Variable', module: 'ch2', type: 'jack-out', signalType: 'cv' },

  // ===== Channel 3 (3 elements) =====
  'knob-ch3-attenuverter': { id: 'knob-ch3-attenuverter', name: 'Attenuverter', module: 'ch3', type: 'knob' },
  'jack-ch3-signal-in': { id: 'jack-ch3-signal-in', name: 'Ch 3', module: 'ch3', type: 'jack-in', signalType: 'cv' },
  'jack-ch3-var-out': { id: 'jack-ch3-var-out', name: 'Ch3 Variable', module: 'ch3', type: 'jack-out', signalType: 'cv' },

  // ===== Channel 4 (17 elements — mirror of Ch1 with EOC instead of EOR) =====
  'knob-ch4-rise': { id: 'knob-ch4-rise', name: 'Rise', module: 'ch4', type: 'knob' },
  'knob-ch4-fall': { id: 'knob-ch4-fall', name: 'Fall', module: 'ch4', type: 'knob' },
  'knob-ch4-vari-response': { id: 'knob-ch4-vari-response', name: 'Vari-Response', module: 'ch4', type: 'knob' },
  'knob-ch4-attenuverter': { id: 'knob-ch4-attenuverter', name: 'Attenuverter', module: 'ch4', type: 'knob' },
  'button-ch4-cycle': { id: 'button-ch4-cycle', name: 'Cycle', module: 'ch4', type: 'button' },
  'led-ch4-cycle': { id: 'led-ch4-cycle', name: 'Cycle LED', module: 'ch4', type: 'led' },
  'led-ch4-unity': { id: 'led-ch4-unity', name: 'Unity LED', module: 'ch4', type: 'led' },
  'led-ch4-eoc': { id: 'led-ch4-eoc', name: 'EOC LED', module: 'ch4', type: 'led' },
  'jack-ch4-signal-in': { id: 'jack-ch4-signal-in', name: 'Ch 4', module: 'ch4', type: 'jack-in', signalType: 'cv' },
  'jack-ch4-trig-in': { id: 'jack-ch4-trig-in', name: 'Trig', module: 'ch4', type: 'jack-in', signalType: 'gate' },
  'jack-ch4-rise-cv-in': { id: 'jack-ch4-rise-cv-in', name: 'Rise CV', module: 'ch4', type: 'jack-in', signalType: 'cv' },
  'jack-ch4-fall-cv-in': { id: 'jack-ch4-fall-cv-in', name: 'Fall CV', module: 'ch4', type: 'jack-in', signalType: 'cv' },
  'jack-ch4-both-cv-in': { id: 'jack-ch4-both-cv-in', name: 'Both CV', module: 'ch4', type: 'jack-in', signalType: 'cv' },
  'jack-ch4-cycle-in': { id: 'jack-ch4-cycle-in', name: 'Cycle', module: 'ch4', type: 'jack-in', signalType: 'gate' },
  'jack-ch4-unity-out': { id: 'jack-ch4-unity-out', name: 'Unity', module: 'ch4', type: 'jack-out', signalType: 'cv' },
  'jack-ch4-eoc-out': { id: 'jack-ch4-eoc-out', name: 'EOC', module: 'ch4', type: 'jack-out', signalType: 'gate' },
  'jack-ch4-var-out': { id: 'jack-ch4-var-out', name: 'Ch4 Variable', module: 'ch4', type: 'jack-out', signalType: 'cv' },

  // ===== Buses (5 elements) =====
  'jack-or-out': { id: 'jack-or-out', name: 'OR', module: 'buses', type: 'jack-out', signalType: 'cv' },
  'jack-sum-out': { id: 'jack-sum-out', name: 'SUM', module: 'buses', type: 'jack-out', signalType: 'cv' },
  'jack-inv-out': { id: 'jack-inv-out', name: 'INV', module: 'buses', type: 'jack-out', signalType: 'cv' },
  'led-sum-pos': { id: 'led-sum-pos', name: 'SUM+ LED', module: 'buses', type: 'led' },
  'led-sum-neg': { id: 'led-sum-neg', name: 'SUM- LED', module: 'buses', type: 'led' },
};

// ===== Hand-placed control positions matching the physical Make Noise Maths panel =====
// ViewBox: 0 0 300 380 (20HP eurorack module, ~4:5 aspect ratio)
//
// Layout from the physical panel (top to bottom):
//
// Row 1 (y ~20):     "MATHS" title
// Row 2 (y ~40-60):  Envelope shape graphics + indicator LEDs (decorative)
// Row 3 (y ~75):     Top input jack row — Ch1, Trig, Ch2, Ch3, Trig, Ch4
// Row 4 (y ~95-235): Three knob columns + outer edge input stacks
//   Left outer (x ~17):   Cycle button + Rise/Fall/Both CV + Cycle In jacks
//   Left knobs (x ~65):   Rise, Fall, Vari-Response (Ch1)
//   Center knobs (x ~150): Attenuverters 1, 2, 3, 4
//   Right knobs (x ~235):  Rise, Fall, Vari-Response (Ch4)
//   Right outer (x ~283): Cycle button + Rise/Fall/Both CV + Cycle In jacks
// Row 5 (y ~270-290): Output LEDs + output jack row
// Row 6 (y ~330-350): Bus outputs (OR, SUM, INV) + SUM LEDs

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // ===== Top input jack row (y: 75) — L to R: Ch1, Trig, Ch2, Ch3, Trig, Ch4 =====
  'jack-ch1-signal-in':    { x: 38, y: 75 },
  'jack-ch1-trig-in':      { x: 65, y: 75 },
  'jack-ch2-signal-in':    { x: 122, y: 75 },
  'jack-ch3-signal-in':    { x: 178, y: 75 },
  'jack-ch4-trig-in':      { x: 235, y: 75 },
  'jack-ch4-signal-in':    { x: 262, y: 75 },

  // ===== Left outer column — Cycle button + CV input stack (x: 17) =====
  'led-ch1-cycle':         { x: 17, y: 98 },
  'button-ch1-cycle':      { x: 17, y: 115 },
  'jack-ch1-rise-cv-in':   { x: 17, y: 150 },
  'jack-ch1-both-cv-in':   { x: 17, y: 175 },
  'jack-ch1-fall-cv-in':   { x: 17, y: 200 },
  'jack-ch1-cycle-in':     { x: 17, y: 226 },

  // ===== Left knob column — Ch1 Rise/Fall/VR (x: 65) =====
  'knob-ch1-rise':         { x: 65, y: 128 },
  'knob-ch1-fall':         { x: 65, y: 175 },
  'knob-ch1-vari-response': { x: 65, y: 218 },

  // ===== Center attenuverter column (x: 150) =====
  'knob-ch1-attenuverter': { x: 150, y: 120 },
  'knob-ch2-attenuverter': { x: 150, y: 157 },
  'knob-ch3-attenuverter': { x: 150, y: 194 },
  'knob-ch4-attenuverter': { x: 150, y: 231 },

  // ===== Right knob column — Ch4 Rise/Fall/VR (x: 235) =====
  'knob-ch4-rise':         { x: 235, y: 128 },
  'knob-ch4-fall':         { x: 235, y: 175 },
  'knob-ch4-vari-response': { x: 235, y: 218 },

  // ===== Right outer column — Cycle button + CV input stack (x: 283) =====
  'led-ch4-cycle':         { x: 283, y: 98 },
  'button-ch4-cycle':      { x: 283, y: 115 },
  'jack-ch4-rise-cv-in':   { x: 283, y: 150 },
  'jack-ch4-both-cv-in':   { x: 283, y: 175 },
  'jack-ch4-fall-cv-in':   { x: 283, y: 200 },
  'jack-ch4-cycle-in':     { x: 283, y: 226 },

  // ===== Variable output jacks — centered below attenuverters (y: 290) =====
  'jack-ch1-var-out':      { x: 120, y: 290 },
  'jack-ch2-var-out':      { x: 140, y: 290 },
  'jack-ch3-var-out':      { x: 160, y: 290 },
  'jack-ch4-var-out':      { x: 180, y: 290 },

  // ===== Output LEDs (y: 328) =====
  'led-ch1-unity':         { x: 22, y: 328 },
  'led-ch1-eor':           { x: 55, y: 328 },
  'led-ch4-eoc':           { x: 245, y: 328 },
  'led-ch4-unity':         { x: 278, y: 328 },

  // ===== Bottom output row — Unity/EOR/EOC + bus outputs, all at y: 345 =====
  'jack-ch1-unity-out':    { x: 22, y: 345 },
  'jack-ch1-eor-out':      { x: 55, y: 345 },
  'jack-or-out':           { x: 110, y: 345 },
  'jack-sum-out':          { x: 150, y: 345 },
  'jack-inv-out':          { x: 190, y: 345 },
  'jack-ch4-eoc-out':      { x: 245, y: 345 },
  'jack-ch4-unity-out':    { x: 278, y: 345 },
  'led-sum-pos':           { x: 130, y: 328 },
  'led-sum-neg':           { x: 170, y: 328 },
};

// ===== Section bounds for zoom and tint calculations =====

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'ch1':   { x: 5, y: 65, width: 120, height: 240 },
  'ch2':   { x: 110, y: 65, width: 80, height: 240 },
  'ch3':   { x: 155, y: 65, width: 80, height: 240 },
  'ch4':   { x: 175, y: 65, width: 120, height: 240 },
  'buses': { x: 95, y: 315, width: 110, height: 50 },
};

/**
 * Convert a MIDI value (0-127) to knob rotation in degrees.
 * 0 = -135deg (fully CCW), 127 = +135deg (fully CW), ~63 = 0deg (noon).
 */
export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}
