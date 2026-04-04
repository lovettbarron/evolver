'use client';

import React, { useState, useRef, useCallback, memo } from 'react';
import { clsx } from 'clsx';
import {
  CONTROL_METADATA,
  SECTION_BOUNDS,
  midiToRotation,
  midiToSliderPosition,
} from '@/lib/cascadia-panel-data';
import type { CascadiaControlMeta } from '@/lib/cascadia-panel-data';
import { PanelTooltip } from './evolver-panel-tooltip';

// ===== Types =====

interface CascadiaPanelProps {
  knobValues?: Record<string, number>;
  highlights?: Array<{ controlId: string; color: 'blue' | 'amber' }>;
  activeSections?: string[];
  zoomSections?: string[];
  cables?: Array<{
    sourceId: string;
    destId: string;
    signalType: 'audio' | 'cv' | 'modulation' | 'default';
    purpose?: string;
  }>;
  onKnobChange?: (controlId: string, value: number) => void;
  className?: string;
}

// ===== Cable Colors =====

const CABLE_COLORS: Record<string, string> = {
  audio: '#ff6644',
  cv: '#3388ff',
  modulation: '#ffaa33',
  default: '#888888',
};

// ===== Module order for layout =====

const MODULE_ORDER = [
  'midi-cv', 'vco-a', 'vco-b', 'envelope-a', 'envelope-b',
  'line-in', 'mixer', 'vcf', 'wave-folder', 'vca-a',
  'push-gate', 'utilities', 'lfo-xyz', 'patchbay',
  'vca-b-lpf', 'fx-send-return', 'output-control',
] as const;

// ===== Module display names =====

const MODULE_DISPLAY_NAMES: Record<string, string> = {
  'midi-cv': 'MIDI/CV',
  'vco-a': 'VCO A',
  'vco-b': 'VCO B',
  'envelope-a': 'ENV A',
  'envelope-b': 'ENV B',
  'line-in': 'LINE IN',
  'mixer': 'MIXER',
  'vcf': 'VCF',
  'wave-folder': 'FOLD',
  'vca-a': 'VCA A',
  'push-gate': 'GATE',
  'utilities': 'UTILITIES',
  'lfo-xyz': 'LFO XYZ',
  'patchbay': 'PATCHBAY',
  'vca-b-lpf': 'VCA B/LPF',
  'fx-send-return': 'FX S/R',
  'output-control': 'OUTPUT',
};

// ===== Compute control positions from SECTION_BOUNDS + CONTROL_METADATA =====

interface ControlPosition {
  x: number;
  y: number;
}

