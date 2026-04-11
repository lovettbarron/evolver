import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock motion/react to expose props passed to motion components
vi.mock('motion/react', () => {
  const motion = {
    div: ({
      children,
      whileHover,
      transition,
      className,
      ...rest
    }: {
      children?: React.ReactNode;
      whileHover?: Record<string, unknown>;
      transition?: Record<string, unknown>;
      className?: string;
      [key: string]: unknown;
    }) => (
      <div
        className={className}
        data-testid="motion-div"
        data-while-hover={whileHover ? JSON.stringify(whileHover) : undefined}
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
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    MotionConfig: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

import { SpringCard } from '@/components/motion/spring-card';
import { useReducedMotion } from 'motion/react';

describe('SpringCard', () => {
  beforeEach(() => {
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  it('renders children inside a motion.div with spring hover config', () => {
    render(
      <SpringCard>
        <span>Test Child</span>
      </SpringCard>
    );

    expect(screen.getByText('Test Child')).toBeDefined();

    const motionDiv = screen.getByTestId('motion-div');
    const whileHover = JSON.parse(
      motionDiv.getAttribute('data-while-hover') || '{}'
    );
    expect(whileHover.y).toBe(-2);

    const transition = JSON.parse(
      motionDiv.getAttribute('data-transition') || '{}'
    );
    expect(transition.stiffness).toBe(400);
    expect(transition.damping).toBe(28);
  });

  it('passes className to motion.div wrapper', () => {
    render(
      <SpringCard className="test-class">
        <span>Child</span>
      </SpringCard>
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv.className).toContain('test-class');
  });

  it('renders plain div (no motion) when reduced motion is preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    render(
      <SpringCard>
        <span>Still renders</span>
      </SpringCard>
    );

    expect(screen.getByText('Still renders')).toBeDefined();

    // When reduced motion is preferred, no whileHover should be applied
    const wrapper = screen.getByText('Still renders').parentElement!;
    expect(wrapper.getAttribute('data-while-hover')).toBeNull();
  });
});
