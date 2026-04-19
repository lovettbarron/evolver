/**
 * Crow Panel Control Metadata
 *
 * Maps SVG control IDs to human-readable names, module membership, control types,
 * and (for jacks) signal types. Derived from the Monome Crow physical panel layout.
 *
 * Crow is the smallest panel in the project at 2HP (60x380 viewBox).
 * It has only 7 elements: 2 input jacks, 4 output jacks, and 1 USB-C LED indicator.
 * No knobs, no switches, no sliders.
 *
 * ID naming convention:
 * - Jacks:  jack-crow-{name-kebab}
 * - LEDs:   usb-crow
 */

export interface CrowControlMeta {
  id: string;
  name: string;
  module: string; // 'io' — single module for this tiny panel
  type: 'jack-in' | 'jack-out' | 'led';
  signalType?: 'cv';
}

/**
 * Complete mapping of all SVG control IDs to metadata.
 * 7 entries total:
 *
 * Inputs (2):  IN 1, IN 2
 * Outputs (4): 1, 2, 3, 4
 * LED (1):     USB-C indicator
 */
export const CONTROL_METADATA: Record<string, CrowControlMeta> = {
  // ===== Input Jacks (2) =====
  'jack-crow-in-1': { id: 'jack-crow-in-1', name: 'IN 1', module: 'io', type: 'jack-in', signalType: 'cv' },
  'jack-crow-in-2': { id: 'jack-crow-in-2', name: 'IN 2', module: 'io', type: 'jack-in', signalType: 'cv' },

  // ===== Output Jacks (4) =====
  'jack-crow-out-1': { id: 'jack-crow-out-1', name: '1', module: 'io', type: 'jack-out', signalType: 'cv' },
  'jack-crow-out-2': { id: 'jack-crow-out-2', name: '2', module: 'io', type: 'jack-out', signalType: 'cv' },
  'jack-crow-out-3': { id: 'jack-crow-out-3', name: '3', module: 'io', type: 'jack-out', signalType: 'cv' },
  'jack-crow-out-4': { id: 'jack-crow-out-4', name: '4', module: 'io', type: 'jack-out', signalType: 'cv' },

  // ===== USB-C LED indicator (1) =====
  'usb-crow': { id: 'usb-crow', name: 'USB-C', module: 'io', type: 'led' },
};

// ===== Hand-placed control positions matching the physical Monome Crow panel =====
// ViewBox: 0 0 60 380 (2HP eurorack module — smallest panel in the project)
//
// Layout from the physical panel (top to bottom, single vertical column):
//
// Row 1 (y ~18):     "crow" title text
// Row 2 (y ~60):     USB-C connector / LED indicator
// Row 3 (y ~120):    IN 1 input jack (dark)
// Row 4 (y ~160):    IN 2 input jack (dark)
// Row 5 (y ~220):    Output 1 jack (white)
// Row 6 (y ~255):    Output 2 jack (white)
// Row 7 (y ~290):    Output 3 jack (white)
// Row 8 (y ~325):    Output 4 jack (white)
// Row 9 (y ~370):    "monome" brand text

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // USB-C LED indicator — top of panel below title
  'usb-crow':         { x: 30, y: 60 },

  // Input jacks — mid-upper, dark circles
  'jack-crow-in-1':   { x: 30, y: 120 },
  'jack-crow-in-2':   { x: 30, y: 160 },

  // Output jacks — lower half, white circles
  'jack-crow-out-1':  { x: 30, y: 220 },
  'jack-crow-out-2':  { x: 30, y: 255 },
  'jack-crow-out-3':  { x: 30, y: 290 },
  'jack-crow-out-4':  { x: 30, y: 325 },
};

// ===== Section bounds for zoom and tint calculations =====

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  io: { x: 5, y: 40, width: 50, height: 300 },
};

// ===== Jack positions lookup (for cable rendering) =====

export const JACK_POSITIONS: Record<string, { x: number; y: number }> = {};
for (const [id, meta] of Object.entries(CONTROL_METADATA)) {
  if (meta.type === 'jack-in' || meta.type === 'jack-out') {
    const pos = CONTROL_POSITIONS[id];
    if (pos) JACK_POSITIONS[id] = pos;
  }
}
