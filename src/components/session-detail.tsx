'use client';

import { Fragment } from 'react';
import type { Session } from '@/lib/content/types';
import { StickyHeader } from '@/components/sticky-header';
import { PrevNextNav } from '@/components/prev-next-nav';
import { SourceRef } from '@/components/source-ref';
import { EvolverPanel } from '@/components/evolver-panel';
import { CascadiaPanel } from '@/components/cascadia-panel';
import { OctatrackPanel } from '@/components/octatrack-panel';
import { PlaitsPanel } from '@/components/plaits-panel';
import { BeadsPanel } from '@/components/beads-panel';
import { SwellsPanel } from '@/components/swells-panel';
import { IkariePanel } from '@/components/ikarie-panel';
import { JustFriendsPanel } from '@/components/just-friends-panel';
import { CrowPanel } from '@/components/crow-panel';
import { CONTROL_METADATA } from '@/lib/evolver-panel-data';
import { CONTROL_METADATA as CASCADIA_METADATA } from '@/lib/cascadia-panel-data';
import { CONTROL_METADATA as OCTATRACK_METADATA } from '@/lib/octatrack-panel-data';
import { CONTROL_METADATA as PLAITS_METADATA } from '@/lib/plaits-panel-data';
import { CONTROL_METADATA as BEADS_METADATA } from '@/lib/beads-panel-data';
import { CONTROL_METADATA as SWELLS_METADATA } from '@/lib/swells-panel-data';
import { CONTROL_METADATA as IKARIE_METADATA } from '@/lib/ikarie-panel-data';
import { CONTROL_METADATA as JF_METADATA } from '@/lib/just-friends-panel-data';
import { CONTROL_METADATA as CROW_METADATA } from '@/lib/crow-panel-data';
import { CompletionToggle } from '@/components/completion-toggle';
import { NarrowShell } from '@/components/page-shell';
import dynamic from 'next/dynamic';

const MermaidRenderer = dynamic(
  () =>
    import('@/components/mermaid-renderer').then((m) => ({
      default: m.MermaidRenderer,
    })),
  { ssr: false },
);

// Regex allows > inside quoted attribute values (e.g., data-cables="jack-a>jack-b:audio")
const PANEL_MARKER_RE = /<div data-evolver-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;
const CASCADIA_PANEL_RE = /<div data-cascadia-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;
const OCTATRACK_PANEL_RE = /<div data-octatrack-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;
const PLAITS_PANEL_RE = /<div data-plaits-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;
const BEADS_PANEL_RE = /<div data-beads-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;
const SWELLS_PANEL_RE = /<div data-swells-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;
const IKARIE_PANEL_RE = /<div data-ikarie-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;
const JF_PANEL_RE = /<div data-just-friends-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;
const CROW_PANEL_RE = /<div data-crow-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;

function parsePanelProps(attrString: string) {
  const knobValues: Record<string, number> = {};
  const highlights: Array<{ controlId: string; color: 'blue' | 'amber' }> = [];
  const activeSections: string[] = [];

  const knobsMatch = attrString.match(/data-knobs="([^"]*)"/);
  if (knobsMatch) {
    for (const pair of knobsMatch[1].split(',')) {
      const [id, val] = pair.split(':');
      if (id && val !== undefined) {
        const meta = CONTROL_METADATA[id.trim()];
        if (meta) knobValues[id.trim()] = Number(val);
      }
    }
  }

  const highlightsMatch = attrString.match(/data-highlights="([^"]*)"/);
  if (highlightsMatch) {
    for (const pair of highlightsMatch[1].split(',')) {
      const [id, color] = pair.split(':');
      if (id && (color === 'blue' || color === 'amber')) {
        highlights.push({ controlId: id.trim(), color });
      }
    }
  }

  const sectionsMatch = attrString.match(/data-sections="([^"]*)"/);
  if (sectionsMatch) {
    activeSections.push(...sectionsMatch[1].split(',').map((s) => s.trim()));
  }

  const zoomMatch = attrString.match(/data-zoom="([^"]*)"/);
  const hasExplicitZoom = !!zoomMatch;
  const explicitZoom = zoomMatch && zoomMatch[1] !== 'false'
    ? zoomMatch[1].split(',').map((s) => s.trim())
    : [];

  // Auto-zoom: if no explicit data-zoom but sections are specified, zoom to those sections
  // Use data-zoom="false" to disable auto-zoom and show full panel
  const zoomSections = hasExplicitZoom
    ? explicitZoom
    : activeSections;

  return {
    knobValues: Object.keys(knobValues).length > 0 ? knobValues : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    activeSections: activeSections.length > 0 ? activeSections : undefined,
    zoomSections: zoomSections.length > 0 ? zoomSections : undefined,
    cables: undefined,
  };
}

