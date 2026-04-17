import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ModuleJourney } from '@/components/module-journey';

const mockModules = [
  { section: 'Foundations', complete: true },
  { section: 'Oscillators', complete: true },
  { section: 'Modulation', complete: false },
  { section: 'Effects', complete: false },
];

const allCompleteModules = [
  { section: 'Foundations', complete: true },
  { section: 'Oscillators', complete: true },
  { section: 'Modulation', complete: true },
  { section: 'Effects', complete: true },
];

describe('ModuleJourney', () => {
  test('current module dot has animate-pulse-glow class', () => {
    const { container } = render(
      <ModuleJourney modules={mockModules} currentModule="Modulation" />,
    );
    const dots = container.querySelectorAll('[title]');
    const modulationDot = Array.from(dots).find(
      (d) => d.getAttribute('title') === 'Modulation',
    );
    const innerDot = modulationDot?.querySelector('span');
    expect(innerDot?.className).toContain('animate-pulse-glow');
  });

  test('completed module dots do NOT have animate-pulse-glow', () => {
    const { container } = render(
      <ModuleJourney modules={mockModules} currentModule="Modulation" />,
    );
    const dots = container.querySelectorAll('[title]');
    const foundationsDot = Array.from(dots).find(
      (d) => d.getAttribute('title') === 'Foundations',
    );
    const innerDot = foundationsDot?.querySelector('span');
    expect(innerDot?.className).not.toContain('animate-pulse-glow');
  });

  test('current module dot has aria-current="true"', () => {
    const { container } = render(
      <ModuleJourney modules={mockModules} currentModule="Modulation" />,
    );
    const dots = container.querySelectorAll('[title]');
    const modulationDot = Array.from(dots).find(
      (d) => d.getAttribute('title') === 'Modulation',
    );
    expect(modulationDot?.getAttribute('aria-current')).toBe('true');
  });

  test('all complete with currentModule=null shows no pulsing dots', () => {
    const { container } = render(
      <ModuleJourney modules={allCompleteModules} currentModule={null} />,
    );
    const pulsing = container.querySelectorAll('.animate-pulse-glow');
    expect(pulsing).toHaveLength(0);
  });

  test('future module dots do NOT have animate-pulse-glow', () => {
    const { container } = render(
      <ModuleJourney modules={mockModules} currentModule="Modulation" />,
    );
    const dots = container.querySelectorAll('[title]');
    const effectsDot = Array.from(dots).find(
      (d) => d.getAttribute('title') === 'Effects',
    );
    const innerDot = effectsDot?.querySelector('span');
    expect(innerDot?.className).not.toContain('animate-pulse-glow');
  });
});
