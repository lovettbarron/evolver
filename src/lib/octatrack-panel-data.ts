/**
 * Octatrack MKII Panel Control Metadata
 *
 * Maps SVG control IDs to human-readable names, module membership, and
 * control types for the Elektron Octatrack MKII front panel.
 *
 * REFERENCE-FIRST DOCUMENTATION (per CLAUDE.md + synth-panel-builder SKILL.md):
 *   Layout derived from the Octatrack MKII user manual front-panel diagram
 *   (Elektron, OS 1.40A). NO physical panel image is available in this repo
 *   — verify positions against the manual before tweaking.
 *   Control inventory matches `instruments/octatrack/overview.md` "Physical
 *   Controls" section. Do NOT invent controls beyond that list.
 *
 * Type union choice: we extend the Cascadia set `{knob, slider, switch, led}`
 * with `'display'` for the LCD so the component's switch statement and the
 * test's VALID_TYPES set are explicit. No `jack-in`/`jack-out` appear here —
 * the Octatrack front panel has no patch jacks (all I/O is on the rear).
 *
 * Only one slider exists: the Scene A/B crossfader. It is the app's only
 * horizontal slider (all Cascadia sliders are vertical). The component
 * handles horizontal-drag via a custom hook.
 *
 * ID naming convention (matches CLAUDE.md / SKILL.md):
 *   {type}-{module}-{name-kebab}
 * e.g. `knob-data-a`, `key-trig-1`, `key-func-proj`.
 *
 * Modules:
 *   transport, track, trig, data, main, mix, scene, nav, func, param,
 *   rec, tempo, lcd, card.
 */

