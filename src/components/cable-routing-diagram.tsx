'use client';

import { useState, useRef, useCallback } from 'react';
import type { CableConnection } from '@/lib/content/schemas';

const CANONICAL_MODULES = [
  'VCO A',
  'VCO B',
  'VCF',
  'Wave Folder',
  'VCA A',
  'VCA B / LPF',
  'Mixer',
  'Envelope A',
  'Envelope B',
  'LFO X/Y/Z',
  'Output Control',
  'FX Send/Return',
  'MIDI/CV',
  'Patchbay',
  'Utilities',
  'Push Gate',
  'Line In',
];

function extractModuleName(label: string): string {
  for (const mod of CANONICAL_MODULES) {
    if (label.startsWith(mod)) {
      return mod;
    }
  }
  // Fallback: first word
  return label.split(' ')[0];
}

function toNodeId(moduleName: string): string {
  return moduleName.replace(/[\s/\-]/g, '');
}

export function generateMermaid(cables: CableConnection[]): string {
  const lines: string[] = ['graph LR'];
  const declaredNodes = new Set<string>();

  for (const cable of cables) {
    const srcModule = extractModuleName(cable.source);
    const dstModule = extractModuleName(cable.destination);
    const srcId = toNodeId(srcModule);
    const dstId = toNodeId(dstModule);

    if (!declaredNodes.has(srcId)) {
      lines.push(`  ${srcId}["${srcModule}"]`);
      declaredNodes.add(srcId);
    }
    if (!declaredNodes.has(dstId)) {
      lines.push(`  ${dstId}["${dstModule}"]`);
      declaredNodes.add(dstId);
    }

    if (cable.purpose) {
      lines.push(`  ${srcId} -->|"${cable.purpose}"| ${dstId}`);
    } else {
      lines.push(`  ${srcId} --> ${dstId}`);
    }
  }

  return lines.join('\n');
}

interface CableRoutingDiagramProps {
  cables: CableConnection[];
}

export function CableRoutingDiagram({ cables }: CableRoutingDiagramProps) {
  const [showDiagram, setShowDiagram] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(async () => {
    if (!showDiagram) {
      setShowDiagram(true);
      // Render mermaid after state update
      requestAnimationFrame(async () => {
        if (!containerRef.current) return;
        try {
          const mermaid = (await import('mermaid')).default;
          mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            themeVariables: {
              primaryColor: '#161616',
              primaryTextColor: '#e8e8e8',
              lineColor: '#737373',
            },
          });
          const source = generateMermaid(cables);
          const { svg } = await mermaid.render(
            `cable-diagram-${Date.now()}`,
            source,
          );
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (e) {
          console.error('Mermaid render error:', e);
        }
      });
    } else {
      setShowDiagram(false);
    }
  }, [showDiagram, cables]);

  if (cables.length < 2) {
    return null;
  }

  return (
    <div className="mt-md">
      <button
        onClick={handleToggle}
        className="text-sm text-accent hover:underline"
        type="button"
      >
        {showDiagram ? 'Hide Diagram' : 'Show Diagram'}
      </button>
      <div
        ref={containerRef}
        className="overflow-x-auto mt-sm"
        style={{
          opacity: showDiagram ? 1 : 0,
          transition: 'opacity 150ms ease',
          height: showDiagram ? 'auto' : 0,
        }}
      />
    </div>
  );
}
