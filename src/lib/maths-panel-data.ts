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
  'jack-ch1-signal-in': { id: 'jack-ch1-signal-in', name: 'Signal', module: 'ch1', type: 'jack-in', signalType: 'cv' },
  'jack-ch1-trig-in': { id: 'jack-ch1-trig-in', name: 'Trigger', module: 'ch1', type: 'jack-in', signalType: 'gate' },
  'jack-ch1-rise-cv-in': { id: 'jack-ch1-rise-cv-in', name: 'Rise CV', module: 'ch1', type: 'jack-in', signalType: 'cv' },
  'jack-ch1-fall-cv-in': { id: 'jack-ch1-fall-cv-in', name: 'Fall CV', module: 'ch1', type: 'jack-in', signalType: 'cv' },
  'jack-ch1-both-cv-in': { id: 'jack-ch1-both-cv-in', name: 'Both CV', module: 'ch1', type: 'jack-in', signalType: 'cv' },
  'jack-ch1-cycle-in': { id: 'jack-ch1-cycle-in', name: 'Cycle', module: 'ch1', type: 'jack-in', signalType: 'gate' },
  'jack-ch1-unity-out': { id: 'jack-ch1-unity-out', name: 'Unity', module: 'ch1', type: 'jack-out', signalType: 'cv' },
  'jack-ch1-eor-out': { id: 'jack-ch1-eor-out', name: 'EOR', module: 'ch1', type: 'jack-out', signalType: 'gate' },
  'jack-ch1-var-out': { id: 'jack-ch1-var-out', name: 'Ch1 Variable', module: 'ch1', type: 'jack-out', signalType: 'cv' },

  // ===== Channel 2 (3 elements) =====
  'knob-ch2-attenuverter': { id: 'knob-ch2-attenuverter', name: 'Attenuverter', module: 'ch2', type: 'knob' },
  'jack-ch2-signal-in': { id: 'jack-ch2-signal-in', name: 'Signal', module: 'ch2', type: 'jack-in', signalType: 'cv' },
  'jack-ch2-var-out': { id: 'jack-ch2-var-out', name: 'Ch2 Variable', module: 'ch2', type: 'jack-out', signalType: 'cv' },

  // ===== Channel 3 (3 elements) =====
  'knob-ch3-attenuverter': { id: 'knob-ch3-attenuverter', name: 'Attenuverter', module: 'ch3', type: 'knob' },
  'jack-ch3-signal-in': { id: 'jack-ch3-signal-in', name: 'Signal', module: 'ch3', type: 'jack-in', signalType: 'cv' },
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
  'jack-ch4-signal-in': { id: 'jack-ch4-signal-in', name: 'Signal', module: 'ch4', type: 'jack-in', signalType: 'cv' },
  'jack-ch4-trig-in': { id: 'jack-ch4-trig-in', name: 'Trigger', module: 'ch4', type: 'jack-in', signalType: 'gate' },
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
// ViewBox: 0 0 300 700 (20HP eurorack module, vertically oriented)
//
// The Maths panel has a symmetrical left-right layout:
// - Ch1 occupies the LEFT side (Rise/Fall/Response knobs, jacks below)
// - Ch2+Ch3 (simple attenuverters) occupy the CENTER column
// - Ch4 occupies the RIGHT side (mirror of Ch1, EOC instead of EOR)
// - Bus outputs (OR/SUM/INV) at the BOTTOM CENTER
//
// Layout rows top-to-bottom:
// Row 1 (y ~50-80):   Cycle buttons + LEDs
// Row 2 (y ~110-180): Rise/Fall knobs, then Vari-Response below
// Row 3 (y ~220-260): Attenuverter knobs (all 4 channels in a row)
// Row 4 (y ~310-350): Signal + Trigger input jacks
// Row 5 (y ~400-440): CV input jacks (Rise CV, Fall CV, Both CV)
// Row 6 (y ~480-510): Cycle input jacks + Unity/EOR/EOC LEDs
// Row 7 (y ~560-590): Output jacks (Unity, EOR/EOC, Variable)
// Row 8 (y ~640-670): Bus outputs (OR, SUM, INV) + SUM LEDs

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // ===== Channel 1 (LEFT side) =====
  'button-ch1-cycle':      { x: 55, y: 55 },
  'led-ch1-cycle':         { x: 55, y: 38 },
  'knob-ch1-rise':         { x: 35, y: 115 },
  'knob-ch1-fall':         { x: 85, y: 115 },
  'knob-ch1-vari-response': { x: 60, y: 175 },
  'knob-ch1-attenuverter': { x: 60, y: 240 },
  'jack-ch1-signal-in':    { x: 35, y: 315 },
  'jack-ch1-trig-in':      { x: 80, y: 315 },
  'jack-ch1-rise-cv-in':   { x: 25, y: 400 },
  'jack-ch1-fall-cv-in':   { x: 60, y: 400 },
  'jack-ch1-both-cv-in':   { x: 95, y: 400 },
  'jack-ch1-cycle-in':     { x: 60, y: 480 },
  'led-ch1-unity':         { x: 30, y: 480 },
  'led-ch1-eor':           { x: 90, y: 480 },
  'jack-ch1-unity-out':    { x: 25, y: 560 },
  'jack-ch1-eor-out':      { x: 60, y: 560 },
  'jack-ch1-var-out':      { x: 95, y: 560 },

  // ===== Channel 2 (CENTER-LEFT) =====
  'knob-ch2-attenuverter': { x: 120, y: 240 },
  'jack-ch2-signal-in':    { x: 120, y: 315 },
  'jack-ch2-var-out':      { x: 120, y: 560 },

  // ===== Channel 3 (CENTER-RIGHT) =====
  'knob-ch3-attenuverter': { x: 180, y: 240 },
  'jack-ch3-signal-in':    { x: 180, y: 315 },
  'jack-ch3-var-out':      { x: 180, y: 560 },

  // ===== Channel 4 (RIGHT side — mirror of Ch1) =====
  'button-ch4-cycle':      { x: 245, y: 55 },
  'led-ch4-cycle':         { x: 245, y: 38 },
  'knob-ch4-rise':         { x: 215, y: 115 },
  'knob-ch4-fall':         { x: 265, y: 115 },
  'knob-ch4-vari-response': { x: 240, y: 175 },
  'knob-ch4-attenuverter': { x: 240, y: 240 },
  'jack-ch4-signal-in':    { x: 220, y: 315 },
  'jack-ch4-trig-in':      { x: 265, y: 315 },
  'jack-ch4-rise-cv-in':   { x: 205, y: 400 },
  'jack-ch4-fall-cv-in':   { x: 240, y: 400 },
  'jack-ch4-both-cv-in':   { x: 275, y: 400 },
  'jack-ch4-cycle-in':     { x: 240, y: 480 },
  'led-ch4-unity':         { x: 270, y: 480 },
  'led-ch4-eoc':           { x: 210, y: 480 },
  'jack-ch4-unity-out':    { x: 275, y: 560 },
  'jack-ch4-eoc-out':      { x: 240, y: 560 },
  'jack-ch4-var-out':      { x: 205, y: 560 },

  // ===== Buses (BOTTOM CENTER) =====
  'jack-or-out':           { x: 110, y: 645 },
  'jack-sum-out':          { x: 150, y: 645 },
  'jack-inv-out':          { x: 190, y: 645 },
  'led-sum-pos':           { x: 135, y: 625 },
  'led-sum-neg':           { x: 165, y: 625 },
};

// ===== Section bounds for zoom and tint calculations =====
// Each section encompasses all controls belonging to that channel group.

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'ch1':   { x: 5, y: 25, width: 110, height: 555 },
  'ch2':   { x: 105, y: 220, width: 40, height: 360 },
  'ch3':   { x: 165, y: 220, width: 40, height: 360 },
  'ch4':   { x: 185, y: 25, width: 110, height: 555 },
  'buses': { x: 95, y: 610, width: 110, height: 60 },
};

/**
 * Convert a MIDI value (0-127) to knob rotation in degrees.
 * 0 = -135deg (fully CCW), 127 = +135deg (fully CW), ~63 = 0deg (noon).
 */
export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}
