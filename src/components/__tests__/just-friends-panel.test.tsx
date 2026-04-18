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

import { JustFriendsPanel } from '@/components/just-friends-panel';

describe('JustFriendsPanel', () => {
  test('renders without crashing', () => {
    const { container } = render(<JustFriendsPanel />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('renders SVG with correct default viewBox (0 0 210 380)', () => {
    const { container } = render(<JustFriendsPanel />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).toContain('0 0 210 380');
  });

  test('exports JustFriendsPanel component', () => {
    expect(JustFriendsPanel).toBeDefined();
    expect(typeof JustFriendsPanel).toBe('object'); // memo wraps it as object
  });

  test('renders cable paths for provided cables', () => {
    const { container } = render(
      <JustFriendsPanel
        cables={[
          {
            sourceId: 'jack-jf-identity-out',
            destId: 'jack-jf-fm-in',
            signalType: 'cv',
            purpose: 'Identity to FM',
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

  test('renders key controls as SVG groups with IDs', () => {
    const { container } = render(<JustFriendsPanel />);
    expect(container.querySelector('#knob-jf-time')).toBeTruthy();
    expect(container.querySelector('#knob-jf-intone')).toBeTruthy();
    expect(container.querySelector('#knob-jf-fm')).toBeTruthy();
    expect(container.querySelector('#switch-jf-mode')).toBeTruthy();
    expect(container.querySelector('#jack-jf-identity-trig')).toBeTruthy();
    expect(container.querySelector('#jack-jf-mix-out')).toBeTruthy();
    expect(container.querySelector('#led-jf-identity')).toBeTruthy();
  });
});
