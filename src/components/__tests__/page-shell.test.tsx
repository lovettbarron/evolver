import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { NarrowShell, WideShell } from '@/components/page-shell';

describe('NarrowShell', () => {
  test('renders children with max-w-[720px]', () => {
    const { container } = render(
      <NarrowShell><p>test content</p></NarrowShell>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('max-w-[720px]');
    expect(wrapper.className).toContain('mx-auto');
    expect(wrapper.className).toContain('px-lg');
    expect(wrapper.textContent).toBe('test content');
  });

  test('accepts custom className', () => {
    const { container } = render(
      <NarrowShell className="py-2xl"><p>test</p></NarrowShell>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('max-w-[720px]');
    expect(wrapper.className).toContain('py-2xl');
  });
});

describe('WideShell', () => {
  test('renders children with max-w-[1200px]', () => {
    const { container } = render(
      <WideShell><p>wide content</p></WideShell>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('max-w-[1200px]');
    expect(wrapper.className).toContain('mx-auto');
    expect(wrapper.className).toContain('px-lg');
    expect(wrapper.textContent).toBe('wide content');
  });
});
