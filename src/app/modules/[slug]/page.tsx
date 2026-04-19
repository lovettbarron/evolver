import { loadConfig } from '@/lib/config';
import { listSessions, loadModuleConfig } from '@/lib/content/reader';
import { groupByModule } from '@/lib/sessions';
import { scanDailyNotes, getSyntheticCompletedSessions } from '@/lib/progress';
import { SessionListClient } from '@/components/session-list-client';
import { WideShell } from '@/components/page-shell';

export default async function ModuleOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await loadConfig();
  const moduleConfig = await loadModuleConfig(slug, config);
  const sessions = await listSessions(slug, config);
  const groups = groupByModule(sessions);

  const completedSessions = config.vaultPath
    ? (await scanDailyNotes(config.vaultPath)).sessionNumbers
    : getSyntheticCompletedSessions(slug);

  const completedCount = sessions.filter(
    s => completedSessions.has(s.data.session_number)
  ).length;

  return (
    <WideShell className="py-2xl">
      <div className="max-w-[720px] mx-auto px-lg">
        {/* Tagline */}
        {moduleConfig.tagline && (
          <p className="text-base text-muted mb-xl">{moduleConfig.tagline}</p>
        )}

        {/* Progress summary */}
        <div className="mb-2xl">
          <p className="text-base text-muted mb-sm">{completedCount}/{sessions.length} sessions completed</p>
          <div className="h-[6px] bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-[width] duration-300 ease-out"
              style={{ width: `${sessions.length > 0 ? (completedCount / sessions.length) * 100 : 0}%`, minWidth: completedCount > 0 ? '2px' : '0' }}
            />
          </div>
        </div>

        {/* Session list */}
        <h2 className="text-[20px] font-bold mb-md">Sessions</h2>
        <SessionListClient
          groups={groups}
          instrumentSlug={slug}
          vaultCompletedSessions={Array.from(completedSessions)}
          routePrefix="modules"
        />

        {/* References */}
        {moduleConfig.reference_pdfs.length > 0 && (
          <div className="mt-2xl">
            <h2 className="text-[20px] font-bold mb-md">References</h2>
            <ul className="space-y-xs">
              {moduleConfig.reference_pdfs.map((ref: { label: string; file: string }) => (
                <li key={ref.file}>
                  <a href={`/api/references/${ref.file}`} className="text-accent hover:underline" target="_blank" rel="noopener">
                    {ref.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </WideShell>
  );
}
