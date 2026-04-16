import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

// Mock motion/react — renders motion.svg etc. as plain svg with data-*
// attributes reflecting animate/whileInView/transition props. Mirrors the
// Cascadia panel test mock verbatim.
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

import { OctatrackPanel } from '@/components/octatrack-panel';

describe('OctatrackPanel', () => {
  test('renders without crashing', () => {
    const { container } = render(<OctatrackPanel />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('renders SVG with expected default viewBox (0 0 1000 500)', () => {
    const { container } = render(<OctatrackPanel />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 1000 500');
  });

  test('renders 16 trig keys', () => {
    const { container } = render(<OctatrackPanel />);
    const trigs = container.querySelectorAll('[data-control-id^="key-trig-"]');
    expect(trigs.length).toBe(16);
  });

  test('renders 8 track keys', () => {
    const { container } = render(<OctatrackPanel />);
    // Use a selector that matches `key-track-1` .. `key-track-8` without
    // matching `key-track-cue`.
    const tracks = Array.from(
      container.querySelectorAll('[data-control-id^="key-track-"]'),
    ).filter((el) => el.getAttribute('data-control-id') !== 'key-track-cue');
    expect(tracks.length).toBe(8);
  });

  test('renders 6 data entry knobs', () => {
    const { container } = render(<OctatrackPanel />);
    const knobs = container.querySelectorAll('[data-control-id^="knob-data-"]');
    expect(knobs.length).toBe(6);
  });

  test('renders the LCD display element', () => {
    const { container } = render(<OctatrackPanel />);
    const lcd = container.querySelector('[data-control-id="display-lcd-screen"]');
    expect(lcd).toBeTruthy();
  });

  test('renders the crossfader as a horizontal slider', () => {
    const { container } = render(<OctatrackPanel />);
    const cf = container.querySelector('[data-control-id="slider-mix-crossfader"]');
    expect(cf).toBeTruthy();
  });

  test('highlight applies glow filter to target control', () => {
    const { container } = render(
      <OctatrackPanel highlights={[{ controlId: 'knob-data-a', color: 'blue' }]} />,
    );
    const svg = container.querySelector('svg');
    expect(svg?.querySelector('filter#glow-blue')).toBeTruthy();
    const glowElements = svg?.querySelectorAll('[filter*="glow-blue"]');
    expect(glowElements?.length).toBeGreaterThan(0);
  });

  test('highlight amber filter renders for amber color', () => {
    const { container } = render(
      <OctatrackPanel highlights={[{ controlId: 'key-trig-1', color: 'amber' }]} />,
    );
    const svg = container.querySelector('svg');
    expect(svg?.querySelector('filter#glow-amber')).toBeTruthy();
  });

  test('zoomSections changes animated viewBox away from default', () => {
    const { container } = render(<OctatrackPanel zoomSections={['trig']} />);
    const svg = container.querySelector('svg');
    const animateAttr = svg?.getAttribute('data-animate');
    expect(animateAttr).toBeTruthy();
    const animate = JSON.parse(animateAttr!);
    // Should NOT be the default full-panel viewBox
    expect(animate.viewBox).not.toBe('0 0 1000 500');
  });

  test('renders in uncontrolled mode without knobValues', () => {
    const { container } = render(<OctatrackPanel />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('accepts but ignores cables prop (no cable paths rendered)', () => {
    // Octatrack has no patch jacks; the cables prop is accepted for API
    // parity with CascadiaPanel but should never produce SVG cable paths.
    const { container } = render(
      <OctatrackPanel
        cables={[
          {
            sourceId: 'jack-fake-a',
            destId: 'jack-fake-b',
            signalType: 'audio',
          },
        ]}
      />,
    );
    // Cable paths would be `<path>` with a `Q` cubic bezier command.
    const paths = Array.from(container.querySelectorAll('path'));
    const cablePath = paths.find((p) => p.getAttribute('d')?.includes('Q'));
    expect(cablePath).toBeUndefined();
  });

  test('exports OctatrackPanel as named export', async () => {
    const mod = await import('@/components/octatrack-panel');
    expect(mod.OctatrackPanel).toBeDefined();
  });
});
