import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

// Mock motion/react — renders motion.svg etc. as plain svg with data-*
// attributes. Mirrors the panel component test mocks so the panel renders
// can be inspected as plain SVG.
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

import { StandalonePanelClient } from '../standalone-panel-client';

describe('StandalonePanelClient — instrument panel resolution (Phase 25 / D-06 regression)', () => {
  test('renders EvolverPanel for instrumentSlug="evolver"', () => {
    const { container } = render(<StandalonePanelClient instrumentSlug="evolver" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    // Evolver panel default viewBox (sanity check we got an SVG panel, not text)
    expect(svg?.getAttribute('viewBox')).toMatch(/^0 0 \d+ \d+$/);
  });

  test('renders CascadiaPanel for instrumentSlug="cascadia"', () => {
    const { container } = render(<StandalonePanelClient instrumentSlug="cascadia" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('viewBox')).toMatch(/^0 0 \d+ \d+$/);
  });

  test('renders OctatrackPanel for instrumentSlug="octatrack" (D-06 regression)', () => {
    const { container } = render(<StandalonePanelClient instrumentSlug="octatrack" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    // OctatrackPanel default viewBox is "0 0 1000 500" per octatrack-panel.test.tsx
    expect(svg?.getAttribute('viewBox')).toBe('0 0 1000 500');
  });

  test('falls back to EvolverPanel for unknown instrumentSlug', () => {
    const { container } = render(<StandalonePanelClient instrumentSlug="unknown-instrument" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
  });
});
