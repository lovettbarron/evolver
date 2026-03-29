import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SessionList } from '@/components/session-list';
import type { ModuleGroup } from '@/lib/sessions';

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const mockGroups: ModuleGroup[] = [
  {
    module: 'Module 1: Oscillator Foundations',
    sessions: [
      {
        data: {
          title: 'Analog Oscillator Basics',
          module: 'Module 1: Oscillator Foundations',
          session_number: 1,
          duration: 20,
          prerequisite: null,
          output_type: 'technique',
          difficulty: 'beginner',
          tags: ['oscillator'],
          instrument: 'evolver',
        },
        content: '',
        slug: '01-oscillator-basics',
      },
      {
        data: {
          title: 'Digital Oscillators',
          module: 'Module 1: Oscillator Foundations',
          session_number: 2,
          duration: 25,
          prerequisite: 1,
          output_type: 'technique',
          difficulty: 'beginner',
          tags: ['oscillator'],
          instrument: 'evolver',
        },
        content: '',
        slug: '02-digital-oscillators',
      },
    ],
  },
  {
    module: 'Module 2: Filters',
    sessions: [
      {
        data: {
          title: 'Filter Basics',
          module: 'Module 2: Filters',
          session_number: 3,
          duration: 15,
          prerequisite: 2,
          output_type: 'patch',
          difficulty: 'beginner',
          tags: ['filter'],
          instrument: 'evolver',
        },
        content: '',
        slug: '03-filter-basics',
      },
    ],
  },
];

describe('Routing', () => {
  test('SessionList renders module groups', () => {
    render(<SessionList groups={mockGroups} instrumentSlug="evolver" />);

    expect(screen.getByText('Module 1: Oscillator Foundations')).toBeDefined();
    expect(screen.getByText('Module 2: Filters')).toBeDefined();
  });

  test('session rows display number, title, and duration', () => {
    render(<SessionList groups={mockGroups} instrumentSlug="evolver" />);

    expect(screen.getByText('1. Analog Oscillator Basics')).toBeDefined();
    expect(screen.getByText('20 min')).toBeDefined();
    expect(screen.getByText('2. Digital Oscillators')).toBeDefined();
    expect(screen.getByText('25 min')).toBeDefined();
  });

  test('session row links have correct href pattern', () => {
    render(<SessionList groups={mockGroups} instrumentSlug="evolver" />);

    const links = screen.getAllByRole('link');
    const hrefs = links.map((link) => link.getAttribute('href'));

    expect(hrefs).toContain('/instruments/evolver/sessions/01-oscillator-basics');
    expect(hrefs).toContain('/instruments/evolver/sessions/02-digital-oscillators');
    expect(hrefs).toContain('/instruments/evolver/sessions/03-filter-basics');
  });
});
