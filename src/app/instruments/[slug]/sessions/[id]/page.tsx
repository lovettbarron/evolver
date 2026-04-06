import { notFound } from 'next/navigation';
import { listSessions, listInstrumentFiles } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { renderMarkdown } from '@/lib/markdown/processor';
import { getAdjacentSessions } from '@/lib/sessions';
import { scanDailyNotes, getSyntheticCompletedSessions } from '@/lib/progress';
import { SessionDetail } from '@/components/session-detail';
import { PrerequisiteBanner } from '@/components/prerequisite-banner';

export default async function SessionPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const config = await loadConfig();
  const isDemo = !config.vaultPath;
  const allSessions = await listSessions(slug, config);
  const current = allSessions.find((s) => s.slug === id);

  if (!current) {
    return notFound();
  }

  const html = await renderMarkdown(current.content);
  const { prev, next } = getAdjacentSessions(allSessions, id);

  // Load quick-ref content (basic-patch and signal-flow instrument files)
  const instrumentFiles = await listInstrumentFiles(slug, config);
  const basicPatch = instrumentFiles.find((f) => f.data.type === 'basic-patch');
  const signalFlow = instrumentFiles.find((f) => f.data.type === 'signal-flow');

  const quickRefContent: { label: string; html: string }[] = [];
  if (basicPatch) {
    quickRefContent.push({
      label: 'Basic Patch',
      html: await renderMarkdown(basicPatch.content),
    });
  }
  if (signalFlow) {
    quickRefContent.push({
      label: 'Signal Flow',
      html: await renderMarkdown(signalFlow.content),
    });
  }

  // Check prerequisite state
  const completedSessions = config.vaultPath
    ? (await scanDailyNotes(config.vaultPath)).sessionNumbers
    : getSyntheticCompletedSessions(slug);

  const prerequisiteNumber = current.data.prerequisite;
  const prerequisiteMet =
    prerequisiteNumber === null || completedSessions.has(prerequisiteNumber);

  const prerequisiteSession =
    prerequisiteNumber !== null
      ? allSessions.find((s) => s.data.session_number === prerequisiteNumber)
      : null;

  return (
    <>
      {!prerequisiteMet && prerequisiteSession && (
        <div className="max-w-[640px] mx-auto px-lg lg:px-xl pt-md">
          <PrerequisiteBanner
            prerequisiteNumber={prerequisiteNumber!}
            prerequisiteSlug={prerequisiteSession.slug}
            instrumentSlug={slug}
          />
        </div>
      )}
      <SessionDetail
        session={current.data}
        html={html}
        prev={prev ? { slug: prev.slug, title: prev.data.title } : null}
        next={next ? { slug: next.slug, title: next.data.title } : null}
        instrumentSlug={slug}
        sessionSlug={id}
        quickRefContent={quickRefContent}
        reference={current.data.reference ?? null}
        isDemo={isDemo}
      />
    </>
  );
}
