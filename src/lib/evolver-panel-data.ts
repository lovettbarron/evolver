/**
 * Evolver Panel Control Metadata
 *
 * Maps SVG control IDs from references/evolver-panel.svg to human-readable names,
 * NRPN parameter numbers (from Evo_Key_Manual_1.3.pdf), panel sections, and control types.
 */

export interface ControlMeta {
  id: string;
  name: string;
  nrpn: number | null;
  section: string;
  type: 'knob-large' | 'knob-small' | 'switch' | 'led';
}

/**
 * Complete mapping of all SVG control IDs to metadata.
 * NRPN numbers sourced from DSI Evolver manual parameter list.
 * Controls without NRPN (LEDs, navigation switches) use null.
 */
export const CONTROL_METADATA: Record<string, ControlMeta> = {
  // ===== ENVELOPE 3 =====
  'knob-env3-destination': { id: 'knob-env3-destination', name: 'Env 3 Destination', nrpn: 33, section: 'envelope3', type: 'knob-small' },
  'knob-env3-amount': { id: 'knob-env3-amount', name: 'Env 3 Amount', nrpn: 34, section: 'envelope3', type: 'knob-small' },
  'knob-env3-velocity': { id: 'knob-env3-velocity', name: 'Env 3 Velocity', nrpn: 35, section: 'envelope3', type: 'knob-small' },
  'knob-env3-delay': { id: 'knob-env3-delay', name: 'Env 3 Delay', nrpn: 36, section: 'envelope3', type: 'knob-small' },
  'knob-env3-attack': { id: 'knob-env3-attack', name: 'Env 3 Attack', nrpn: 37, section: 'envelope3', type: 'knob-small' },
  'knob-env3-decay': { id: 'knob-env3-decay', name: 'Env 3 Decay', nrpn: 38, section: 'envelope3', type: 'knob-small' },
  'knob-env3-sustain': { id: 'knob-env3-sustain', name: 'Env 3 Sustain', nrpn: 39, section: 'envelope3', type: 'knob-small' },
  'knob-env3-release': { id: 'knob-env3-release', name: 'Env 3 Release', nrpn: 40, section: 'envelope3', type: 'knob-small' },

  // ===== LFOs =====
  'knob-lfo-frequency': { id: 'knob-lfo-frequency', name: 'LFO Frequency', nrpn: 41, section: 'lfos', type: 'knob-small' },
  'knob-lfo-shape': { id: 'knob-lfo-shape', name: 'LFO Shape', nrpn: 42, section: 'lfos', type: 'knob-small' },
  'knob-lfo-destination': { id: 'knob-lfo-destination', name: 'LFO Destination', nrpn: 44, section: 'lfos', type: 'knob-small' },
  'knob-lfo-amount': { id: 'knob-lfo-amount', name: 'LFO Amount', nrpn: 43, section: 'lfos', type: 'knob-small' },
  'switch-lfo1': { id: 'switch-lfo1', name: 'LFO 1', nrpn: null, section: 'lfos', type: 'switch' },
  'switch-lfo2': { id: 'switch-lfo2', name: 'LFO 2', nrpn: null, section: 'lfos', type: 'switch' },
  'switch-lfo3': { id: 'switch-lfo3', name: 'LFO 3', nrpn: null, section: 'lfos', type: 'switch' },
  'switch-lfo4': { id: 'switch-lfo4', name: 'LFO 4', nrpn: null, section: 'lfos', type: 'switch' },
  'switch-lfo-keysync': { id: 'switch-lfo-keysync', name: 'LFO Key Sync', nrpn: 45, section: 'lfos', type: 'switch' },

  // ===== SEQUENCER =====
  'led-seq-1': { id: 'led-seq-1', name: 'Seq Step 1', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-2': { id: 'led-seq-2', name: 'Seq Step 2', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-3': { id: 'led-seq-3', name: 'Seq Step 3', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-4': { id: 'led-seq-4', name: 'Seq Step 4', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-5': { id: 'led-seq-5', name: 'Seq Step 5', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-6': { id: 'led-seq-6', name: 'Seq Step 6', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-7': { id: 'led-seq-7', name: 'Seq Step 7', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-8': { id: 'led-seq-8', name: 'Seq Step 8', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-9': { id: 'led-seq-9', name: 'Seq Step 9', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-10': { id: 'led-seq-10', name: 'Seq Step 10', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-11': { id: 'led-seq-11', name: 'Seq Step 11', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-12': { id: 'led-seq-12', name: 'Seq Step 12', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-13': { id: 'led-seq-13', name: 'Seq Step 13', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-14': { id: 'led-seq-14', name: 'Seq Step 14', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-15': { id: 'led-seq-15', name: 'Seq Step 15', nrpn: null, section: 'sequencer', type: 'led' },
  'led-seq-16': { id: 'led-seq-16', name: 'Seq Step 16', nrpn: null, section: 'sequencer', type: 'led' },
  'switch-program': { id: 'switch-program', name: 'Program', nrpn: null, section: 'sequencer', type: 'switch' },
  'switch-global': { id: 'switch-global', name: 'Global', nrpn: null, section: 'sequencer', type: 'switch' },
  'switch-compare': { id: 'switch-compare', name: 'Compare', nrpn: null, section: 'sequencer', type: 'switch' },
  'switch-write': { id: 'switch-write', name: 'Write', nrpn: null, section: 'sequencer', type: 'switch' },
  'switch-seq-edit': { id: 'switch-seq-edit', name: 'Seq Edit', nrpn: null, section: 'sequencer', type: 'switch' },
  'switch-startstop': { id: 'switch-startstop', name: 'Start/Stop', nrpn: null, section: 'sequencer', type: 'switch' },
  'switch-reset': { id: 'switch-reset', name: 'Reset', nrpn: null, section: 'sequencer', type: 'switch' },
  'switch-seq1': { id: 'switch-seq1', name: 'Seq 1', nrpn: null, section: 'sequencer', type: 'switch' },
  'switch-seq2': { id: 'switch-seq2', name: 'Seq 2', nrpn: null, section: 'sequencer', type: 'switch' },
  'switch-seq3': { id: 'switch-seq3', name: 'Seq 3', nrpn: null, section: 'sequencer', type: 'switch' },
  'switch-seq4': { id: 'switch-seq4', name: 'Seq 4', nrpn: null, section: 'sequencer', type: 'switch' },

  // ===== LCD / NAVIGATION =====
  'knob-param1': { id: 'knob-param1', name: 'Param 1', nrpn: null, section: 'lcd', type: 'knob-small' },
  'knob-param2': { id: 'knob-param2', name: 'Param 2', nrpn: null, section: 'lcd', type: 'knob-small' },
  'knob-select': { id: 'knob-select', name: 'Select', nrpn: null, section: 'lcd', type: 'knob-small' },
  'knob-value': { id: 'knob-value', name: 'Value', nrpn: null, section: 'lcd', type: 'knob-small' },
  'switch-yes': { id: 'switch-yes', name: '+ Yes', nrpn: null, section: 'lcd', type: 'switch' },
  'switch-no': { id: 'switch-no', name: '- No', nrpn: null, section: 'lcd', type: 'switch' },

  // ===== MISC PARAMS =====
  'switch-misc': { id: 'switch-misc', name: 'Misc', nrpn: null, section: 'misc-params', type: 'switch' },

  // ===== MODULATORS =====
  'knob-mod-source': { id: 'knob-mod-source', name: 'Mod Source', nrpn: 46, section: 'modulators', type: 'knob-small' },
  'knob-mod-dest': { id: 'knob-mod-dest', name: 'Mod Destination', nrpn: 47, section: 'modulators', type: 'knob-small' },
  'knob-mod-amount': { id: 'knob-mod-amount', name: 'Mod Amount', nrpn: 48, section: 'modulators', type: 'knob-small' },
  'switch-mod1': { id: 'switch-mod1', name: 'Mod 1', nrpn: null, section: 'modulators', type: 'switch' },
  'switch-mod2': { id: 'switch-mod2', name: 'Mod 2', nrpn: null, section: 'modulators', type: 'switch' },
  'switch-mod3': { id: 'switch-mod3', name: 'Mod 3', nrpn: null, section: 'modulators', type: 'switch' },
  'switch-mod4': { id: 'switch-mod4', name: 'Mod 4', nrpn: null, section: 'modulators', type: 'switch' },

  // ===== TRANSPOSE =====
  'switch-transpose-down': { id: 'switch-transpose-down', name: 'Transpose Down', nrpn: null, section: 'transpose', type: 'switch' },
  'switch-transpose-up': { id: 'switch-transpose-up', name: 'Transpose Up', nrpn: null, section: 'transpose', type: 'switch' },

  // ===== OSCILLATORS =====
  'switch-osc1': { id: 'switch-osc1', name: 'Osc 1', nrpn: null, section: 'oscillators', type: 'switch' },
  'switch-osc2': { id: 'switch-osc2', name: 'Osc 2', nrpn: null, section: 'oscillators', type: 'switch' },
  'switch-osc3': { id: 'switch-osc3', name: 'Osc 3', nrpn: null, section: 'oscillators', type: 'switch' },
  'switch-osc4': { id: 'switch-osc4', name: 'Osc 4', nrpn: null, section: 'oscillators', type: 'switch' },
  'knob-osc-frequency': { id: 'knob-osc-frequency', name: 'Osc Frequency', nrpn: 0, section: 'oscillators', type: 'knob-large' },
  'knob-osc-fine': { id: 'knob-osc-fine', name: 'Osc Fine Tune', nrpn: 1, section: 'oscillators', type: 'knob-large' },
  'knob-osc-shapepw': { id: 'knob-osc-shapepw', name: 'Osc Shape/PW', nrpn: 2, section: 'oscillators', type: 'knob-large' },
  'knob-osc-level': { id: 'knob-osc-level', name: 'Osc Level', nrpn: 3, section: 'oscillators', type: 'knob-large' },
  'knob-osc-fm': { id: 'knob-osc-fm', name: 'Osc FM', nrpn: 7, section: 'oscillators', type: 'knob-large' },
  'knob-osc-ringmod': { id: 'knob-osc-ringmod', name: 'Ring Mod', nrpn: 8, section: 'oscillators', type: 'knob-large' },
  'knob-osc-shapemod': { id: 'knob-osc-shapemod', name: 'Shape Mod', nrpn: 9, section: 'oscillators', type: 'knob-large' },
  'knob-osc-glide': { id: 'knob-osc-glide', name: 'Glide', nrpn: 4, section: 'oscillators', type: 'knob-large' },
  'switch-sync': { id: 'switch-sync', name: 'Sync 2>1', nrpn: 10, section: 'oscillators', type: 'switch' },

  // ===== NOISE =====
  'knob-noise-level': { id: 'knob-noise-level', name: 'Noise Level', nrpn: 11, section: 'noise', type: 'knob-large' },

  // ===== EXT IN =====
  'knob-extin-level': { id: 'knob-extin-level', name: 'Ext In Level', nrpn: 12, section: 'ext-in', type: 'knob-large' },

  // ===== LOW PASS FILTER =====
  'switch-4pole': { id: 'switch-4pole', name: '4-Pole', nrpn: 24, section: 'filter', type: 'switch' },
  'knob-filter-frequency': { id: 'knob-filter-frequency', name: 'Filter Frequency', nrpn: 20, section: 'filter', type: 'knob-large' },
  'knob-filter-resonance': { id: 'knob-filter-resonance', name: 'Filter Resonance', nrpn: 21, section: 'filter', type: 'knob-large' },
  'knob-filter-envamount': { id: 'knob-filter-envamount', name: 'Filter Env Amount', nrpn: 22, section: 'filter', type: 'knob-large' },
  'knob-filter-velocity': { id: 'knob-filter-velocity', name: 'Filter Velocity', nrpn: 23, section: 'filter', type: 'knob-large' },
  'knob-filter-keyamount': { id: 'knob-filter-keyamount', name: 'Filter Key Amount', nrpn: 25, section: 'filter', type: 'knob-large' },
  'knob-filter-audiomod': { id: 'knob-filter-audiomod', name: 'Filter Audio Mod', nrpn: 26, section: 'filter', type: 'knob-large' },
  'knob-filter-lrsplit': { id: 'knob-filter-lrsplit', name: 'Filter L/R Split', nrpn: 27, section: 'filter', type: 'knob-large' },
  'knob-filter-attack': { id: 'knob-filter-attack', name: 'Filter Attack', nrpn: 28, section: 'filter', type: 'knob-large' },
  'knob-filter-decay': { id: 'knob-filter-decay', name: 'Filter Decay', nrpn: 29, section: 'filter', type: 'knob-large' },
  'knob-filter-sustain': { id: 'knob-filter-sustain', name: 'Filter Sustain', nrpn: 30, section: 'filter', type: 'knob-large' },
  'knob-filter-release': { id: 'knob-filter-release', name: 'Filter Release', nrpn: 31, section: 'filter', type: 'knob-large' },

  // ===== AMP =====
  'knob-amp-vcalevel': { id: 'knob-amp-vcalevel', name: 'VCA Level', nrpn: 13, section: 'amp', type: 'knob-large' },
  'knob-amp-envamount': { id: 'knob-amp-envamount', name: 'Amp Env Amount', nrpn: 14, section: 'amp', type: 'knob-large' },
  'knob-amp-velocity': { id: 'knob-amp-velocity', name: 'Amp Velocity', nrpn: 15, section: 'amp', type: 'knob-large' },
  'knob-amp-outputpan': { id: 'knob-amp-outputpan', name: 'Output/Pan Speed', nrpn: 16, section: 'amp', type: 'knob-large' },
  'knob-amp-attack': { id: 'knob-amp-attack', name: 'Amp Attack', nrpn: 17, section: 'amp', type: 'knob-large' },
  'knob-amp-decay': { id: 'knob-amp-decay', name: 'Amp Decay', nrpn: 18, section: 'amp', type: 'knob-large' },
  'knob-amp-sustain': { id: 'knob-amp-sustain', name: 'Amp Sustain', nrpn: 19, section: 'amp', type: 'knob-large' },
  'knob-amp-release': { id: 'knob-amp-release', name: 'Amp Release', nrpn: 32, section: 'amp', type: 'knob-large' },

  // ===== HP FILTER =====
  'knob-hpf-frequency': { id: 'knob-hpf-frequency', name: 'HP Filter Frequency', nrpn: 49, section: 'hp-filter', type: 'knob-large' },

  // ===== FEEDBACK =====
  // D-03 fix: Frequency on top, Level (was Amount) large below, Grunge as switch not knob
  'knob-feedback-frequency': { id: 'knob-feedback-frequency', name: 'Feedback Frequency', nrpn: 50, section: 'feedback', type: 'knob-large' },
  'knob-feedback-amount': { id: 'knob-feedback-amount', name: 'Feedback Level', nrpn: 51, section: 'feedback', type: 'knob-large' },
  'switch-feedback-grunge': { id: 'switch-feedback-grunge', name: 'Feedback Grunge', nrpn: 52, section: 'feedback', type: 'switch' },

  // ===== DISTORTION =====
  'knob-distortion-amount': { id: 'knob-distortion-amount', name: 'Distortion Amount', nrpn: 53, section: 'distortion', type: 'knob-large' },
  'knob-distortion-grunge': { id: 'knob-distortion-grunge', name: 'Distortion Grunge', nrpn: 54, section: 'distortion', type: 'knob-large' },

  // ===== DELAY =====
  'switch-delay1': { id: 'switch-delay1', name: 'Delay 1', nrpn: null, section: 'delay', type: 'switch' },
  'switch-delay2': { id: 'switch-delay2', name: 'Delay 2', nrpn: null, section: 'delay', type: 'switch' },
  'switch-delay3': { id: 'switch-delay3', name: 'Delay 3', nrpn: null, section: 'delay', type: 'switch' },
  'knob-delay-time': { id: 'knob-delay-time', name: 'Delay Time', nrpn: 55, section: 'delay', type: 'knob-large' },
  'knob-delay-level': { id: 'knob-delay-level', name: 'Delay Level', nrpn: 56, section: 'delay', type: 'knob-large' },
  'knob-delay-amount': { id: 'knob-delay-amount', name: 'Delay Amount', nrpn: 57, section: 'delay', type: 'knob-large' },
  'knob-delay-feedback1': { id: 'knob-delay-feedback1', name: 'Delay Feedback 1', nrpn: 58, section: 'delay', type: 'knob-large' },
  'knob-delay-feedback2': { id: 'knob-delay-feedback2', name: 'Delay Feedback 2', nrpn: 59, section: 'delay', type: 'knob-large' },

  // ===== OUTPUT =====
  'knob-master-volume': { id: 'knob-master-volume', name: 'Master Volume', nrpn: 60, section: 'output', type: 'knob-large' },
};

/**
 * Section bounding boxes in SVG viewBox coordinates.
 * Used for section tint overlays and hit detection.
 */
export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'envelope3': { x: 55, y: 10, width: 140, height: 135 },
  'lfos': { x: 205, y: 10, width: 135, height: 135 },
  'sequencer': { x: 340, y: 10, width: 205, height: 135 },
  'lcd': { x: 570, y: 10, width: 275, height: 135 },
  'misc-params': { x: 840, y: 10, width: 80, height: 135 },
  'modulators': { x: 950, y: 10, width: 220, height: 135 },
  'transpose': { x: 22, y: 155, width: 35, height: 150 },
  'oscillators': { x: 55, y: 155, width: 225, height: 150 },
  'noise': { x: 275, y: 155, width: 35, height: 85 },
  'ext-in': { x: 275, y: 240, width: 35, height: 65 },
  'filter': { x: 310, y: 155, width: 288, height: 150 },
  'amp': { x: 598, y: 155, width: 168, height: 150 },
  'hp-filter': { x: 766, y: 155, width: 54, height: 150 },
  'feedback': { x: 820, y: 155, width: 90, height: 150 },
  'distortion': { x: 910, y: 155, width: 60, height: 150 },
  'delay': { x: 970, y: 155, width: 130, height: 150 },
  'output': { x: 1100, y: 155, width: 70, height: 150 },
};

/**
 * Convert MIDI 0-127 value to knob indicator rotation in degrees.
 * -135deg (7 o'clock, value 0) to +135deg (5 o'clock, value 127).
 * 270-degree sweep total.
 */
export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}

/**
 * Get the section name for a given control ID.
 */
export function getSectionForControl(controlId: string): string | undefined {
  return CONTROL_METADATA[controlId]?.section;
}
