import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CumulativeMetrics } from '@/components/cumulative-metrics';

describe('CumulativeMetrics', () => {
  test('renders "Practice Activity" heading when dates are provided', () => {
    const dates = ['2026-03-01', '2026-03-08', '2026-03-15'];
    render(<CumulativeMetrics completionDates={dates} />);
    expect(screen.getByText('Practice Activity')).toBeDefined();
  });

  test('renders metric labels for sessions this month and active weeks', () => {
    const dates = ['2026-03-01', '2026-03-08', '2026-03-15'];
    render(<CumulativeMetrics completionDates={dates} />);
    expect(screen.getByText('Sessions this month')).toBeDefined();
    expect(screen.getByText('Active weeks')).toBeDefined();
  });

  test('renders empty state with "Keep going" heading when no dates', () => {
    render(<CumulativeMetrics completionDates={[]} />);
    expect(screen.getByText('Keep going')).toBeDefined();
    expect(screen.getByText('Practice activity appears here after your first completed session.')).toBeDefined();
  });

  test('does NOT contain guilt-inducing language', () => {
    const dates = ['2026-03-01'];
    const { container } = render(<CumulativeMetrics completionDates={dates} />);
    const text = container.textContent ?? '';
    expect(text).not.toContain('streak');
    expect(text).not.toContain('missed');
    expect(text).not.toContain('behind');
  });
});
