import type { ModuleGroup } from '@/lib/sessions';
import { ModuleHeader } from '@/components/module-header';
import { SessionRow } from '@/components/session-row';

interface SessionListProps {
  groups: ModuleGroup[];
  instrumentSlug: string;
}

/**
 * Server-safe session list that renders all sessions as 'available'.
 * For prerequisite state badges, use SessionListClient instead.
 */
export function SessionList({ groups, instrumentSlug }: SessionListProps) {
  return (
    <div className="flex flex-col gap-2xl">
      {groups.map((group) => (
        <section key={group.module}>
          <ModuleHeader module={group.module} />
          <div className="flex flex-col">
            {group.sessions.map((session) => (
              <SessionRow
                key={session.slug}
                number={session.data.session_number}
                title={session.data.title}
                duration={session.data.duration}
                href={`/instruments/${instrumentSlug}/sessions/${session.slug}`}
                state="available"
                prerequisiteNumber={session.data.prerequisite}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
