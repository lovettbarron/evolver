import type { Session } from '@/lib/content/types';

export interface SessionWithMeta {
  data: Session;
  content: string;
  slug: string;
}

export interface ModuleGroup {
  module: string;
  sessions: SessionWithMeta[];
}

/**
 * Group sessions by their module field.
 * Groups are ordered by the lowest session_number in each group.
 * Sessions within each group are sorted by session_number.
 */
export function groupByModule(sessions: SessionWithMeta[]): ModuleGroup[] {
  if (sessions.length === 0) return [];

  const groupMap = new Map<string, SessionWithMeta[]>();

  for (const session of sessions) {
    const mod = session.data.module;
    if (!groupMap.has(mod)) {
      groupMap.set(mod, []);
    }
    groupMap.get(mod)!.push(session);
  }

  // Sort sessions within each group by session_number
  for (const group of groupMap.values()) {
    group.sort((a, b) => a.data.session_number - b.data.session_number);
  }

  // Convert to array and sort groups by the first session_number in each group
  const groups: ModuleGroup[] = Array.from(groupMap.entries()).map(
    ([module, sessions]) => ({ module, sessions }),
  );

  groups.sort(
    (a, b) => a.sessions[0].data.session_number - b.sessions[0].data.session_number,
  );

  return groups;
}

/**
 * Find the previous and next sessions relative to the current session slug.
 * Sessions are treated as a flat linear list (crosses module boundaries).
 * Expects sessions to already be sorted by session_number.
 */
export function getAdjacentSessions(
  sessions: SessionWithMeta[],
  currentSlug: string,
): { prev: SessionWithMeta | null; next: SessionWithMeta | null } {
  const index = sessions.findIndex((s) => s.slug === currentSlug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? sessions[index - 1] : null,
    next: index < sessions.length - 1 ? sessions[index + 1] : null,
  };
}
