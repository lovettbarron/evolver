import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
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
});
