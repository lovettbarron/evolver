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
  main: 'MAIN',
  lcd: '',
  data: 'DATA ENTRY',
  transport: 'TRANSPORT',
  tempo: '',
  func: '',
  param: 'TRACK PARAMS',
  scene: 'SCENE',
  mix: '',
  rec: 'RECORDERS',
  nav: 'NAVIGATION',
  track: 'TRACKS',
  trig: 'TRIGS',
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

const CONTROL_POSITIONS: Record<string, ControlPosition> = {
  // ===== CF CARD STATUS LED — top-left, above LCD =====
  'led-card-status': { x: 155, y: 12 },

  // ===== MAIN block (top-left) =====
  // Volume knob + headphones knob stacked vertically
  'knob-main-level':      { x: 45, y: 55 },
  'knob-main-headphones': { x: 95, y: 55 },
  // Track LEVEL knob sits in main module bounds (larger knob near right)
  'knob-track-level':     { x: 70, y: 115 },

  // ===== LCD DISPLAY (upper-center anchor) =====
  'display-lcd-screen': { x: 130, y: 25 },  // rect starts here; width/height inside renderer

  // ===== DATA ENTRY KNOBS (3 cols x 2 rows, right of LCD) =====
  // Row 1: A, B, C
  'knob-data-a': { x: 600, y: 55 },
  'knob-data-b': { x: 665, y: 55 },
  'knob-data-c': { x: 730, y: 55 },
  // Row 2: D, E, F
  'knob-data-d': { x: 600, y: 115 },
  'knob-data-e': { x: 665, y: 115 },
  'knob-data-f': { x: 730, y: 115 },

  // ===== TRANSPORT (top-right: PLAY STOP REC horizontally) =====
  'key-transport-play':   { x: 820, y: 50 },
  'key-transport-stop':   { x: 880, y: 50 },
  'key-transport-record': { x: 940, y: 50 },

  // ===== TEMPO (below transport) =====
  'key-tempo-tempo':      { x: 820, y: 120 },

  // ===== FUNCTION CLUSTER (horizontal row below LCD) =====
  // FUNC | PROJ | PART | AED | MIX | ARR | MIDI
  'key-func-func': { x: 150, y: 180 },
  'key-func-proj': { x: 210, y: 180 },
  'key-func-part': { x: 270, y: 180 },
  'key-func-aed':  { x: 330, y: 180 },
  'key-func-mix':  { x: 390, y: 180 },
  'key-func-arr':  { x: 450, y: 180 },
  'key-func-midi': { x: 510, y: 180 },

  // ===== TRACK PARAMETER KEYS (row right of function cluster) =====
  // SRC AMP LFO FX1 FX2
  'key-param-src': { x: 585, y: 180 },
  'key-param-amp': { x: 625, y: 180 },
  'key-param-lfo': { x: 665, y: 180 },
  'key-param-fx1': { x: 705, y: 180 },
  'key-param-fx2': { x: 745, y: 180 },

  // ===== SCENE A / SCENE B (flanking the crossfader, mid-left) =====
  'key-scene-a': { x: 30, y: 245 },
  'key-scene-b': { x: 95, y: 245 },

  // ===== CROSSFADER (horizontal, middle) =====
  // Positioned so track starts at x=140 (track width = 380 in renderer)
  'slider-mix-crossfader': { x: 140, y: 248 },

  // ===== RECORDERS (REC1 REC2 REC3) — small cluster mid-right =====
  'key-rec-1': { x: 575, y: 245 },
  'key-rec-2': { x: 620, y: 245 },
  'key-rec-3': { x: 665, y: 245 },

  // ===== NAVIGATION: arrows + YES/NO + PTN/BANK/PAGE cluster (right) =====
  // Arrows in diamond layout: UP top, LEFT/DOWN/RIGHT bottom row
  'key-nav-up':    { x: 780, y: 230 },
  'key-nav-left':  { x: 755, y: 260 },
  'key-nav-down':  { x: 780, y: 275 },
  'key-nav-right': { x: 805, y: 260 },
  // YES / NO to the right of arrows
  'key-nav-yes':   { x: 855, y: 245 },
  'key-nav-no':    { x: 855, y: 280 },
  // PTN / BANK / PAGE — vertical column far right
  'key-nav-pattern': { x: 915, y: 230 },
  'key-nav-bank':    { x: 915, y: 265 },
  'key-nav-page':    { x: 915, y: 300 },

  // ===== TRACK KEYS (T1-T8) — bottom area, above the trigs =====
  // Single 1x8 row across the left 480px of the panel
  // (Physical layout: 4+4 flanking LCD is the MKI arrangement; MKII MKII
  // groups them 1x8 below the LCD. Follow-up session can verify and
  // re-arrange if needed.)
  // Positions generated in loop below.

  // ===== TRIG KEYS (TRIG1-TRIG16) — bottom row across full panel =====
  // Positions generated in loop below.

  // ===== CUE key — near T8 on the right edge of tracks row =====
  'key-track-cue': { x: 530, y: 345 },
};

// Track keys: 1x8 horizontal row
const TRACK_Y = 345;
const TRACK_X_START = 35;
const TRACK_SPACING = 60;
for (let i = 1; i <= 8; i++) {
  CONTROL_POSITIONS[`key-track-${i}`] = {
    x: TRACK_X_START + (i - 1) * TRACK_SPACING,
    y: TRACK_Y,
  };
}

// Trig keys: 1x16 horizontal row at the bottom of the panel
const TRIG_Y = 445;
const TRIG_X_START = 40;
const TRIG_SPACING = 60;
for (let i = 1; i <= 16; i++) {
  CONTROL_POSITIONS[`key-trig-${i}`] = {
    x: TRIG_X_START + (i - 1) * TRIG_SPACING,
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
  const width = 420;
  const height = 120;

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
      <text x={width / 2} y={height / 2 - 20} style={styles.lcdText}>
        OCTATRACK
      </text>
      <text
        x={width / 2}
        y={height / 2 + 12}
        style={{ ...styles.lcdText, fontSize: '7px', fill: '#8a7a40' }}
      >
        PTN A01  PART 1  BPM 120.0
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
  const trackWidth = 380;
  const trackHeight = 8;
  const thumbWidth = 20;
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

        {/* Horizontal divider bars separating functional rows */}
        <rect fill="#1a1a1a" stroke="#333" strokeWidth={0.5} x={0} y={160} width={1000} height={10} />
        <rect fill="#1a1a1a" stroke="#333" strokeWidth={0.5} x={0} y={215} width={1000} height={6} />
        <rect fill="#1a1a1a" stroke="#333" strokeWidth={0.5} x={0} y={315} width={1000} height={6} />
        <rect fill="#1a1a1a" stroke="#333" strokeWidth={0.5} x={0} y={405} width={1000} height={6} />

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
