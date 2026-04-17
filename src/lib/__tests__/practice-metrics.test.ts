import { describe, test, expect } from 'vitest';
import { getSessionsThisMonth, getActiveWeeks, getSyntheticCompletionDates, getHeatmapData } from '@/lib/practice-metrics';
import { getSyntheticCompletedSessions } from '@/lib/progress';

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

describe('getSyntheticCompletedSessions - octatrack', () => {
  test('returns octatrack set with 23 completed sessions', () => {
    const result = getSyntheticCompletedSessions('octatrack');
    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBe(23);
    expect(result.has(21)).toBe(true);  // Module 7 complete
    expect(result.has(23)).toBe(true);  // Module 8 partway
    expect(result.has(24)).toBe(false); // Module 8 pending
  });

  test('does not affect existing evolver or cascadia dispatches', () => {
    const evolver = getSyntheticCompletedSessions();
    expect(evolver.size).toBe(21);
    const cascadia = getSyntheticCompletedSessions('cascadia');
    expect(cascadia.size).toBe(12);
  });
});

describe('getSyntheticCompletionDates - octatrack', () => {
  test('returns 23 dates spanning 7 weeks for octatrack', () => {
    const dates = getSyntheticCompletionDates('octatrack');
    expect(dates.size).toBe(23);
    expect(dates.get(1)).toBeDefined();
    expect(dates.get(23)).toBeDefined();
    // First date < last date
    const firstDate = new Date(dates.get(1)!);
    const lastDate = new Date(dates.get(23)!);
    expect(lastDate.getTime()).toBeGreaterThan(firstDate.getTime());
  });

  test('returns ISO date strings for octatrack', () => {
    const dates = getSyntheticCompletionDates('octatrack');
    const firstDate = dates.get(1);
    expect(firstDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('getHeatmapData', () => {
  test('returns cells aligned to Monday start', () => {
    const cells = getHeatmapData([], 1);
    expect(cells[0].dayOfWeek).toBe(0); // Monday
  });

  test('returns 12 weeks of data by default', () => {
    const cells = getHeatmapData([]);
    // 12 weeks = ~84 days, but depends on current day of week alignment
    expect(cells.length).toBeGreaterThanOrEqual(78);
    expect(cells.length).toBeLessThanOrEqual(91);
  });

  test('counts sessions per date correctly', () => {
    const today = new Date().toISOString().slice(0, 10);
    const completionDates = [today, today, today];
    const cells = getHeatmapData(completionDates);
    const todayCell = cells.find(c => c.date === today);
    expect(todayCell).toBeDefined();
    expect(todayCell!.count).toBe(3);
  });

  test('returns count 0 for dates with no sessions', () => {
    const cells = getHeatmapData([]);
    expect(cells.every(c => c.count === 0)).toBe(true);
  });
});
