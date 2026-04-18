'use client';

import React, { useState, useRef, useCallback, memo } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  CONTROL_METADATA,
  SECTION_BOUNDS,
  midiToRotation,
} from '@/lib/maths-panel-data';
import type { MathsControlMeta } from '@/lib/maths-panel-data';

// ===== Types =====

interface MathsPanelProps {
  knobValues?: Record<string, number>;
  highlights?: Array<{ controlId: string; color: 'blue' | 'amber' }>;
  activeSections?: string[];
  zoomSections?: string[];
  cables?: Array<{
    sourceId: string;
    destId: string;
    signalType: 'audio' | 'cv' | 'gate' | 'modulation' | 'default';
    purpose?: string;
  }>;
  onKnobChange?: (controlId: string, value: number) => void;
  className?: string;
}

// ===== Cable Colors =====

const CABLE_COLORS: Record<string, string> = {
  audio: '#ff6644',
  cv: '#3388ff',
  gate: '#44cc66',
  modulation: '#ffaa33',
  default: '#888888',
};

// ===== Channel order for layout =====

const CHANNEL_ORDER = ['ch1', 'ch2', 'ch3', 'ch4', 'buses'] as const;

// ===== Channel display names =====

const CHANNEL_DISPLAY_NAMES: Record<string, string> = {
  'ch1': 'CH 1',
  'ch2': 'CH 2',
  'ch3': 'CH 3',
  'ch4': 'CH 4',
  'buses': 'BUSES',
};

// ===== Hand-placed control positions =====
// Imported from maths-panel-data.ts via CONTROL_POSITIONS
// ViewBox: 0 0 300 700 (20HP eurorack module)

interface ControlPosition { x: number; y: number }

