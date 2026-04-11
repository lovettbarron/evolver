import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';

// Mock motion/react so motion.svg renders as plain svg with data attributes
vi.mock('motion/react', () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        return React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
          const { animate, transition, ...rest } = props;
          const dataProps: Record<string, string> = {};
          if (animate) dataProps['data-animate'] = JSON.stringify(animate);
          if (transition) dataProps['data-transition'] = JSON.stringify(transition);
          return React.createElement(prop, { ...rest, ...dataProps, ref });
        });
      },
    },
  );
  return { motion };
});

import { CascadiaPanel } from '@/components/cascadia-panel';

describe('CascadiaPanel', () => {
  test('renders without crashing', () => {
    const { container } = render(<CascadiaPanel />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('renders SVG with correct default viewBox', () => {
    const { container } = render(<CascadiaPanel />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).toContain('0 0 1000 580');
  });

  test('renders cable paths for provided cables', () => {
    const { container } = render(
      <CascadiaPanel
        cables={[
          {
            sourceId: 'jack-vco-a-pitch-in',
            destId: 'jack-mixer-in-1',
            signalType: 'audio',
            purpose: 'VCO A to Mixer',
          },
        ]}
      />
    );
    const svg = container.querySelector('svg');
    const paths = svg?.querySelectorAll('path');
    const cablePath = Array.from(paths || []).find(
      (p) => p.getAttribute('d')?.includes('Q')
    );
    expect(cablePath).toBeTruthy();
  });

  test('cable color matches signal type - audio', () => {
    const { container } = render(
      <CascadiaPanel
        cables={[
          {
            sourceId: 'jack-mixer-vco-a-saw-out',
            destId: 'jack-mixer-in-1',
            signalType: 'audio',
          },
        ]}
      />
    );
    const svg = container.querySelector('svg');
    const paths = Array.from(svg?.querySelectorAll('path') || []);
    const audioCable = paths.find(
      (p) =>
        p.getAttribute('stroke') === '#ff6644' &&
        p.getAttribute('d')?.includes('Q')
    );
    expect(audioCable).toBeTruthy();
  });

  test('cable color matches signal type - cv', () => {
    const { container } = render(
      <CascadiaPanel
        cables={[
          {
            sourceId: 'jack-midi-cv-pitch-out',
            destId: 'jack-vco-a-pitch-in',
            signalType: 'cv',
          },
        ]}
      />
    );
    const svg = container.querySelector('svg');
    const paths = Array.from(svg?.querySelectorAll('path') || []);
    const cvCable = paths.find(
      (p) =>
        p.getAttribute('stroke') === '#3388ff' &&
        p.getAttribute('d')?.includes('Q')
    );
    expect(cvCable).toBeTruthy();
  });

  test('applies glow filter for highlighted controls', () => {
    const { container } = render(
      <CascadiaPanel
        highlights={[{ controlId: 'knob-vco-a-pitch', color: 'blue' }]}
      />
    );
    const svg = container.querySelector('svg');
    expect(svg?.querySelector('filter#glow-blue')).toBeTruthy();
    const glowElements = svg?.querySelectorAll('[filter*="glow-blue"]');
    expect(glowElements?.length).toBeGreaterThan(0);
  });

  test('zooms viewBox when zoomSections provided', () => {
    const { container } = render(
      <CascadiaPanel zoomSections={['vco-a']} />
    );
    const svg = container.querySelector('svg');
    const animateAttr = svg?.getAttribute('data-animate');
    expect(animateAttr).toBeTruthy();
    const animate = JSON.parse(animateAttr!);
    // Should NOT be the default full-panel viewBox
    expect(animate.viewBox).not.toBe('0 0 1000 580');
  });

  test('renders in uncontrolled mode without knobValues', () => {
    const { container } = render(<CascadiaPanel />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('exports CascadiaPanel as named export', async () => {
    const mod = await import('@/components/cascadia-panel');
    expect(mod.CascadiaPanel).toBeDefined();
  });

  describe('viewBox animation', () => {
    test('default render has animate prop with full viewBox', () => {
      const { container } = render(<CascadiaPanel />);
      const svg = container.querySelector('svg');
      const animateAttr = svg?.getAttribute('data-animate');
      expect(animateAttr).toBeTruthy();
      const animate = JSON.parse(animateAttr!);
      expect(animate.viewBox).toBe('0 0 1000 580');
    });

    test('transition uses tween with 0.3s duration', () => {
      const { container } = render(<CascadiaPanel />);
      const svg = container.querySelector('svg');
      const transitionAttr = svg?.getAttribute('data-transition');
      expect(transitionAttr).toBeTruthy();
      const transition = JSON.parse(transitionAttr!);
      expect(transition.type).toBe('tween');
      expect(transition.duration).toBe(0.3);
      expect(transition.ease).toBe('easeInOut');
    });

    test('glow circle does not use hardcoded #c8ff00', () => {
      const { container } = render(<CascadiaPanel />);
      const svg = container.querySelector('svg');
      expect(svg?.innerHTML).not.toContain('fill="#c8ff00"');
    });
  });
});

describe('viewBox animation', () => {
  it.todo('renders motion.svg element instead of plain svg');

  it.todo('sets initial viewBox to full panel dimensions 0 0 1000 580');

  it.todo('animates viewBox to zoom target when zoomSections provided');
});
