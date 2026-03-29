import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroCard } from '@/components/hero-card';

// Mock next/link to render as a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('HeroCard', () => {
  const defaultProps = {
    moduleName: 'Foundations',
    sessionTitle: 'Meet Your Evolver',
    objective: 'Learn the basic layout and navigation of the Evolver keyboard',
    duration: 20,
    href: '/instruments/evolver/sessions/01-foundations-meet-your-evolver',
  };

  test('renders module name', () => {
    render(<HeroCard {...defaultProps} />);
    expect(screen.getByText('Foundations')).toBeDefined();
  });

  test('renders session title', () => {
    render(<HeroCard {...defaultProps} />);
    expect(screen.getByText('Meet Your Evolver')).toBeDefined();
  });

  test('renders duration in correct format', () => {
    render(<HeroCard {...defaultProps} />);
    expect(screen.getByText('20 min')).toBeDefined();
  });

  test('renders Start Session link with correct href', () => {
    render(<HeroCard {...defaultProps} />);
    const link = screen.getByText('Start Session');
    expect(link).toBeDefined();
    expect(link.closest('a')).toBeDefined();
    expect(link.closest('a')?.getAttribute('href')).toBe(
      '/instruments/evolver/sessions/01-foundations-meet-your-evolver'
    );
  });

  test('renders objective text', () => {
    render(<HeroCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.objective)).toBeDefined();
  });

  test('applies accent styling to Start Session button', () => {
    render(<HeroCard {...defaultProps} />);
    const link = screen.getByText('Start Session');
    expect(link.className).toContain('bg-accent');
    expect(link.className).toContain('text-bg');
  });
});