function parseCascadiaPanelProps(attrString: string) {
  const knobValues: Record<string, number> = {};
  const highlights: Array<{ controlId: string; color: 'blue' | 'amber' }> = [];
  const activeSections: string[] = [];
  const cables: Array<{ sourceId: string; destId: string; signalType: 'audio' | 'cv' | 'modulation' | 'default'; purpose?: string }> = [];

  const knobsMatch = attrString.match(/data-knobs="([^"]*)"/);
  if (knobsMatch) {
    for (const pair of knobsMatch[1].split(',')) {
      const [id, val] = pair.split(':');
      if (id && val !== undefined) {
        const meta = CASCADIA_METADATA[id.trim()];
        if (meta) knobValues[id.trim()] = Number(val);
      }
    }
  }

  const highlightsMatch = attrString.match(/data-highlights="([^"]*)"/);
  if (highlightsMatch) {
    for (const pair of highlightsMatch[1].split(',')) {
      const [id, color] = pair.split(':');
      if (id && (color === 'blue' || color === 'amber')) {
        highlights.push({ controlId: id.trim(), color });
      }
    }
  }

  const sectionsMatch = attrString.match(/data-sections="([^"]*)"/);
  if (sectionsMatch) {
    activeSections.push(...sectionsMatch[1].split(',').map((s) => s.trim()));
  }

  const zoomMatch = attrString.match(/data-zoom="([^"]*)"/);
  const hasExplicitZoom = !!zoomMatch;
  const explicitZoom = zoomMatch && zoomMatch[1] !== 'false'
    ? zoomMatch[1].split(',').map((s) => s.trim())
    : [];
  const zoomSections = hasExplicitZoom ? explicitZoom : activeSections;

  // data-cables parsing: "sourceJackId>destJackId:signalType,sourceJackId>destJackId:signalType"
  const cablesMatch = attrString.match(/data-cables="([^"]*)"/);
  if (cablesMatch) {
    for (const entry of cablesMatch[1].split(',')) {
      const [connection, signalType] = entry.split(':');
      const [source, dest] = (connection || '').split('>');
      if (source && dest) {
        cables.push({
          sourceId: source.trim(),
          destId: dest.trim(),
          signalType: (signalType?.trim() as 'audio' | 'cv' | 'modulation') || 'default',
        });
      }
    }
  }

  return {
    knobValues: Object.keys(knobValues).length > 0 ? knobValues : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    activeSections: activeSections.length > 0 ? activeSections : undefined,
    zoomSections: zoomSections.length > 0 ? zoomSections : undefined,
    cables: cables.length > 0 ? cables : undefined,
  };
}

