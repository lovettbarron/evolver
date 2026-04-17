import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { listSessions, listPatches } from './content/reader';
import { groupByModule } from './sessions';
import type { AppConfig } from './content/schemas';
import { SYNTHETIC_COMPLETED_SESSIONS, SYNTHETIC_CASCADIA_COMPLETED_SESSIONS, SYNTHETIC_OCTATRACK_COMPLETED_SESSIONS } from './synthetic-daily-notes';

export interface ProgressData {
  sessionsCompleted: number;
  patchesCreated: number;
  modulesDone: number;
  challengesCompleted: number;
  totalModules: number;
  moduleCompletionMap: Array<{ section: string; complete: boolean }>;
}

export interface CompletedSessions {
  sessionNumbers: Set<number>;
  completionDates: Map<number, string>; // session number -> ISO date (YYYY-MM-DD)
}

/**
 * Scan Obsidian daily notes for completed session tags.
 * Looks for files containing #instrument-practice and #session-XX tags.
 * Handles both zero-padded (#session-06) and non-padded (#session-6) formats.
 */
export async function scanDailyNotes(vaultPath: string): Promise<CompletedSessions> {
  const pattern = path.join(vaultPath, '**/*.md');
  const files = await glob(pattern);
  const sessionNumbers = new Set<number>();
  const completionDates = new Map<number, string>();
  const sessionTagRegex = /#session-(\d+)/g;

  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      if (!content.includes('#instrument-practice')) continue;

      // Extract date from daily note filename (YYYY-MM-DD.md)
      const dateMatch = path.basename(file, '.md').match(/^(\d{4}-\d{2}-\d{2})$/);
      const fileDate = dateMatch ? dateMatch[1] : null;

      let match: RegExpExecArray | null;
      while ((match = sessionTagRegex.exec(content)) !== null) {
        const sessionNum = parseInt(match[1], 10);
        sessionNumbers.add(sessionNum);
        // Keep earliest date for each session
        if (fileDate && !completionDates.has(sessionNum)) {
          completionDates.set(sessionNum, fileDate);
        }
      }
      sessionTagRegex.lastIndex = 0;
    } catch {
      // Skip unreadable files gracefully
    }
  }

  return { sessionNumbers, completionDates };
}

/**
 * Compute additive progress metrics for an instrument.
 * Returns additive counts only -- no temporal or ratio-based fields.
 */
export async function computeProgress(
  instrument: string,
  config: AppConfig,
  completedSessionNumbers: Set<number>,
): Promise<ProgressData> {
  const [sessions, patches] = await Promise.all([
    listSessions(instrument, config),
    listPatches(instrument, config),
  ]);

  const modules = groupByModule(sessions);

  const moduleCompletionMap = modules.map(({ section, sessions: moduleSessions }) => ({
    section,
    complete: moduleSessions.every(s => completedSessionNumbers.has(s.data.session_number)),
  }));

  const challengesCompleted = patches.filter(
    p => p.data.challenge_id != null,
  ).length;

  return {
    sessionsCompleted: completedSessionNumbers.size,
    patchesCreated: patches.length,
    modulesDone: moduleCompletionMap.filter(m => m.complete).length,
    challengesCompleted,
    totalModules: modules.length,
    moduleCompletionMap,
  };
}

/**
 * Return a synthetic set of completed sessions for demo/dev mode.
 * Accepts optional instrument slug to return instrument-specific journey.
 * Default (no argument or 'evolver') returns Evolver journey for backward compatibility.
 */
export function getSyntheticCompletedSessions(instrument?: string): Set<number> {
  if (instrument === 'cascadia') {
    return SYNTHETIC_CASCADIA_COMPLETED_SESSIONS;
  }
  if (instrument === 'octatrack') {
    return SYNTHETIC_OCTATRACK_COMPLETED_SESSIONS;
  }
  return SYNTHETIC_COMPLETED_SESSIONS;
}
