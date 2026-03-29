'use client';

import type { Session } from '@/lib/content/types';
import { StickyHeader } from '@/components/sticky-header';
import { PrevNextNav } from '@/components/prev-next-nav';
import { SourceRef } from '@/components/source-ref';
import dynamic from 'next/dynamic';

const MermaidRenderer = dynamic(
  () =>
    import('@/components/mermaid-renderer').then((m) => ({
      default: m.MermaidRenderer,
    })),
  { ssr: false },
);

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
  return (
    <div>
      <StickyHeader
        backHref={`/instruments/${instrumentSlug}/sessions`}
        sessionIdentifier={`Session ${session.session_number}`}
        quickRefContent={quickRefContent}
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
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />
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
