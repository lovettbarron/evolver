import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

// Mock motion/react so motion.svg renders as plain svg with data attributes
vi.mock('motion/react', () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        return React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
          const { animate, whileInView, transition, viewport, ...rest } = props;
          const dataProps: Record<string, string> = {};
          const animateValue = whileInView || animate;
          if (animateValue) dataProps['data-animate'] = JSON.stringify(animateValue);
          if (transition) dataProps['data-transition'] = JSON.stringify(transition);
          return React.createElement(prop, { ...rest, ...dataProps, ref });
        });
      },
    },
  );
  return { motion };
});

import { BeadsPanel } from '@/components/beads-panel';

describe('BeadsPanel', () => {
  test('renders without crashing', () => {
    const { container } = render(<BeadsPanel />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('renders SVG with a viewBox attribute', () => {
    const { container } = render(<BeadsPanel />);
    const svg = container.querySelector('svg');
    const viewBox = svg?.getAttribute('viewBox');
    expect(viewBox).toBeTruthy();
    // Should have reasonable dimensions
    const parts = viewBox!.split(' ').map(Number);
    expect(parts.length).toBe(4);
    expect(parts[2]).toBeGreaterThan(0); // width
    expect(parts[3]).toBeGreaterThan(0); // height
  });

  test('exports BeadsPanel component', () => {
    expect(BeadsPanel).toBeDefined();
    expect(typeof BeadsPanel).toBe('object'); // memo wraps it as object
  });
});
