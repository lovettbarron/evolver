import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppShell } from '@/components/app-shell';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

// Mock next/navigation
const mockUsePathname = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

// Mock child components
vi.mock('@/components/search-provider', () => ({
  SearchProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock('@/components/nav', () => ({
  Nav: () => <div>Nav</div>,
}));
vi.mock('@/components/footer', () => ({
  Footer: () => <div>Footer</div>,
}));

const defaultProps = {
  isDemoMode: false,
  instruments: [{ slug: 'evolver', config: { display_name: 'Mono Evolver', sysex: true } as never }],
  searchSessions: [],
  searchPatches: [],
};

describe('AppShell data-instrument attribute', () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
  });

  test('sets data-instrument="evolver" when pathname is /instruments/evolver/sessions', () => {
    mockUsePathname.mockReturnValue('/instruments/evolver/sessions');
    const { container } = render(
      <AppShell {...defaultProps}><div>content</div></AppShell>
    );

    const el = container.querySelector('[data-instrument]');
    expect(el).not.toBeNull();
    expect(el?.getAttribute('data-instrument')).toBe('evolver');
  });

  test('sets data-instrument="cascadia" when pathname is /instruments/cascadia/patches', () => {
    mockUsePathname.mockReturnValue('/instruments/cascadia/patches');
    const { container } = render(
      <AppShell {...defaultProps}><div>content</div></AppShell>
    );

    const el = container.querySelector('[data-instrument]');
    expect(el).not.toBeNull();
    expect(el?.getAttribute('data-instrument')).toBe('cascadia');
  });

  test('omits data-instrument attribute on home page', () => {
    mockUsePathname.mockReturnValue('/');
    const { container } = render(
      <AppShell {...defaultProps}><div>content</div></AppShell>
    );

    const el = container.querySelector('[data-instrument]');
    expect(el).toBeNull();
  });

  test('omits data-instrument attribute on about page', () => {
    mockUsePathname.mockReturnValue('/about');
    const { container } = render(
      <AppShell {...defaultProps}><div>content</div></AppShell>
    );

    const el = container.querySelector('[data-instrument]');
    expect(el).toBeNull();
  });

  // Phase 25 Wave 0 stub — Wave 2 (plan 25-02) wires octatrack
  // routes so this can flip from .todo to a real assertion.
  test.todo('applies data-instrument="octatrack" to app shell on /instruments/octatrack/... routes');

  test('renders Nav and Footer components', () => {
    mockUsePathname.mockReturnValue('/');
    render(
      <AppShell {...defaultProps}><div>content</div></AppShell>
    );

    expect(screen.getByText('Nav')).toBeDefined();
    expect(screen.getByText('Footer')).toBeDefined();
  });
});
