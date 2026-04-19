'use client';

import React, { useState, useRef, useCallback, memo } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  CONTROL_METADATA,
  CONTROL_POSITIONS,
  SECTION_BOUNDS,
  TWO_WAY_SWITCHES,
  HORIZONTAL_SWITCHES,
  JACK_POSITIONS,
  midiToRotation,
} from '@/lib/just-friends-panel-data';

// ===== Types =====

interface JustFriendsPanelProps {
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

const VIEWBOX = '0 0 210 380';

const CABLE_COLORS: Record<string, string> = {
  audio: '#ff6644',
  cv: '#3388ff',
  gate: '#44cc66',
  modulation: '#ffaa33',
  default: '#888888',
};

const MODULE_ORDER = ['controls', 'io', 'triggers', 'outputs'] as const;

// ===== Styles =====

const styles = {
  panelBg: { fill: '#d4d0c8' } as React.CSSProperties,
  panelBorder: {
    fill: 'none',
    stroke: '#aaa',
    strokeWidth: 1.5,
  } as React.CSSProperties,
  titleText: {
    fill: '#222',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  brandText: {
    fill: '#444',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '7px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  sectionLabel: {
    fill: '#666',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '5px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
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
    fill: '#333',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  jackLabel: {
    fill: '#333',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '4px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  switchLabel: {
    fill: '#333',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '4px',
    textAnchor: 'start' as const,
  } as React.CSSProperties,
  ledOff: {
    fill: '#555',
    stroke: '#777',
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

// ===== KnobGroup Component =====

function KnobGroupInner({
  id,
  x,
  y,
  label,
  rotation,
  highlighted,
  highlightColor,
  dragHandlers,
  large,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  rotation: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  dragHandlers: ReturnType<typeof useKnobDrag>;
  large?: boolean;
}) {
  const r = large ? 16 : 12;

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
          filter={`url(#jf-glow-${highlightColor || 'blue'})`}
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
      <text y={r + 10} style={styles.knobLabel}>
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
      large={large}
    />
  );
}

// ===== Switch Components =====

function TwoWaySwitch({
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
  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      {highlighted && (
        <circle
          r={12}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#jf-glow-${highlightColor || 'blue'})`}
        />
      )}
      {/* Two circles stacked vertically */}
      <circle cy={-5} r={3} fill="#cc4422" stroke="#888" strokeWidth={0.5} />
      <circle cy={5} r={3} fill="none" stroke="#888" strokeWidth={0.5} />
      <text y={-14} style={styles.jackLabel}>{label}</text>
    </g>
  );
}

function ThreeWaySwitch({
  id,
  x,
  y,
  label,
  highlighted,
  highlightColor,
  positionLabels,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  positionLabels?: string[];
}) {
  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      {highlighted && (
        <circle
          r={14}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#jf-glow-${highlightColor || 'blue'})`}
        />
      )}
      {/* Three circles stacked vertically (traffic light) */}
      <circle cy={-8} r={3} fill="#cc4422" stroke="#888" strokeWidth={0.5} />
      <circle cy={0} r={3} fill="none" stroke="#888" strokeWidth={0.5} />
      <circle cy={8} r={3} fill="none" stroke="#888" strokeWidth={0.5} />
      {positionLabels && (
        <>
          <text x={10} y={-6} style={styles.switchLabel}>{positionLabels[0]}</text>
          <text x={10} y={2} style={styles.switchLabel}>{positionLabels[1]}</text>
          <text x={10} y={10} style={styles.switchLabel}>{positionLabels[2]}</text>
        </>
      )}
      <text y={-18} style={{ ...styles.jackLabel, textAnchor: 'middle' as const }}>{label}</text>
    </g>
  );
}

function HorizontalThreeWaySwitch({
  id,
  x,
  y,
  label,
  highlighted,
  highlightColor,
  positionLabels,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  positionLabels?: string[];
}) {
  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      {highlighted && (
        <rect
          x={-14}
          y={-8}
          width={28}
          height={16}
          rx={8}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#jf-glow-${highlightColor || 'blue'})`}
        />
      )}
      <circle cx={-8} r={3} fill="#cc4422" stroke="#888" strokeWidth={0.5} />
      <circle cx={0} r={3} fill="none" stroke="#888" strokeWidth={0.5} />
      <circle cx={8} r={3} fill="none" stroke="#888" strokeWidth={0.5} />
      {positionLabels && (
        <>
          <text x={-8} y={-10} style={{ ...styles.jackLabel, textAnchor: 'middle' as const, fontSize: '3.5px' }}>{positionLabels[0]}</text>
          <text x={0} y={-10} style={{ ...styles.jackLabel, textAnchor: 'middle' as const, fontSize: '3.5px' }}>{positionLabels[1]}</text>
          <text x={8} y={-10} style={{ ...styles.jackLabel, textAnchor: 'middle' as const, fontSize: '3.5px' }}>{positionLabels[2]}</text>
        </>
      )}
      <text y={14} style={{ ...styles.jackLabel, textAnchor: 'middle' as const }}>{label}</text>
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
          filter={`url(#jf-glow-${highlightColor || 'blue'})`}
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
          filter={`url(#jf-glow-${highlightColor || 'blue'})`}
        />
      )}
      <circle r={3} style={styles.ledOff} />
    </g>
  );
}

