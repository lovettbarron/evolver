import { loadConfig } from '@/lib/config';
import {
  computeProgress,
  scanDailyNotes,
  getSyntheticCompletedSessions,
} from '@/lib/progress';
import { CountCard } from '@/components/count-card';
import { ModuleJourney } from '@/components/module-journey';
import { EmptyProgressState } from '@/components/empty-progress';

export default async function ProgressPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await loadConfig();

  const completedSessions = config.vaultPath
    ? (await scanDailyNotes(config.vaultPath)).sessionNumbers
    : getSyntheticCompletedSessions(slug);

  const progress = await computeProgress(slug, config, completedSessions);

  if (progress.sessionsCompleted === 0 && progress.patchesCreated === 0) {
    return <EmptyProgressState slug={slug} />;
  }

  return (
    <main className="max-w-[640px] mx-auto px-lg pt-2xl pb-3xl">
      <h2 className="text-[24px] font-bold mb-xl">Your Progress</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-md sm:gap-xl">
        <CountCard count={progress.sessionsCompleted} label="Sessions Completed" />
        <CountCard count={progress.patchesCreated} label="Patches Created" />
        <CountCard count={progress.modulesDone} label="Modules Done" />
        <CountCard count={progress.challengesCompleted} label="Challenges Completed" />
      </div>
      <h2 className="text-[24px] font-bold mt-xl mb-md">Module Journey</h2>
      <ModuleJourney modules={progress.moduleCompletionMap} />
    </main>
  );
}
