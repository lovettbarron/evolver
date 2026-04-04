'use client';

import React, { useState, useRef, useCallback, memo } from 'react';
import { clsx } from 'clsx';
import { CONTROL_METADATA, SECTION_BOUNDS, midiToRotation } from '@/lib/evolver-panel-data';
import { PanelTooltip } from './evolver-panel-tooltip';

// ===== Types =====

interface EvolverPanelProps {
  knobValues?: Record<string, number>;
  highlights?: Array<{ controlId: string; color: 'blue' | 'amber' }>;
  activeSections?: string[];
  zoomSections?: string[];
  onKnobChange?: (controlId: string, value: number) => void;
  className?: string;
}

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
      const newValue = Math.max(0, Math.min(127, startValue.current + Math.round(delta / 3)));
      if (newValue !== currentValue) {
        onChange(controlId, newValue);
      }
    },
    [isDragging, controlId, currentValue, onChange],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const el = e.target as Element;
      if (el.releasePointerCapture) {
        el.releasePointerCapture(e.pointerId);
      }
      setIsDragging(false);
    },
    [],
  );

  return { isDragging, onPointerDown, onPointerMove, onPointerUp };
}

// ===== Styles (from SVG <style> block, converted to React CSSProperties) =====

const styles = {
  panelBg: { fill: '#111' } as React.CSSProperties,
  panelBorder: { fill: 'none', stroke: '#333', strokeWidth: 1 } as React.CSSProperties,
  wood: { fill: '#222' } as React.CSSProperties,
  sectionLabel: {
    fill: '#999', fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '7px', fontWeight: 700, textTransform: 'uppercase' as const,
    letterSpacing: '1px', textAnchor: 'middle' as const,
  } as React.CSSProperties,
  subLabel: {
    fill: '#777', fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '5px', textAnchor: 'middle' as const, letterSpacing: '0.5px',
  } as React.CSSProperties,
  knobLarge: { fill: '#1a1a1a', stroke: '#555', strokeWidth: 1.2 } as React.CSSProperties,
  knobSmall: { fill: '#1a1a1a', stroke: '#444', strokeWidth: 1 } as React.CSSProperties,
  knobIndicator: { fill: 'none', stroke: '#ddd', strokeWidth: 1.5, strokeLinecap: 'round' as const } as React.CSSProperties,
  knobIndicatorSm: { fill: 'none', stroke: '#ccc', strokeWidth: 1.2, strokeLinecap: 'round' as const } as React.CSSProperties,
  knobLabel: {
    fill: '#aaa', fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '5.5px', textAnchor: 'middle' as const,
  } as React.CSSProperties,
  switchRect: { fill: '#222', stroke: '#555', strokeWidth: 0.8, rx: 1.5 } as React.CSSProperties,
  switchLabel: {
    fill: '#999', fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '5px', textAnchor: 'middle' as const,
  } as React.CSSProperties,
  ledBlue: { fill: '#333', stroke: '#555', strokeWidth: 0.5 } as React.CSSProperties,
  ledRed: { fill: '#333', stroke: '#555', strokeWidth: 0.5 } as React.CSSProperties,
  ledOff: { fill: '#222', stroke: '#444', strokeWidth: 0.5 } as React.CSSProperties,
  lcd: { fill: '#1a1a1a', stroke: '#444', strokeWidth: 1 } as React.CSSProperties,
  lcdText: {
    fill: '#888', fontFamily: "'Courier New', monospace",
    fontSize: '9px', textAnchor: 'middle' as const,
  } as React.CSSProperties,
  logoText: {
    fill: '#888', fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '16px', fontWeight: 700, fontStyle: 'italic', letterSpacing: '2px',
  } as React.CSSProperties,
  brandText: {
    fill: '#666', fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '8px', fontWeight: 300, letterSpacing: '1.5px',
  } as React.CSSProperties,
  divider: { stroke: '#333', strokeWidth: 0.5, strokeDasharray: '2,2' } as React.CSSProperties,
  keyWhite: { fill: '#ddd', stroke: '#aaa', strokeWidth: 0.5 } as React.CSSProperties,
  keyBlack: { fill: '#222', stroke: '#111', strokeWidth: 0.5 } as React.CSSProperties,
  wheelBg: { fill: '#1a1a1a', stroke: '#444', strokeWidth: 0.8 } as React.CSSProperties,
  wheel: { fill: '#2a2a2a', stroke: '#555', strokeWidth: 0.8 } as React.CSSProperties,
  paramText: {
    fill: '#666', fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '4.5px', textAnchor: 'start' as const,
  } as React.CSSProperties,
} as const;

