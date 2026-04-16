'use client';

import React, { useState, useRef, useCallback, memo } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  CONTROL_METADATA,
  SECTION_BOUNDS,
  midiToRotation,
  midiToSliderPosition,
} from '@/lib/octatrack-panel-data';
import { PanelTooltip } from './evolver-panel-tooltip';

// ===== Types =====

interface OctatrackPanelProps {
  knobValues?: Record<string, number>;
  highlights?: Array<{ controlId: string; color: 'blue' | 'amber' }>;
  activeSections?: string[];
  zoomSections?: string[];
  /**
   * Accepted for API parity with CascadiaPanel, but IGNORED.
   * The Octatrack has no patch jacks on the front panel and therefore no
   * cable routing. Downstream integration code does not need to special-case
   * octatrack when building panel props.
   */
  cables?: Array<{
    sourceId: string;
    destId: string;
    signalType: 'audio' | 'cv' | 'modulation' | 'default';
    purpose?: string;
  }>;
  onKnobChange?: (controlId: string, value: number) => void;
  className?: string;
}

// ===== Module render order =====
const MODULE_ORDER = [
  'card',
  'main',
  'lcd',
  'data',
  'transport',
  'tempo',
  'func',
  'param',
  'scene',
  'mix',
  'rec',
  'nav',
  'track',
  'trig',
] as const;

const MODULE_DISPLAY_NAMES: Record<string, string> = {
  card: '',
  main: '',
  lcd: '',
  data: 'DATA ENTRY',
  transport: '',
  tempo: '',
  func: '',
  param: 'TRACK PARAMS',
  scene: '',
  mix: '',
  rec: '',
  nav: '',
  track: '',
  trig: '',
};

// ===== Hand-placed control positions =====
// Derived from the Octatrack MKII user manual front-panel diagram. No
// physical panel image is in the repo — first-pass positions are
// structurally correct (module rows + neighborhoods) but exact x/y
// spacing will need a follow-up session with the manual side-by-side.
//
// Grid exceptions (acceptable per plan): the 16 trig keys and 8 track keys
// are generated in loops because they ARE a regular row on the physical
// panel. Every other control gets a hand-placed {x, y}.

interface ControlPosition { x: number; y: number }