function computeControlPositions(): Record<string, ControlPosition> {
  const positions: Record<string, ControlPosition> = {};

  // Group controls by module
  const moduleControls: Record<string, CascadiaControlMeta[]> = {};
  for (const ctrl of Object.values(CONTROL_METADATA)) {
    if (!moduleControls[ctrl.module]) moduleControls[ctrl.module] = [];
    moduleControls[ctrl.module].push(ctrl);
  }

  for (const moduleName of MODULE_ORDER) {
    const bounds = SECTION_BOUNDS[moduleName];
    if (!bounds) continue;
    const controls = moduleControls[moduleName] || [];

    // Separate control types
    const knobs = controls.filter((c) => c.type === 'knob');
    const sliders = controls.filter((c) => c.type === 'slider');
    const switches = controls.filter((c) => c.type === 'switch');
    const leds = controls.filter((c) => c.type === 'led');
    const jacks = controls.filter(
      (c) => c.type === 'jack-in' || c.type === 'jack-out'
    );

    // Layout regions within module section:
    // Label area: y = bounds.y to bounds.y + 20
    // Controls area: y = bounds.y + 28 to bounds.y + 200
    // Jacks area: y = bounds.y + 210 to bounds.y + height

    const centerX = bounds.x + bounds.width / 2;

    // Position knobs - arranged in a row, centered
    const knobSpacing = 30;
    const knobStartX =
      centerX - ((knobs.length - 1) * knobSpacing) / 2;
    const knobY = bounds.y + 55;
    knobs.forEach((ctrl, i) => {
      positions[ctrl.id] = { x: knobStartX + i * knobSpacing, y: knobY };
    });

    // Position sliders - arranged in a row below knobs
    const sliderSpacing = Math.min(22, (bounds.width - 16) / Math.max(sliders.length, 1));
    const sliderStartX =
      centerX - ((sliders.length - 1) * sliderSpacing) / 2;
    const sliderY = bounds.y + 110;
    sliders.forEach((ctrl, i) => {
      positions[ctrl.id] = {
        x: sliderStartX + i * sliderSpacing,
        y: sliderY,
      };
    });

    // Position switches - row below sliders or knobs
    const switchSpacing = Math.min(24, (bounds.width - 10) / Math.max(switches.length, 1));
    const switchStartX =
      centerX - ((switches.length - 1) * switchSpacing) / 2;
    const switchY = bounds.y + 175;
    switches.forEach((ctrl, i) => {
      positions[ctrl.id] = {
        x: switchStartX + i * switchSpacing,
        y: switchY,
      };
    });

    // Position LEDs - near switches
    const ledSpacing = 20;
    const ledStartX =
      centerX - ((leds.length - 1) * ledSpacing) / 2;
    const ledY = bounds.y + 195;
    leds.forEach((ctrl, i) => {
      positions[ctrl.id] = { x: ledStartX + i * ledSpacing, y: ledY };
    });

    // Position jacks - bottom area, in a grid
    const jackSpacing = 20;
    const jacksPerRow = Math.max(
      1,
      Math.floor((bounds.width - 8) / jackSpacing)
    );
    const jackStartY = bounds.y + 225;
    const jackRowHeight = 22;
    jacks.forEach((ctrl, i) => {
      const row = Math.floor(i / jacksPerRow);
      const col = i % jacksPerRow;
      const rowCount = Math.min(jacks.length - row * jacksPerRow, jacksPerRow);
      const rowStartX = centerX - ((rowCount - 1) * jackSpacing) / 2;
      positions[ctrl.id] = {
        x: rowStartX + col * jackSpacing,
        y: jackStartY + row * jackRowHeight,
      };
    });
  }

  return positions;
}

