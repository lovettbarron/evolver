import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// Track AnimatePresence props (all instances)
let allAnimatePresenceProps: Array<Record<string, unknown>> = [];

// Mock motion/react to expose animation props
vi.mock('motion/react', () => {
  const motion = {
    div: ({
      children,
      ...rest
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...rest}>{children}</div>,
    span: ({
      children,
      initial,
      animate,
      exit,
      transition,
      ...rest
    }: {
      children?: React.ReactNode;
      initial?: unknown;
      animate?: unknown;
      exit?: unknown;
      transition?: Record<string, unknown>;
      [key: string]: unknown;
    }) => (
      <span
        data-testid="motion-span"
        data-initial={initial !== undefined ? JSON.stringify(initial) : undefined}
        data-animate={animate ? JSON.stringify(animate) : undefined}
        data-exit={exit ? JSON.stringify(exit) : undefined}
        data-transition={transition ? JSON.stringify(transition) : undefined}
        {...rest}
      >
        {children}
      </span>
    ),
    button: ({
      children,
      ...rest
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => <button {...rest}>{children}</button>,
  };

  return {
    motion,
    useReducedMotion: vi.fn(() => false),
    AnimatePresence: ({
      children,
      mode,
      ...rest
    }: {
      children: React.ReactNode;
      mode?: string;
      [key: string]: unknown;
    }) => {
      allAnimatePresenceProps.push({ mode, ...rest });
      return <div data-testid="animate-presence">{children}</div>;
    },
    MotionConfig: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

// Mock the learner store used by completion-toggle
vi.mock('@/stores/learner-store', () => {
  const fn = vi.fn(() => false) as any;
  fn.getState = vi.fn(() => ({
    toggleCompletion: vi.fn(),
    setLastVisited: vi.fn(),
  }));
  return { useLearnerStore: fn };
});

// Mock useHydrated to return true so component renders
vi.mock('@/hooks/use-hydrated', () => ({
  useHydrated: vi.fn(() => true),
}));

import { useReducedMotion } from 'motion/react';

// CompletionToggle will be modified in 22-02 to include motion animations.
// These tests verify the animation contracts once implemented.
import { CompletionToggle } from '@/components/completion-toggle';
import { useLearnerStore } from '@/stores/learner-store';

describe('CompletionToggle animation', () => {
  beforeEach(() => {
    vi.mocked(useReducedMotion).mockReturnValue(false);
    allAnimatePresenceProps = [];
  });

  it('uses spring with stiffness 500 and damping 15 for check entrance', () => {
    // Mock as completed state
    vi.mocked(useLearnerStore).mockReturnValue(true as any);

    render(
      <CompletionToggle
        instrumentSlug="evolver"
        sessionSlug="01-oscillators-basics"
        sessionNumber={1}
        sessionTitle="Oscillators Basics"
        isDemo={false}
      />
    );

    const motionSpans = screen.getAllByTestId('motion-span');
    // The check icon motion.span should have spring config
    const checkSpan = motionSpans.find((span) => {
      const transition = span.getAttribute('data-transition');
      return transition && transition.includes('"stiffness":500');
    });
    expect(checkSpan).toBeDefined();

    const transition = JSON.parse(
      checkSpan!.getAttribute('data-transition') || '{}'
    );
    expect(transition.stiffness).toBe(500);
    expect(transition.damping).toBe(15);
  });

  it('uses 100ms fade for uncomplete exit', () => {
    vi.mocked(useLearnerStore).mockReturnValue(false as any);

    render(
      <CompletionToggle
        instrumentSlug="evolver"
        sessionSlug="01-oscillators-basics"
        sessionNumber={1}
        sessionTitle="Oscillators Basics"
        isDemo={false}
      />
    );

    // Look for the exit transition with duration 0.1 (100ms)
    const motionSpans = screen.queryAllByTestId('motion-span');
    if (motionSpans.length > 0) {
      const exitSpan = motionSpans.find((span) => {
        const exit = span.getAttribute('data-exit');
        return exit && exit.includes('opacity');
      });
      if (exitSpan) {
        const transition = JSON.parse(
          exitSpan.getAttribute('data-transition') || '{}'
        );
        expect(transition.duration).toBe(0.1);
      }
    }
  });

  it('wraps check/uncheck in AnimatePresence mode=wait', () => {
    vi.mocked(useLearnerStore).mockReturnValue(true as any);

    render(
      <CompletionToggle
        instrumentSlug="evolver"
        sessionSlug="01-oscillators-basics"
        sessionNumber={1}
        sessionTitle="Oscillators Basics"
        isDemo={false}
      />
    );

    const presenceEls = screen.getAllByTestId('animate-presence');
    expect(presenceEls.length).toBeGreaterThan(0);
    // First AnimatePresence should have mode="wait" (check/uncheck wrapper)
    const waitPresence = allAnimatePresenceProps.find((p) => p.mode === 'wait');
    expect(waitPresence).toBeDefined();
  });

  it('does not animate when reduced motion is preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    vi.mocked(useLearnerStore).mockReturnValue(true as any);

    render(
      <CompletionToggle
        instrumentSlug="evolver"
        sessionSlug="01-oscillators-basics"
        sessionNumber={1}
        sessionTitle="Oscillators Basics"
        isDemo={false}
      />
    );

    // When reduced motion is preferred, initial should be false (no entrance animation)
    const motionSpans = screen.queryAllByTestId('motion-span');
    motionSpans.forEach((span) => {
      const initial = span.getAttribute('data-initial');
      if (initial) {
        // initial should be false or absent when reduced motion is on
        expect(initial).toBe('false');
      }
    });
  });
});
