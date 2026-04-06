import { listInstrumentFiles, listSessions, listModules, loadInstrumentConfig, getTroubleshooting } from '@/lib/content/reader';
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

  const overviewHtml = await renderMarkdown(overview.content, [], slug);
  const signalFlowHtml = signalFlow ? await renderMarkdown(signalFlow.content, [], slug) : null;

  // Load instrument config for dynamic references
  const instrumentConfig = await loadInstrumentConfig(slug, config);
  const references = instrumentConfig.reference_pdfs.map(ref => ({
    label: ref.label,
    pdfPath: `/api/references/${ref.file}`,
  }));

  // Get modules for count
  const modules = await listModules(slug, config);

  // Check for troubleshooting content
  const troubleshooting = await getTroubleshooting(slug, config);

  // Get sessions for count and hero card
  const sessions = await listSessions(slug, config);

  const nextSession = sessions[0] || null;
  const nextSessionData = nextSession ? {
    moduleName: nextSession.data.module,
    sessionTitle: nextSession.data.title,
    objective: nextSession.content.split('\n').filter(l => l.trim() && !l.startsWith('#'))[0]?.trim().slice(0, 120) || nextSession.data.title,
    duration: nextSession.data.duration,
    href: `/instruments/${slug}/sessions/${nextSession.slug}`,
  } : null;

  return (
    <InstrumentOverview
      title={overview.data.title}
      manufacturer={overview.data.manufacturer}
      overviewHtml={overviewHtml}
      signalFlowHtml={signalFlowHtml}
      hasBasicPatch={!!basicPatch}
      sessionCount={sessions.length}
      moduleCount={modules.length}
      hasTroubleshooting={!!troubleshooting}
      slug={slug}
      references={references}
      nextSession={nextSessionData}
    />
  );
}