// Positions match the physical Octatrack MKII photo. The LCD is CENTRAL to
// the top half, track keys T1-T4 flank its left side and T5-T8 flank its
// right side (vertical columns). SRC/AMP/LFO/FX1/FX2 sit directly below the
// LCD. STOP/PLAY/REC sit below the param row. Crossfader is above the trig
// row at the right, flanked by Scene A (left) and Scene B (right). PAGE is
// at the far right of the trig row (next to trig 16).
const CONTROL_POSITIONS: Record<string, ControlPosition> = {
  // ===== CF CARD STATUS LED — small dot above the LCD =====
  'led-card-status': { x: 510, y: 18 },

  // ===== MAIN block (top-left corner) =====
  // Headphones Vol + Main Volume (small pair), Track LEVEL (large) in right cluster
  'knob-main-headphones': { x: 45,  y: 70 },
  'knob-main-level':      { x: 95,  y: 70 },
  // Track LEVEL knob lives in the right cluster next to Data A (big knob)
  'knob-track-level':     { x: 720, y: 70 },

  // ===== LCD DISPLAY (compact, centered in top half) =====
  // Rect dimensions handled inside LCDComponent (w=200, h=155).
  'display-lcd-screen': { x: 430, y: 45 },

  // ===== DATA ENTRY KNOBS (3 cols x 2 rows, top right) =====
  // Row 1: Level, A, B, C at y=70
  'knob-data-a': { x: 800, y: 70 },
  'knob-data-b': { x: 870, y: 70 },
  'knob-data-c': { x: 940, y: 70 },
  // Row 2: Tempo, D, E, F at y=140
  'knob-data-d': { x: 800, y: 140 },
  'knob-data-e': { x: 870, y: 140 },
  'knob-data-f': { x: 940, y: 140 },

  // ===== TEMPO (below LEVEL, top-right cluster) =====
  'key-tempo-tempo': { x: 720, y: 140 },

  // ===== RECORDER BUTTONS (REC1 REC2 REC3 — top-left row) =====
  'key-rec-1': { x: 160, y: 70 },
  'key-rec-2': { x: 220, y: 70 },
  'key-rec-3': { x: 280, y: 70 },

  // ===== TRANSPORT (STOP PLAY REC — directly below the LCD/param row) =====
  'key-transport-stop':   { x: 470, y: 295 },
  'key-transport-play':   { x: 535, y: 295 },
  'key-transport-record': { x: 600, y: 295 },

  // ===== TRACK PARAMETER KEYS (SRC AMP LFO FX1 FX2 directly below LCD) =====
  // Sits just below LCD bottom (LCD ends at y=200), slightly below the
  // PROJ-ARR row (y=185). The SRC cluster is its own cluster below the LCD,
  // not in the same horizontal row as the PROJ strip.
  'key-param-src': { x: 445, y: 230 },
  'key-param-amp': { x: 490, y: 230 },
  'key-param-lfo': { x: 535, y: 230 },
  'key-param-fx1': { x: 580, y: 230 },
  'key-param-fx2': { x: 625, y: 230 },

  // ===== FUNCTION CLUSTER — left side =====
  // Elektron panels use CLUSTERS, not grids. The MIDI button sits in its
  // own row between REC row and the PROJ row (mid-upper area of panel).
  // The PROJ-ARR strip is DIRECTLY BELOW the REC1/REC2/REC3 strip (still
  // in the upper half), not in the lower-middle area.
  //
  // Row layout (top to bottom):
  //   y=70  — REC1 REC2 REC3 (already placed above)
  //   y=130 — MIDI (alone on left column)
  //   y=185 — PROJ PART AED MIX ARR (extends past REC3)
  //   y=290 — FUNC CUE (separate lower-left cluster)
  //   y=325 — PTN BANK
  'key-func-midi': { x: 70,  y: 130 },

  'key-func-proj': { x: 80,  y: 185 },
  'key-func-part': { x: 145, y: 185 },
  'key-func-aed':  { x: 210, y: 185 },
  'key-func-mix':  { x: 275, y: 185 },
  'key-func-arr':  { x: 340, y: 185 },

  // Lower-left cluster (below the upper PROJ strip, separated by vertical gap)
  'key-func-func':  { x: 40,  y: 290 },
  'key-track-cue':  { x: 100, y: 290 },

  // ===== PATTERN / BANK — below FUNC/CUE =====
  'key-nav-pattern': { x: 40,  y: 325 },
  'key-nav-bank':    { x: 100, y: 325 },

  // ===== NAVIGATION (YES + UP + NO + LEFT/DOWN/RIGHT) =====
  // Layout from photo: YES top-left, UP top-right, NO below YES,
  // LEFT/DOWN/RIGHT horizontal row below UP.
  'key-nav-yes':   { x: 205, y: 285 },
  'key-nav-up':    { x: 290, y: 285 },
  'key-nav-no':    { x: 205, y: 325 },
  'key-nav-left':  { x: 250, y: 325 },
  'key-nav-down':  { x: 290, y: 325 },
  'key-nav-right': { x: 330, y: 325 },

  // ===== SCENE + CROSSFADER (right side, above trig row) =====
  // Scene A flanks the left of the crossfader, Scene B flanks the right.
  'key-scene-a': { x: 720, y: 290 },
  'slider-mix-crossfader': { x: 755, y: 300 }, // track starts at x=755, width=190
  'key-scene-b': { x: 960, y: 290 },

  // ===== PAGE KEY — far right of trig row, next to TRIG 16 =====
  'key-nav-page': { x: 945, y: 440 },
};

