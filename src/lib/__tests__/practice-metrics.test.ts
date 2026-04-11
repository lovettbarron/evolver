import { describe, test, expect } from 'vitest';
import { getSessionsThisMonth, getActiveWeeks, getSyntheticCompletionDates } from '@/lib/practice-metrics';

describe('getSessionsThisMonth', () => {
  test('returns 0 for empty array', () => {
    expect(getSessionsThisMonth([], new Date('2026-03-15'))).toBe(0);
  });

  test('counts only dates in the same calendar month and year', () => {
    const dates = [
      new Date('2026-03-01'),
      new Date('2026-03-15'),
      new Date('2026-03-31'),
      new Date('2026-02-28'), // different month
      new Date('2025-03-15'), // different year
    ];
    expect(getSessionsThisMonth(dates, new Date('2026-03-15'))).toBe(3);
  });

  test('counts dates in February correctly', () => {
    const dates = [
      new Date('2026-02-01'),
      new Date('2026-02-14'),
      new Date('2026-03-01'),
    ];
    expect(getSessionsThisMonth(dates, new Date('2026-02-20'))).toBe(2);
  });
});

describe('getActiveWeeks', () => {
  test('returns 0 for empty array', () => {
    expect(getActiveWeeks([])).toBe(0);
  });

  test('returns 1 for multiple dates in the same week', () => {
    // Mon-Wed of the same week
    const dates = [
      new Date('2026-03-09'), // Monday
      new Date('2026-03-10'), // Tuesday
      new Date('2026-03-11'), // Wednesday
    ];
    expect(getActiveWeeks(dates)).toBe(1);
  });

  test('returns correct count for dates spread across multiple weeks', () => {
    const dates = [
      new Date('2026-02-02'), // Week 6 of 2026
      new Date('2026-02-09'), // Week 7
      new Date('2026-02-16'), // Week 8
      new Date('2026-02-23'), // Week 9
      new Date('2026-03-02'), // Week 10
    ];
    expect(getActiveWeeks(dates)).toBe(5);
  });

  test('handles single date', () => {
    expect(getActiveWeeks([new Date('2026-01-15')])).toBe(1);
  });
});

describe('getSyntheticCompletionDates', () => {
  test('returns 21 entries for evolver', () => {
    const dates = getSyntheticCompletionDates('evolver');
    expect(dates.size).toBe(21);
  });

  test('returns 12 entries for cascadia', () => {
    const dates = getSyntheticCompletionDates('cascadia');
    expect(dates.size).toBe(12);
  });

  test('returns ISO date strings as values', () => {
    const dates = getSyntheticCompletionDates('evolver');
    const firstDate = dates.get(1);
    expect(firstDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('defaults to evolver when no instrument specified', () => {
    const dates = getSyntheticCompletionDates();
    expect(dates.size).toBe(21);
  });
});

describe('getHeatmapData', () => {
  it.todo('returns cells aligned to Monday start');

  it.todo('returns 12 weeks of data by default');

  it.todo('counts sessions per date correctly');

  it.todo('returns count 0 for dates with no sessions');
});
