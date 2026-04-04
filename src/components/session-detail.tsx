'use client';

import { Fragment } from 'react';
import type { Session } from '@/lib/content/types';
import { StickyHeader } from '@/components/sticky-header';
import { PrevNextNav } from '@/components/prev-next-nav';
import { SourceRef } from '@/components/source-ref';
import { EvolverPanel } from '@/components/evolver-panel';
import { CONTROL_METADATA } from '@/lib/evolver-panel-data';
import dynamic from 'next/dynamic';

const MermaidRenderer = dynamic(
  () =>
    import('@/components/mermaid-renderer').then((m) => ({
      default: m.MermaidRenderer,
    })),
  { ssr: false },
);

const PANEL_MARKER_RE = /<div data-evolver-panel([^>]*)>\s*<\/div>/g;

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

  const zoomSections: string[] = [];
  const zoomMatch = attrString.match(/data-zoom="([^"]*)"/);
  if (zoomMatch) {
    zoomSections.push(...zoomMatch[1].split(',').map((s) => s.trim()));
  }

  return {
    knobValues: Object.keys(knobValues).length > 0 ? knobValues : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    activeSections: activeSections.length > 0 ? activeSections : undefined,
    zoomSections: zoomSections.length > 0 ? zoomSections : undefined,
  };
}

interface SessionDetailProps {
  session: Session;
  html: string;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  instrumentSlug: string;
  quickRefContent: { label: string; html: string }[];
  reference: string | null;
}

export function SessionDetail({
  session,
  html,
  prev,
  next,
  instrumentSlug,
  quickRefContent,
  reference,
}: SessionDetailProps) {
  const hasPanel =
    instrumentSlug === 'evolver' && html.includes('data-evolver-panel');

  // Split HTML at panel markers and collect marker attributes
  const segments = hasPanel ? html.split(PANEL_MARKER_RE) : [html];
  // regex with one capture group: split produces [before, attrs1, between, attrs2, after, ...]
  // odd indices are the captured attribute strings
  const htmlParts: string[] = [];
  const panelProps: ReturnType<typeof parsePanelProps>[] = [];
  for (let i = 0; i < segments.length; i++) {
    if (i % 2 === 0) {
      htmlParts.push(segments[i]);
    } else {
      panelProps.push(parsePanelProps(segments[i]));
    }
  }

  return (
    <div>
      <StickyHeader
        backHref={`/instruments/${instrumentSlug}/sessions`}
        sessionIdentifier={`Session ${session.session_number}`}
        quickRefContent={quickRefContent}
        instrumentSlug={instrumentSlug}
      />
      <div className="max-w-[720px] mx-auto px-lg lg:px-xl py-2xl">
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
                {panelProps[i] && (
                  <div className="not-prose my-lg">
                    <EvolverPanel
                      knobValues={panelProps[i].knobValues}
                      highlights={panelProps[i].highlights}
                      activeSections={panelProps[i].activeSections}
                      zoomSections={panelProps[i].zoomSections}
                    />
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
          />
        </div>
      </div>
    </div>
  );
}