// Track keys T1-T4: vertical column on LEFT of the LCD
const TRACK_LEFT_X = 395;
const TRACK_RIGHT_X = 665;
const TRACK_Y_START = 65;
const TRACK_Y_SPACING = 35;
for (let i = 1; i <= 4; i++) {
  CONTROL_POSITIONS[`key-track-${i}`] = {
    x: TRACK_LEFT_X,
    y: TRACK_Y_START + (i - 1) * TRACK_Y_SPACING,
  };
}
// Track keys T5-T8: vertical column on RIGHT of the LCD
for (let i = 5; i <= 8; i++) {
  CONTROL_POSITIONS[`key-track-${i}`] = {
    x: TRACK_RIGHT_X,
    y: TRACK_Y_START + (i - 5) * TRACK_Y_SPACING,
  };
}

// Trig keys: 1x16 horizontal row at the bottom with a small gap between
// trig 8 and trig 9 (matches physical panel's T1-T8/T1-T8 split bracket).
const TRIG_Y = 440;
const TRIG_X_START = 30;
const TRIG_SPACING = 55;
const TRIG_GAP = 15; // extra pixels between trig 8 and trig 9
for (let i = 1; i <= 16; i++) {
  const offset = (i - 1) * TRIG_SPACING;
  const extra = i >= 9 ? TRIG_GAP : 0;
  CONTROL_POSITIONS[`key-trig-${i}`] = {
    x: TRIG_X_START + offset + extra,
    y: TRIG_Y,
  };
}

// ===== Styles =====

const styles = {
  panelBg: { fill: '#111' } as React.CSSProperties,
  panelBorder: {
    fill: 'none',
    stroke: '#333',
    strokeWidth: 1,
  } as React.CSSProperties,
  sectionLabel: {
    fill: '#999',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '7px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  knobBody: {
    fill: '#1a1a1a',
    stroke: '#555',
    strokeWidth: 1.2,
  } as React.CSSProperties,
  knobIndicator: {
    fill: 'none',
    stroke: '#ddd',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
  } as React.CSSProperties,
  knobLabel: {
    fill: '#aaa',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '6px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  // Rectangular button switch (all Octatrack switches are labeled
  // pushbuttons — based on Evolver's switchRect pattern).
  switchRect: {
    fill: '#222',
    stroke: '#666',
    strokeWidth: 0.8,
    rx: 2,
  } as React.CSSProperties,
  switchLabel: {
    fill: '#ddd',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '6px',
    fontWeight: 600,
    textAnchor: 'middle' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  trigRect: {
    fill: '#1e1e1e',
    stroke: '#888',
    strokeWidth: 1,
    rx: 3,
  } as React.CSSProperties,
  trigLabel: {
    fill: '#aaa',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '7px',
    fontWeight: 600,
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  ledOff: {
    fill: '#222',
    stroke: '#444',
    strokeWidth: 0.5,
  } as React.CSSProperties,
  lcdBg: {
    fill: '#2a2a22',
    stroke: '#555',
    strokeWidth: 1.5,
    rx: 3,
  } as React.CSSProperties,
  lcdText: {
    fill: '#c8b060',
    fontFamily: "'Monaco', 'Courier New', monospace",
    fontSize: '9px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  divider: {
    stroke: '#333',
    strokeWidth: 0.5,
    strokeDasharray: '2,2',
  } as React.CSSProperties,
} as const;

// ===== useKnobDrag Hook (vertical pointer delta -> MIDI value) =====

function useKnobDrag(
  controlId: string,
  currentValue: number,
  onChange?: (controlId: string, value: number) => void,
) {
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!onChange) return;
      e.preventDefault();
      const el = e.target as Element;
      if (el.setPointerCapture) {
        el.setPointerCapture(e.pointerId);
      }
      startY.current = e.clientY;
      startValue.current = currentValue;
      setIsDragging(true);
    },
    [currentValue, onChange],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !onChange) return;
      const delta = startY.current - e.clientY;
      const newValue = Math.max(
        0,
        Math.min(127, startValue.current + Math.round(delta / 3)),
      );
      if (newValue !== currentValue) {
        onChange(controlId, newValue);
      }
    },
    [isDragging, controlId, currentValue, onChange],
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const el = e.target as Element;
    if (el.releasePointerCapture) {
      el.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  }, []);

  return { isDragging, onPointerDown, onPointerMove, onPointerUp };
}

