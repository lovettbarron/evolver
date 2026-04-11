import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('motion/react', () => {
  const motion = {
    div: ({
      children,
      whileHover,
      variants,
      initial,
      animate,
      transition,
      className,
      ...rest
    }: {
      children?: React.ReactNode;
      whileHover?: Record<string, unknown>;
      variants?: Record<string, unknown>;
      initial?: unknown;
      animate?: unknown;
      transition?: Record<string, unknown>;
      className?: string;
      [key: string]: unknown;
    }) => (
      <div
        className={className}
        data-testid="motion-div"
        data-while-hover={whileHover ? JSON.stringify(whileHover) : undefined}
        data-variants={variants ? JSON.stringify(variants) : undefined}
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
    useReducedMotion: vi.fn(() => true), // Default to reduced motion for this file
    useInView: vi.fn(() => true),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    MotionConfig: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

import { SpringCard } from '@/components/motion/spring-card';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/stagger-group';
import { useReducedMotion } from 'motion/react';

describe('Reduced motion compliance (D-09)', () => {
  beforeEach(() => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
  });

  it('SpringCard renders static div with no motion props', () => {
    render(
      <SpringCard>
        <span>Card Content</span>
      </SpringCard>
    );

    expect(screen.getByText('Card Content')).toBeDefined();
    const wrapper = screen.getByText('Card Content').parentElement!;
    expect(wrapper.getAttribute('data-while-hover')).toBeNull();
    expect(wrapper.getAttribute('data-transition')).toBeNull();
  });

  it('ScrollReveal renders static div with no motion props', () => {
    render(
      <ScrollReveal>
        <span>Revealed Content</span>
      </ScrollReveal>
    );

    expect(screen.getByText('Revealed Content')).toBeDefined();
    const wrapper = screen.getByText('Revealed Content').parentElement!;
    expect(wrapper.getAttribute('data-initial')).toBeNull();
    expect(wrapper.getAttribute('data-animate')).toBeNull();
  });

  it('StaggerGroup renders static div with no motion props', () => {
    render(
      <StaggerGroup>
        <div>Group Child</div>
      </StaggerGroup>
    );

    expect(screen.getByText('Group Child')).toBeDefined();
    const wrapper = screen.getByText('Group Child').parentElement!;
    expect(wrapper.getAttribute('data-variants')).toBeNull();
  });

  it('StaggerItem renders static div with no motion props', () => {
    render(
      <StaggerItem>
        <span>Item Child</span>
      </StaggerItem>
    );

    expect(screen.getByText('Item Child')).toBeDefined();
    const wrapper = screen.getByText('Item Child').parentElement!;
    expect(wrapper.getAttribute('data-variants')).toBeNull();
  });
});
