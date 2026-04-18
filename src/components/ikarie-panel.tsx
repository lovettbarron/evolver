'use client';

import React, { useState, useRef, useCallback, memo } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  CONTROL_METADATA,
  CONTROL_POSITIONS,
  SECTION_BOUNDS,
  midiToRotation,
  midiToSliderPosition,
} from '@/lib/ikarie-panel-data';

// ===== Types =====

interface IkariePanelProps {
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

// ===== Constants =====

const VIEWBOX = '0 0 170 380';

// Diagonal angle for the RESONANCE fader (upper-left to lower-right, matching physical panel)
const DIAGONAL_SLIDER_ANGLE = -35;

const CABLE_COLORS: Record<string, string> = {
  audio: '#ff6644',
  cv: '#3388ff',
  gate: '#44cc66',
  modulation: '#ffaa33',
  default: '#888888',
};

// 2-position switches (all others are 3-position)
const TWO_WAY_SWITCHES = new Set(['switch-ikarie-pan-spread']);

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
    fontSize: '5px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.8px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  brandText: {
    fill: '#666',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '6px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  titleText: {
    fill: '#ccc',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
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
    fontSize: '4.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  jackLabel: {
    fill: '#aaa',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '3.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  sliderTrack: {
    fill: '#0a0a0a',
    stroke: '#333',
    strokeWidth: 0.8,
  } as React.CSSProperties,
  sliderThumb: {
    fill: '#444',
    stroke: '#888',
    strokeWidth: 1,
  } as React.CSSProperties,
  switchCircle: {
    fill: '#222',
    stroke: '#555',
    strokeWidth: 0.8,
  } as React.CSSProperties,
  switchActive: {
    fill: '#cc4422',
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

function CablePath({
  sourceId,
  destId,
  signalType,
  purpose,
}: {
  sourceId: string;
  destId: string;
  signalType: 'audio' | 'cv' | 'gate' | 'modulation' | 'default';
  purpose?: string;
}) {
  const src = JACK_POSITIONS[sourceId];
  const dst = JACK_POSITIONS[destId];
  if (!src || !dst) return null;

  const dx = Math.abs(dst.x - src.x);
  const midX = (src.x + dst.x) / 2;
  const droop = Math.min(40, 15 + dx * 0.1);
  const midY = Math.max(src.y, dst.y) + droop;

  const color = CABLE_COLORS[signalType] || CABLE_COLORS.default;

  return (
    <path
      d={`M ${src.x},${src.y} Q ${midX},${midY} ${dst.x},${dst.y}`}
      fill="none"
      stroke={color}
      strokeWidth={2.5}
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

// ===== Knob Component =====

function InteractiveKnob({
  id,
  x,
  y,
  label,
  value,
  highlighted,
  highlightColor,
  onChange,
  large,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  value: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  onChange?: (controlId: string, value: number) => void;
  large?: boolean;
}) {
  const dragHandlers = useKnobDrag(id, value, onChange);
  const rotation = midiToRotation(value);
  const r = large ? 16 : 10;

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
          filter={`url(#ikarie-glow-${highlightColor || 'blue'})`}
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
        y2={-(r - 2)}
        style={styles.knobIndicator}
        transform={`rotate(${rotation})`}
      />
      <text y={r + 8} style={styles.knobLabel}>
        {label}
      </text>
    </g>
  );
}

// ===== Slider Component (Vertical Fader) =====

function SliderComponent({
  id,
  x,
  y,
  label,
  value,
  highlighted,
  highlightColor,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  value: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}) {
  const trackHeight = 60;
  const trackWidth = 6;
  const thumbWidth = 14;
  const thumbHeight = 8;
  const position = midiToSliderPosition(value);
  const thumbY = trackHeight * (1 - position) - thumbHeight / 2;

  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      {highlighted && (
        <rect
          x={-thumbWidth / 2 - 3}
          y={-3}
          width={thumbWidth + 6}
          height={trackHeight + 6}
          rx={4}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#ikarie-glow-${highlightColor || 'blue'})`}
        />
      )}
      {/* Track */}
      <rect
        x={-trackWidth / 2}
        y={0}
        width={trackWidth}
        height={trackHeight}
        rx={2}
        style={styles.sliderTrack}
      />
      {/* Thumb */}
      <rect
        x={-thumbWidth / 2}
        y={thumbY}
        width={thumbWidth}
        height={thumbHeight}
        rx={2}
        style={styles.sliderThumb}
      />
      {/* Label */}
      <text y={trackHeight + 12} style={styles.knobLabel}>
        {label}
      </text>
    </g>
  );
}

// ===== Diagonal Slider Component (for RESONANCE fader) =====

function DiagonalSliderComponent({
  id,
  x,
  y,
  label,
  value,
  angle,
  highlighted,
  highlightColor,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  value: number;
  angle: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}) {
  const trackHeight = 60;
  const trackWidth = 6;
  const thumbWidth = 14;
  const thumbHeight = 8;
  const position = midiToSliderPosition(value);
  const thumbY = trackHeight * (1 - position) - thumbHeight / 2;

  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      {/* Rotated fader track + thumb */}
      <g transform={`rotate(${angle})`}>
        {highlighted && (
          <rect
            x={-thumbWidth / 2 - 3}
            y={-3}
            width={thumbWidth + 6}
            height={trackHeight + 6}
            rx={4}
            fill="none"
            stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
            strokeOpacity={0.6}
            filter={`url(#ikarie-glow-${highlightColor || 'blue'})`}
          />
        )}
        {/* Track */}
        <rect
          x={-trackWidth / 2}
          y={0}
          width={trackWidth}
          height={trackHeight}
          rx={2}
          style={styles.sliderTrack}
        />
        {/* Thumb */}
        <rect
          x={-thumbWidth / 2}
          y={thumbY}
          width={thumbWidth}
          height={thumbHeight}
          rx={2}
          style={styles.sliderThumb}
        />
      </g>
      {/* Label stays horizontal (outside rotated group) */}
      <text y={trackHeight + 12} style={styles.knobLabel}>
        {label}
      </text>
    </g>
  );
}