// ===== Helper: Interactive Knob Group =====

interface KnobProps {
  id: string;
  x: number;
  y: number;
  large: boolean;
  label: string;
  rotation: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  dragHandlers: ReturnType<typeof useKnobDrag>;
}

function KnobGroupInner({
  id, x, y, large, label, rotation, highlighted, highlightColor, dragHandlers,
}: KnobProps) {
  const r = large ? 14 : 10;
  const indicatorStyle = large ? styles.knobIndicator : styles.knobIndicatorSm;
  const knobStyle = large ? styles.knobLarge : styles.knobSmall;
  const y1 = large ? -4 : -3;
  const y2 = large ? -12 : -8;
  const labelY = large ? 24 : 18;

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
      <circle r={r} style={knobStyle} />
      <line
        x1={0} y1={y1} x2={0} y2={y2}
        style={indicatorStyle}
        transform={`rotate(${rotation})`}
      />
      <text y={labelY} style={styles.knobLabel}>{label}</text>
    </g>
  );
}

const KnobGroup = memo(KnobGroupInner);

// ===== Knob wrapper with drag logic =====

function InteractiveKnob({
  id, x, y, large, label, value, highlighted, highlightColor, onChange,
}: {
  id: string;
  x: number;
  y: number;
  large: boolean;
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
      large={large}
      label={label}
      rotation={rotation}
      highlighted={highlighted}
      highlightColor={highlightColor}
      dragHandlers={dragHandlers}
    />
  );
}

// ===== Main Component =====

