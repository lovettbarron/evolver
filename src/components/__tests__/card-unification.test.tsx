import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroCard } from '@/components/hero-card';
import { PatchCard } from '@/components/patch-card';
import { InstrumentModuleCard } from '@/components/instrument-module-card';
import { InstrumentCard } from '@/components/instrument-card';
import { CountCard } from '@/components/count-card';
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

describe('Card Unification — .card CSS class adoption', () => {
  test('HeroCard container includes "card" and "card-hero" classes', () => {
    const { container } = render(
      <HeroCard
        moduleName="Test"
        sessionTitle="Test"
        objective="Test"
        duration={15}
        href="/test"
      />
    );
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv.className).toContain('card');
    expect(outerDiv.className).toContain('card-hero');
  });

  test('PatchCard link element includes "card" class', () => {
    render(
      <PatchCard
        patch={
          {
            name: 'Test',
            type: 'bass',
            description: 'desc',
            tags: ['test'],
            created: '2024-01-01',
          } as any
        }
        slug="test"
        instrumentSlug="evolver"
      />
    );
    const link = screen.getByRole('link');
    expect(link.className).toContain('card');
  });

  test('InstrumentModuleCard link element includes "card" class', () => {
    render(
      <InstrumentModuleCard
        slug="test"
        instrumentSlug="evolver"
        title="Test"
        purpose="Test purpose"
      />
    );
    const link = screen.getByRole('link');
    expect(link.className).toContain('card');
  });

  test('InstrumentCard link element includes "card" class', () => {
    render(
      <InstrumentCard
        slug="evolver"
        displayName="Evolver"
        tagline="Test"
        sessionCount={10}
        patchCount={5}
      />
    );
    const link = screen.getByRole('link');
    expect(link.className).toContain('card');
  });

  test('CountCard link element includes "card" class', () => {
    render(<CountCard count={5} label="Test" href="/test" />);
    const link = screen.getByRole('link');
    expect(link.className).toContain('card');
  });

  test('SessionRow link element does NOT include "card" class (D-04)', () => {
    render(
      <SessionRow
        number={1}
        title="Test"
        duration={15}
        href="/test"
        state={'available' as const}
        prerequisiteNumber={null}
      />
    );
    const link = screen.getByRole('link');
    expect(link.className).not.toContain('card');
  });
});
