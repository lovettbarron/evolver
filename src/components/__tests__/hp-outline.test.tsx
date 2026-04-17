import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HpOutline } from '@/components/hp-outline';

describe('HpOutline', () => {
  test('renders with proportional width for 12HP module', () => {
    const { container } = render(<HpOutline hpWidth={12} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('60%');
  });

  test('caps width at 100% for modules wider than 20HP', () => {
    const { container } = render(<HpOutline hpWidth={28} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('100%');
  });

  test('renders with aria-hidden for decorative element', () => {
    const { container } = render(<HpOutline hpWidth={8} />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });
});