function parseSwellsPanelProps(attrString: string) {
  const knobValues: Record<string, number> = {};
  const highlights: Array<{ controlId: string; color: 'blue' | 'amber' }> = [];
  const activeSections: string[] = [];
  const cables: Array<{ sourceId: string; destId: string; signalType: 'audio' | 'cv' | 'modulation' | 'default'; purpose?: string }> = [];

  const knobsMatch = attrString.match(/data-knobs="([^"]*)"/);
  if (knobsMatch) {
    for (const pair of knobsMatch[1].split(',')) {
      const [id, val] = pair.split(':');
      if (id && val !== undefined) {
        const meta = SWELLS_METADATA[id.trim()];
        if (meta) knobValues[id.trim()] = Number(val);
      }
    }
  }

  // Also parse data-sliders (same format as data-knobs, for slider values)
  const slidersMatch = attrString.match(/data-sliders="([^"]*)"/);
  if (slidersMatch) {
    for (const pair of slidersMatch[1].split(',')) {
      const [id, val] = pair.split(':');
      if (id && val !== undefined) {
        const meta = SWELLS_METADATA[id.trim()];
        if (meta) knobValues[id.trim()] = Number(val);
      }
    }
  }

  const highlightsMatch = attrString.match(/data-highlights="([^"]*)"/);
  if (highlightsMatch) {
    for (const pair of highlightsMatch[1].split(',')) {
      const [id, color] = pair.split(':');
      if (id && (color === 'blue' || color === 'amber')) {
        highlights.push({ controlId: id.trim(), color });
      }
    }
  }

  const sectionsMatch = attrString.match(/data-sections="([^"]*)"/);
  if (sectionsMatch) {
    activeSections.push(...sectionsMatch[1].split(',').map((s) => s.trim()));
  }

  const zoomMatch = attrString.match(/data-zoom="([^"]*)"/);
  const hasExplicitZoom = !!zoomMatch;
  const explicitZoom = zoomMatch && zoomMatch[1] !== 'false'
    ? zoomMatch[1].split(',').map((s) => s.trim())
    : [];
  const zoomSections = hasExplicitZoom ? explicitZoom : activeSections;

  const cablesMatch = attrString.match(/data-cables="([^"]*)"/);
  if (cablesMatch) {
    for (const entry of cablesMatch[1].split(',')) {
      const [connection, signalType] = entry.split(':');
      const [source, dest] = (connection || '').split('>');
      if (source && dest) {
        cables.push({
          sourceId: source.trim(),
          destId: dest.trim(),
          signalType: (signalType?.trim() as 'audio' | 'cv' | 'modulation') || 'default',
        });
      }
    }
  }

  return {
    knobValues: Object.keys(knobValues).length > 0 ? knobValues : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    activeSections: activeSections.length > 0 ? activeSections : undefined,
    zoomSections: zoomSections.length > 0 ? zoomSections : undefined,
    cables: cables.length > 0 ? cables : undefined,
  };
}

function parseIkariePanelProps(attrString: string) {
  const knobValues: Record<string, number> = {};
  const highlights: Array<{ controlId: string; color: 'blue' | 'amber' }> = [];
  const activeSections: string[] = [];
  const cables: Array<{ sourceId: string; destId: string; signalType: 'audio' | 'cv' | 'modulation' | 'default'; purpose?: string }> = [];

  const knobsMatch = attrString.match(/data-knobs="([^"]*)"/);
  if (knobsMatch) {
    for (const pair of knobsMatch[1].split(',')) {
      const [id, val] = pair.split(':');
      if (id && val !== undefined) {
        const meta = IKARIE_METADATA[id.trim()];
        if (meta) knobValues[id.trim()] = Number(val);
      }
    }
  }

  // Also parse data-sliders (same format as data-knobs, for slider values)
  const slidersMatch = attrString.match(/data-sliders="([^"]*)"/);
  if (slidersMatch) {
    for (const pair of slidersMatch[1].split(',')) {
      const [id, val] = pair.split(':');
      if (id && val !== undefined) {
        const meta = IKARIE_METADATA[id.trim()];
        if (meta) knobValues[id.trim()] = Number(val);
      }
    }
  }

  const highlightsMatch = attrString.match(/data-highlights="([^"]*)"/);
  if (highlightsMatch) {
    for (const pair of highlightsMatch[1].split(',')) {
      const [id, color] = pair.split(':');
      if (id && (color === 'blue' || color === 'amber')) {
        highlights.push({ controlId: id.trim(), color });
      }
    }
  }

  const sectionsMatch = attrString.match(/data-sections="([^"]*)"/);
  if (sectionsMatch) {
    activeSections.push(...sectionsMatch[1].split(',').map((s) => s.trim()));
  }

  const zoomMatch = attrString.match(/data-zoom="([^"]*)"/);
  const hasExplicitZoom = !!zoomMatch;
  const explicitZoom = zoomMatch && zoomMatch[1] !== 'false'
    ? zoomMatch[1].split(',').map((s) => s.trim())
    : [];
  const zoomSections = hasExplicitZoom ? explicitZoom : activeSections;

  const cablesMatch = attrString.match(/data-cables="([^"]*)"/);
  if (cablesMatch) {
    for (const entry of cablesMatch[1].split(',')) {
      const [connection, signalType] = entry.split(':');
      const [source, dest] = (connection || '').split('>');
      if (source && dest) {
        cables.push({
          sourceId: source.trim(),
          destId: dest.trim(),
          signalType: (signalType?.trim() as 'audio' | 'cv' | 'modulation') || 'default',
        });
      }
    }
  }

  return {
    knobValues: Object.keys(knobValues).length > 0 ? knobValues : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    activeSections: activeSections.length > 0 ? activeSections : undefined,
    zoomSections: zoomSections.length > 0 ? zoomSections : undefined,
    cables: cables.length > 0 ? cables : undefined,
  };
}

