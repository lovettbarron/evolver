import { listInstrumentFiles, listSessions, listModules, loadInstrumentConfig } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { renderMarkdown } from '@/lib/markdown/processor';
import { InstrumentOverview } from '@/components/instrument-overview';
import { scanDailyNotes, getSyntheticCompletedSessions } from '@/lib/progress';
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

  // Get sessions for count and resume bar
  const sessions = await listSessions(slug, config);

  const isDemo = !config.vaultPath;

  // Get vault completions for resume bar (D-08: server passes vault data as props)
  const vaultCompletedSessions = config.vaultPath
    ? (await scanDailyNotes(config.vaultPath)).sessionNumbers
    : getSyntheticCompletedSessions(slug);

  // Serialize Set to array for client component props (Sets can't be serialized across server/client boundary)
  const vaultCompletionsArray = Array.from(vaultCompletedSessions);

  // Minimal session data for resume bar (avoid serializing full content)
  const sessionsForResumeBar = sessions.map(s => ({
    slug: s.slug,
    data: {
      session_number: s.data.session_number,
      title: s.data.title,
      module: s.data.module,
    },
  }));

  return (
    <InstrumentOverview
      title={overview.data.title}
      manufacturer={overview.data.manufacturer}
      overviewHtml={overviewHtml}
      signalFlowHtml={signalFlowHtml}
      hasBasicPatch={!!basicPatch}
      sessionCount={sessions.length}
      moduleCount={modules.length}
      slug={slug}
      references={references}
      vaultCompletions={vaultCompletionsArray}
      sessionsForResumeBar={sessionsForResumeBar}
      isDemo={isDemo}
    />
  );
}
