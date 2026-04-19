'use client';

import React, { useState, useRef, useCallback, memo } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  CONTROL_METADATA,
  CONTROL_POSITIONS,
  SECTION_BOUNDS,
  JACK_POSITIONS,
} from '@/lib/crow-panel-data';

// ===== Types =====

interface CrowPanelProps {
  highlights?: Array<{ controlId: string; color: 'blue' | 'amber' }>;
  activeSections?: string[];
  zoomSections?: string[];
  cables?: Array<{
    sourceId: string;
    destId: string;
    signalType: 'audio' | 'cv' | 'gate' | 'modulation' | 'default';
    purpose?: string;
  }>;
  className?: string;
}

// ===== Constants =====

const VIEWBOX = '0 0 60 380';

const CABLE_COLORS: Record<string, string> = {
  audio: '#ff6644',
  cv: '#3388ff',
  gate: '#44cc66',
  modulation: '#ffaa33',
  default: '#888888',
};

// ===== Styles =====

const styles = {
  panelBg: { fill: '#1a1a1a' } as React.CSSProperties,
  panelBorder: {
    fill: 'none',
    stroke: '#333',
    strokeWidth: 1.5,
  } as React.CSSProperties,
  titleText: {
    fill: '#e8e8e8',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'lowercase' as const,
    letterSpacing: '2px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  brandText: {
    fill: '#888',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '6px',
    fontWeight: 400,
    textTransform: 'lowercase' as const,
    letterSpacing: '1.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  jackLabel: {
    fill: '#aaa',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  inputLabel: {
    fill: '#888',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '5px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    textAnchor: 'middle' as const,
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
} as const;

// ===== computeZoomViewBox =====

function computeZoomViewBox(sections: string[]): string | null {
  const padding = 10;
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
  const droop = Math.min(20, 10 + dx * 0.1);
  const midY = Math.max(src.y, dst.y) + droop;

  const color = CABLE_COLORS[signalType] || CABLE_COLORS.default;

  return (
    <path
      d={`M ${src.x},${src.y} Q ${midX},${midY} ${dst.x},${dst.y}`}
      fill="none"
      stroke={color}
      strokeWidth={2}
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

// ===== Panel Tooltip =====

function CrowPanelTooltip({
  controlId,
  svgRef,
}: {
  controlId: string | null;
  svgRef: React.RefObject<SVGSVGElement | null>;
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

  const transform = position.flipped ? 'translate(-50%, 0)' : 'translate(-50%, -100%)';

  return (
    <div style={{ ...styles.tooltipBg, left: position.left, top: position.top, transform }}>
      <div style={styles.tooltipName}>{meta.name}</div>
    </div>
  );
}

// ===== Main CrowPanel Component =====

function CrowPanelInner({
  highlights,
  activeSections,
  zoomSections,
  cables,
  className,
}: CrowPanelProps) {
  const [hoveredControl, setHoveredControl] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

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
          <filter id="crow-glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feFlood floodColor="#3388ff" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="crow-glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feFlood floodColor="#ffaa33" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Panel background — dark black like the physical Crow panel */}
        <rect style={styles.panelBg} x="0" y="0" width="60" height="380" rx="2" />
        <rect style={styles.panelBorder} x="0" y="0" width="60" height="380" rx="2" />

        {/* crow title */}
        <text style={styles.titleText} x={30} y={22}>crow</text>

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
              rx={3}
              fill="rgba(255,255,255,0.03)"
              fillOpacity={0.08}
              style={{ transition: 'opacity 150ms ease-out' }}
            />
          );
        })}

        {/* Separator line between inputs and outputs */}
        <line x1={10} y1={190} x2={50} y2={190} stroke="#333" strokeWidth={0.5} />

        {/* Input section label */}
        <text style={styles.inputLabel} x={30} y={100}>in</text>

        {/* Output section label */}
        <text style={styles.inputLabel} x={30} y={208}>out</text>

        {/* Render all controls */}
        {Object.values(CONTROL_METADATA).map((ctrl) => {
          const pos = CONTROL_POSITIONS[ctrl.id];
          if (!pos) return null;

          const highlighted = isHighlighted(ctrl.id);
          const highlightColor = getHighlightColor(ctrl.id);

          switch (ctrl.type) {
            case 'jack-in':
              return (
                <g key={ctrl.id} id={ctrl.id} transform={`translate(${pos.x}, ${pos.y})`}>
                  {highlighted && (
                    <circle
                      r={10}
                      fill="none"
                      stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
                      strokeOpacity={0.6}
                      filter={`url(#crow-glow-${highlightColor || 'blue'})`}
                    />
                  )}
                  <circle
                    r={6}
                    fill="#1a1a1a"
                    stroke="#555"
                    strokeWidth={1}
                  />
                  <text y={12} style={styles.jackLabel}>{ctrl.name}</text>
                </g>
              );
            case 'jack-out':
              return (
                <g key={ctrl.id} id={ctrl.id} transform={`translate(${pos.x}, ${pos.y})`}>
                  {highlighted && (
                    <circle
                      r={10}
                      fill="none"
                      stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
                      strokeOpacity={0.6}
                      filter={`url(#crow-glow-${highlightColor || 'blue'})`}
                    />
                  )}
                  <circle
                    r={6}
                    fill="#e8e8e8"
                    stroke="#fff"
                    strokeWidth={1.5}
                  />
                  <text y={12} style={styles.jackLabel}>{ctrl.name}</text>
                </g>
              );
            case 'led':
              return (
                <g key={ctrl.id} id={ctrl.id} transform={`translate(${pos.x}, ${pos.y})`}>
                  {highlighted && (
                    <circle
                      r={6}
                      fill="none"
                      stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
                      strokeOpacity={0.6}
                      filter={`url(#crow-glow-${highlightColor || 'blue'})`}
                    />
                  )}
                  {/* USB-C connector shape */}
                  <rect x={-8} y={-4} width={16} height={8} rx={2} fill="#333" stroke="#555" strokeWidth={0.5} />
                  <circle r={2} style={styles.ledOff} />
                </g>
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

        {/* monome brand at bottom */}
        <text style={styles.brandText} x={30} y={370}>monome</text>
      </motion.svg>

      {/* Tooltip */}
      <CrowPanelTooltip
        controlId={hoveredControl}
        svgRef={svgRef}
      />
    </div>
  );
}

const CrowPanel = memo(CrowPanelInner);

export { CrowPanel };
