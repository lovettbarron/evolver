'use client';

import React, { useState, useRef, useCallback, memo } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  CONTROL_METADATA,
  CONTROL_POSITIONS,
  SECTION_BOUNDS,
  midiToRotation,
} from '@/lib/plaits-panel-data';
import type { PlaitsControlMeta } from '@/lib/plaits-panel-data';

// ===== Types =====

interface PlaitsPanelProps {
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

// ===== Styles =====

const styles = {
  panelBg: { fill: '#e8e4e0' } as React.CSSProperties, // Plaits has a light grey/white panel
  panelBorder: {
    fill: 'none',
    stroke: '#bbb',
    strokeWidth: 1.5,
  } as React.CSSProperties,
  sectionLabel: {
    fill: '#666',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '6px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  brandText: {
    fill: '#555',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '6px',
    fontWeight: 700,
    textAnchor: 'start' as const,
  } as React.CSSProperties,
  titleText: {
    fill: '#333',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  knobBody: {
    fill: '#1a1a1a',
    stroke: '#555',
    strokeWidth: 1.2,
  } as React.CSSProperties,
  knobBodySmall: {
    fill: '#888',
    stroke: '#666',
    strokeWidth: 1,
  } as React.CSSProperties,
  knobIndicator: {
    fill: 'none',
    stroke: '#ddd',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
  } as React.CSSProperties,
  knobLabel: {
    fill: '#444',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '5.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  jackLabel: {
    fill: '#444',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '4.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  ledOff: {
    fill: '#3a3a3a',
    stroke: '#555',
    strokeWidth: 0.5,
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

const JACK_POSITIONS: Record<string, { x: number; y: number }> = {};
for (const [id, meta] of Object.entries(CONTROL_METADATA)) {
  if (meta.type === 'jack-in' || meta.type === 'jack-out') {
    const pos = CONTROL_POSITIONS[id];
    if (pos) JACK_POSITIONS[id] = pos;
  }
}

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

// ===== KnobGroup Component =====

interface KnobProps {
  id: string;
  x: number;
  y: number;
  label: string;
  rotation: number;
  radius: number;
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
  radius,
  highlighted,
  highlightColor,
  dragHandlers,
}: KnobProps) {
  const isSmall = radius <= 8;

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
          r={radius + 4}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#plaits-glow-${highlightColor || 'blue'})`}
        />
      )}
      {dragHandlers.isDragging && (
        <circle r={radius + 4} fill="var(--color-accent)" fillOpacity={0.4} />
      )}
      <circle r={radius} style={isSmall ? styles.knobBodySmall : styles.knobBody} />
      <line
        x1={0}
        y1={-3}
        x2={0}
        y2={isSmall ? -6 : -radius + 2}
        style={styles.knobIndicator}
        transform={`rotate(${rotation})`}
      />
      <text y={radius + 10} style={styles.knobLabel}>
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
  radius,
  highlighted,
  highlightColor,
  onChange,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  value: number;
  radius: number;
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
      radius={radius}
      highlighted={highlighted}
      highlightColor={highlightColor}
      dragHandlers={dragHandlers}
    />
  );
}

// ===== ButtonComponent =====

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
  const r = 6;

  return (
    <g id={id} transform={`translate(${x}, ${y})`} style={{ cursor: 'pointer' }}>
      {highlighted && (
        <circle
          r={r + 4}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#plaits-glow-${highlightColor || 'blue'})`}
        />
      )}
      <circle r={r} fill="#2a2a2a" stroke="#666" strokeWidth={1.2} />
      <circle r={r - 2.5} fill="#333" stroke="none" />
      <text y={14} style={styles.knobLabel}>
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
          filter={`url(#plaits-glow-${highlightColor || 'blue'})`}
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

// ===== LED Column Component =====

function LEDColumnComponent({
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
  // Render 8 LEDs in a vertical column
  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      {highlighted && (
        <rect
          x={-6}
          y={-4}
          width={12}
          height={68}
          rx={3}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.4}
        />
      )}
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={i}
          cx={0}
          cy={i * 8}
          r={2.5}
          style={styles.ledOff}
        />
      ))}
    </g>
  );
}

// ===== Plaits Panel Tooltip =====

function PlaitsPanelTooltip({
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
    const el = svgRef.current.querySelector(`#${CSS.escape(controlId)}`);
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

// ===== Knob size helpers =====

const LARGE_KNOBS = new Set(['knob-plaits-frequency', 'knob-plaits-harmonics']);
const MEDIUM_KNOBS = new Set(['knob-plaits-timbre', 'knob-plaits-morph']);
// Everything else (attenuverters) is small

function getKnobRadius(id: string): number {
  if (LARGE_KNOBS.has(id)) return 16;
  if (MEDIUM_KNOBS.has(id)) return 12;
  return 7; // attenuverters
}

// ===== Main PlaitsPanel Component =====

function PlaitsPanelInner({
  knobValues,
  highlights,
  activeSections,
  zoomSections,
  cables,
  onKnobChange,
  className,
}: PlaitsPanelProps) {
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
    '0 0 180 560';

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
        viewBox="0 0 180 560"
        whileInView={{ viewBox: viewBox }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        width="100%"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <defs>
          {/* Glow filters for highlights */}
          <filter id="plaits-glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feFlood floodColor="#3388ff" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="plaits-glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feFlood floodColor="#ffaa33" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Panel background -- Plaits has a light grey/silver panel */}
        <rect style={styles.panelBg} x="0" y="0" width="180" height="560" rx="4" />
        <rect style={styles.panelBorder} x="0" y="0" width="180" height="560" rx="4" />

        {/* Brand and title */}
        <text style={styles.brandText} x={12} y={16}>Mutable Instruments</text>
        <text style={styles.titleText} x={130} y={18}>Plaits</text>

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
              fill="rgba(0,0,0,0.03)"
              fillOpacity={0.08}
              style={{ transition: 'opacity 150ms ease-out' }}
            />
          );
        })}

        {/* Section dividers */}
        {/* Below model buttons/LEDs */}
        <text style={styles.sectionLabel} x={90} y={168}>FREQUENCY                                HARMONICS</text>

        {/* Jack row labels */}
        <text style={{ ...styles.sectionLabel, fontSize: '4px' }} x={25} y={355}>MODEL</text>
        <text style={{ ...styles.sectionLabel, fontSize: '4px' }} x={155} y={355}>HARMO</text>

        {/* Output labels on jack row */}
        <text style={{ ...styles.sectionLabel, fontSize: '4px', fill: '#16a085' }} x={120} y={507}>OUT</text>
        <text style={{ ...styles.sectionLabel, fontSize: '4px', fill: '#16a085' }} x={155} y={507}>AUX</text>

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
                  radius={getKnobRadius(ctrl.id)}
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
                <LEDColumnComponent
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
      <PlaitsPanelTooltip
        controlId={hoveredControl}
        svgRef={svgRef}
        knobValues={effectiveValues}
      />
    </div>
  );
}

const PlaitsPanel = memo(PlaitsPanelInner);

export { PlaitsPanel };
