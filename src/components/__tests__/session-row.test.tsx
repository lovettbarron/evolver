import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SessionRow } from '@/components/session-row';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('SessionRow', () => {
  test('renders checkmark icon when state is completed', () => {
    render(
      <SessionRow
        number={3}
        title="Filter Basics"
        duration={20}
        href="/instruments/evolver/sessions/03-filter"
        state="completed"
        prerequisiteNumber={2}
      />,
    );

    expect(screen.getByRole('img', { name: 'Completed' })).toBeDefined();
  });

  test('renders open circle icon when state is available', () => {
    render(
      <SessionRow
        number={1}
        title="First Steps"
        duration={15}
        href="/instruments/evolver/sessions/01-first"
        state="available"
        prerequisiteNumber={null}
      />,
    );

    expect(screen.getByRole('img', { name: 'Available' })).toBeDefined();
  });

  test('renders lock icon when state is locked', () => {
    render(
      <SessionRow
        number={5}
        title="Advanced FM"
        duration={25}
        href="/instruments/evolver/sessions/05-fm"
        state="locked"
        prerequisiteNumber={4}
      />,
    );

    expect(screen.getByRole('img', { name: 'Locked' })).toBeDefined();
  });

  test('shows "Requires #4" text when locked with prerequisite', () => {
    render(
      <SessionRow
        number={5}
        title="Advanced FM"
        duration={25}
        href="/instruments/evolver/sessions/05-fm"
        state="locked"
        prerequisiteNumber={4}
      />,
    );

    expect(screen.getByText('Requires #4')).toBeDefined();
  });

  test('does not show "Requires" text when state is available', () => {
    render(
      <SessionRow
        number={1}
        title="First Steps"
        duration={15}
        href="/instruments/evolver/sessions/01-first"
        state="available"
        prerequisiteNumber={null}
      />,
    );

    expect(screen.queryByText(/Requires/)).toBeNull();
  });

  test('always renders a Link regardless of state', () => {
    render(
      <SessionRow
        number={5}
        title="Advanced FM"
        duration={25}
        href="/instruments/evolver/sessions/05-fm"
        state="locked"
        prerequisiteNumber={4}
      />,
    );

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/instruments/evolver/sessions/05-fm');
  });
});
