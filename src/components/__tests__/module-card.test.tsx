import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ModuleCard } from '@/components/module-card';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock('@/components/motion/spring-card', () => ({
  SpringCard: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const sampleProps = {
  slug: 'plaits',
  displayName: 'Plaits',
  manufacturer: 'Mutable Instruments',
  hpWidth: 12,
  categories: ['vco'],
  sessionCount: 0,
};

describe('ModuleCard', () => {
  test('renders module name and manufacturer', () => {
    render(<ModuleCard {...sampleProps} />);
    expect(screen.getByText('Plaits')).toBeDefined();
    expect(screen.getByText('Mutable Instruments')).toBeDefined();
  });

  test('links to /modules/[slug]', () => {
    render(<ModuleCard {...sampleProps} />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/modules/plaits');
  });

  test('displays HP width and session count', () => {
    render(<ModuleCard {...sampleProps} />);
    expect(screen.getByText('12HP / 0 sessions')).toBeDefined();
  });

  test('renders category tags', () => {
    render(<ModuleCard {...sampleProps} />);
    expect(screen.getByText('vco')).toBeDefined();
  });

  test('renders multiple category tags for multi-category modules', () => {
    render(<ModuleCard {...sampleProps} categories={['function-generator', 'modulator']} />);
    expect(screen.getByText('function generator')).toBeDefined();
    expect(screen.getByText('modulator')).toBeDefined();
  });
});
