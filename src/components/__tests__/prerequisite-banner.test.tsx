import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PrerequisiteBanner } from '@/components/prerequisite-banner';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('PrerequisiteBanner', () => {
  test('renders banner text containing prerequisite session number', () => {
    render(
      <PrerequisiteBanner
        prerequisiteNumber={4}
        prerequisiteSlug="04-oscillators-detune"
        instrumentSlug="evolver"
      />,
    );

    expect(screen.getByText(/Session #4/)).toBeDefined();
    expect(screen.getByText(/complete it first for the best experience/)).toBeDefined();
  });

  test('renders a link to the prerequisite session', () => {
    render(
      <PrerequisiteBanner
        prerequisiteNumber={4}
        prerequisiteSlug="04-oscillators-detune"
        instrumentSlug="evolver"
      />,
    );

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe(
      '/instruments/evolver/sessions/04-oscillators-detune',
    );
  });

  test('renders dismiss button with correct aria-label', () => {
    render(
      <PrerequisiteBanner
        prerequisiteNumber={4}
        prerequisiteSlug="04-oscillators-detune"
        instrumentSlug="evolver"
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Dismiss prerequisite notice' }),
    ).toBeDefined();
  });

  test('clicking dismiss hides the banner', () => {
    render(
      <PrerequisiteBanner
        prerequisiteNumber={4}
        prerequisiteSlug="04-oscillators-detune"
        instrumentSlug="evolver"
      />,
    );

    const dismissButton = screen.getByRole('button', {
      name: 'Dismiss prerequisite notice',
    });
    fireEvent.click(dismissButton);

    expect(screen.queryByRole('status')).toBeNull();
  });

  test('container has role="status"', () => {
    render(
      <PrerequisiteBanner
        prerequisiteNumber={4}
        prerequisiteSlug="04-oscillators-detune"
        instrumentSlug="evolver"
      />,
    );

    expect(screen.getByRole('status')).toBeDefined();
  });
});