function parseOctatrackPanelProps(attrString: string) {
  const knobValues: Record<string, number> = {};
  const highlights: Array<{ controlId: string; color: 'blue' | 'amber' }> = [];
  const activeSections: string[] = [];

  const knobsMatch = attrString.match(/data-knobs="([^"]*)"/);
  if (knobsMatch) {
    for (const pair of knobsMatch[1].split(',')) {
      const [id, val] = pair.split(':');
      if (id && val !== undefined) {
        const meta = OCTATRACK_METADATA[id.trim()];
        if (meta) knobValues[id.trim()] = Number(val);
      }
    }
  }

  const highlightsMatch = attrString.match(/data-highlights="([^"]*)"/);
  if (highlightsMatch) {
    for (const pair of highlightsMatch[1].split(',')) {
      const [id, color] = pair.split(':');
      if (id && (color === 'blue' || color === 'amber')) {
        highlights.push({ controlId: id.trim(), color });
      }
    }
  }

  const sectionsMatch = attrString.match(/data-sections="([^"]*)"/);
  if (sectionsMatch) {
    activeSections.push(...sectionsMatch[1].split(',').map((s) => s.trim()));
  }

  const zoomMatch = attrString.match(/data-zoom="([^"]*)"/);
  const hasExplicitZoom = !!zoomMatch;
  const explicitZoom = zoomMatch && zoomMatch[1] !== 'false'
    ? zoomMatch[1].split(',').map((s) => s.trim())
    : [];
  const zoomSections = hasExplicitZoom ? explicitZoom : activeSections;

  // Octatrack has no patch jacks on the front panel; cables are never
  // parsed. Returning cables:undefined keeps the return shape uniform with
  // parseCascadiaPanelProps so downstream code doesn't branch on instrument.
  return {
    knobValues: Object.keys(knobValues).length > 0 ? knobValues : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    activeSections: activeSections.length > 0 ? activeSections : undefined,
    zoomSections: zoomSections.length > 0 ? zoomSections : undefined,
    cables: undefined,
  };
}

function parsePlaitsPanelProps(attrString: string) {
  const knobValues: Record<string, number> = {};
  const highlights: Array<{ controlId: string; color: 'blue' | 'amber' }> = [];
  const activeSections: string[] = [];
  const cables: Array<{ sourceId: string; destId: string; signalType: 'audio' | 'cv' | 'modulation' | 'default'; purpose?: string }> = [];

  const knobsMatch = attrString.match(/data-knobs="([^"]*)"/);
  if (knobsMatch) {
    for (const pair of knobsMatch[1].split(',')) {
      const [id, val] = pair.split(':');
      if (id && val !== undefined) {
        const meta = PLAITS_METADATA[id.trim()];
        if (meta) knobValues[id.trim()] = Number(val);
      }
    }
  }

  const highlightsMatch = attrString.match(/data-highlights="([^"]*)"/);
  if (highlightsMatch) {
    for (const pair of highlightsMatch[1].split(',')) {
      const [id, color] = pair.split(':');
      if (id && (color === 'blue' || color === 'amber')) {
        highlights.push({ controlId: id.trim(), color });
      }
    }
  }

  const sectionsMatch = attrString.match(/data-sections="([^"]*)"/);
  if (sectionsMatch) {
    activeSections.push(...sectionsMatch[1].split(',').map((s) => s.trim()));
  }

  const zoomMatch = attrString.match(/data-zoom="([^"]*)"/);
  const hasExplicitZoom = !!zoomMatch;
  const explicitZoom = zoomMatch && zoomMatch[1] !== 'false'
    ? zoomMatch[1].split(',').map((s) => s.trim())
    : [];
  const zoomSections = hasExplicitZoom ? explicitZoom : activeSections;

  const cablesMatch = attrString.match(/data-cables="([^"]*)"/);
  if (cablesMatch) {
    for (const entry of cablesMatch[1].split(',')) {
      const [connection, signalType] = entry.split(':');
      const [source, dest] = (connection || '').split('>');
      if (source && dest) {
        cables.push({
          sourceId: source.trim(),
          destId: dest.trim(),
          signalType: (signalType?.trim() as 'audio' | 'cv' | 'modulation') || 'default',
        });
      }
    }
  }

  return {
    knobValues: Object.keys(knobValues).length > 0 ? knobValues : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    activeSections: activeSections.length > 0 ? activeSections : undefined,
    zoomSections: zoomSections.length > 0 ? zoomSections : undefined,
    cables: cables.length > 0 ? cables : undefined,
  };
}