// ===== Panel Tooltip =====

function JustFriendsPanelTooltip({
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

// ===== Large knob IDs (TIME and INTONE are physically larger) =====
const LARGE_KNOBS = new Set(['knob-jf-time', 'knob-jf-intone']);

// ===== Main JustFriendsPanel Component =====

function JustFriendsPanelInner({
  knobValues,
  highlights,
  activeSections,
  zoomSections,
  cables,
  onKnobChange,
  className,
}: JustFriendsPanelProps) {
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
          <filter id="jf-glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feFlood floodColor="#3388ff" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="jf-glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feFlood floodColor="#ffaa33" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Panel background — light silver/brushed aluminum like physical JF panel */}
        <rect style={styles.panelBg} x="0" y="0" width="210" height="380" rx="3" />
        <rect style={styles.panelBorder} x="0" y="0" width="210" height="380" rx="3" />

        {/* JUST FRIENDS title */}
        <text style={styles.titleText} x={105} y={22}>JUST FRIENDS</text>

        {/* Section labels */}
        <text style={styles.sectionLabel} x={18} y={302}>TRIGGERS</text>

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
              fill="rgba(0,0,0,0.05)"
              fillOpacity={0.08}
              style={{ transition: 'opacity 150ms ease-out' }}
            />
          );
        })}

        {/* MIX output background (dark square like on the physical panel) */}
        <rect x={181} y={263} width={18} height={18} rx={2} fill="#1a1a1a" />

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
                        large={LARGE_KNOBS.has(ctrl.id)}
                      />
                    );
                  case 'switch':
                    if (TWO_WAY_SWITCHES.has(ctrl.id)) {
                      return (
                        <TwoWaySwitch
                          key={ctrl.id}
                          id={ctrl.id}
                          x={pos.x}
                          y={pos.y}
                          label={ctrl.name}
                          highlighted={highlighted}
                          highlightColor={highlightColor}
                        />
                      );
                    }
                    if (HORIZONTAL_SWITCHES.has(ctrl.id)) {
                      return (
                        <HorizontalThreeWaySwitch
                          key={ctrl.id}
                          id={ctrl.id}
                          x={pos.x}
                          y={pos.y}
                          label={ctrl.name}
                          highlighted={highlighted}
                          highlightColor={highlightColor}
                          positionLabels={['transient', 'sustain', 'cycle']}
                        />
                      );
                    }
                    return (
                      <ThreeWaySwitch
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        label={ctrl.name}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                        positionLabels={['transient', 'sustain', 'cycle']}
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

        {/* MANNEQUINS brand at bottom */}
        <text style={styles.brandText} x={105} y={372}>MANNEQUINS</text>
      </motion.svg>

      {/* Tooltip */}
      <JustFriendsPanelTooltip
        controlId={hoveredControl}
        svgRef={svgRef}
        knobValues={effectiveValues}
      />
    </div>
  );
}

const JustFriendsPanel = memo(JustFriendsPanelInner);

export { JustFriendsPanel };
