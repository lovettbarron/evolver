import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CountCard } from '@/components/count-card';

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

describe('CountCard', () => {
  test('renders as a link with the provided href', () => {
    render(<CountCard count={21} label="Sessions Completed" href="/instruments/evolver/sessions" />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/instruments/evolver/sessions');
  });

  test('displays count and label text', () => {
    render(<CountCard count={5} label="Patches Created" href="/instruments/evolver/patches" />);
    expect(screen.getByText('5')).toBeDefined();
    expect(screen.getByText('Patches Created')).toBeDefined();
  });

  test('has aria-label combining count and label', () => {
    render(<CountCard count={3} label="Modules Done" href="/instruments/evolver/modules" />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('aria-label')).toBe('3 Modules Done');
  });

  test('uses .card CSS class for hover lift affordance', () => {
    render(<CountCard count={7} label="Challenges Completed" href="/instruments/evolver/sessions" />);
    const link = screen.getByRole('link');
    expect(link.className).toContain('card');
  });

  test('does not include inline focus-visible classes (inherits global :focus-visible)', () => {
    render(<CountCard count={7} label="Challenges Completed" href="/instruments/evolver/sessions" />);
    const link = screen.getByRole('link');
    expect(link.className).not.toContain('focus-visible:outline');
  });
});
