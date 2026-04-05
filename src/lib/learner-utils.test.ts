import { describe, it, expect } from 'vitest';
import { mergeCompletions, computeNextSession } from './learner-utils';

describe('mergeCompletions', () => {
  it('merges two overlapping sets into a union', () => {
    expect(mergeCompletions(new Set([1, 2, 3]), new Set([3, 4, 5]))).toEqual(
      new Set([1, 2, 3, 4, 5]),
    );
  });

  it('merges empty + non-empty', () => {
    expect(mergeCompletions(new Set(), new Set([1, 2]))).toEqual(new Set([1, 2]));
  });

  it('merges non-empty + empty', () => {
    expect(mergeCompletions(new Set([1]), new Set())).toEqual(new Set([1]));
  });

  it('merges two empty sets', () => {
    expect(mergeCompletions(new Set(), new Set())).toEqual(new Set());
  });
});

function mockSession(num: number, slug: string, title: string, mod: string) {
  return { slug, data: { session_number: num, title, module: mod } };
}

const sessions = [
  mockSession(1, 'intro', 'Introduction', 'Foundations'),
  mockSession(2, 'osc', 'Oscillators', 'Foundations'),
  mockSession(3, 'filter', 'Filter Basics', 'Filter'),
  mockSession(4, 'env', 'Envelopes', 'Filter'),
  mockSession(5, 'lfo', 'LFO Modulation', 'Modulation'),
];

describe('computeNextSession', () => {
  it('returns lastVisited session when it is incomplete', () => {
    const result = computeNextSession(
      { sessionSlug: 'osc', sessionNumber: 2 },
      new Set([1]),
      sessions,
    );
    expect(result).toEqual({ slug: 'osc', sessionNumber: 2, title: 'Oscillators', module: 'Foundations' });
  });

  it('returns first incomplete when lastVisited is complete', () => {
    const result = computeNextSession(
      { sessionSlug: 'intro', sessionNumber: 1 },
      new Set([1, 2]),
      sessions,
    );
    expect(result).toEqual({ slug: 'filter', sessionNumber: 3, title: 'Filter Basics', module: 'Filter' });
  });

  it('returns null when all sessions are complete', () => {
    const result = computeNextSession(
      { sessionSlug: 'lfo', sessionNumber: 5 },
      new Set([1, 2, 3, 4, 5]),
      sessions,
    );
    expect(result).toBeNull();
  });

  it('returns first incomplete when no lastVisited', () => {
    const result = computeNextSession(undefined, new Set([1]), sessions);
    expect(result).toEqual({ slug: 'osc', sessionNumber: 2, title: 'Oscillators', module: 'Foundations' });
  });

  it('returns first session when no lastVisited and no completions', () => {
    const result = computeNextSession(undefined, new Set(), sessions);
    expect(result).toEqual({ slug: 'intro', sessionNumber: 1, title: 'Introduction', module: 'Foundations' });
  });

  it('returns null for empty sessions list', () => {
    const result = computeNextSession(undefined, new Set(), []);
    expect(result).toBeNull();
  });

  it('falls back to first incomplete if lastVisited slug not found in list', () => {
    const result = computeNextSession(
      { sessionSlug: 'nonexistent', sessionNumber: 99 },
      new Set([1]),
      sessions,
    );
    expect(result).toEqual({ slug: 'osc', sessionNumber: 2, title: 'Oscillators', module: 'Foundations' });
  });

  it('handles lastVisited complete with all others also complete except last', () => {
    const result = computeNextSession(
      { sessionSlug: 'intro', sessionNumber: 1 },
      new Set([1, 2, 3, 4]),
      sessions,
    );
    expect(result).toEqual({ slug: 'lfo', sessionNumber: 5, title: 'LFO Modulation', module: 'Modulation' });
  });
});
