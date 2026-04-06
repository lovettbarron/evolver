import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SessionDetail } from '@/components/session-detail';

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

// Mock CompletionToggle to avoid store dependency
vi.mock('@/components/completion-toggle', () => ({
  CompletionToggle: () => null,
}));

// Mock next/dynamic to render children directly
vi.mock('next/dynamic', () => ({
  default: () => {
    return function MockMermaidRenderer() {
      return null;
    };
  },
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  ChevronLeft: ({ size }: { size: number }) => (
    <svg data-testid="chevron-left" width={size} height={size} />
  ),
  ChevronRight: ({ size }: { size: number }) => (
    <svg data-testid="chevron-right" width={size} height={size} />
  ),
  X: ({ size }: { size: number }) => (
    <svg data-testid="x-icon" width={size} height={size} />
  ),
}));

const baseSession = {
  title: 'Analog Oscillator Basics',
  module: 'Module 1: Oscillator Foundations',
  session_number: 1,
  duration: 20,
  prerequisite: null,
  output_type: 'technique' as const,
  difficulty: 'beginner' as const,
  tags: ['oscillator'],
  instrument: 'evolver',
};

describe('SessionDetail', () => {
  test('renders prose content via dangerouslySetInnerHTML', () => {
    render(
      <SessionDetail
        session={baseSession}
        html="<p>Test content paragraph</p>"
        prev={null}
        next={null}
        instrumentSlug="evolver"
        quickRefContent={[]}
        sessionSlug="01-analog-osc"
        reference={null}
        isDemo={false}
      />,
    );

    expect(screen.getByText('Test content paragraph')).toBeDefined();
    const proseDiv = screen.getByText('Test content paragraph').closest('.prose');
    expect(proseDiv).not.toBeNull();
  });

  test('renders session title and metadata', () => {
    render(
      <SessionDetail
        session={baseSession}
        html="<p>Content</p>"
        prev={null}
        next={null}
        instrumentSlug="evolver"
        quickRefContent={[]}
        sessionSlug="01-analog-osc"
        reference={null}
        isDemo={false}
      />,
    );

    expect(screen.getByText('Analog Oscillator Basics')).toBeDefined();
    expect(screen.getByText('20 min')).toBeDefined();
    expect(screen.getByText('beginner')).toBeDefined();
  });

  test('renders prev/next nav links when provided', () => {
    render(
      <SessionDetail
        session={baseSession}
        html="<p>Content</p>"
        prev={{ slug: '00-intro', title: 'Introduction' }}
        next={{ slug: '02-digital', title: 'Digital Oscillators' }}
        instrumentSlug="evolver"
        quickRefContent={[]}
        sessionSlug="01-analog-osc"
        reference={null}
        isDemo={false}
      />,
    );

    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/instruments/evolver/sessions/00-intro');
    expect(hrefs).toContain('/instruments/evolver/sessions/02-digital');
    expect(screen.getByText('Introduction')).toBeDefined();
    expect(screen.getByText('Digital Oscillators')).toBeDefined();
  });

  test('does not render prev/next links when null', () => {
    render(
      <SessionDetail
        session={baseSession}
        html="<p>Content</p>"
        prev={null}
        next={null}
        instrumentSlug="evolver"
        quickRefContent={[]}
        sessionSlug="01-analog-osc"
        reference={null}
        isDemo={false}
      />,
    );

    expect(screen.queryByText('Previous')).toBeNull();
    expect(screen.queryByText('Next')).toBeNull();
  });
});