const CONTROL_POSITIONS = computeControlPositions();

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
    fontSize: '5.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  switchRect: {
    fill: '#222',
    stroke: '#555',
    strokeWidth: 0.8,
    rx: 1.5,
  } as React.CSSProperties,
  switchLabel: {
    fill: '#999',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  ledOff: {
    fill: '#222',
    stroke: '#444',
    strokeWidth: 0.5,
  } as React.CSSProperties,
  jackLabel: {
    fill: '#aaa',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '4.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  divider: {
    stroke: '#333',
    strokeWidth: 0.5,
    strokeDasharray: '2,2',
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

// ===== useSliderDrag Hook =====

function useSliderDrag(
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
  signalType: 'audio' | 'cv' | 'modulation' | 'default';
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
        <circle r={r + 4} fill="#c8ff00" fillOpacity={0.4} />
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

// ===== SliderGroup Component (memo'd) =====

interface SliderProps {
  id: string;
  x: number;
  y: number;
  label: string;
  value: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  dragHandlers: ReturnType<typeof useSliderDrag>;
}

function SliderGroupInner({
  id,
  x,
  y,
  label,
  value,
  highlighted,
  highlightColor,
  dragHandlers,
}: SliderProps) {
  const trackWidth = 6;
  const trackHeight = 40;
  const thumbHeight = 8;
  const thumbWidth = 12;
  const pos = midiToSliderPosition(value);
  const thumbY = y + trackHeight - pos * trackHeight - thumbHeight / 2;

  return (
    <g
      id={id}
      onPointerDown={dragHandlers.onPointerDown}
      onPointerMove={dragHandlers.onPointerMove}
      onPointerUp={dragHandlers.onPointerUp}
      style={{ cursor: dragHandlers.isDragging ? 'grabbing' : 'grab' }}
    >
      {highlighted && (
        <rect
          x={x - thumbWidth / 2 - 2}
          y={y - 2}
          width={thumbWidth + 4}
          height={trackHeight + 4}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      {/* Track */}
      <rect
        x={x - trackWidth / 2}
        y={y}
        width={trackWidth}
        height={trackHeight}
        fill="#111"
        stroke="#444"
        strokeWidth={0.8}
        rx={2}
      />
      {/* Thumb */}
      <rect
        x={x - thumbWidth / 2}
        y={thumbY}
        width={thumbWidth}
        height={thumbHeight}
        fill="#2a2a2a"
        stroke="#666"
        strokeWidth={1}
        rx={1.5}
      />
      <text
        x={x}
        y={y + trackHeight + 12}
        style={styles.knobLabel}
      >
        {label}
      </text>
    </g>
  );
}

const SliderGroup = memo(SliderGroupInner);

// ===== Interactive Slider Wrapper =====

function InteractiveSlider({
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
  const dragHandlers = useSliderDrag(id, value, onChange);

  return (
    <SliderGroup
      id={id}
      x={x}
      y={y}
      label={label}
      value={value}
      highlighted={highlighted}
      highlightColor={highlightColor}
      dragHandlers={dragHandlers}
    />
  );
}

// ===== SwitchGroup Component =====

function SwitchGroupComponent({
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
    <g id={id} transform={`translate(${x}, ${y})`} style={{ cursor: 'default' }}>
      {highlighted && (
        <rect
          x={-9}
          y={-7}
          width={18}
          height={22}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      <rect style={styles.switchRect} x={-7} y={-5} width={14} height={10} />
      <text y={16} style={styles.switchLabel}>
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
        fill={isOutput ? '#2a2a2a' : '#1a1a1a'}
        stroke={isOutput ? '#666' : '#555'}
        strokeWidth={1}
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

// ===== Main CascadiaPanel Component =====

function CascadiaPanelInner({
  knobValues,
  highlights,
  activeSections,
  zoomSections,
  cables,
  onKnobChange,
  className,
}: CascadiaPanelProps) {
  const [internalValues, setInternalValues] = useState<
    Record<string, number>
  >({});
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
    '0 0 1800 350';

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
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width="100%"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <defs>
          {/* Glow filters for highlights */}
          <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="3"
              result="blur"
            />
            <feFlood floodColor="#3388ff" floodOpacity="0.6" result="color" />
            <feComposite
              in="color"
              in2="blur"
              operator="in"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="glow-amber"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="3"
              result="blur"
            />
            <feFlood floodColor="#ffaa33" floodOpacity="0.6" result="color" />
            <feComposite
              in="color"
              in2="blur"
              operator="in"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Panel background */}
        <rect style={styles.panelBg} x="0" y="0" width="1800" height="350" />
        <rect
          style={styles.panelBorder}
          x="0"
          y="0"
          width="1800"
          height="350"
        />

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

        {/* Section dividers and labels */}
        {MODULE_ORDER.map((moduleName) => {
          const bounds = SECTION_BOUNDS[moduleName];
          if (!bounds) return null;
          const displayName = MODULE_DISPLAY_NAMES[moduleName] || moduleName;
          return (
            <React.Fragment key={`section-${moduleName}`}>
              {/* Divider line on the right edge */}
              <line
                style={styles.divider}
                x1={bounds.x + bounds.width}
                y1={bounds.y}
                x2={bounds.x + bounds.width}
                y2={bounds.y + bounds.height}
              />
              {/* Section label */}
              <text
                style={styles.sectionLabel}
                x={bounds.x + bounds.width / 2}
                y={bounds.y + 14}
              >
                {displayName}
              </text>
            </React.Fragment>
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
                      <InteractiveSlider
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
                      <SwitchGroupComponent
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
      </svg>

      {/* Tooltip */}
      <PanelTooltip
        controlId={hoveredControl}
        svgRef={svgRef}
        knobValues={effectiveValues}
      />
    </div>
  );
}

const CascadiaPanel = memo(CascadiaPanelInner);

export { CascadiaPanel };