function parseBeadsPanelProps(attrString: string) {
  const knobValues: Record<string, number> = {};
  const highlights: Array<{ controlId: string; color: 'blue' | 'amber' }> = [];
  const activeSections: string[] = [];
  const cables: Array<{ sourceId: string; destId: string; signalType: 'audio' | 'cv' | 'modulation' | 'default'; purpose?: string }> = [];

  const knobsMatch = attrString.match(/data-knobs="([^"]*)"/);
  if (knobsMatch) {
    for (const pair of knobsMatch[1].split(',')) {
      const [id, val] = pair.split(':');
      if (id && val !== undefined) {
        const meta = BEADS_METADATA[id.trim()];
        if (meta) knobValues[id.trim()] = Number(val);
      }
    }
  }

  const highlightsMatch = attrString.match(/data-highlights="([^"]*)"/);
  if (highlightsMatch) {
    for (const pair of highlightsMatch[1].split(',')) {
      const [id, color] = pair.split(':');
      if (id && (color === 'blue' || color === 'amber')) {
        highlights.push({ controlId: id.trim(), color });
      }
    }
  }

  const sectionsMatch = attrString.match(/data-sections="([^"]*)"/);
  if (sectionsMatch) {
    activeSections.push(...sectionsMatch[1].split(',').map((s) => s.trim()));
  }

  const zoomMatch = attrString.match(/data-zoom="([^"]*)"/);
  const hasExplicitZoom = !!zoomMatch;
  const explicitZoom = zoomMatch && zoomMatch[1] !== 'false'
    ? zoomMatch[1].split(',').map((s) => s.trim())
    : [];
  const zoomSections = hasExplicitZoom ? explicitZoom : activeSections;

  const cablesMatch = attrString.match(/data-cables="([^"]*)"/);
  if (cablesMatch) {
    for (const entry of cablesMatch[1].split(',')) {
      const [connection, signalType] = entry.split(':');
      const [source, dest] = (connection || '').split('>');
      if (source && dest) {
        cables.push({
          sourceId: source.trim(),
          destId: dest.trim(),
          signalType: (signalType?.trim() as 'audio' | 'cv' | 'modulation') || 'default',
        });
      }
    }
  }

  return {
    knobValues: Object.keys(knobValues).length > 0 ? knobValues : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    activeSections: activeSections.length > 0 ? activeSections : undefined,
    zoomSections: zoomSections.length > 0 ? zoomSections : undefined,
    cables: cables.length > 0 ? cables : undefined,
  };
}

