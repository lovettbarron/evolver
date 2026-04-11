import {
  SYNTHETIC_JOURNEY_WEEKS,
  SYNTHETIC_CASCADIA_JOURNEY_WEEKS,
} from './synthetic-daily-notes';

/**
 * Count sessions completed in the same calendar month as currentDate.
 */
export function getSessionsThisMonth(completionDates: Date[], currentDate?: Date): number {
  const ref = currentDate ?? new Date();
  const month = ref.getMonth();
  const year = ref.getFullYear();
  return completionDates.filter(d => d.getMonth() === month && d.getFullYear() === year).length;
}

/**
 * Compute ISO 8601 week key (Monday-start) for a date.
 */
function getISOWeekKey(date: Date): string {
  // Copy date to avoid mutation
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Set to nearest Thursday: current date + 4 - day number (Monday=1, Sunday=7)
  const dayNum = d.getUTCDay() || 7; // Convert Sunday (0) to 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNo}`;
}

/**
 * Count distinct ISO weeks containing at least one completion date.
 */
export function getActiveWeeks(completionDates: Date[]): number {
  const weeks = new Set<string>();
  for (const date of completionDates) {
    weeks.add(getISOWeekKey(date));
  }
  return weeks.size;
}

/**
 * Generate synthetic completion dates from journey week data.
 * Returns a Map of session number -> ISO date string (YYYY-MM-DD).
 */
export function getSyntheticCompletionDates(instrument?: string): Map<number, string> {
  const weeks = instrument === 'cascadia'
    ? SYNTHETIC_CASCADIA_JOURNEY_WEEKS
    : SYNTHETIC_JOURNEY_WEEKS;

  const referenceStart = instrument === 'cascadia'
    ? new Date('2026-02-22')
    : new Date('2026-02-01');

  const dates = new Map<number, string>();

  for (const weekEntry of weeks) {
    for (let i = 0; i < weekEntry.sessions.length; i++) {
      const sessionNum = weekEntry.sessions[i];
      const d = new Date(referenceStart);
      d.setDate(d.getDate() + (weekEntry.week - 1) * 7 + i);
      const iso = d.toISOString().slice(0, 10);
      if (!dates.has(sessionNum)) {
        dates.set(sessionNum, iso);
      }
    }
  }

  return dates;
}

/**
 * Generate heatmap grid data for a practice activity visualization.
 * Returns one cell per day, aligned to Monday-start weeks.
 */
export function getHeatmapData(
  completionDates: string[],
  weeks: number = 12,
): Array<{ date: string; count: number; dayOfWeek: number; weekIndex: number }> {
  // Build count map from completion dates
  const countMap = new Map<string, number>();
  for (const d of completionDates) {
    countMap.set(d, (countMap.get(d) ?? 0) + 1);
  }

  // Compute start date: today minus (weeks * 7 - 1) days
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (weeks * 7 - 1));

  // Align startDate backward to Monday
  const dayOffset = (startDate.getDay() + 6) % 7;
  startDate.setDate(startDate.getDate() - dayOffset);

  const cells: Array<{ date: string; count: number; dayOfWeek: number; weekIndex: number }> = [];
  const cursor = new Date(startDate);
  let weekIndex = 0;
  let prevWeekDay = -1;

  while (cursor <= today) {
    const dayOfWeek = (cursor.getDay() + 6) % 7; // 0=Monday through 6=Sunday

    // Increment week when we wrap back to Monday
    if (dayOfWeek === 0 && prevWeekDay > 0) {
      weekIndex++;
    }

    const isoDate = cursor.toISOString().slice(0, 10);
    cells.push({
      date: isoDate,
      count: countMap.get(isoDate) ?? 0,
      dayOfWeek,
      weekIndex,
    });

    prevWeekDay = dayOfWeek;
    cursor.setDate(cursor.getDate() + 1);
  }

  return cells;
}
