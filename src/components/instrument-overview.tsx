import Link from 'next/link';

export interface InstrumentOverviewProps {
  title: string;
  manufacturer: string;
  overviewHtml: string;
  signalFlowHtml: string | null;
  hasBasicPatch: boolean;
  sessionCount: number;
  slug: string;
}

export function InstrumentOverview({
  title,
  manufacturer,
  overviewHtml,
  signalFlowHtml,
  hasBasicPatch,
  sessionCount,
  slug,
}: InstrumentOverviewProps) {
  return (
    <div className="max-w-[720px] mx-auto px-lg lg:px-xl py-2xl">
      <h1 className="text-4xl font-bold leading-[1.1] mb-sm">{title}</h1>
      <p className="text-muted text-sm mb-2xl">{manufacturer}</p>

      <div className="prose" dangerouslySetInnerHTML={{ __html: overviewHtml }} />

      {signalFlowHtml && (
        <section className="mt-2xl">
          <h2 className="text-2xl font-bold mb-lg">Signal Flow</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: signalFlowHtml }} />
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
          {sessionCount} sessions across 10 modules
        </p>
        <Link
          href={`/instruments/${slug}/sessions`}
          className="inline-flex items-center justify-center bg-accent text-bg font-bold py-md px-xl rounded min-h-[48px] hover:brightness-110 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg transition-[filter]"
        >
          Start Curriculum
        </Link>
      </div>
    </div>
  );
}