// ===== useHorizontalSliderDrag Hook =====
// Octatrack crossfader is the only HORIZONTAL slider in the app.
// Reads clientX delta (not clientY like Cascadia's vertical sliders).
function useHorizontalSliderDrag(
  controlId: string,
  currentValue: number,
  onChange?: (controlId: string, value: number) => void,
) {
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startValue = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!onChange) return;
      e.preventDefault();
      const el = e.target as Element;
      if (el.setPointerCapture) {
        el.setPointerCapture(e.pointerId);
      }
      startX.current = e.clientX;
      startValue.current = currentValue;
      setIsDragging(true);
    },
    [currentValue, onChange],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !onChange) return;
      const delta = e.clientX - startX.current;
      const newValue = Math.max(
        0,
        Math.min(127, startValue.current + Math.round(delta / 3)),
      );
      if (newValue !== currentValue) {
        onChange(controlId, newValue);
      }
    },
    [isDragging, controlId, currentValue, onChange],
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const el = e.target as Element;
    if (el.releasePointerCapture) {
      el.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  }, []);

  return { isDragging, onPointerDown, onPointerMove, onPointerUp };
}

// ===== computeZoomViewBox (same helper as Cascadia; reads SECTION_BOUNDS) =====

function computeZoomViewBox(sections: string[]): string | null {
  const padding = 20;
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const name of sections) {
    const b = SECTION_BOUNDS[name];
    if (!b) continue;
    minX = Math.min(minX, b.x);
    minY = Math.min(minY, b.y);
    maxX = Math.max(maxX, b.x + b.width);
    maxY = Math.max(maxY, b.y + b.height);
  }
  if (minX === Infinity) return null;
  return `${minX - padding} ${minY - padding} ${maxX - minX + padding * 2} ${maxY - minY + padding * 2}`;
}

// ===== KnobGroup Component =====

interface KnobProps {
  id: string;
  x: number;
  y: number;
  label: string;
  rotation: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  dragHandlers: ReturnType<typeof useKnobDrag>;
}

