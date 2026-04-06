'use client';

import { getSessionsThisMonth, getActiveWeeks } from '@/lib/practice-metrics';

interface CumulativeMetricsProps {
  completionDates: string[]; // Array of ISO date strings (YYYY-MM-DD)
}

export function CumulativeMetrics({ completionDates }: CumulativeMetricsProps) {
  if (completionDates.length === 0) {
    return (
      <section className="mt-xl">
        <h2 className="text-[24px] font-bold text-text mb-md">Keep going</h2>
        <p className="text-muted text-[14px]">
          Practice activity appears here after your first completed session.
        </p>
      </section>
    );
  }

  const dates = completionDates.map(d => new Date(d));
  const sessionsThisMonth = getSessionsThisMonth(dates);
  const activeWeeks = getActiveWeeks(dates);

  return (
    <section className="mt-xl">
      <h2 className="text-[24px] font-bold text-text mb-md">Practice Activity</h2>
      <div className="grid grid-cols-2 gap-md">
        <div className="bg-surface p-lg rounded-lg">
          <span className="text-[24px] font-bold text-accent">{sessionsThisMonth}</span>
          <p className="text-[14px] text-muted mt-xs">Sessions this month</p>
        </div>
        <div className="bg-surface p-lg rounded-lg">
          <span className="text-[24px] font-bold text-accent">{activeWeeks}</span>
          <p className="text-[14px] text-muted mt-xs">Active weeks</p>
        </div>
      </div>
    </section>
  );
}
