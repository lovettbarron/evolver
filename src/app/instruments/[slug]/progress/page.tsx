import { loadConfig } from '@/lib/config';
import {
  computeProgress,
  scanDailyNotes,
  getSyntheticCompletedSessions,
} from '@/lib/progress';
import { getSyntheticCompletionDates } from '@/lib/practice-metrics';
import { CountCard } from '@/components/count-card';
import { ModuleJourney } from '@/components/module-journey';
import { EmptyProgressState } from '@/components/empty-progress';
import { CumulativeMetrics } from '@/components/cumulative-metrics';

export default async function ProgressPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await loadConfig();

  const scanResult = config.vaultPath
    ? await scanDailyNotes(config.vaultPath)
    : null;

  const completedSessions = scanResult
    ? scanResult.sessionNumbers
    : getSyntheticCompletedSessions(slug);

  const completionDates: string[] = scanResult
    ? Array.from(scanResult.completionDates.values())
    : Array.from(getSyntheticCompletionDates(slug).values());

  const progress = await computeProgress(slug, config, completedSessions);

  if (progress.sessionsCompleted === 0 && progress.patchesCreated === 0) {
    return <EmptyProgressState slug={slug} />;
  }

  return (
    <main className="max-w-[640px] mx-auto px-lg pt-2xl pb-3xl">
      <h2 className="text-[24px] font-bold mb-xl">Your Progress</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-md sm:gap-xl">
        <CountCard count={progress.sessionsCompleted} label="Sessions Completed" href={`/instruments/${slug}/sessions`} />
        <CountCard count={progress.patchesCreated} label="Patches Created" href={`/instruments/${slug}/patches`} />
        <CountCard count={progress.modulesDone} label="Modules Done" href={`/instruments/${slug}/sessions`} />
        <CountCard count={progress.challengesCompleted} label="Challenges Completed" href={`/instruments/${slug}/sessions`} />
      </div>
      <h2 className="text-[24px] font-bold mt-xl mb-md">Module Journey</h2>
      <ModuleJourney modules={progress.moduleCompletionMap} />
      <CumulativeMetrics completionDates={completionDates} />
    </main>
  );
}