function parseJustFriendsPanelProps(attrString: string) {
  const knobValues: Record<string, number> = {};
  const highlights: Array<{ controlId: string; color: 'blue' | 'amber' }> = [];
  const activeSections: string[] = [];
  const cables: Array<{ sourceId: string; destId: string; signalType: 'audio' | 'cv' | 'modulation' | 'default'; purpose?: string }> = [];

  const knobsMatch = attrString.match(/data-knobs="([^"]*)"/);
  if (knobsMatch) {
    for (const pair of knobsMatch[1].split(',')) {
      const [id, val] = pair.split(':');
      if (id && val !== undefined) {
        const meta = JF_METADATA[id.trim()];
        if (meta) knobValues[id.trim()] = Number(val);
      }
    }
  }

  const highlightsMatch = attrString.match(/data-highlights="([^"]*)"/);
  if (highlightsMatch) {
    for (const pair of highlightsMatch[1].split(',')) {
      const [id, color] = pair.split(':');
      if (id && (color === 'blue' || color === 'amber')) {
        highlights.push({ controlId: id.trim(), color });
      }
    }
  }

  const sectionsMatch = attrString.match(/data-sections="([^"]*)"/);
  if (sectionsMatch) {
    activeSections.push(...sectionsMatch[1].split(',').map((s) => s.trim()));
  }

  const zoomMatch = attrString.match(/data-zoom="([^"]*)"/);
  const hasExplicitZoom = !!zoomMatch;
  const explicitZoom = zoomMatch && zoomMatch[1] !== 'false'
    ? zoomMatch[1].split(',').map((s) => s.trim())
    : [];
  const zoomSections = hasExplicitZoom ? explicitZoom : activeSections;

  const cablesMatch = attrString.match(/data-cables="([^"]*)"/);
  if (cablesMatch) {
    for (const entry of cablesMatch[1].split(',')) {
      const [connection, signalType] = entry.split(':');
      const [source, dest] = (connection || '').split('>');
      if (source && dest) {
        cables.push({
          sourceId: source.trim(),
          destId: dest.trim(),
          signalType: (signalType?.trim() as 'audio' | 'cv' | 'modulation') || 'default',
        });
      }
    }
  }

  return {
    knobValues: Object.keys(knobValues).length > 0 ? knobValues : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    activeSections: activeSections.length > 0 ? activeSections : undefined,
    zoomSections: zoomSections.length > 0 ? zoomSections : undefined,
    cables: cables.length > 0 ? cables : undefined,
  };
}

function parseCrowPanelProps(attrString: string) {
  const highlights: Array<{ controlId: string; color: 'blue' | 'amber' }> = [];
  const activeSections: string[] = [];
  const cables: Array<{ sourceId: string; destId: string; signalType: 'audio' | 'cv' | 'modulation' | 'default'; purpose?: string }> = [];

  const highlightsMatch = attrString.match(/data-highlights="([^"]*)"/);
  if (highlightsMatch) {
    for (const pair of highlightsMatch[1].split(',')) {
      const [id, color] = pair.split(':');
      if (id && (color === 'blue' || color === 'amber')) {
        highlights.push({ controlId: id.trim(), color });
      }
    }
  }

  const sectionsMatch = attrString.match(/data-sections="([^"]*)"/);
  if (sectionsMatch) {
    activeSections.push(...sectionsMatch[1].split(',').map((s) => s.trim()));
  }

  const zoomMatch = attrString.match(/data-zoom="([^"]*)"/);
  const hasExplicitZoom = !!zoomMatch;
  const explicitZoom = zoomMatch && zoomMatch[1] !== 'false'
    ? zoomMatch[1].split(',').map((s) => s.trim())
    : [];
  const zoomSections = hasExplicitZoom ? explicitZoom : activeSections;

  const cablesMatch = attrString.match(/data-cables="([^"]*)"/);
  if (cablesMatch) {
    for (const entry of cablesMatch[1].split(',')) {
      const [connection, signalType] = entry.split(':');
      const [source, dest] = (connection || '').split('>');
      if (source && dest) {
        cables.push({
          sourceId: source.trim(),
          destId: dest.trim(),
          signalType: (signalType?.trim() as 'audio' | 'cv' | 'modulation') || 'default',
        });
      }
    }
  }

  return {
    knobValues: undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    activeSections: activeSections.length > 0 ? activeSections : undefined,
    zoomSections: zoomSections.length > 0 ? zoomSections : undefined,
    cables: cables.length > 0 ? cables : undefined,
  };
}

interface SessionDetailProps {
  session: Session;
  html: string;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  instrumentSlug: string;
  sessionSlug: string;
  quickRefContent: { label: string; html: string }[];
  reference: string | null;
  isDemo: boolean;
  banner?: React.ReactNode;
  routePrefix?: string;
}

