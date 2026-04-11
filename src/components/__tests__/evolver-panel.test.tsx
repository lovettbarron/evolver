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

import { EvolverPanel } from '@/components/evolver-panel';

describe('EvolverPanel', () => {
  test('renders inline SVG with viewBox', () => {
    const { container } = render(<EvolverPanel />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 1200 520');
  });

  test('renders with all control IDs preserved', () => {
    const { container } = render(<EvolverPanel />);
    const svg = container.querySelector('svg');
    expect(svg?.querySelector('#knob-filter-frequency')).toBeTruthy();
    expect(svg?.querySelector('#switch-feedback-grunge')).toBeTruthy();
    expect(svg?.querySelector('#led-seq-1')).toBeTruthy();
  });

  test('rotation: knob at value 0 has -135deg rotation on indicator', () => {
    const { container } = render(<EvolverPanel knobValues={{ 'knob-filter-frequency': 0 }} />);
    const knobGroup = container.querySelector('#knob-filter-frequency');
    const indicator = knobGroup?.querySelector('line');
    expect(indicator?.getAttribute('transform')).toContain('-135');
  });

  test('rotation: knob at value 127 has +135deg rotation on indicator', () => {
    const { container } = render(<EvolverPanel knobValues={{ 'knob-filter-frequency': 127 }} />);
    const knobGroup = container.querySelector('#knob-filter-frequency');
    const indicator = knobGroup?.querySelector('line');
    expect(indicator?.getAttribute('transform')).toContain('135');
  });

  test('glow: highlighted control has glow circle', () => {
    const { container } = render(
      <EvolverPanel highlights={[{ controlId: 'knob-filter-frequency', color: 'blue' }]} />
    );
    const svg = container.querySelector('svg');
    expect(svg?.querySelector('filter#glow-blue')).toBeTruthy();
  });

  test('section: active section renders tint rectangle', () => {
    const { container } = render(<EvolverPanel activeSections={['filter']} />);
    const rects = container.querySelectorAll('rect');
    const tintRect = Array.from(rects).find(r => r.getAttribute('fill-opacity') === '0.08');
    expect(tintRect).toBeTruthy();
  });

  test('drag: onKnobChange fires when knob is dragged', () => {
    const onChange = vi.fn();
    const { container } = render(<EvolverPanel onKnobChange={onChange} />);
    const knobGroup = container.querySelector('#knob-filter-frequency');
    if (knobGroup) {
      fireEvent.pointerDown(knobGroup, { clientY: 100 });
      fireEvent.pointerMove(knobGroup, { clientY: 91 });
      fireEvent.pointerUp(knobGroup);
    }
    expect(onChange).toHaveBeenCalled();
  });

  test('uncontrolled mode: works without knobValues prop', () => {
    const { container } = render(<EvolverPanel />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  describe('viewBox animation', () => {
    test('default render has animate prop with full viewBox', () => {
      const { container } = render(<EvolverPanel />);
      const svg = container.querySelector('svg');
      const animateAttr = svg?.getAttribute('data-animate');
      expect(animateAttr).toBeTruthy();
      const animate = JSON.parse(animateAttr!);
      expect(animate.viewBox).toBe('0 0 1200 520');
    });

    test('zoomSections changes animate viewBox to computed zoom', () => {
      const { container } = render(<EvolverPanel zoomSections={['oscillators']} />);
      const svg = container.querySelector('svg');
      const animateAttr = svg?.getAttribute('data-animate');
      expect(animateAttr).toBeTruthy();
      const animate = JSON.parse(animateAttr!);
      // Should be a zoomed viewBox, not the full panel
      expect(animate.viewBox).not.toBe('0 0 1200 520');
    });

    test('transition uses tween with 0.3s duration', () => {
      const { container } = render(<EvolverPanel />);
      const svg = container.querySelector('svg');
      const transitionAttr = svg?.getAttribute('data-transition');
      expect(transitionAttr).toBeTruthy();
      const transition = JSON.parse(transitionAttr!);
      expect(transition.type).toBe('tween');
      expect(transition.duration).toBe(0.3);
      expect(transition.ease).toBe('easeInOut');
    });

    test('glow circle does not use hardcoded #c8ff00', () => {
      const { container } = render(<EvolverPanel />);
      const svg = container.querySelector('svg');
      expect(svg?.innerHTML).not.toContain('fill="#c8ff00"');
    });
  });
});

describe('viewBox animation', () => {
  it.todo('renders motion.svg element instead of plain svg');

  it.todo('sets initial viewBox to full panel dimensions 0 0 1200 520');

  it.todo('animates viewBox to zoom target when zoomSections provided');
});
