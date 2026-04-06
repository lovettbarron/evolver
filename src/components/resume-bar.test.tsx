import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResumeBar } from './resume-bar';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock useHydrated
const mockHydrated = vi.fn(() => true);
vi.mock('@/hooks/use-hydrated', () => ({
  useHydrated: () => mockHydrated(),
}));

// Mock learner store
const mockGetCompletedSessions = vi.fn(() => new Set<number>());
const mockLastVisited: Record<string, { sessionSlug: string; sessionNumber: number } | undefined> = {};
vi.mock('@/stores/learner-store', () => ({
  useLearnerStore: (selector: (state: { getCompletedSessions: typeof mockGetCompletedSessions; lastVisited: typeof mockLastVisited }) => unknown) =>
    selector({ getCompletedSessions: mockGetCompletedSessions, lastVisited: mockLastVisited }),
}));

// Mock learner-utils
const mockComputeNextSession = vi.fn();
const mockMergeCompletions = vi.fn(() => new Set<number>());
vi.mock('@/lib/learner-utils', () => ({
  mergeCompletions: (...args: Parameters<typeof mockMergeCompletions>) => mockMergeCompletions(...args),
  computeNextSession: (...args: Parameters<typeof mockComputeNextSession>) => mockComputeNextSession(...args),
}));

const mockSessions = [
  { slug: '01-basics', data: { session_number: 1, title: 'Basics', module: 'Foundations' } },
  { slug: '02-oscillators', data: { session_number: 2, title: 'Oscillators', module: 'Foundations' } },
  { slug: '03-filters', data: { session_number: 3, title: 'Filters', module: 'Sound Shaping' } },
];

describe('ResumeBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHydrated.mockReturnValue(true);
    mockGetCompletedSessions.mockReturnValue(new Set<number>());
    mockMergeCompletions.mockReturnValue(new Set<number>());
    // Clear lastVisited
    Object.keys(mockLastVisited).forEach((k) => delete mockLastVisited[k]);
  });

  it('renders "Continue where you left off" when there is a next session and lastVisited exists', () => {
    mockLastVisited['evolver'] = { sessionSlug: '01-basics', sessionNumber: 1 };
    mockComputeNextSession.mockReturnValue({
      slug: '02-oscillators',
      sessionNumber: 2,
      title: 'Oscillators',
      module: 'Foundations',
    });

    render(
      <ResumeBar instrumentSlug="evolver" vaultCompletions={[1]} sessions={mockSessions} isDemo={false} />,
    );

    expect(screen.getByText('Continue where you left off')).toBeTruthy();
    expect(screen.getByText('Session 2: Oscillators')).toBeTruthy();
  });

  it('renders "Ready to start?" when no lastVisited and no completions', () => {
    mockComputeNextSession.mockReturnValue({
      slug: '01-basics',
      sessionNumber: 1,
      title: 'Basics',
      module: 'Foundations',
    });

    render(
      <ResumeBar instrumentSlug="evolver" vaultCompletions={[]} sessions={mockSessions} isDemo={false} />,
    );

    expect(screen.getByText('Ready to start?')).toBeTruthy();
    expect(screen.getByText('Session 1: Basics')).toBeTruthy();
  });

  it('renders "All sessions complete" when computeNextSession returns null', () => {
    mockMergeCompletions.mockReturnValue(new Set([1, 2, 3]));
    mockGetCompletedSessions.mockReturnValue(new Set([1, 2, 3]));
    mockLastVisited['evolver'] = { sessionSlug: '03-filters', sessionNumber: 3 };
    mockComputeNextSession.mockReturnValue(null);

    render(
      <ResumeBar instrumentSlug="evolver" vaultCompletions={[1, 2, 3]} sessions={mockSessions} isDemo={false} />,
    );

    expect(screen.getByText('All sessions complete')).toBeTruthy();
    expect(screen.getByText('Explore patches and challenges')).toBeTruthy();
  });

  it('links to correct session URL for "has next" variant', () => {
    mockLastVisited['evolver'] = { sessionSlug: '01-basics', sessionNumber: 1 };
    mockComputeNextSession.mockReturnValue({
      slug: '02-oscillators',
      sessionNumber: 2,
      title: 'Oscillators',
      module: 'Foundations',
    });

    render(
      <ResumeBar instrumentSlug="evolver" vaultCompletions={[1]} sessions={mockSessions} isDemo={false} />,
    );

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/instruments/evolver/sessions/02-oscillators');
  });

  it('links to patches URL for "all complete" variant', () => {
    mockMergeCompletions.mockReturnValue(new Set([1, 2, 3]));
    mockLastVisited['evolver'] = { sessionSlug: '03-filters', sessionNumber: 3 };
    mockComputeNextSession.mockReturnValue(null);

    render(
      <ResumeBar instrumentSlug="evolver" vaultCompletions={[1, 2, 3]} sessions={mockSessions} isDemo={false} />,
    );

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/instruments/evolver/patches');
  });

  it('returns null before hydration', () => {
    mockHydrated.mockReturnValue(false);
    mockComputeNextSession.mockReturnValue({
      slug: '01-basics',
      sessionNumber: 1,
      title: 'Basics',
      module: 'Foundations',
    });

    const { container } = render(
      <ResumeBar instrumentSlug="evolver" vaultCompletions={[]} sessions={mockSessions} isDemo={false} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