function computeZoomViewBox(sections: string[]): string | null {
  const padding = 20;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
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

function EvolverPanelInner({
  knobValues,
  highlights,
  activeSections,
  zoomSections,
  onKnobChange,
  className,
}: EvolverPanelProps) {
  const [internalValues, setInternalValues] = useState<Record<string, number>>({});
  const [hoveredControl, setHoveredControl] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const effectiveValues = knobValues ?? internalValues;
  const effectiveOnChange = onKnobChange ?? ((id: string, val: number) => {
    setInternalValues(prev => ({ ...prev, [id]: val }));
  });

  const getVal = (id: string) => effectiveValues[id] ?? 64;
  const isHighlighted = (id: string) => highlights?.some(h => h.controlId === id) ?? false;
  const getHighlightColor = (id: string) => highlights?.find(h => h.controlId === id)?.color;
  const viewBox = (zoomSections?.length ? computeZoomViewBox(zoomSections) : null) ?? '0 0 1200 520';

  // Event delegation: find the closest control element from any hover target
  const findControlId = useCallback((target: EventTarget | null): string | null => {
    let el = target as Element | null;
    while (el && el !== svgRef.current) {
      const id = el.getAttribute('id');
      if (id && CONTROL_METADATA[id]) return id;
      el = el.parentElement;
    }
    return null;
  }, []);

  const onMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      const id = findControlId(e.target);
      if (id) setHoveredControl(id);
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

  const onMouseOver = useCallback(
    (e: React.MouseEvent) => {
      const id = findControlId(e.target);
      setHoveredControl(id);
    },
    [findControlId],
  );

  // Helper to render a knob
  function K(id: string, x: number, y: number, large: boolean, label: string) {
    return (
      <InteractiveKnob
        key={id}
        id={id}
        x={x}
        y={y}
        large={large}
        label={label}
        value={getVal(id)}
        highlighted={isHighlighted(id)}
        highlightColor={getHighlightColor(id)}
        onChange={effectiveOnChange}
      />
    );
  }

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
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feFlood floodColor="#3388ff" floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feFlood floodColor="#ffaa33" floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Wood side cheeks */}
      <rect style={styles.wood} x="0" y="0" width="18" height="520" rx="3" />
      <rect style={styles.wood} x="1182" y="0" width="18" height="520" rx="3" />

      {/* Main panel background */}
      <rect style={styles.panelBg} x="18" y="0" width="1164" height="520" />

      {/* Section tint rectangles */}
      {activeSections?.map(section => {
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
            fill="#3388ff"
            fillOpacity={0.15}
            style={{ transition: 'opacity 150ms ease-out' }}
          />
        );
      })}

      {/* ==================== TOP ROW ==================== */}

      {/* EVOLVER LOGO */}
      <text style={styles.logoText} x="36" y="32">evolver</text>

      {/* ===== ENVELOPE 3 ===== */}
      <text style={styles.sectionLabel} x="110" y="18">Envelope 3</text>
      {K('knob-env3-destination', 68, 52, false, 'Destination')}
      {K('knob-env3-amount', 104, 52, false, 'Amount')}
      {K('knob-env3-velocity', 140, 52, false, 'Velocity')}
      {K('knob-env3-delay', 176, 52, false, 'Delay')}
      {K('knob-env3-attack', 68, 108, false, 'Attack')}
      {K('knob-env3-decay', 104, 108, false, 'Decay')}
      {K('knob-env3-sustain', 140, 108, false, 'Sustain')}
      {K('knob-env3-release', 176, 108, false, 'Release')}

      <line style={styles.divider} x1="205" y1="10" x2="205" y2="145" />

      {/* ===== LFOs ===== */}
      <text style={styles.sectionLabel} x="282" y="18">LFOs</text>
      {K('knob-lfo-frequency', 225, 52, false, 'Frequency')}
      {K('knob-lfo-shape', 265, 52, false, 'Shape')}
      {/* LFO 1-4 switches */}
      <g id="switch-lfo1" transform="translate(310, 36)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="14" height="10" />
        <text style={styles.switchLabel} x="7" y="8">1</text>
        <circle style={styles.ledRed} cx="20" cy="5" r="3" />
      </g>
      <g id="switch-lfo2" transform="translate(310, 54)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="14" height="10" />
        <text style={styles.switchLabel} x="7" y="8">2</text>
        <circle style={styles.ledOff} cx="20" cy="5" r="3" />
      </g>
      <g id="switch-lfo3" transform="translate(310, 72)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="14" height="10" />
        <text style={styles.switchLabel} x="7" y="8">3</text>
        <circle style={styles.ledOff} cx="20" cy="5" r="3" />
      </g>
      <g id="switch-lfo4" transform="translate(310, 90)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="14" height="10" />
        <text style={styles.switchLabel} x="7" y="8">4</text>
        <circle style={styles.ledOff} cx="20" cy="5" r="3" />
      </g>
      <g id="switch-lfo-keysync" transform="translate(310, 112)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="14" height="10" />
        <text style={styles.switchLabel} x="7" y="8">KS</text>
      </g>
      {K('knob-lfo-destination', 225, 108, false, 'Destination')}
      {K('knob-lfo-amount', 265, 108, false, 'Amount')}

      <line style={styles.divider} x1="350" y1="10" x2="350" y2="145" />

      {/* ===== SEQUENCER ===== */}
      <text style={styles.sectionLabel} x="460" y="118">16 x 4 Sequencer</text>
      <g id="seq-leds">
        <circle id="led-seq-1" style={styles.ledBlue} cx="370" cy="30" r="4" />
        <circle id="led-seq-2" style={styles.ledOff} cx="390" cy="30" r="4" />
        <circle id="led-seq-3" style={styles.ledOff} cx="410" cy="30" r="4" />
        <circle id="led-seq-4" style={styles.ledOff} cx="430" cy="30" r="4" />
        <circle id="led-seq-5" style={styles.ledOff} cx="450" cy="30" r="4" />
        <circle id="led-seq-6" style={styles.ledOff} cx="470" cy="30" r="4" />
        <circle id="led-seq-7" style={styles.ledOff} cx="490" cy="30" r="4" />
        <circle id="led-seq-8" style={styles.ledOff} cx="510" cy="30" r="4" />
        <circle id="led-seq-9" style={styles.ledOff} cx="370" cy="50" r="4" />
        <circle id="led-seq-10" style={styles.ledOff} cx="390" cy="50" r="4" />
        <circle id="led-seq-11" style={styles.ledOff} cx="410" cy="50" r="4" />
        <circle id="led-seq-12" style={styles.ledOff} cx="430" cy="50" r="4" />
        <circle id="led-seq-13" style={styles.ledOff} cx="450" cy="50" r="4" />
        <circle id="led-seq-14" style={styles.ledOff} cx="470" cy="50" r="4" />
        <circle id="led-seq-15" style={styles.ledOff} cx="490" cy="50" r="4" />
        <circle id="led-seq-16" style={styles.ledOff} cx="510" cy="50" r="4" />
      </g>

      {/* Program/Global/Compare/Write buttons */}
      <g id="switch-program" transform="translate(530, 26)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="28" height="12" />
        <text style={styles.switchLabel} x="14" y="9">Program</text>
      </g>
      <g id="switch-global" transform="translate(530, 46)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="28" height="12" />
        <text style={styles.switchLabel} x="14" y="9">Global</text>
      </g>
      <g id="switch-compare" transform="translate(530, 66)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="28" height="12" />
        <text style={styles.switchLabel} x="14" y="9">Compare</text>
      </g>
      <g id="switch-write" transform="translate(530, 86)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="28" height="12" />
        <text style={styles.switchLabel} x="14" y="9">Write</text>
      </g>

      {/* Seq Edit / Start-Stop / Reset */}
      <g id="switch-seq-edit" transform="translate(375, 72)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="30" height="10" />
        <text style={styles.switchLabel} x="15" y="8">Seq Edit</text>
      </g>
      <g id="switch-startstop" transform="translate(415, 72)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="34" height="10" />
        <text style={styles.switchLabel} x="17" y="8">Start/Stop</text>
      </g>
      <g id="switch-reset" transform="translate(460, 72)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="26" height="10" />
        <text style={styles.switchLabel} x="13" y="8">Reset</text>
      </g>

      {/* Seq 1-4 switches */}
      <g id="switch-seq1" transform="translate(500, 72)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="12" height="10" />
        <text style={styles.switchLabel} x="6" y="8">1</text>
      </g>
      <g id="switch-seq2" transform="translate(516, 72)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="12" height="10" />
        <text style={styles.switchLabel} x="6" y="8">2</text>
      </g>
      <g id="switch-seq3" transform="translate(500, 88)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="12" height="10" />
        <text style={styles.switchLabel} x="6" y="8">3</text>
      </g>
      <g id="switch-seq4" transform="translate(516, 88)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="12" height="10" />
        <text style={styles.switchLabel} x="6" y="8">4</text>
      </g>

      <line style={styles.divider} x1="570" y1="10" x2="570" y2="145" />

      {/* ===== LCD DISPLAY ===== */}
      <rect id="lcd-display" style={styles.lcd} x="580" y="22" width="150" height="44" rx="3" />
      <text style={styles.lcdText} x="655" y="40">Basic Patch</text>
      <text style={{ ...styles.lcdText, fontSize: '7px' }} x="655" y="56">P:001 B:1</text>

      {/* PARAM 1/2, +/Yes, -/No, Select, Value */}
      {K('knob-param1', 750, 32, false, 'PARAM 1')}
      <g id="switch-yes" transform="translate(774, 22)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="22" height="10" />
        <text style={styles.switchLabel} x="11" y="8">+ Yes</text>
      </g>
      <g id="switch-no" transform="translate(774, 38)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="22" height="10" />
        <text style={styles.switchLabel} x="11" y="8">- No</text>
      </g>
      {K('knob-param2', 750, 88, false, 'PARAM 2')}
      {K('knob-select', 810, 52, false, 'Select')}
      {K('knob-value', 810, 100, false, 'Value')}

      {/* LCD parameter labels */}
      <text style={styles.paramText} x="585" y="78">Analog / Digital Synth</text>
      <text style={styles.paramText} x="585" y="86">Stereo Audio Processor</text>
      <text style={styles.paramText} x="585" y="94">16 x 4 Sequencer</text>

      <line style={styles.divider} x1="845" y1="10" x2="845" y2="145" />

      {/* ===== MISC PARAMS ===== */}
      <text style={styles.sectionLabel} x="890" y="18">Misc Params</text>
      <text style={styles.paramText} x="856" y="32">Voice Volume</text>
      <text style={styles.paramText} x="856" y="40">Name</text>
      <text style={styles.paramText} x="856" y="48">Trigger Select</text>
      <text style={styles.paramText} x="856" y="56">Key Mode</text>
      <text style={styles.paramText} x="856" y="64">Key Off/Xpose</text>
      <text style={styles.paramText} x="856" y="72">Pitch/Wheel Range</text>
      <text style={styles.paramText} x="910" y="32">Osc Slop</text>
      <text style={styles.paramText} x="910" y="40">Input Mode</text>
      <text style={styles.paramText} x="910" y="48">Env Shape</text>
      <text style={styles.paramText} x="910" y="56">Input Hack</text>
      <text style={styles.paramText} x="910" y="64">HP Pre/Post</text>
      <text style={styles.paramText} x="910" y="72">Dist Pre/Post</text>
      <g id="switch-misc" transform="translate(876, 84)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="28" height="12" />
        <text style={styles.switchLabel} x="14" y="9">Misc</text>
      </g>

      <line style={styles.divider} x1="955" y1="10" x2="955" y2="145" />

      {/* ===== MODULATORS ===== */}
      <text style={styles.sectionLabel} x="1060" y="18">Modulators</text>
      <g id="switch-mod1" transform="translate(1108, 28)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="12" height="10" />
        <text style={styles.switchLabel} x="6" y="8">1</text>
        <circle style={styles.ledRed} cx="18" cy="5" r="3" />
      </g>
      <g id="switch-mod2" transform="translate(1108, 46)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="12" height="10" />
        <text style={styles.switchLabel} x="6" y="8">2</text>
        <circle style={styles.ledOff} cx="18" cy="5" r="3" />
      </g>
      <g id="switch-mod3" transform="translate(1108, 64)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="12" height="10" />
        <text style={styles.switchLabel} x="6" y="8">3</text>
        <circle style={styles.ledOff} cx="18" cy="5" r="3" />
      </g>
      <g id="switch-mod4" transform="translate(1108, 82)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="12" height="10" />
        <text style={styles.switchLabel} x="6" y="8">4</text>
        <circle style={styles.ledOff} cx="18" cy="5" r="3" />
      </g>
      {K('knob-mod-source', 975, 52, false, 'Mod Source')}
      {K('knob-mod-dest', 1020, 52, false, 'Mod Dest')}
      {K('knob-mod-amount', 1065, 52, false, 'Mod Amount')}

      {/* Misc controllers labels */}
      <text style={styles.paramText} x="966" y="86">Mod Wheel</text>
      <text style={styles.paramText} x="966" y="94">Pressure</text>
      <text style={styles.paramText} x="966" y="102">Breath</text>
      <text style={styles.paramText} x="1030" y="86">Foot Controller</text>
      <text style={styles.paramText} x="1030" y="94">In Peak</text>
      <text style={styles.paramText} x="1030" y="102">In Env Follower</text>
      <text style={styles.paramText} x="1100" y="86">Velocity</text>

      {/* ==================== BOTTOM ROW ==================== */}

      {/* TRANSPOSE */}
      <text style={styles.sectionLabel} x="42" y="165">Transpose</text>
      <g id="switch-transpose-down" transform="translate(28, 175)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="22" height="12" />
        <text style={styles.switchLabel} x="11" y="9">Down</text>
      </g>
      <g id="switch-transpose-up" transform="translate(28, 195)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="22" height="12" />
        <text style={styles.switchLabel} x="11" y="9">Up</text>
      </g>

      <line style={styles.divider} x1="60" y1="155" x2="60" y2="305" />

      {/* ===== OSCILLATORS ===== */}
      <text style={styles.sectionLabel} x="155" y="165">Oscillators</text>
      <g id="switch-osc1" transform="translate(68, 180)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="14" height="10" />
        <text style={styles.switchLabel} x="7" y="8">1</text>
        <circle style={styles.ledRed} cx="7" cy="-6" r="3" />
      </g>
      <text style={styles.subLabel} x="75" y="200">Analog</text>
      <g id="switch-osc2" transform="translate(88, 180)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="14" height="10" />
        <text style={styles.switchLabel} x="7" y="8">2</text>
        <circle style={styles.ledOff} cx="7" cy="-6" r="3" />
      </g>
      <g id="switch-osc3" transform="translate(68, 270)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="14" height="10" />
        <text style={styles.switchLabel} x="7" y="8">3</text>
        <circle style={styles.ledOff} cx="7" cy="-6" r="3" />
      </g>
      <text style={styles.subLabel} x="75" y="290">Digital</text>
      <g id="switch-osc4" transform="translate(88, 270)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="14" height="10" />
        <text style={styles.switchLabel} x="7" y="8">4</text>
        <circle style={styles.ledOff} cx="7" cy="-6" r="3" />
      </g>

      {K('knob-osc-frequency', 125, 218, true, 'Frequency')}
      {K('knob-osc-fine', 165, 218, true, 'Fine')}
      {K('knob-osc-shapepw', 205, 218, true, 'Shape/PW')}
      {K('knob-osc-level', 245, 218, true, 'Level')}
      {K('knob-osc-fm', 125, 278, true, 'FM')}
      {K('knob-osc-ringmod', 165, 278, true, 'Ring Mod')}
      {K('knob-osc-shapemod', 205, 278, true, 'Shape Mod')}
      {K('knob-osc-glide', 245, 278, true, 'Glide')}

      <g id="switch-sync" transform="translate(196, 174)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="28" height="10" />
        <text style={styles.switchLabel} x="14" y="8">{'Sync 2>1'}</text>
      </g>

      <line style={styles.divider} x1="272" y1="155" x2="272" y2="305" />

      {/* ===== NOISE + EXT IN ===== */}
      <text style={styles.sectionLabel} x="290" y="165">Noise</text>
      {K('knob-noise-level', 290, 218, true, 'Level')}
      <text style={styles.sectionLabel} x="290" y="258">Ext In</text>
      {K('knob-extin-level', 290, 278, true, 'Level')}

      <line style={styles.divider} x1="318" y1="155" x2="318" y2="305" />

      {/* ===== LOW-PASS FILTER ===== */}
      <text style={styles.sectionLabel} x="408" y="165">Low Pass Filter</text>
      <g id="switch-4pole" transform="translate(324, 178)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="22" height="10" />
        <text style={styles.switchLabel} x="11" y="8">4 Pole</text>
        <circle style={styles.ledOff} cx="28" cy="5" r="3" />
      </g>

      {K('knob-filter-frequency', 370, 218, true, 'Frequency')}
      {K('knob-filter-resonance', 410, 218, true, 'Resonance')}
      {K('knob-filter-envamount', 450, 218, true, 'Env Amount')}
      {K('knob-filter-velocity', 490, 218, true, 'Velocity')}
      {K('knob-filter-keyamount', 530, 218, true, 'Key Amount')}
      {K('knob-filter-audiomod', 370, 278, true, 'Audio Mod')}
      {K('knob-filter-lrsplit', 410, 278, true, 'L/R Split')}
      {K('knob-filter-attack', 450, 278, true, 'Attack')}
      {K('knob-filter-decay', 490, 278, true, 'Decay')}
      {K('knob-filter-sustain', 530, 278, true, 'Sustain')}
      {K('knob-filter-release', 570, 278, true, 'Release')}

      <line style={styles.divider} x1="598" y1="155" x2="598" y2="305" />

      {/* ===== AMP ===== */}
      <text style={styles.sectionLabel} x="660" y="165">Amp</text>
      {K('knob-amp-vcalevel', 618, 218, true, 'VCA Level')}
      {K('knob-amp-envamount', 658, 218, true, 'Env Amount')}
      {K('knob-amp-velocity', 698, 218, true, 'Velocity')}
      {K('knob-amp-outputpan', 738, 218, true, 'Output/Speed')}
      {K('knob-amp-attack', 618, 278, true, 'Attack')}
      {K('knob-amp-decay', 658, 278, true, 'Decay')}
      {K('knob-amp-sustain', 698, 278, true, 'Sustain')}
      {K('knob-amp-release', 738, 278, true, 'Release')}

      <line style={styles.divider} x1="766" y1="155" x2="766" y2="305" />

      {/* ===== HP FILTER ===== */}
      <text style={styles.sectionLabel} x="790" y="165">HP Filter</text>
      {K('knob-hpf-frequency', 790, 218, true, 'Frequency')}

      <line style={styles.divider} x1="818" y1="155" x2="818" y2="305" />

      {/* ===== FEEDBACK (D-03 fix: Frequency top, Level large, Grunge as switch) ===== */}
      <text style={styles.sectionLabel} x="852" y="165">Feedback</text>
      {K('knob-feedback-frequency', 838, 210, true, 'Frequency')}
      {K('knob-feedback-amount', 878, 240, true, 'Level')}
      <g id="switch-feedback-grunge" transform="translate(838, 278)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="28" height="12" />
        <text style={styles.switchLabel} x="14" y="9">Grunge</text>
      </g>

      <line style={styles.divider} x1="908" y1="155" x2="908" y2="305" />

      {/* ===== DISTORTION ===== */}
      <text style={styles.sectionLabel} x="938" y="165">Distortion</text>
      {K('knob-distortion-amount', 938, 218, true, 'Amount')}
      {K('knob-distortion-grunge', 938, 278, true, 'Grunge')}

      <line style={styles.divider} x1="968" y1="155" x2="968" y2="305" />

      {/* ===== DELAY ===== */}
      <text style={styles.sectionLabel} x="1020" y="165">Delay</text>
      <g id="switch-delay1" transform="translate(1060, 178)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="12" height="10" />
        <text style={styles.switchLabel} x="6" y="8">1</text>
        <circle style={styles.ledRed} cx="6" cy="-6" r="3" />
      </g>
      <g id="switch-delay2" transform="translate(1060, 198)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="12" height="10" />
        <text style={styles.switchLabel} x="6" y="8">2</text>
        <circle style={styles.ledOff} cx="6" cy="-6" r="3" />
      </g>
      <g id="switch-delay3" transform="translate(1060, 218)" style={{ cursor: 'default' }}>
        <rect style={styles.switchRect} width="12" height="10" />
        <text style={styles.switchLabel} x="6" y="8">3</text>
        <circle style={styles.ledOff} cx="6" cy="-6" r="3" />
      </g>

      {K('knob-delay-time', 990, 218, true, 'Time')}
      {K('knob-delay-level', 1030, 218, true, 'Level')}
      {K('knob-delay-amount', 990, 278, true, 'Amount')}
      {K('knob-delay-feedback1', 1030, 278, true, 'Feedback 1')}
      {K('knob-delay-feedback2', 1070, 278, true, 'Feedback 2')}

      <line style={styles.divider} x1="1098" y1="155" x2="1098" y2="305" />

      {/* ===== OUTPUT ===== */}
      <text style={styles.sectionLabel} x="1140" y="165">Output</text>
      {/* Master volume is an extra-large knob (r=18) */}
      <InteractiveKnob
        id="knob-master-volume"
        x={1140}
        y={240}
        large={true}
        label="Master Vol"
        value={getVal('knob-master-volume')}
        highlighted={isHighlighted('knob-master-volume')}
        highlightColor={getHighlightColor('knob-master-volume')}
        onChange={effectiveOnChange}
      />

      {/* ===== BRANDING ===== */}
      <text style={styles.brandText} x="1080" y="304">Dave Smith</text>
      <text style={{ ...styles.brandText, fontSize: '5px', letterSpacing: '2.5px' }} x="1080" y="314">INSTRUMENTS</text>

      {/* ==================== KEYBOARD ==================== */}
      <rect style={styles.wheelBg} x="24" y="330" width="50" height="180" rx="4" />
      <g id="wheel-pitch-bend" transform="translate(34, 340)">
        <rect style={styles.wheel} width="14" height="80" rx="2" />
        <text style={styles.knobLabel} x="7" y="92">Pitch</text>
      </g>
      <g id="wheel-mod" transform="translate(54, 340)">
        <rect style={styles.wheel} width="14" height="80" rx="2" />
        <text style={styles.knobLabel} x="7" y="92">Mod</text>
      </g>

      <g id="keyboard" transform="translate(80, 330)">
        <g id="keyboard-white-keys">
          {[
            ['C2',0],['D2',30],['E2',60],['F2',90],['G2',120],['A2',150],['B2',180],
            ['C3',210],['D3',240],['E3',270],['F3',300],['G3',330],['A3',360],['B3',390],
            ['C4',420],['D4',450],['E4',480],['F4',510],['G4',540],['A4',570],['B4',600],
            ['C5',630],['D5',660],['E5',690],['F5',720],['G5',750],['A5',780],['B5',810],
            ['C6',840],['D6',870],['E6',900],['F6',930],['G6',960],['A6',990],['B6',1020],
            ['C7',1050],
          ].map(([note, x]) => (
            <rect key={`key-${note}`} id={`key-${note}`} style={styles.keyWhite} x={x as number} y="0" width="28" height="180" rx="2" />
          ))}
        </g>
        <g id="keyboard-black-keys">
          {[
            ['Cs2',20],['Ds2',50],['Fs2',108],['Gs2',140],['As2',170],
            ['Cs3',230],['Ds3',260],['Fs3',318],['Gs3',350],['As3',380],
            ['Cs4',440],['Ds4',470],['Fs4',528],['Gs4',560],['As4',590],
            ['Cs5',650],['Ds5',680],['Fs5',738],['Gs5',770],['As5',800],
            ['Cs6',860],['Ds6',890],['Fs6',948],['Gs6',980],['As6',1010],
          ].map(([note, x]) => (
            <rect key={`key-${note}`} id={`key-${note}`} style={styles.keyBlack} x={x as number} y="0" width="18" height="110" rx="1" />
          ))}
        </g>
      </g>
    </svg>
    <PanelTooltip
      controlId={hoveredControl}
      svgRef={svgRef}
      knobValues={effectiveValues}
    />
    </div>
  );
}

export const EvolverPanel = memo(EvolverPanelInner);
