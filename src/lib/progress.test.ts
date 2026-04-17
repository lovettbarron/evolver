import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { PatchSchema } from '@/lib/content/schemas';

// Mock content/reader before importing progress module
vi.mock('@/lib/content/reader', () => ({
  listSessions: vi.fn(),
  listPatches: vi.fn(),
}));

vi.mock('@/lib/sessions', () => ({
  groupByModule: vi.fn(),
}));

import { scanDailyNotes, computeProgress, getSyntheticCompletedSessions } from './progress';
import type { ProgressData } from './progress';
import { listSessions, listPatches } from '@/lib/content/reader';
import { groupByModule } from '@/lib/sessions';

const mockedListSessions = vi.mocked(listSessions);
const mockedListPatches = vi.mocked(listPatches);
const mockedGroupByModule = vi.mocked(groupByModule);

describe('PatchSchema challenge_id', () => {
  it('parses successfully with challenge_id', () => {
    const result = PatchSchema.parse({
      name: 'Test Patch',
      type: 'bass',
      session_origin: 1,
      description: 'A test patch',
      tags: ['test'],
      instrument: 'evolver',
      created: '2026-01-01',
      challenge_id: '27-1',
    });
    expect(result.challenge_id).toBe('27-1');
  });

  it('parses successfully without challenge_id', () => {
    const result = PatchSchema.parse({
      name: 'Test Patch',
      type: 'bass',
      session_origin: 1,
      description: 'A test patch',
      tags: ['test'],
      instrument: 'evolver',
      created: '2026-01-01',
    });
    expect(result.challenge_id).toBeUndefined();
  });
});

describe('scanDailyNotes', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'evolver-test-'));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it('returns session numbers from files with #instrument-practice and #session-XX tags', async () => {
    await fs.writeFile(
      path.join(tmpDir, '2026-01-15.md'),
      '# Daily Note\n#evolver #instrument-practice #session-06\nDid some practice.',
    );
    await fs.writeFile(
      path.join(tmpDir, '2026-01-16.md'),
      '# Daily Note\n#evolver #instrument-practice #session-12\nMore practice.',
    );

    const result = await scanDailyNotes(tmpDir);
    expect(result.sessionNumbers).toEqual(new Set([6, 12]));
  });

  it('ignores files without #instrument-practice tag', async () => {
    await fs.writeFile(
      path.join(tmpDir, '2026-01-15.md'),
      '# Daily Note\n#session-06\nNo instrument-practice tag.',
    );

    const result = await scanDailyNotes(tmpDir);
    expect(result.sessionNumbers.size).toBe(0);
  });

  it('handles both zero-padded and non-padded session tags', async () => {
    await fs.writeFile(
      path.join(tmpDir, '2026-01-15.md'),
      '#instrument-practice #session-06',
    );
    await fs.writeFile(
      path.join(tmpDir, '2026-01-16.md'),
      '#instrument-practice #session-6',
    );

    const result = await scanDailyNotes(tmpDir);
    // Both should yield 6
    expect(result.sessionNumbers).toEqual(new Set([6]));
  });

  it('returns empty set for empty directory', async () => {
    const result = await scanDailyNotes(tmpDir);
    expect(result.sessionNumbers.size).toBe(0);
  });

  it('returns empty set for directory with no matching files', async () => {
    await fs.writeFile(
      path.join(tmpDir, '2026-01-15.md'),
      '# Just a regular note\nNo tags here.',
    );

    const result = await scanDailyNotes(tmpDir);
    expect(result.sessionNumbers.size).toBe(0);
  });
});

