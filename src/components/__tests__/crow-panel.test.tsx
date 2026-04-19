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

import { CrowPanel } from '@/components/crow-panel';

describe('CrowPanel', () => {
  test('renders without crashing', () => {
    const { container } = render(<CrowPanel />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('renders SVG with correct default viewBox (0 0 60 380)', () => {
    const { container } = render(<CrowPanel />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).toContain('0 0 60 380');
  });

  test('exports CrowPanel component', () => {
    expect(CrowPanel).toBeDefined();
    expect(typeof CrowPanel).toBe('object'); // memo wraps it as object
  });

  test('renders key controls as SVG groups with IDs', () => {
    const { container } = render(<CrowPanel />);
    expect(container.querySelector('#jack-crow-in-1')).toBeTruthy();
    expect(container.querySelector('#jack-crow-in-2')).toBeTruthy();
    expect(container.querySelector('#jack-crow-out-1')).toBeTruthy();
    expect(container.querySelector('#jack-crow-out-4')).toBeTruthy();
    expect(container.querySelector('#usb-crow')).toBeTruthy();
  });

  test('renders cable paths for provided cables', () => {
    const { container } = render(
      <CrowPanel
        cables={[
          {
            sourceId: 'jack-crow-out-1',
            destId: 'jack-crow-in-1',
            signalType: 'cv',
            purpose: 'Output 1 to Input 1',
          },
        ]}
      />,
    );
    const paths = container.querySelectorAll('path');
    const cablePaths = Array.from(paths).filter((p) =>
      p.getAttribute('d')?.startsWith('M'),
    );
    expect(cablePaths.length).toBeGreaterThanOrEqual(1);
  });
});