// ===== SwitchComponent (2-position or 3-position toggle) =====

function SwitchComponent({
  id,
  x,
  y,
  label,
  isTwoWay,
  highlighted,
  highlightColor,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  isTwoWay?: boolean;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}) {
  const circleR = 4;
  const spacing = 10;
  const positions = isTwoWay ? 2 : 3;
  const totalHeight = (positions - 1) * spacing;

  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      {highlighted && (
        <rect
          x={-8}
          y={-8}
          width={16}
          height={totalHeight + 16}
          rx={4}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#ikarie-glow-${highlightColor || 'blue'})`}
        />
      )}
      {/* Label above */}
      <text y={-10} style={styles.knobLabel}>
        {label}
      </text>
      {/* Switch positions */}
      {Array.from({ length: positions }).map((_, i) => (
        <circle
          key={i}
          cy={i * spacing}
          r={circleR}
          style={i === 0 ? { ...styles.switchCircle, ...styles.switchActive } : styles.switchCircle}
        />
      ))}
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
          filter={`url(#ikarie-glow-${highlightColor || 'blue'})`}
        />
      )}
      <circle
        r={6}
        fill={isOutput ? '#e8e8e8' : '#1a1a1a'}
        stroke={isOutput ? '#fff' : '#555'}
        strokeWidth={isOutput ? 1.5 : 1}
      />
      <text y={11} style={styles.jackLabel}>
        {label}
      </text>
    </g>
  );
}

// ===== Ikarie Panel Tooltip =====

function IkariePanelTooltip({
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

// ===== Main IkariePanel Component =====

function IkariePanelInner({
  knobValues,
  highlights,
  activeSections,
  zoomSections,
  cables,
  onKnobChange,
  className,
}: IkariePanelProps) {
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
    VIEWBOX;

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
        viewBox={VIEWBOX}
        whileInView={{ viewBox: viewBox }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        width="100%"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <defs>
          <filter id="ikarie-glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feFlood floodColor="#3388ff" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ikarie-glow-amber" x="-50%" y="-50%" width="200%" height="200%">
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
        <rect style={styles.panelBg} x="0" y="0" width="170" height="380" rx="4" />
        <rect style={styles.panelBorder} x="0" y="0" width="170" height="380" rx="4" />

        {/* IKARIE title at top */}
        <text style={styles.titleText} x={85} y={22}>IKARIE</text>

        {/* Section dividers */}
        <line style={styles.divider} x1={10} y1={35} x2={160} y2={35} />
        <line style={styles.divider} x1={10} y1={150} x2={160} y2={150} />
        <line style={styles.divider} x1={10} y1={245} x2={160} y2={245} />

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

        {/* Render all controls */}
        {Object.values(CONTROL_METADATA).map((ctrl) => {
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
                  large={ctrl.id === 'knob-ikarie-cutoff'}
                />
              );
            case 'slider':
              if (ctrl.id === 'slider-ikarie-resonance') {
                return (
                  <DiagonalSliderComponent
                    key={ctrl.id}
                    id={ctrl.id}
                    x={pos.x}
                    y={pos.y}
                    label={ctrl.name}
                    value={getVal(ctrl.id)}
                    angle={DIAGONAL_SLIDER_ANGLE}
                    highlighted={highlighted}
                    highlightColor={highlightColor}
                  />
                );
              }
              return (
                <SliderComponent
                  key={ctrl.id}
                  id={ctrl.id}
                  x={pos.x}
                  y={pos.y}
                  label={ctrl.name}
                  value={getVal(ctrl.id)}
                  highlighted={highlighted}
                  highlightColor={highlightColor}
                />
              );
            case 'switch':
              return (
                <SwitchComponent
                  key={ctrl.id}
                  id={ctrl.id}
                  x={pos.x}
                  y={pos.y}
                  label={ctrl.name}
                  isTwoWay={TWO_WAY_SWITCHES.has(ctrl.id)}
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
            default:
              return null;
          }
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

        {/* BASTL INSTRUMENTS brand at bottom */}
        <text style={styles.brandText} x={85} y={372}>BASTL</text>
      </motion.svg>

      {/* Tooltip */}
      <IkariePanelTooltip
        controlId={hoveredControl}
        svgRef={svgRef}
        knobValues={effectiveValues}
      />
    </div>
  );
}

const IkariePanel = memo(IkariePanelInner);

export { IkariePanel };
