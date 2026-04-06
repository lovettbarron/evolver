import type { ModuleGroup } from '@/lib/sessions';

export type SessionState = 'completed' | 'available' | 'locked';

/**
 * Determine the prerequisite state of a session.
 * - completed: session is in the completed set
 * - available: no prerequisite, or prerequisite is met
 * - locked: prerequisite exists and is not met
 */
export function getSessionState(
  sessionNumber: number,
  prerequisiteNumber: number | null,
  completedSessions: Set<number>,
): SessionState {
  if (completedSessions.has(sessionNumber)) return 'completed';
  if (prerequisiteNumber === null) return 'available';
  if (completedSessions.has(prerequisiteNumber)) return 'available';
  return 'locked';
}

/**
 * Find the module containing the first incomplete session.
 * Returns null if all sessions are complete or groups is empty.
 */
export function getCurrentModule(
  groups: ModuleGroup[],
  completedSessions: Set<number>,
): string | null {
  for (const group of groups) {
    for (const session of group.sessions) {
      if (!completedSessions.has(session.data.session_number)) {
        return group.module;
      }
    }
  }
  return null;
}