function KnobGroupInner({
  id,
  x,
  y,
  label,
  rotation,
  highlighted,
  highlightColor,
  dragHandlers,
}: KnobProps) {
  const r = 14;

  return (
    <g
      id={id}
      data-control-id={id}
      transform={`translate(${x}, ${y})`}
      onPointerDown={dragHandlers.onPointerDown}
      onPointerMove={dragHandlers.onPointerMove}
      onPointerUp={dragHandlers.onPointerUp}
      style={{ cursor: dragHandlers.isDragging ? 'grabbing' : 'grab' }}
    >
      {highlighted && (
        <circle
          r={r + 4}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      {dragHandlers.isDragging && (
        <circle r={r + 4} fill="var(--color-accent)" fillOpacity={0.4} />
      )}
      <circle r={r} style={styles.knobBody} />
      <line
        x1={0}
        y1={-3}
        x2={0}
        y2={-11}
        style={styles.knobIndicator}
        transform={`rotate(${rotation})`}
      />
      <text y={r + 10} style={styles.knobLabel}>
        {label}
      </text>
    </g>
  );
}

const KnobGroup = memo(KnobGroupInner);

function InteractiveKnob({
  id,
  x,
  y,
  label,
  value,
  highlighted,
  highlightColor,
  onChange,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  value: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  onChange?: (controlId: string, value: number) => void;
}) {
  const dragHandlers = useKnobDrag(id, value, onChange);
  const rotation = midiToRotation(value);

  return (
    <KnobGroup
      id={id}
      x={x}
      y={y}
      label={label}
      rotation={rotation}
      highlighted={highlighted}
      highlightColor={highlightColor}
      dragHandlers={dragHandlers}
    />
  );
}

// ===== Rectangular Button Switch (all Octatrack "switches" are labeled
// pushbuttons — same visual pattern as Evolver's switchRect) =====

// Trigs get their own taller rectangle with a number label.
const TRIG_IDS = new Set(Array.from({ length: 16 }, (_, i) => `key-trig-${i + 1}`));
const TRACK_IDS = new Set(Array.from({ length: 8 }, (_, i) => `key-track-${i + 1}`));

// Accent-pip LEDs on special buttons (physical panel: PLAY green, REC red)
const BUTTON_ACCENTS: Record<string, string> = {
  'key-transport-play':   '#4ab85a',
  'key-transport-record': '#d14b4b',
};

function ButtonSwitchComponent({
  id,
  x,
  y,
  label,
  highlighted,
  highlightColor,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}) {
  const isTrig = TRIG_IDS.has(id);
  const isTrack = TRACK_IDS.has(id);
  const w = isTrig ? 40 : isTrack ? 40 : 46;
  const h = isTrig ? 28 : isTrack ? 26 : 20;
  const accent = BUTTON_ACCENTS[id];

  return (
    <g
      id={id}
      data-control-id={id}
      transform={`translate(${x}, ${y})`}
      style={{ cursor: 'default' }}
    >
      {highlighted && (
        <rect
          x={-w / 2 - 3}
          y={-h / 2 - 3}
          width={w + 6}
          height={h + 6}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          rx={4}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        style={isTrig || isTrack ? styles.trigRect : styles.switchRect}
      />
      <text
        x={0}
        y={isTrig ? 3 : isTrack ? 3 : 2}
        style={isTrig || isTrack ? styles.trigLabel : styles.switchLabel}
      >
        {label}
      </text>
      {accent && (
        // Small LED pip in the top-right corner of the button
        <circle cx={w / 2 - 4} cy={-h / 2 + 4} r={1.8} fill={accent} />
      )}
    </g>
  );
}

// ===== LCD display renderer =====
// The LCD is the ONE piece of inline-JSX-style rendering in an otherwise
// data-driven panel. It renders a large rect plus a few guide lines hinting
// at the 6-parameter on-screen layout.

function LCDComponent({
  id,
  x,
  y,
  highlighted,
  highlightColor,
}: {
  id: string;
  x: number;
  y: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}) {
  // Smaller, more squarish LCD — central anchor flanked by T1-T4 / T5-T8.
  const width = 200;
  const height = 155;

  return (
    <g id={id} data-control-id={id} transform={`translate(${x}, ${y})`}>
      {highlighted && (
        <rect
          x={-3}
          y={-3}
          width={width + 6}
          height={height + 6}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          rx={5}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      <rect x={0} y={0} width={width} height={height} style={styles.lcdBg} />
      {/* 6-parameter grid hint: 3-column x 2-row vertical dividers */}
      <line x1={width / 3} y1={8} x2={width / 3} y2={height - 8} stroke="#4a4a3a" strokeWidth={0.5} strokeDasharray="2,3" />
      <line x1={(2 * width) / 3} y1={8} x2={(2 * width) / 3} y2={height - 8} stroke="#4a4a3a" strokeWidth={0.5} strokeDasharray="2,3" />
      <line x1={8} y1={height / 2} x2={width - 8} y2={height / 2} stroke="#4a4a3a" strokeWidth={0.5} strokeDasharray="2,3" />
      {/* Placeholder text */}
      <text x={width / 2} y={height / 2 - 14} style={styles.lcdText}>
        OCTATRACK
      </text>
      <text
        x={width / 2}
        y={height / 2 + 6}
        style={{ ...styles.lcdText, fontSize: '6px', fill: '#8a7a40' }}
      >
        PTN A01 PART 1
      </text>
      <text
        x={width / 2}
        y={height / 2 + 18}
        style={{ ...styles.lcdText, fontSize: '6px', fill: '#8a7a40' }}
      >
        BPM 120.0
      </text>
      {/* "Octatrack MKII" wordmark at bottom of screen area */}
      <text
        x={width / 2}
        y={height - 10}
        style={{ ...styles.lcdText, fontSize: '7px', fill: '#8a7a40', fontWeight: 700 }}
      >
        Octatrack MKII
      </text>
    </g>
  );
}

// ===== Horizontal Slider (Crossfader) =====

function CrossfaderComponent({
  id,
  x,
  y,
  label,
  value,
  highlighted,
  highlightColor,
  onChange,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  value: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  onChange?: (controlId: string, value: number) => void;
}) {
  const dragHandlers = useHorizontalSliderDrag(id, value, onChange);
  const trackWidth = 190;
  const trackHeight = 8;
  const thumbWidth = 18;
  const thumbHeight = 22;
  const pos = midiToSliderPosition(value);
  const thumbX = x + pos * trackWidth - thumbWidth / 2;

  return (
    <g
      id={id}
      data-control-id={id}
      onPointerDown={dragHandlers.onPointerDown}
      onPointerMove={dragHandlers.onPointerMove}
      onPointerUp={dragHandlers.onPointerUp}
      style={{ cursor: dragHandlers.isDragging ? 'grabbing' : 'grab' }}
    >
      {highlighted && (
        <rect
          x={x - 3}
          y={y - thumbHeight / 2 - 3}
          width={trackWidth + 6}
          height={thumbHeight + 6}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          rx={4}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      {/* Track */}
      <rect
        x={x}
        y={y - trackHeight / 2}
        width={trackWidth}
        height={trackHeight}
        fill="#111"
        stroke="#444"
        strokeWidth={0.8}
        rx={2}
      />
      {/* Thumb */}
      <rect
        x={thumbX}
        y={y - thumbHeight / 2}
        width={thumbWidth}
        height={thumbHeight}
        fill="#2a2a2a"
        stroke="#888"
        strokeWidth={1}
        rx={2}
      />
      <text x={x + trackWidth / 2} y={y + 22} style={styles.knobLabel}>
        {label}
      </text>
    </g>
  );
}

// ===== LED Component =====

function LEDComponent({
  id,
  x,
  y,
  highlighted,
  highlightColor,
}: {
  id: string;
  x: number;
  y: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}) {
  return (
    <g id={id} data-control-id={id} transform={`translate(${x}, ${y})`}>
      {highlighted && (
        <circle
          r={6}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      <circle r={3} style={styles.ledOff} />
    </g>
  );
}

// ===== Main OctatrackPanel Component =====

function OctatrackPanelInner({
  knobValues,
  highlights,
  activeSections,
  zoomSections,
  // cables is accepted for API parity with CascadiaPanel but intentionally ignored.
  cables: _cables,
  onKnobChange,
  className,
}: OctatrackPanelProps) {
  // Silence the "unused variable" lint: reference _cables so TS/linters
  // see it's consumed.
  void _cables;

  const [internalValues, setInternalValues] = useState<Record<string, number>>({});
  const [hoveredControl, setHoveredControl] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const effectiveValues = knobValues ?? internalValues;
  const effectiveOnChange =
    onKnobChange ??
    ((id: string, val: number) => {
      setInternalValues((prev) => ({ ...prev, [id]: val }));
    });

  const getVal = (id: string) => effectiveValues[id] ?? 64;
  const isHighlighted = (id: string) =>
    highlights?.some((h) => h.controlId === id) ?? false;
  const getHighlightColor = (id: string) =>
    highlights?.find((h) => h.controlId === id)?.color;

  const viewBox =
    (zoomSections?.length ? computeZoomViewBox(zoomSections) : null) ??
    '0 0 1000 500';

  // Event delegation for hover tooltip
  const findControlId = useCallback((target: EventTarget | null): string | null => {
    let el = target as Element | null;
    while (el && el !== svgRef.current) {
      const id = el.getAttribute('id');
      if (id && CONTROL_METADATA[id]) return id;
      el = el.parentElement;
    }
    return null;
  }, []);

  const onMouseOver = useCallback(
    (e: React.MouseEvent) => {
      const id = findControlId(e.target);
      setHoveredControl(id);
    },
    [findControlId],
  );

  const onMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      const related = findControlId(e.relatedTarget);
      if (!related) setHoveredControl(null);
    },
    [findControlId],
  );

  return (
    <div className={clsx('relative', className)}>
      <motion.svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 500"
        whileInView={{ viewBox: viewBox }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        width="100%"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <defs>
          <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feFlood floodColor="#3388ff" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feFlood floodColor="#ffaa33" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Panel background */}
        <rect style={styles.panelBg} x={0} y={0} width={1000} height={500} />
        <rect style={styles.panelBorder} x={0} y={0} width={1000} height={500} />

        {/* Horizontal divider bars separating functional clusters.
            Elektron panels use clusters, not uniform grids, so dividers only
            appear where there's genuine horizontal separation of cluster
            groups — not between every row of controls. */}
        {/* Below upper cluster (LCD, PROJ row, data knobs) and above the
            lower-left lower-middle clusters (FUNC/CUE, nav, transport). */}
        <rect fill="#1a1a1a" stroke="#333" strokeWidth={0.5} x={0} y={265} width={1000} height={4} />
        {/* Above the trig row */}
        <rect fill="#1a1a1a" stroke="#333" strokeWidth={0.5} x={0} y={400} width={1000} height={6} />

        {/* activeSections tint rectangles */}
        {activeSections?.map((section) => {
          const bounds = SECTION_BOUNDS[section];
          if (!bounds) return null;
          return (
            <rect
              key={section}
              x={bounds.x}
              y={bounds.y}
              width={bounds.width}
              height={bounds.height}
              rx={4}
              fill="rgba(255,255,255,0.03)"
              fillOpacity={0.08}
              style={{ transition: 'opacity 150ms ease-out' }}
            />
          );
        })}

        {/* Section labels in divider bars */}
        {MODULE_ORDER.map((moduleName) => {
          const bounds = SECTION_BOUNDS[moduleName];
          if (!bounds) return null;
          const displayName = MODULE_DISPLAY_NAMES[moduleName] ?? moduleName;
          if (!displayName) return null;
          // Labels placed just above each section
          return (
            <text
              key={`label-${moduleName}`}
              style={styles.sectionLabel}
              x={bounds.x + bounds.width / 2}
              y={bounds.y < 20 ? bounds.y + 10 : bounds.y - 4}
            >
              {displayName}
            </text>
          );
        })}

        {/* Render all controls by module */}
        {MODULE_ORDER.map((moduleName) => {
          const controls = Object.values(CONTROL_METADATA).filter(
            (c) => c.module === moduleName,
          );

          return (
            <g key={`module-${moduleName}`}>
              {controls.map((ctrl) => {
                const pos = CONTROL_POSITIONS[ctrl.id];
                if (!pos) return null;

                const highlighted = isHighlighted(ctrl.id);
                const highlightColor = getHighlightColor(ctrl.id);

                switch (ctrl.type) {
                  case 'knob':
                    return (
                      <InteractiveKnob
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        label={ctrl.name}
                        value={getVal(ctrl.id)}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                        onChange={effectiveOnChange}
                      />
                    );
                  case 'slider':
                    return (
                      <CrossfaderComponent
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        label={ctrl.name}
                        value={getVal(ctrl.id)}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                        onChange={effectiveOnChange}
                      />
                    );
                  case 'switch':
                    return (
                      <ButtonSwitchComponent
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        label={ctrl.name}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                      />
                    );
                  case 'led':
                    return (
                      <LEDComponent
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                      />
                    );
                  case 'display':
                    return (
                      <LCDComponent
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </g>
          );
        })}
      </motion.svg>

      <PanelTooltip
        controlId={hoveredControl}
        svgRef={svgRef}
        knobValues={effectiveValues}
      />
    </div>
  );
}

const OctatrackPanel = memo(OctatrackPanelInner);

export { OctatrackPanel };