const CONTROL_POSITIONS: Record<string, ControlPosition> = {
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

// ===== Jack positions lookup (for cable rendering) =====

const JACK_POSITIONS: Record<string, { x: number; y: number }> = {};
for (const [id, meta] of Object.entries(CONTROL_METADATA)) {
  if (meta.type === 'jack-in' || meta.type === 'jack-out') {
    const pos = CONTROL_POSITIONS[id];
    if (pos) JACK_POSITIONS[id] = pos;
  }
}

// ===== Styles =====

const styles = {
  panelBg: { fill: '#1a1a1a' } as React.CSSProperties,
  panelBorder: {
    fill: 'none',
    stroke: '#444',
    strokeWidth: 1.5,
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
  brandText: {
    fill: '#666',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  titleText: {
    fill: '#ccc',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '4px',
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
    fontSize: '5.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  jackLabel: {
    fill: '#aaa',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '4.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  ledOff: {
    fill: '#222',
    stroke: '#444',
    strokeWidth: 0.5,
  } as React.CSSProperties,
  divider: {
    stroke: '#333',
    strokeWidth: 0.5,
    strokeDasharray: '2,2',
  } as React.CSSProperties,
  tooltipBg: {
    position: 'fixed' as const,
    background: '#161616',
    border: '1px solid #333333',
    borderRadius: '8px',
    padding: '8px',
    maxWidth: '200px',
    zIndex: 30,
    pointerEvents: 'none' as const,
  } as React.CSSProperties,
  tooltipName: {
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    color: '#e8e8e8',
    lineHeight: 1.3,
  } as React.CSSProperties,
  tooltipValue: {
    fontSize: '13px',
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 400,
    color: '#a3e635',
    lineHeight: 1.3,
  } as React.CSSProperties,
} as const;

// ===== useKnobDrag Hook =====

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

// ===== computeZoomViewBox =====

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

// ===== CablePath Component =====

interface CablePathProps {
  sourceId: string;
  destId: string;
  signalType: 'audio' | 'cv' | 'gate' | 'modulation' | 'default';
  purpose?: string;
}

function CablePath({ sourceId, destId, signalType, purpose }: CablePathProps) {
  const src = JACK_POSITIONS[sourceId];
  const dst = JACK_POSITIONS[destId];
  if (!src || !dst) return null;

  const dx = Math.abs(dst.x - src.x);
  const midX = (src.x + dst.x) / 2;
  const droop = Math.min(80, 30 + dx * 0.15);
  const midY = Math.max(src.y, dst.y) + droop;

  const color = CABLE_COLORS[signalType] || CABLE_COLORS.default;

  return (
    <path
      d={`M ${src.x},${src.y} Q ${midX},${midY} ${dst.x},${dst.y}`}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeOpacity={0.8}
      strokeLinecap="round"
      style={{ pointerEvents: 'stroke' }}
    >
      {purpose && (
        <title>{`${sourceId} -> ${destId}: ${purpose}`}</title>
      )}
    </path>
  );
}

// ===== KnobGroup Component (memo'd) =====

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
  const r = 12;

  return (
    <g
      id={id}
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
        y2={-10}
        style={styles.knobIndicator}
        transform={`rotate(${rotation})`}
      />
      <text y={20} style={styles.knobLabel}>
        {label}
      </text>
    </g>
  );
}

const KnobGroup = memo(KnobGroupInner);

// ===== Interactive Knob Wrapper =====

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

// ===== ButtonComponent (Cycle buttons) =====

function ButtonComponent({
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
  const r = 8;

  return (
    <g id={id} transform={`translate(${x}, ${y})`} style={{ cursor: 'pointer' }}>
      {highlighted && (
        <circle
          r={r + 4}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      <circle r={r} fill="#2a2a2a" stroke="#666" strokeWidth={1.2} />
      <circle r={r - 3} fill="#333" stroke="none" />
      <text y={16} style={styles.knobLabel}>
        {label}
      </text>
    </g>
  );
}

// ===== JackGroup Component =====

function JackGroupComponent({
  id,
  x,
  y,
  label,
  isOutput,
  highlighted,
  highlightColor,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  isOutput: boolean;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}) {
  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      {highlighted && (
        <circle
          r={10}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      <circle
        r={6}
        fill={isOutput ? '#e8e8e8' : '#1a1a1a'}
        stroke={isOutput ? '#fff' : '#555'}
        strokeWidth={isOutput ? 1.5 : 1}
      />
      <text y={12} style={styles.jackLabel}>
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
    <g id={id} transform={`translate(${x}, ${y})`}>
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

// ===== Maths Panel Tooltip =====
// Self-contained tooltip that uses Maths CONTROL_METADATA (not Evolver's)

function MathsPanelTooltip({
  controlId,
  svgRef,
  knobValues,
}: {
  controlId: string | null;
  svgRef: React.RefObject<SVGSVGElement | null>;
  knobValues?: Record<string, number>;
}) {
  const [position, setPosition] = useState<{ left: number; top: number; flipped: boolean } | null>(null);

  React.useEffect(() => {
    if (!controlId || !svgRef.current) {
      setPosition(null);
      return;
    }
    const el = svgRef.current.querySelector(`#${controlId}`);
    if (!el) { setPosition(null); return; }
    const rect = el.getBoundingClientRect();
    const left = rect.left + rect.width / 2;
    const top = rect.top - 8;
    if (top < 0) {
      setPosition({ left, top: rect.bottom + 8, flipped: true });
    } else {
      setPosition({ left, top, flipped: false });
    }
  }, [controlId, svgRef]);

  if (!controlId || !position) return null;

  const meta = CONTROL_METADATA[controlId];
  if (!meta) return null;

  const value = knobValues?.[controlId];
  const transform = position.flipped ? 'translate(-50%, 0)' : 'translate(-50%, -100%)';

  return (
    <div style={{ ...styles.tooltipBg, left: position.left, top: position.top, transform }}>
      <div style={styles.tooltipName}>{meta.name}</div>
      {value !== undefined && (
        <div style={styles.tooltipValue}>{value} / 127</div>
      )}
    </div>
  );
}

// ===== Main MathsPanel Component =====

function MathsPanelInner({
  knobValues,
  highlights,
  activeSections,
  zoomSections,
  cables,
  onKnobChange,
  className,
}: MathsPanelProps) {
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
    '0 0 300 700';

  // Event delegation for hover
  const findControlId = useCallback(
    (target: EventTarget | null): string | null => {
      let el = target as Element | null;
      while (el && el !== svgRef.current) {
        const id = el.getAttribute('id');
        if (id && CONTROL_METADATA[id]) return id;
        el = el.parentElement;
      }
      return null;
    },
    [],
  );

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
        viewBox="0 0 300 700"
        whileInView={{ viewBox: viewBox }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        width="100%"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <defs>
          {/* Glow filters for highlights */}
          <filter id="maths-glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feFlood floodColor="#3388ff" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="maths-glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feFlood floodColor="#ffaa33" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Panel background — dark Make Noise aesthetic */}
        <rect style={styles.panelBg} x="0" y="0" width="300" height="700" rx="4" />
        <rect style={styles.panelBorder} x="0" y="0" width="300" height="700" rx="4" />

        {/* Brand text */}
        <text style={styles.brandText} x={150} y={18}>MAKE NOISE</text>

        {/* Title */}
        <text style={styles.titleText} x={150} y={690}>MATHS</text>

        {/* Section separator lines */}
        {/* Horizontal divider below cycle buttons */}
        <line style={styles.divider} x1={10} y1={80} x2={290} y2={80} />
        {/* Horizontal divider below Rise/Fall/Response knobs */}
        <line style={styles.divider} x1={10} y1={205} x2={290} y2={205} />
        {/* Horizontal divider below attenuverters */}
        <line style={styles.divider} x1={10} y1={275} x2={290} y2={275} />
        {/* Horizontal divider below signal/trig jacks */}
        <line style={styles.divider} x1={10} y1={365} x2={290} y2={365} />
        {/* Horizontal divider below CV jacks */}
        <line style={styles.divider} x1={10} y1={450} x2={290} y2={450} />
        {/* Horizontal divider below cycle-in / LEDs */}
        <line style={styles.divider} x1={10} y1={520} x2={290} y2={520} />
        {/* Horizontal divider below output jacks */}
        <line style={styles.divider} x1={10} y1={600} x2={290} y2={600} />
        {/* Vertical divider between Ch1 and center */}
        <line style={styles.divider} x1={108} y1={210} x2={108} y2={595} />
        {/* Vertical divider between center and Ch4 */}
        <line style={styles.divider} x1={192} y1={210} x2={192} y2={595} />

        {/* Section tint rectangles */}
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

        {/* Section labels */}
        <text style={styles.sectionLabel} x={55} y={30}>CH 1</text>
        <text style={styles.sectionLabel} x={120} y={220}>CH 2</text>
        <text style={styles.sectionLabel} x={180} y={220}>CH 3</text>
        <text style={styles.sectionLabel} x={245} y={30}>CH 4</text>
        <text style={styles.sectionLabel} x={150} y={615}>BUSES</text>

        {/* Render all controls by channel */}
        {CHANNEL_ORDER.map((channelName) => {
          const controls = Object.values(CONTROL_METADATA).filter(
            (c) => c.module === channelName,
          );

          return (
            <g key={`channel-${channelName}`}>
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
                  case 'button':
                    return (
                      <ButtonComponent
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        label={ctrl.name}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                      />
                    );
                  case 'jack-in':
                  case 'jack-out':
                    return (
                      <JackGroupComponent
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        label={ctrl.name}
                        isOutput={ctrl.type === 'jack-out'}
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
                  default:
                    return null;
                }
              })}
            </g>
          );
        })}

        {/* Cable paths - rendered LAST for highest z-order */}
        {cables?.map((cable, i) => (
          <CablePath
            key={`cable-${i}`}
            sourceId={cable.sourceId}
            destId={cable.destId}
            signalType={cable.signalType}
            purpose={cable.purpose}
          />
        ))}
      </motion.svg>

      {/* Tooltip */}
      <MathsPanelTooltip
        controlId={hoveredControl}
        svgRef={svgRef}
        knobValues={effectiveValues}
      />
    </div>
  );
}

const MathsPanel = memo(MathsPanelInner);

export { MathsPanel };