export interface OctatrackControlMeta {
  id: string;
  name: string;
  module: string;
  type: 'knob' | 'slider' | 'switch' | 'led' | 'display';
  /** Unused on the Octatrack front panel (no jacks). Kept for API parity. */
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

// ===== Build trig and track key entries in a loop =====
// These are the ONLY two control groups that are a genuinely regular row
// on the physical panel and therefore acceptable to generate. Every other
// control is hand-declared below.
const trigEntries: Record<string, OctatrackControlMeta> = {};
for (let i = 1; i <= 16; i++) {
  const id = `key-trig-${i}`;
  trigEntries[id] = {
    id,
    name: `TRIG ${i}`,
    module: 'trig',
    type: 'switch',
  };
}

const trackEntries: Record<string, OctatrackControlMeta> = {};
for (let i = 1; i <= 8; i++) {
  const id = `key-track-${i}`;
  trackEntries[id] = {
    id,
    name: `T${i}`,
    module: 'track',
    type: 'switch',
  };
}

export const CONTROL_METADATA: Record<string, OctatrackControlMeta> = {
  // ===== TRANSPORT (3) =====
  'key-transport-play':   { id: 'key-transport-play',   name: 'PLAY',   module: 'transport', type: 'switch' },
  'key-transport-stop':   { id: 'key-transport-stop',   name: 'STOP',   module: 'transport', type: 'switch' },
  'key-transport-record': { id: 'key-transport-record', name: 'REC',    module: 'transport', type: 'switch' },

  // ===== TRACK KEYS (8) — generated =====
  ...trackEntries,

  // ===== TRIG KEYS (16) — generated =====
  ...trigEntries,

  // ===== DATA ENTRY KNOBS (6) — A-F =====
  'knob-data-a': { id: 'knob-data-a', name: 'A', module: 'data', type: 'knob' },
  'knob-data-b': { id: 'knob-data-b', name: 'B', module: 'data', type: 'knob' },
  'knob-data-c': { id: 'knob-data-c', name: 'C', module: 'data', type: 'knob' },
  'knob-data-d': { id: 'knob-data-d', name: 'D', module: 'data', type: 'knob' },
  'knob-data-e': { id: 'knob-data-e', name: 'E', module: 'data', type: 'knob' },
  'knob-data-f': { id: 'knob-data-f', name: 'F', module: 'data', type: 'knob' },

  // ===== MAIN / LEVEL / HEADPHONES (3) =====
  'knob-main-level':      { id: 'knob-main-level',      name: 'VOLUME',   module: 'main',  type: 'knob' },
  'knob-main-headphones': { id: 'knob-main-headphones', name: 'HP VOL',   module: 'main',  type: 'knob' },
  'knob-track-level':     { id: 'knob-track-level',     name: 'LEVEL',    module: 'main',  type: 'knob' },

  // ===== MIX / CROSSFADER (1) =====
  'slider-mix-crossfader': { id: 'slider-mix-crossfader', name: 'CROSSFADER', module: 'mix', type: 'slider' },

  // ===== SCENE (2) — A / B =====
  'key-scene-a': { id: 'key-scene-a', name: 'SCENE A', module: 'scene', type: 'switch' },
  'key-scene-b': { id: 'key-scene-b', name: 'SCENE B', module: 'scene', type: 'switch' },

  // ===== PATTERN / BANK / PAGE (3) — grouped under nav per spec =====
  'key-nav-pattern': { id: 'key-nav-pattern', name: 'PTN',  module: 'nav', type: 'switch' },
  'key-nav-bank':    { id: 'key-nav-bank',    name: 'BANK', module: 'nav', type: 'switch' },
  'key-nav-page':    { id: 'key-nav-page',    name: 'PAGE', module: 'nav', type: 'switch' },

  // ===== FUNCTION CLUSTER (7) — FUNC, PROJ, PART, AED, MIX, ARR, MIDI =====
  'key-func-func': { id: 'key-func-func', name: 'FUNC', module: 'func', type: 'switch' },
  'key-func-proj': { id: 'key-func-proj', name: 'PROJ', module: 'func', type: 'switch' },
  'key-func-part': { id: 'key-func-part', name: 'PART', module: 'func', type: 'switch' },
  'key-func-aed':  { id: 'key-func-aed',  name: 'AED',  module: 'func', type: 'switch' },
  'key-func-mix':  { id: 'key-func-mix',  name: 'MIX',  module: 'func', type: 'switch' },
  'key-func-arr':  { id: 'key-func-arr',  name: 'ARR',  module: 'func', type: 'switch' },
  'key-func-midi': { id: 'key-func-midi', name: 'MIDI', module: 'func', type: 'switch' },

  // ===== TRACK PARAMETER KEYS (5) — SRC, AMP, LFO, FX1, FX2 =====
  'key-param-src': { id: 'key-param-src', name: 'SRC', module: 'param', type: 'switch' },
  'key-param-amp': { id: 'key-param-amp', name: 'AMP', module: 'param', type: 'switch' },
  'key-param-lfo': { id: 'key-param-lfo', name: 'LFO', module: 'param', type: 'switch' },
  'key-param-fx1': { id: 'key-param-fx1', name: 'FX1', module: 'param', type: 'switch' },
  'key-param-fx2': { id: 'key-param-fx2', name: 'FX2', module: 'param', type: 'switch' },

  // ===== NAVIGATION (6) — arrows + YES/NO =====
  'key-nav-up':    { id: 'key-nav-up',    name: 'UP',    module: 'nav', type: 'switch' },
  'key-nav-down':  { id: 'key-nav-down',  name: 'DOWN',  module: 'nav', type: 'switch' },
  'key-nav-left':  { id: 'key-nav-left',  name: 'LEFT',  module: 'nav', type: 'switch' },
  'key-nav-right': { id: 'key-nav-right', name: 'RIGHT', module: 'nav', type: 'switch' },
  'key-nav-yes':   { id: 'key-nav-yes',   name: 'YES',   module: 'nav', type: 'switch' },
  'key-nav-no':    { id: 'key-nav-no',    name: 'NO',    module: 'nav', type: 'switch' },

  // ===== TRACK RECORDER (3) — REC1, REC2, REC3 =====
  'key-rec-1': { id: 'key-rec-1', name: 'REC1', module: 'rec', type: 'switch' },
  'key-rec-2': { id: 'key-rec-2', name: 'REC2', module: 'rec', type: 'switch' },
  'key-rec-3': { id: 'key-rec-3', name: 'REC3', module: 'rec', type: 'switch' },

  // ===== CUE (1) =====
  'key-track-cue': { id: 'key-track-cue', name: 'CUE', module: 'track', type: 'switch' },

  // ===== TEMPO (1) =====
  'key-tempo-tempo': { id: 'key-tempo-tempo', name: 'TEMPO', module: 'tempo', type: 'switch' },

  // ===== LCD DISPLAY (1) =====
  'display-lcd-screen': { id: 'display-lcd-screen', name: 'LCD', module: 'lcd', type: 'display' },

  // ===== CF CARD STATUS LED (1) =====
  'led-card-status': { id: 'led-card-status', name: 'CF', module: 'card', type: 'led' },
};

/**
 * Section bounds for the Octatrack modules.
 * ViewBox: 0 0 1000 500 (horizontal panel aspect close to the real MKII).
 *
 * Physical layout (left-to-right, top-to-bottom):
 *   Upper-left:   Volume knob + HP Vol + MAIN label (main module)
 *   Upper-center: LCD display (wide, central anchor)
 *   Upper-right:  6 data entry knobs A-F + transport cluster + tempo
 *   Middle:       Function row (FUNC PROJ PART AED MIX ARR MIDI) +
 *                 track parameter keys (SRC AMP LFO FX1 FX2)
 *   Middle-below: Scene A / crossfader / Scene B + track level +
 *                 navigation arrows + YES/NO + pattern/bank/page +
 *                 rec1/2/3 + cue
 *   Bottom row:   8 track keys T1-T8 + 16 trig keys TRIG1-16
 *
 * Bounds are approximate containers so SECTION_BOUNDS entries exist for
 * every module (used by activeSections tints and zoomSections viewBox math).
 */
export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  main:      { x: 10,  y: 15,  width: 110, height: 110 },
  lcd:       { x: 130, y: 20,  width: 420, height: 130 },
  data:      { x: 560, y: 20,  width: 220, height: 130 },
  transport: { x: 790, y: 20,  width: 200, height: 70 },
  tempo:     { x: 790, y: 100, width: 100, height: 50 },
  card:      { x: 130, y: 5,   width: 60,  height: 12 },

