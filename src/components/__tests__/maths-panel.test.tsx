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

import { MathsPanel } from '@/components/maths-panel';

describe('MathsPanel', () => {
  test('renders without crashing', () => {
    const { container } = render(<MathsPanel />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('renders SVG with correct default viewBox (0 0 300 700)', () => {
    const { container } = render(<MathsPanel />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).toContain('0 0 300 700');
  });

  test('exports MathsPanel component', () => {
    expect(MathsPanel).toBeDefined();
    expect(typeof MathsPanel).toBe('object'); // memo wraps it as object
  });

  test('renders cable paths for provided cables', () => {
    const { container } = render(
      <MathsPanel
        cables={[
          {
            sourceId: 'jack-ch1-var-out',
            destId: 'jack-ch2-signal-in',
            signalType: 'cv',
            purpose: 'Ch1 to Ch2 input',
          },
        ]}
      />,
    );
    const paths = container.querySelectorAll('path');
    // At least one path element for the cable
    const cablePaths = Array.from(paths).filter((p) =>
      p.getAttribute('d')?.startsWith('M'),
    );
    expect(cablePaths.length).toBeGreaterThanOrEqual(1);
  });

  test('renders all 45 controls as SVG groups with IDs', () => {
    const { container } = render(<MathsPanel />);
    // Check a sampling of control IDs are present
    expect(container.querySelector('#knob-ch1-rise')).toBeTruthy();
    expect(container.querySelector('#knob-ch4-fall')).toBeTruthy();
    expect(container.querySelector('#button-ch1-cycle')).toBeTruthy();
    expect(container.querySelector('#jack-ch1-signal-in')).toBeTruthy();
    expect(container.querySelector('#jack-sum-out')).toBeTruthy();
    expect(container.querySelector('#led-ch1-cycle')).toBeTruthy();
  });
});
