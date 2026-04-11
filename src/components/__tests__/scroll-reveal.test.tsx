import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// Track useInView calls
let mockInView = false;
const mockUseInViewRef = { current: null };

vi.mock('motion/react', () => {
  const motion = {
    div: ({
      children,
      initial,
      animate,
      transition,
      className,
      ...rest
    }: {
      children?: React.ReactNode;
      initial?: unknown;
      animate?: unknown;
      transition?: Record<string, unknown>;
      className?: string;
      [key: string]: unknown;
    }) => (
      <div
        className={className}
        data-testid="motion-div"
        data-initial={initial !== undefined ? JSON.stringify(initial) : undefined}
        data-animate={animate ? JSON.stringify(animate) : undefined}
        data-transition={transition ? JSON.stringify(transition) : undefined}
        {...rest}
      >
        {children}
      </div>
    ),
  };

  return {
    motion,
    useReducedMotion: vi.fn(() => false),
    useInView: vi.fn((_ref: unknown, _opts?: unknown) => mockInView),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    MotionConfig: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { useReducedMotion, useInView } from 'motion/react';

describe('ScrollReveal', () => {
  beforeEach(() => {
    mockInView = false;
    vi.mocked(useReducedMotion).mockReturnValue(false);
    vi.mocked(useInView).mockImplementation(() => mockInView);
  });

  it('renders children with fade-up initial state', () => {
    render(
      <ScrollReveal>
        <span>Content</span>
      </ScrollReveal>
    );

    expect(screen.getByText('Content')).toBeDefined();

    const motionDiv = screen.getByTestId('motion-div');
    const initial = JSON.parse(
      motionDiv.getAttribute('data-initial') || '{}'
    );
    expect(initial.opacity).toBe(0);
    expect(initial.y).toBe(16);
  });

  it('animates to visible when in view', () => {
    mockInView = true;
    vi.mocked(useInView).mockReturnValue(true);

    render(
      <ScrollReveal>
        <span>Visible</span>
      </ScrollReveal>
    );

    const motionDiv = screen.getByTestId('motion-div');
    const animate = JSON.parse(
      motionDiv.getAttribute('data-animate') || '{}'
    );
    expect(animate.opacity).toBe(1);
    expect(animate.y).toBe(0);
  });

  it('stays hidden when not in view', () => {
    mockInView = false;
    vi.mocked(useInView).mockReturnValue(false);

    render(
      <ScrollReveal>
        <span>Hidden</span>
      </ScrollReveal>
    );

    const motionDiv = screen.getByTestId('motion-div');
    const animate = JSON.parse(
      motionDiv.getAttribute('data-animate') || '{}'
    );
    expect(animate.opacity).toBe(0);
    expect(animate.y).toBe(16);
  });

  it('uses once: true on useInView', () => {
    render(
      <ScrollReveal>
        <span>Once</span>
      </ScrollReveal>
    );

    expect(useInView).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ once: true })
    );
  });

  it('renders plain div when reduced motion preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    render(
      <ScrollReveal>
        <span>Static</span>
      </ScrollReveal>
    );

    expect(screen.getByText('Static')).toBeDefined();

    // No motion props should be applied
    const wrapper = screen.getByText('Static').parentElement!;
    expect(wrapper.getAttribute('data-initial')).toBeNull();
    expect(wrapper.getAttribute('data-animate')).toBeNull();
  });
});
