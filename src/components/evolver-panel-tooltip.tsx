'use client';

import { useEffect, useState } from 'react';
import { CONTROL_METADATA } from '@/lib/evolver-panel-data';

// ===== Types =====

interface PanelTooltipProps {
  controlId: string | null;
  svgRef: React.RefObject<SVGSVGElement | null>;
  knobValues?: Record<string, number>;
  highlightTarget?: number;
}

interface TooltipPosition {
  left: number;
  top: number;
  flipped: boolean;
}

// ===== PanelTooltip Component =====

function getPosition(
  controlId: string,
  svgRef: React.RefObject<SVGSVGElement | null>,
): TooltipPosition | null {
  if (!svgRef.current) return null;

  const el = svgRef.current.querySelector(`#${controlId}`);
  if (!el) return null;

  const rect = el.getBoundingClientRect();
  const left = rect.left + rect.width / 2;
  const top = rect.top - 8;

  // Flip below if tooltip would go above viewport
  if (top < 0) {
    return { left, top: rect.bottom + 8, flipped: true };
  }

  return { left, top, flipped: false };
}

export function PanelTooltip({
  controlId,
  svgRef,
  knobValues,
  highlightTarget,
}: PanelTooltipProps) {
  const [position, setPosition] = useState<TooltipPosition | null>(null);

  useEffect(() => {
    if (!controlId) {
      setPosition(null);
      return;
    }

    const pos = getPosition(controlId, svgRef);
    setPosition(pos);
  }, [controlId, svgRef]);

  if (!controlId || !position) return null;

  const meta = CONTROL_METADATA[controlId];
  if (!meta) return null;

  const value = knobValues?.[controlId];
  const hasValue = value !== undefined;
  const hasNrpn = meta.nrpn !== null;

  const transform = position.flipped
    ? 'translate(-50%, 0)'
    : 'translate(-50%, -100%)';

  return (
    <div
      style={{
        position: 'fixed',
        left: position.left,
        top: position.top,
        transform,
        background: '#161616',
        border: '1px solid #333333',
        borderRadius: '8px',
        padding: '8px',
        maxWidth: '200px',
        zIndex: 30,
        pointerEvents: 'none',
      }}
    >
      {/* Control name */}
      <div
        style={{
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          color: '#e8e8e8',
          lineHeight: 1.3,
        }}
      >
        {meta.name}
      </div>

      {/* Value line */}
      {hasValue && !highlightTarget && (
        <div
          style={{
            fontSize: '13px',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 400,
            color: '#a3e635',
            lineHeight: 1.3,
          }}
        >
          {value} / 127
        </div>
      )}

      {/* Target value line (session context) */}
      {highlightTarget !== undefined && (
        <div
          style={{
            fontSize: '13px',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 400,
            color: '#a3e635',
            lineHeight: 1.3,
          }}
        >
          Set to {highlightTarget}
        </div>
      )}

      {/* NRPN number */}
      {hasNrpn && (
        <div
          style={{
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            color: '#737373',
            lineHeight: 1.3,
          }}
        >
          NRPN {meta.nrpn}
        </div>
      )}
    </div>
  );
}
