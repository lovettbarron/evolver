import { describe, test, expect } from 'vitest';
import { getSessionState, getCurrentModule } from '@/lib/prerequisite';
import type { ModuleGroup } from '@/lib/sessions';

describe('getSessionState', () => {
  test('returns available when no prerequisite', () => {
    expect(getSessionState(5, null, new Set([1, 2, 3]))).toBe('available');
  });

  test('returns available when prerequisite is met', () => {
    expect(getSessionState(5, 4, new Set([4]))).toBe('available');
  });

  test('returns locked when prerequisite is not met', () => {
    expect(getSessionState(5, 4, new Set([1, 2, 3]))).toBe('locked');
  });

  test('returns completed when session is in completed set', () => {
    expect(getSessionState(3, null, new Set([3]))).toBe('completed');
  });

  test('returns completed even when prerequisite exists and is met', () => {
    expect(getSessionState(3, 2, new Set([2, 3]))).toBe('completed');
  });

  test('returns completed even when prerequisite is not met', () => {
    // Completed overrides locked check
    expect(getSessionState(3, 2, new Set([3]))).toBe('completed');
  });

  test('returns locked with empty completed set and prerequisite', () => {
    expect(getSessionState(2, 1, new Set())).toBe('locked');
  });

  test('returns available with empty completed set and no prerequisite', () => {
    expect(getSessionState(1, null, new Set())).toBe('available');
  });
});

describe('getCurrentModule', () => {
  const mockGroups: ModuleGroup[] = [
    {
      section: 'Module 1: Foundations',
      sessions: [
        { data: { session_number: 1 } as never, content: '', slug: '01-intro' },
        { data: { session_number: 2 } as never, content: '', slug: '02-basics' },
      ],
    },
    {
      section: 'Module 2: Oscillators',
      sessions: [
        { data: { session_number: 3 } as never, content: '', slug: '03-osc-a' },
        { data: { session_number: 4 } as never, content: '', slug: '04-osc-b' },
      ],
    },
    {
      section: 'Module 3: Filters',
      sessions: [
        { data: { session_number: 5 } as never, content: '', slug: '05-filter-a' },
        { data: { session_number: 6 } as never, content: '', slug: '06-filter-b' },
      ],
    },
  ];

  test('returns module containing first incomplete session', () => {
    expect(getCurrentModule(mockGroups, new Set([1, 2]))).toBe('Module 2: Oscillators');
  });

  test('returns null when all sessions complete', () => {
    expect(getCurrentModule(mockGroups, new Set([1, 2, 3, 4, 5, 6, 7]))).toBeNull();
  });

  test('returns null for empty groups', () => {
    expect(getCurrentModule([], new Set())).toBeNull();
  });

  test('returns first module when nothing is completed', () => {
    expect(getCurrentModule(mockGroups, new Set())).toBe('Module 1: Foundations');
  });

  test('returns third module when first two are complete', () => {
    expect(getCurrentModule(mockGroups, new Set([1, 2, 3, 4]))).toBe('Module 3: Filters');
  });
});
