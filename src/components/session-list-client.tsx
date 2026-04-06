'use client';

import type { ModuleGroup } from '@/lib/sessions';
import { getSessionState } from '@/lib/prerequisite';
import { mergeCompletions } from '@/lib/learner-utils';
import { useLearnerStore } from '@/stores/learner-store';
import { useHydrated } from '@/hooks/use-hydrated';
import { ModuleHeader } from '@/components/module-header';
import { SessionRow } from '@/components/session-row';

interface SessionListClientProps {
  groups: ModuleGroup[];
  instrumentSlug: string;
  vaultCompletedSessions: number[];
}

export function SessionListClient({
  groups,
  instrumentSlug,
  vaultCompletedSessions,
}: SessionListClientProps) {
  const hydrated = useHydrated();
  const manualCompletions = useLearnerStore((s) => s.getCompletedSessions(instrumentSlug));

  const vaultSet = new Set(vaultCompletedSessions);
  const mergedCompletions = hydrated
    ? mergeCompletions(vaultSet, manualCompletions)
    : vaultSet;

  return (
    <div className="flex flex-col gap-2xl">
      {groups.map((group) => (
        <section key={group.module}>
          <ModuleHeader module={group.module} />
          <div className="flex flex-col">
            {group.sessions.map((session) => {
              const state = getSessionState(
                session.data.session_number,
                session.data.prerequisite,
                mergedCompletions,
              );
              return (
                <SessionRow
                  key={session.slug}
                  number={session.data.session_number}
                  title={session.data.title}
                  duration={session.data.duration}
                  href={`/instruments/${instrumentSlug}/sessions/${session.slug}`}
                  state={state}
                  prerequisiteNumber={session.data.prerequisite}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
