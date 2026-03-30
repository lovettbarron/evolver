import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { listSessions, listPatches } from './content/reader';
import { groupByModule } from './sessions';
import type { AppConfig } from './content/schemas';

export interface ProgressData {
  sessionsCompleted: number;
  patchesCreated: number;
  modulesDone: number;
  challengesCompleted: number;
  totalModules: number;
  moduleCompletionMap: Array<{ module: string; complete: boolean }>;
}

export interface CompletedSessions {
  sessionNumbers: Set<number>;
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
  const sessionTagRegex = /#session-(\d+)/g;

  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      if (!content.includes('#instrument-practice')) continue;
      let match: RegExpExecArray | null;
      while ((match = sessionTagRegex.exec(content)) !== null) {
        sessionNumbers.add(parseInt(match[1], 10));
      }
      sessionTagRegex.lastIndex = 0;
    } catch {
      // Skip unreadable files gracefully
    }
  }

  return { sessionNumbers };
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

  const moduleCompletionMap = modules.map(({ module, sessions: moduleSessions }) => ({
    module,
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
 * Simulates ~60% journey: Modules 1-6 complete (sessions 1-22),
 * plus a few from Module 7 (sessions 23-24).
 */
export function getSyntheticCompletedSessions(): Set<number> {
  return new Set([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ]);
}
