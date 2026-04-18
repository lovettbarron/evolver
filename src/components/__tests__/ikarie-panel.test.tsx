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

import { IkariePanel } from '@/components/ikarie-panel';

describe('IkariePanel', () => {
  test('renders without crashing', () => {
    const { container } = render(<IkariePanel />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('renders SVG with correct default viewBox for 8HP (0 0 170 380)', () => {
    const { container } = render(<IkariePanel />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).toContain('0 0 170 380');
  });

  test('exports IkariePanel component', () => {
    expect(IkariePanel).toBeDefined();
    expect(typeof IkariePanel).toBe('object'); // memo wraps it as object
  });
});
