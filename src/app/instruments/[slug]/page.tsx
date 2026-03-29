import { listInstrumentFiles, listSessions } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { renderMarkdown } from '@/lib/markdown/processor';
import { InstrumentOverview } from '@/components/instrument-overview';
import { notFound } from 'next/navigation';

export default async function InstrumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = await loadConfig();
  const files = await listInstrumentFiles(slug, config);

  const overview = files.find(f => f.data.type === 'overview');
  if (!overview) return notFound();

  const signalFlow = files.find(f => f.data.type === 'signal-flow');
  const basicPatch = files.find(f => f.data.type === 'basic-patch');

  const overviewHtml = await renderMarkdown(overview.content);
  const signalFlowHtml = signalFlow ? await renderMarkdown(signalFlow.content) : null;

  // Get total session count for display
  const sessions = await listSessions(slug, config);

  return (
    <InstrumentOverview
      title={overview.data.title}
      manufacturer={overview.data.manufacturer}
      overviewHtml={overviewHtml}
      signalFlowHtml={signalFlowHtml}
      hasBasicPatch={!!basicPatch}
      sessionCount={sessions.length}
      slug={slug}
    />
  );
}