  func:      { x: 130, y: 165, width: 420, height: 40 },
  param:     { x: 560, y: 165, width: 220, height: 40 },

  scene:     { x: 10,  y: 220, width: 110, height: 80 },
  mix:       { x: 130, y: 220, width: 420, height: 60 },

  rec:       { x: 560, y: 220, width: 150, height: 50 },
  nav:       { x: 720, y: 220, width: 270, height: 100 },

  track:     { x: 10,  y: 320, width: 470, height: 80 },
  trig:      { x: 10,  y: 410, width: 980, height: 80 },
};

/**
 * Convert a MIDI value (0-127) to knob rotation in degrees.
 * Returns -135 for 0 (7 o'clock), 0 for center (noon), +135 for 127 (5 o'clock).
 *
 * Body identical to cascadia-panel-data's midiToRotation — copied rather than
 * re-exported so each panel data module is self-contained.
 */
export function midiToRotation(value: number): number {
  return ((value / 127) * 270) - 135;
}

/**
 * Convert a MIDI value (0-127) to a slider position (0.0 to 1.0).
 *
 * Body identical to cascadia-panel-data's midiToSliderPosition — copied rather
 * than re-exported so each panel data module is self-contained.
 */
export function midiToSliderPosition(value: number): number {
  return value / 127;
}

/**
 * Look up which module a control belongs to.
 */
export function getModuleForControl(controlId: string): string | undefined {
  return CONTROL_METADATA[controlId]?.module;
}
