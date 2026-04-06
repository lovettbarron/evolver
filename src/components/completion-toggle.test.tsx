import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CompletionToggle } from '@/components/completion-toggle';

// Track mock functions
const mockToggleCompletion = vi.fn();
const mockSetLastVisited = vi.fn();

let mockCompletions: Record<string, number[]> = {};

// Mock the learner store
vi.mock('@/stores/learner-store', () => ({
  useLearnerStore: Object.assign(
    (selector: (state: { completions: Record<string, number[]> }) => unknown) =>
      selector({ completions: mockCompletions }),
    {
      getState: () => ({
        toggleCompletion: mockToggleCompletion,
        setLastVisited: mockSetLastVisited,
      }),
    },
  ),
}));

// Mock useHydrated to return true by default
let mockHydrated = true;
vi.mock('@/hooks/use-hydrated', () => ({
  useHydrated: () => mockHydrated,
}));

// Mock lucide-react Check icon
vi.mock('lucide-react', () => ({
  Check: ({ size, className }: { size: number; className: string }) => (
    <svg data-testid="check-icon" width={size} className={className} />
  ),
}));

const baseProps = {
  instrumentSlug: 'evolver',
  sessionSlug: 'test-slug',
  sessionNumber: 5,
  sessionTitle: 'Analog Oscillator Basics',
  isDemo: false,
};

describe('CompletionToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCompletions = {};
    mockHydrated = true;
  });

  test('renders unchecked state with "Mark complete" label', () => {
    render(<CompletionToggle {...baseProps} />);

    expect(screen.getByText('Mark complete')).toBeDefined();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.getAttribute('aria-checked')).toBe('false');
  });

  test('renders checked state with "Completed" label when session is complete', () => {
    mockCompletions = { evolver: [5] };
    render(<CompletionToggle {...baseProps} />);

    expect(screen.getByText('Completed')).toBeDefined();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
  });

  test('clicking the toggle calls toggleCompletion with correct args', () => {
    render(<CompletionToggle {...baseProps} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockToggleCompletion).toHaveBeenCalledWith('evolver', 5);
  });

  test('returns null when isDemo is true', () => {
    const { container } = render(
      <CompletionToggle {...baseProps} isDemo={true} />,
    );

    expect(container.firstChild).toBeNull();
  });

  test('calls setLastVisited on mount with correct args', () => {
    render(<CompletionToggle {...baseProps} />);

    expect(mockSetLastVisited).toHaveBeenCalledWith(
      'evolver',
      'test-slug',
      5,
    );
  });

  test('does not call setLastVisited when isDemo is true', () => {
    render(<CompletionToggle {...baseProps} isDemo={true} />);

    expect(mockSetLastVisited).not.toHaveBeenCalled();
  });
});
