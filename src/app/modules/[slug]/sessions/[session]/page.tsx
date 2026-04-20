import { notFound } from 'next/navigation';
import { listSessions } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { renderMarkdown } from '@/lib/markdown/processor';
import { getAdjacentSessions } from '@/lib/sessions';
import { scanDailyNotes, getSyntheticCompletedSessions } from '@/lib/progress';
import { SessionDetail } from '@/components/session-detail';
import { PrerequisiteBanner } from '@/components/prerequisite-banner';
import { buildCrossReferenceMap } from '@/lib/cross-references';
import { RelatedSessionsCard } from '@/components/related-sessions-card';

export default async function ModuleSessionPage({
  params,
}: {
  params: Promise<{ slug: string; session: string }>;
}) {
  const { slug, session } = await params;
  const config = await loadConfig();
  const isDemo = !config.vaultPath;
  const allSessions = await listSessions(slug, config);
  const current = allSessions.find((s) => s.slug === session);

  if (!current) {
    return notFound();
  }

  const html = await renderMarkdown(current.content);
  const { prev, next } = getAdjacentSessions(allSessions, session);

  const crossRefMap = await buildCrossReferenceMap(config);
  const crossRefs = crossRefMap.get(`${slug}/${session}`) ?? [];

  // Module sessions don't have instrument files (basic-patch, signal-flow)
  const quickRefContent: { label: string; html: string }[] = [];

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

  const prerequisiteBanner =
    !prerequisiteMet && prerequisiteSession ? (
      <PrerequisiteBanner
        prerequisiteNumber={prerequisiteNumber!}
        prerequisiteSlug={prerequisiteSession.slug}
        instrumentSlug={slug}
        routePrefix="modules"
      />
    ) : null;

  return (
    <>
      <SessionDetail
        session={current.data}
        html={html}
        prev={prev ? { slug: prev.slug, title: prev.data.title } : null}
        next={next ? { slug: next.slug, title: next.data.title } : null}
        instrumentSlug={slug}
        sessionSlug={session}
        quickRefContent={quickRefContent}
        reference={current.data.reference ?? null}
        isDemo={isDemo}
        banner={prerequisiteBanner}
        routePrefix="modules"
      />
      <div className="max-w-[720px] mx-auto px-lg lg:px-xl pb-2xl">
        <RelatedSessionsCard references={crossRefs} />
      </div>
    </>
  );
}