describe('computeProgress', () => {
  const mockConfig = { instrument: 'evolver' };

  beforeEach(() => {
    // 3 sessions in "Foundations" (session_numbers 1, 2, 3)
    // 2 sessions in "Analog Oscillators" (session_numbers 4, 5)
    mockedListSessions.mockResolvedValue([
      { data: { title: 'S1', section: 'Foundations', session_number: 1, duration: 15, prerequisite: null, output_type: 'patch', difficulty: 'beginner', tags: [], instrument: 'evolver' }, content: '', slug: '01-foundations-s1' },
      { data: { title: 'S2', section: 'Foundations', session_number: 2, duration: 15, prerequisite: 1, output_type: 'technique', difficulty: 'beginner', tags: [], instrument: 'evolver' }, content: '', slug: '02-foundations-s2' },
      { data: { title: 'S3', section: 'Foundations', session_number: 3, duration: 15, prerequisite: 2, output_type: 'patch', difficulty: 'beginner', tags: [], instrument: 'evolver' }, content: '', slug: '03-foundations-s3' },
      { data: { title: 'S4', section: 'Analog Oscillators', session_number: 4, duration: 20, prerequisite: 3, output_type: 'patch', difficulty: 'intermediate', tags: [], instrument: 'evolver' }, content: '', slug: '04-analog-s4' },
      { data: { title: 'S5', section: 'Analog Oscillators', session_number: 5, duration: 20, prerequisite: 4, output_type: 'technique', difficulty: 'intermediate', tags: [], instrument: 'evolver' }, content: '', slug: '05-analog-s5' },
    ] as any);

    // 2 patches: one with challenge_id, one without
    mockedListPatches.mockResolvedValue([
      { data: { name: 'Bass Growl', type: 'bass', session_origin: 1, description: 'A bass', tags: ['bass'], instrument: 'evolver', created: '2026-01-01', challenge_id: '27-1' }, content: '', slug: 'bass-growl', sysexData: null },
      { data: { name: 'Warm Pad', type: 'pad', session_origin: 2, description: 'A pad', tags: ['pad'], instrument: 'evolver', created: '2026-01-02' }, content: '', slug: 'warm-pad', sysexData: null },
    ] as any);

    mockedGroupByModule.mockImplementation((sessions) => {
      const map = new Map<string, any[]>();
      for (const s of sessions) {
        const mod = s.data.section;
        if (!map.has(mod)) map.set(mod, []);
        map.get(mod)!.push(s);
      }
      return Array.from(map.entries()).map(([section, sess]) => ({
        section,
        sessions: sess.sort((a: any, b: any) => a.data.session_number - b.data.session_number),
      }));
    });
  });

  it('returns correct sessionsCompleted count', async () => {
    const result = await computeProgress('evolver', mockConfig, new Set([1, 2, 3, 4, 5]));
    expect(result.sessionsCompleted).toBe(5);
  });

  it('returns correct patchesCreated from listPatches length', async () => {
    const result = await computeProgress('evolver', mockConfig, new Set([1, 2, 3, 4, 5]));
    expect(result.patchesCreated).toBe(2);
  });

  it('returns correct modulesDone when all sessions in modules are completed', async () => {
    const result = await computeProgress('evolver', mockConfig, new Set([1, 2, 3, 4, 5]));
    expect(result.modulesDone).toBe(2);
  });

  it('returns modulesDone=0 when no module is fully complete', async () => {
    const result = await computeProgress('evolver', mockConfig, new Set([1, 2]));
    expect(result.modulesDone).toBe(0);
  });

  it('returns correct challengesCompleted from patches with challenge_id', async () => {
    const result = await computeProgress('evolver', mockConfig, new Set([1, 2, 3, 4, 5]));
    expect(result.challengesCompleted).toBe(1);
  });

  it('has moduleCompletionMap with correct structure', async () => {
    const result = await computeProgress('evolver', mockConfig, new Set([1, 2, 3]));
    expect(result.moduleCompletionMap).toEqual([
      { section: 'Foundations', complete: true },
      { section: 'Analog Oscillators', complete: false },
    ]);
  });

  it('returns totalModules count', async () => {
    const result = await computeProgress('evolver', mockConfig, new Set([]));
    expect(result.totalModules).toBe(2);
  });
});

describe('getSyntheticCompletedSessions', () => {
  it('returns a Set containing sessions 1-21 for evolver (Modules 1-6 complete)', () => {
    const result = getSyntheticCompletedSessions('evolver');
    expect(result.size).toBe(21);
    for (let i = 1; i <= 21; i++) {
      expect(result.has(i)).toBe(true);
    }
    expect(result.has(22)).toBe(false);
  });

  it('returns Evolver sessions by default (backward compatibility)', () => {
    const result = getSyntheticCompletedSessions();
    expect(result.size).toBe(21);
    for (let i = 1; i <= 21; i++) {
      expect(result.has(i)).toBe(true);
    }
  });

  it('returns a Set containing sessions 1-12 for cascadia (Modules 1-4 complete)', () => {
    const result = getSyntheticCompletedSessions('cascadia');
    expect(result.size).toBe(12);
    for (let i = 1; i <= 12; i++) {
      expect(result.has(i)).toBe(true);
    }
    expect(result.has(13)).toBe(false);
  });
});

describe('SYNTHETIC_CASCADIA data', () => {
  it('SYNTHETIC_CASCADIA_COMPLETED_SESSIONS has 12 entries', async () => {
    const { SYNTHETIC_CASCADIA_COMPLETED_SESSIONS } = await import('./synthetic-daily-notes');
    expect(SYNTHETIC_CASCADIA_COMPLETED_SESSIONS.size).toBe(12);
  });

  it('SYNTHETIC_CASCADIA_JOURNEY_WEEKS has 6 entries with 12 total sessions', async () => {
    const { SYNTHETIC_CASCADIA_JOURNEY_WEEKS } = await import('./synthetic-daily-notes');
    expect(SYNTHETIC_CASCADIA_JOURNEY_WEEKS).toHaveLength(6);
    const totalSessions = SYNTHETIC_CASCADIA_JOURNEY_WEEKS.reduce(
      (sum, week) => sum + week.sessions.length,
      0,
    );
    expect(totalSessions).toBe(12);
  });
});

describe('ProgressData type', () => {
  it('has only the expected fields', async () => {
    const mockConfig = { instrument: 'evolver' };
    mockedListSessions.mockResolvedValue([]);
    mockedListPatches.mockResolvedValue([]);
    mockedGroupByModule.mockReturnValue([]);

    const result: ProgressData = await computeProgress('evolver', mockConfig, new Set());
    const keys = Object.keys(result).sort();
    expect(keys).toEqual([
      'challengesCompleted',
      'moduleCompletionMap',
      'modulesDone',
      'patchesCreated',
      'sessionsCompleted',
      'totalModules',
    ]);
  });
});
