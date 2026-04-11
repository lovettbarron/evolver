import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PracticeHeatmap } from '@/components/practice-heatmap';

// Generate mock dates for the last 12 weeks
function generateMockDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < 20; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i * 3); // Every 3 days
    dates.push(d.toISOString().slice(0, 10));
  }
  // Add duplicates for intensity testing
  dates.push(dates[0]); // 2 sessions on most recent
  dates.push(dates[0]); // 3 sessions on most recent
  return dates;
}

describe('PracticeHeatmap', () => {
  test('renders 12 weeks of grid cells', () => {
    const { container } = render(
      <PracticeHeatmap completionDates={generateMockDates()} />,
    );
    const cells = container.querySelectorAll('[data-date]');
    expect(cells.length).toBeGreaterThanOrEqual(78);
    expect(cells.length).toBeLessThanOrEqual(91);
  });

  test('renders empty state when completionDates is empty', () => {
    render(<PracticeHeatmap completionDates={[]} />);
    expect(
      screen.getByText(
        'Your practice heatmap appears here after your first completed session.',
      ),
    ).toBeDefined();
  });

  test('applies intensity levels based on session count', () => {
    const today = new Date().toISOString().slice(0, 10);
    // 3 sessions on today
    const dates = [today, today, today];
    const { container } = render(<PracticeHeatmap completionDates={dates} />);
    const todayCell = container.querySelector(`[data-date="${today}"]`);
    expect(todayCell).not.toBeNull();
    const bg = (todayCell as HTMLElement).style.backgroundColor;
    // count=3 should use 75% color-mix
    expect(bg).toContain('color-mix');
    expect(bg).toContain('75%');
  });

  test('renders day labels Mon, Wed, Fri', () => {
    render(<PracticeHeatmap completionDates={generateMockDates()} />);
    expect(screen.getByText('Mon')).toBeDefined();
    expect(screen.getByText('Wed')).toBeDefined();
    expect(screen.getByText('Fri')).toBeDefined();
  });

  test('renders legend with Less/More labels', () => {
    render(<PracticeHeatmap completionDates={generateMockDates()} />);
    expect(screen.getByText('Less')).toBeDefined();
    expect(screen.getByText('More')).toBeDefined();
  });

  test('renders section heading "Practice Activity"', () => {
    render(<PracticeHeatmap completionDates={generateMockDates()} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toBe('Practice Activity');
  });
});
