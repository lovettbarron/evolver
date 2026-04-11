import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('motion/react', () => {
  const motion = {
    div: ({
      children,
      variants,
      initial,
      animate,
      className,
      ...rest
    }: {
      children?: React.ReactNode;
      variants?: Record<string, unknown>;
      initial?: string;
      animate?: string;
      className?: string;
      [key: string]: unknown;
    }) => (
      <div
        className={className}
        data-testid="motion-div"
        data-variants={variants ? JSON.stringify(variants) : undefined}
        data-initial={initial !== undefined ? String(initial) : undefined}
        data-animate={animate !== undefined ? String(animate) : undefined}
        {...rest}
      >
        {children}
      </div>
    ),
  };

  return {
    motion,
    useReducedMotion: vi.fn(() => false),
    useInView: vi.fn(() => true),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    MotionConfig: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

import { StaggerGroup, StaggerItem } from '@/components/motion/stagger-group';
import { useReducedMotion } from 'motion/react';

describe('StaggerGroup', () => {
  beforeEach(() => {
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  it('renders children in a motion.div with container variants', () => {
    render(
      <StaggerGroup>
        <div>Child 1</div>
        <div>Child 2</div>
      </StaggerGroup>
    );

    const motionDivs = screen.getAllByTestId('motion-div');
    const container = motionDivs[0];
    const variants = container.getAttribute('data-variants');
    expect(variants).toBeDefined();
    expect(variants).not.toBeNull();
  });

  it('uses staggerChildren of 0.05 (50ms default)', () => {
    render(
      <StaggerGroup>
        <div>Child</div>
      </StaggerGroup>
    );

    const motionDivs = screen.getAllByTestId('motion-div');
    const container = motionDivs[0];
    const variants = JSON.parse(
      container.getAttribute('data-variants') || '{}'
    );
    expect(variants.visible?.transition?.staggerChildren).toBe(0.05);
  });

  it('accepts custom staggerMs prop', () => {
    render(
      <StaggerGroup staggerMs={100}>
        <div>Child</div>
      </StaggerGroup>
    );

    const motionDivs = screen.getAllByTestId('motion-div');
    const container = motionDivs[0];
    const variants = JSON.parse(
      container.getAttribute('data-variants') || '{}'
    );
    expect(variants.visible?.transition?.staggerChildren).toBe(0.1);
  });

  it('renders plain div when reduced motion preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    render(
      <StaggerGroup>
        <div>Static Child</div>
      </StaggerGroup>
    );

    expect(screen.getByText('Static Child')).toBeDefined();

    // No variants should be applied
    const wrapper = screen.getByText('Static Child').parentElement!;
    expect(wrapper.getAttribute('data-variants')).toBeNull();
  });
});

describe('StaggerItem', () => {
  beforeEach(() => {
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  it('renders children with item variants', () => {
    render(
      <StaggerItem>
        <span>Item Content</span>
      </StaggerItem>
    );

    const motionDiv = screen.getByTestId('motion-div');
    const variants = JSON.parse(
      motionDiv.getAttribute('data-variants') || '{}'
    );
    expect(variants.hidden).toEqual({ opacity: 0, y: 16 });
    expect(variants.visible).toEqual({ opacity: 1, y: 0 });
  });

  it('renders plain div when reduced motion preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    render(
      <StaggerItem>
        <span>Static Item</span>
      </StaggerItem>
    );

    expect(screen.getByText('Static Item')).toBeDefined();

    const wrapper = screen.getByText('Static Item').parentElement!;
    expect(wrapper.getAttribute('data-variants')).toBeNull();
  });
});
