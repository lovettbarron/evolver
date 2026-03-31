'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FileText } from 'lucide-react';
import { PdfViewer } from './pdf-viewer';
import { HeroCard } from './hero-card';

const MermaidRenderer = dynamic(
  () =>
    import('@/components/mermaid-renderer').then((m) => ({
      default: m.MermaidRenderer,
    })),
  { ssr: false },
);

export interface InstrumentOverviewProps {
  title: string;
  manufacturer: string;
  overviewHtml: string;
  signalFlowHtml: string | null;
  hasBasicPatch: boolean;
  sessionCount: number;
  slug: string;
  references?: Array<{ label: string; pdfPath: string }>;
  nextSession?: {
    moduleName: string;
    sessionTitle: string;
    objective: string;
    duration: number;
    href: string;
  } | null;
}

export function InstrumentOverview({
  title,
  manufacturer,
  overviewHtml,
  signalFlowHtml,
  hasBasicPatch,
  sessionCount,
  slug,
  references,
  nextSession,
}: InstrumentOverviewProps) {
  const [openPdf, setOpenPdf] = useState<string | null>(null);

  return (
    <div className="max-w-[720px] mx-auto px-lg lg:px-xl py-2xl">
      <h1 className="text-4xl font-bold leading-[1.1] mb-sm">{title}</h1>
      <p className="text-muted text-sm mb-2xl">{manufacturer}</p>

      {nextSession && (
        <div className="mb-2xl">
          <HeroCard
            moduleName={nextSession.moduleName}
            sessionTitle={nextSession.sessionTitle}
            objective={nextSession.objective}
            duration={nextSession.duration}
            href={nextSession.href}
          />
        </div>
      )}

      <div className="prose" dangerouslySetInnerHTML={{ __html: overviewHtml }} />

      {signalFlowHtml && (
        <section className="mt-2xl">
          <h2 className="text-2xl font-bold mb-lg">Signal Flow</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: signalFlowHtml }} />
          <MermaidRenderer />
        </section>
      )}

      {references && references.length > 0 && (
        <section className="mt-2xl">
          <h2 className="text-2xl font-bold mb-lg">References</h2>
          <div className="flex flex-col gap-md">
            {references.map((ref) => (
              <button
                key={ref.pdfPath}
                onClick={() => setOpenPdf(ref.pdfPath)}
                className="bg-surface p-md rounded hover:border-accent border border-surface transition-colors cursor-pointer text-left flex items-center gap-md"
              >
                <FileText size={20} className="text-muted shrink-0" />
                <span className="text-text">{ref.label}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <hr className="border-muted/30 my-2xl" />

      <div className="flex flex-col gap-md items-start">
        {hasBasicPatch && (
          <Link
            href={`/instruments/${slug}/basic-patch`}
            className="text-text underline underline-offset-2 hover:text-accent"
          >
            Basic Patch Reference
          </Link>
        )}
        <p className="text-muted text-sm">
          {sessionCount} sessions
        </p>
        <Link
          href={`/instruments/${slug}/sessions`}
          className="inline-flex items-center justify-center bg-accent text-bg font-bold py-md px-xl rounded min-h-[48px] hover:brightness-110 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg transition-[filter]"
        >
          Start Curriculum
        </Link>
      </div>

      {openPdf && (
        <PdfViewer
          src={openPdf}
          onClose={() => setOpenPdf(null)}
        />
      )}
    </div>
  );
}
