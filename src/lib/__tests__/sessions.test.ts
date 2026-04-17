import { describe, it, expect } from 'vitest';
import { groupByModule, getAdjacentSessions, type SessionWithMeta } from '@/lib/sessions';
import type { Session } from '@/lib/content/types';

function makeSession(overrides: Partial<Session> & { session_number: number; section: string }): SessionWithMeta {
  const { section, session_number, ...rest } = overrides;
  const data: Session = {
    title: `Session ${session_number}`,
    section,
    session_number,
    duration: 20,
    prerequisite: null,
    output_type: 'technique',
    difficulty: 'beginner',
    tags: [],
    instrument: 'evolver',
    instrument_type: 'instrument' as const,
    ...rest,
  };
  return {
    data,
    content: '',
    slug: `${String(overrides.session_number).padStart(2, '0')}-${overrides.section.toLowerCase().replace(/\s+/g, '-')}`,
  };
}

describe('groupByModule', () => {
  it('returns empty array for empty input', () => {
    const result = groupByModule([]);
    expect(result).toEqual([]);
  });

  it('groups 3 sessions across 2 modules into 2 ModuleGroup objects', () => {
    const sessions = [
      makeSession({ session_number: 1, section: 'Oscillators' }),
      makeSession({ session_number: 2, section: 'Oscillators' }),
      makeSession({ session_number: 3, section: 'Filters' }),
    ];
    const result = groupByModule(sessions);
    expect(result).toHaveLength(2);
    expect(result[0].section).toBe('Oscillators');
    expect(result[0].sessions).toHaveLength(2);
    expect(result[1].section).toBe('Filters');
    expect(result[1].sessions).toHaveLength(1);
  });

  it('orders groups by first session_number, not alphabetically', () => {
    const sessions = [
      makeSession({ session_number: 5, section: 'Zebra' }),
      makeSession({ session_number: 1, section: 'Alpha' }),
      makeSession({ session_number: 3, section: 'Zebra' }),
    ];
    const result = groupByModule(sessions);
    // Alpha has session 1 (first), Zebra has session 3 (lowest in Zebra group)
    expect(result[0].section).toBe('Alpha');
    expect(result[1].section).toBe('Zebra');
  });

  it('preserves session order within each module (sorted by session_number)', () => {
    const sessions = [
      makeSession({ session_number: 1, section: 'Oscillators' }),
      makeSession({ session_number: 3, section: 'Oscillators' }),
      makeSession({ session_number: 2, section: 'Oscillators' }),
    ];
    const result = groupByModule(sessions);
    expect(result[0].sessions[0].data.session_number).toBe(1);
    expect(result[0].sessions[1].data.session_number).toBe(2);
    expect(result[0].sessions[2].data.session_number).toBe(3);
  });
});

describe('getAdjacentSessions', () => {
  const sessions = [
    makeSession({ session_number: 1, section: 'Oscillators' }),
    makeSession({ session_number: 2, section: 'Oscillators' }),
    makeSession({ session_number: 3, section: 'Filters' }),
  ];

  it('returns { prev: null, next: session2 } for first session', () => {
    const result = getAdjacentSessions(sessions, sessions[0].slug);
    expect(result.prev).toBeNull();
    expect(result.next).not.toBeNull();
    expect(result.next!.data.session_number).toBe(2);
  });

  it('returns { prev: secondToLast, next: null } for last session', () => {
    const result = getAdjacentSessions(sessions, sessions[2].slug);
    expect(result.prev).not.toBeNull();
    expect(result.prev!.data.session_number).toBe(2);
    expect(result.next).toBeNull();
  });

  it('returns both prev and next for middle session', () => {
    const result = getAdjacentSessions(sessions, sessions[1].slug);
    expect(result.prev).not.toBeNull();
    expect(result.prev!.data.session_number).toBe(1);
    expect(result.next).not.toBeNull();
    expect(result.next!.data.session_number).toBe(3);
  });

  it('crosses module boundaries (curriculum is linear)', () => {
    // Session 2 is Oscillators, session 3 is Filters -- next should cross
    const result = getAdjacentSessions(sessions, sessions[1].slug);
    expect(result.next!.data.section).toBe('Filters');
  });
});
