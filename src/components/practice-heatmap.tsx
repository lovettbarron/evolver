'use client';

import { getHeatmapData } from '@/lib/practice-metrics';

interface PracticeHeatmapProps {
  completionDates: string[];
}

function getIntensityBackground(count: number): string {
  if (count === 0) return 'var(--color-surface)';
  if (count === 1) return 'color-mix(in oklch, var(--color-accent) 25%, transparent)';
  if (count === 2) return 'color-mix(in oklch, var(--color-accent) 50%, transparent)';
  if (count === 3) return 'color-mix(in oklch, var(--color-accent) 75%, transparent)';
  return 'var(--color-accent)';
}

const DAY_LABELS: Array<{ row: number; label: string }> = [
  { row: 0, label: 'Mon' },
  { row: 2, label: 'Wed' },
  { row: 4, label: 'Fri' },
];

const LEGEND_LEVELS = [0, 1, 2, 3, 4];

export function PracticeHeatmap({ completionDates }: PracticeHeatmapProps) {
  if (completionDates.length === 0) {
    return (
      <section className="mt-xl">
        <h2 className="text-[24px] font-bold text-text mb-md">Practice Activity</h2>
        <p className="text-muted text-[14px]">
          Your practice heatmap appears here after your first completed session.
        </p>
      </section>
    );
  }

  const cells = getHeatmapData(completionDates, 12);

  return (
    <section className="mt-xl">
      <h2 className="text-[24px] font-bold text-text mb-md">Practice Activity</h2>
      <div style={{ display: 'flex', gap: '4px' }}>
        {/* Day labels column */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(7, 1fr)',
            gap: '4px',
            width: '28px',
            flexShrink: 0,
          }}
        >
          {Array.from({ length: 7 }, (_, i) => {
            const dayLabel = DAY_LABELS.find(d => d.row === i);
            return (
              <div
                key={i}
                style={{
                  height: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: 'var(--color-muted)',
                  lineHeight: 1,
                }}
              >
                {dayLabel?.label ?? ''}
              </div>
            );
          })}
        </div>

        {/* Heatmap grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(7, 1fr)',
            gridAutoFlow: 'column',
            gap: '4px',
          }}
        >
          {cells.map(cell => (
            <div
              key={cell.date}
              data-date={cell.date}
              title={`${cell.date}: ${cell.count} session(s)`}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: getIntensityBackground(cell.count),
              }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '4px',
          marginTop: '8px',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--color-muted)' }}>
          Less
        </span>
        {LEGEND_LEVELS.map(level => (
          <div
            key={level}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '2px',
              backgroundColor: getIntensityBackground(level),
            }}
          />
        ))}
        <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--color-muted)' }}>
          More
        </span>
      </div>
    </section>
  );
}