export function SessionDetail({
  session,
  html,
  prev,
  next,
  instrumentSlug,
  sessionSlug,
  quickRefContent,
  reference,
  isDemo,
  banner,
  routePrefix = 'instruments',
}: SessionDetailProps) {
  const hasEvolverPanel =
    instrumentSlug === 'evolver' && html.includes('data-evolver-panel');
  const hasCascadiaPanel =
    instrumentSlug === 'cascadia' && html.includes('data-cascadia-panel');
  const hasOctatrackPanel =
    instrumentSlug === 'octatrack' && html.includes('data-octatrack-panel');
  const hasPlaitsPanel =
    instrumentSlug === 'plaits' && html.includes('data-plaits-panel');
  const hasBeadsPanel =
    instrumentSlug === 'beads' && html.includes('data-beads-panel');
  const hasSwellsPanel =
    instrumentSlug === 'swells' && html.includes('data-swells-panel');
  const hasIkariePanel =
    instrumentSlug === 'ikarie' && html.includes('data-ikarie-panel');
  const hasJustFriendsPanel =
    instrumentSlug === 'just-friends' && html.includes('data-just-friends-panel');
  const hasCrowPanel =
    instrumentSlug === 'crow' && html.includes('data-crow-panel');
  const hasPanel = hasEvolverPanel || hasCascadiaPanel || hasOctatrackPanel || hasPlaitsPanel || hasBeadsPanel || hasSwellsPanel || hasIkariePanel || hasJustFriendsPanel || hasCrowPanel;

  // Split HTML at panel markers and collect marker attributes
  const panelRe = hasEvolverPanel
    ? PANEL_MARKER_RE
    : hasCascadiaPanel
    ? CASCADIA_PANEL_RE
    : hasPlaitsPanel
    ? PLAITS_PANEL_RE
    : hasBeadsPanel
    ? BEADS_PANEL_RE
    : hasSwellsPanel
    ? SWELLS_PANEL_RE
    : hasIkariePanel
    ? IKARIE_PANEL_RE
    : hasJustFriendsPanel
    ? JF_PANEL_RE
    : hasCrowPanel
    ? CROW_PANEL_RE
    : OCTATRACK_PANEL_RE;
  const parseProps = hasEvolverPanel
    ? parsePanelProps
    : hasCascadiaPanel
    ? parseCascadiaPanelProps
    : hasPlaitsPanel
    ? parsePlaitsPanelProps
    : hasBeadsPanel
    ? parseBeadsPanelProps
    : hasSwellsPanel
    ? parseSwellsPanelProps
    : hasIkariePanel
    ? parseIkariePanelProps
    : hasJustFriendsPanel
    ? parseJustFriendsPanelProps
    : hasCrowPanel
    ? parseCrowPanelProps
    : parseOctatrackPanelProps;
  const segments = hasPanel ? html.split(panelRe) : [html];
  // regex with one capture group: split produces [before, attrs1, between, attrs2, after, ...]
  // odd indices are the captured attribute strings
  const htmlParts: string[] = [];
  const panelPropsArray: ReturnType<typeof parseCascadiaPanelProps>[] = [];
  for (let i = 0; i < segments.length; i++) {
    if (i % 2 === 0) {
      htmlParts.push(segments[i]);
    } else {
      panelPropsArray.push(parseProps(segments[i]));
    }
  }

  return (
    <div className="pb-[72px]">
      <StickyHeader
        backHref={`/${routePrefix}/${instrumentSlug}/sessions`}
        sessionIdentifier={`Session ${session.session_number}`}
        quickRefContent={quickRefContent}
        instrumentSlug={instrumentSlug}
      />
      <NarrowShell className="lg:px-xl py-2xl">
        {banner && <div className="mb-lg">{banner}</div>}
        <header className="mb-2xl">
          <h1 className="text-4xl font-bold mb-md">{session.title}</h1>
          <div className="flex items-center gap-md text-sm text-muted">
            <span>{session.duration} min</span>
            <span className="text-muted/50">|</span>
            <span className="capitalize">{session.difficulty}</span>
            <span className="text-muted/50">|</span>
            <span className="capitalize">{session.output_type}</span>
          </div>
          {reference && (
            <div className="mt-md text-sm">
              <SourceRef reference={reference} />
            </div>
          )}
        </header>
        {hasPanel ? (
          <div className="prose">
            {htmlParts.map((part, i) => (
              <Fragment key={i}>
                <div dangerouslySetInnerHTML={{ __html: part }} />
                {panelPropsArray[i] && (
                  <div className="not-prose my-lg">
                    {hasEvolverPanel ? (
                      <EvolverPanel
                        knobValues={panelPropsArray[i].knobValues}
                        highlights={panelPropsArray[i].highlights}
                        activeSections={panelPropsArray[i].activeSections}
                        zoomSections={panelPropsArray[i].zoomSections}
                      />
                    ) : hasCascadiaPanel ? (
                      <CascadiaPanel
                        knobValues={panelPropsArray[i].knobValues}
                        highlights={panelPropsArray[i].highlights}
                        activeSections={panelPropsArray[i].activeSections}
                        zoomSections={panelPropsArray[i].zoomSections}
                        cables={panelPropsArray[i].cables}
                      />
                    ) : hasPlaitsPanel ? (
                      <PlaitsPanel
                        knobValues={panelPropsArray[i].knobValues}
                        highlights={panelPropsArray[i].highlights}
                        activeSections={panelPropsArray[i].activeSections}
                        zoomSections={panelPropsArray[i].zoomSections}
                        cables={panelPropsArray[i].cables}
                      />
                    ) : hasBeadsPanel ? (
                      <BeadsPanel
                        knobValues={panelPropsArray[i].knobValues}
                        highlights={panelPropsArray[i].highlights}
                        activeSections={panelPropsArray[i].activeSections}
                        zoomSections={panelPropsArray[i].zoomSections}
                        cables={panelPropsArray[i].cables}
                      />
                    ) : hasSwellsPanel ? (
                      <SwellsPanel
                        knobValues={panelPropsArray[i].knobValues}
                        highlights={panelPropsArray[i].highlights}
                        activeSections={panelPropsArray[i].activeSections}
                        zoomSections={panelPropsArray[i].zoomSections}
                        cables={panelPropsArray[i].cables}
                      />
                    ) : hasIkariePanel ? (
                      <IkariePanel
                        knobValues={panelPropsArray[i].knobValues}
                        highlights={panelPropsArray[i].highlights}
                        activeSections={panelPropsArray[i].activeSections}
                        zoomSections={panelPropsArray[i].zoomSections}
                        cables={panelPropsArray[i].cables}
                      />
                    ) : hasJustFriendsPanel ? (
                      <JustFriendsPanel
                        knobValues={panelPropsArray[i].knobValues}
                        highlights={panelPropsArray[i].highlights}
                        activeSections={panelPropsArray[i].activeSections}
                        zoomSections={panelPropsArray[i].zoomSections}
                        cables={panelPropsArray[i].cables}
                      />
                    ) : hasCrowPanel ? (
                      <CrowPanel
                        highlights={panelPropsArray[i].highlights}
                        activeSections={panelPropsArray[i].activeSections}
                        zoomSections={panelPropsArray[i].zoomSections}
                        cables={panelPropsArray[i].cables}
                      />
                    ) : (
                      <OctatrackPanel
                        knobValues={panelPropsArray[i].knobValues}
                        highlights={panelPropsArray[i].highlights}
                        activeSections={panelPropsArray[i].activeSections}
                        zoomSections={panelPropsArray[i].zoomSections}
                      />
                    )}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        ) : (
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
        <MermaidRenderer />
        <div className="mt-3xl border-t border-muted/30 pt-xl">
          <PrevNextNav
            prev={prev}
            next={next}
            instrumentSlug={instrumentSlug}
            routePrefix={routePrefix}
          />
        </div>
      </NarrowShell>
      <CompletionToggle
        instrumentSlug={instrumentSlug}
        sessionSlug={sessionSlug}
        sessionNumber={session.session_number}
        sessionTitle={session.title}
        isDemo={isDemo}
      />
    </div>
  );
}
