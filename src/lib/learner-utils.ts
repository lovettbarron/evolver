/**
 * Union merge of two completion sets.
 * If either source says a session is complete, it is complete.
 */
export function mergeCompletions(
  vaultCompletions: Set<number>,
  manualCompletions: Set<number>,
): Set<number> {
  return new Set([...vaultCompletions, ...manualCompletions]);
}

interface SessionRef {
  slug: string;
  data: { session_number: number; title: string; module: string };
}

interface NextSessionResult {
  slug: string;
  sessionNumber: number;
  title: string;
  module: string;
}

/**
 * Compute the next recommended session for the learner.
 *
 * Priority (D-05):
 * 1. If lastVisited exists and that session is incomplete, return it
 * 2. Otherwise, return the first incomplete session in sequence order
 * 3. If all complete, return null (D-06: caller renders "All complete" state)
 */
export function computeNextSession(
  lastVisited: { sessionSlug: string; sessionNumber: number } | undefined,
  mergedCompletions: Set<number>,
  sessions: SessionRef[],
): NextSessionResult | null {
  if (sessions.length === 0) return null;

  // If lastVisited exists and is incomplete, return it
  if (lastVisited && !mergedCompletions.has(lastVisited.sessionNumber)) {
    const found = sessions.find((s) => s.slug === lastVisited.sessionSlug);
    if (found) {
      return {
        slug: found.slug,
        sessionNumber: found.data.session_number,
        title: found.data.title,
        module: found.data.module,
      };
    }
  }

  // Find first incomplete session in order
  const firstIncomplete = sessions.find(
    (s) => !mergedCompletions.has(s.data.session_number),
  );

  if (!firstIncomplete) return null;

  return {
    slug: firstIncomplete.slug,
    sessionNumber: firstIncomplete.data.session_number,
    title: firstIncomplete.data.title,
    module: firstIncomplete.data.module,
  };
}
