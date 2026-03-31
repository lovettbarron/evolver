import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Nav } from '@/components/nav';

// Mock next/link to render as a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, className, ...rest }: { href: string; children: React.ReactNode; className?: string;[key: string]: unknown }) => (
    <a href={href} className={className} {...rest}>{children}</a>
  ),
}));

// Mock next/navigation
const mockUsePathname = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

const instruments = [
  { slug: 'evolver', displayName: 'Mono Evolver', sysex: true },
  { slug: 'cascadia', displayName: 'Cascadia', sysex: false },
];

describe('Nav dynamic instrument rendering', () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
  });

  test('renders instrument names in switcher', () => {
    mockUsePathname.mockReturnValue('/instruments/evolver/sessions');
    render(<Nav instruments={instruments} />);
    // Current instrument shown in trigger
    expect(screen.getByText('Mono Evolver')).toBeDefined();
  });

  test('renders dynamic sub-links for evolver with MIDI (sysex: true)', () => {
    mockUsePathname.mockReturnValue('/instruments/evolver/sessions');
    render(<Nav instruments={instruments} />);

    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Sessions')).toBeDefined();
    expect(screen.getByText('Patches')).toBeDefined();
    expect(screen.getByText('MIDI')).toBeDefined();
    expect(screen.getByText('Progress')).toBeDefined();

    // Verify links use correct instrument prefix
    const sessionsLink = screen.getByText('Sessions').closest('a');
    expect(sessionsLink?.getAttribute('href')).toBe('/instruments/evolver/sessions');
  });

  test('hides MIDI link for cascadia (sysex: false)', () => {
    mockUsePathname.mockReturnValue('/instruments/cascadia/sessions');
    render(<Nav instruments={instruments} />);

    expect(screen.getByText('Sessions')).toBeDefined();
    expect(screen.getByText('Patches')).toBeDefined();
    expect(screen.queryByText('MIDI')).toBeNull();
    expect(screen.getByText('Progress')).toBeDefined();
  });

  test('sub-links use current instrument slug in href', () => {
    mockUsePathname.mockReturnValue('/instruments/cascadia/sessions');
    render(<Nav instruments={instruments} />);

    const sessionsLink = screen.getByText('Sessions').closest('a');
    expect(sessionsLink?.getAttribute('href')).toBe('/instruments/cascadia/sessions');

    const patchesLink = screen.getByText('Patches').closest('a');
    expect(patchesLink?.getAttribute('href')).toBe('/instruments/cascadia/patches');
  });

  test('does not contain hardcoded evolver links when viewing cascadia', () => {
    mockUsePathname.mockReturnValue('/instruments/cascadia/sessions');
    const { container } = render(<Nav instruments={instruments} />);

    // Get all link hrefs in the nav sub-links (excluding the instrument switcher dropdown)
    const links = container.querySelectorAll('a[href*="/instruments/"]');
    const hrefs = Array.from(links).map((a) => a.getAttribute('href'));
    // None of the navigation links should point to /instruments/evolver
    const evolverHrefs = hrefs.filter((h) => h?.includes('/instruments/evolver'));
    expect(evolverHrefs.length).toBe(0);
  });

  test('shows only Home link when no instrument is selected', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Nav instruments={instruments} />);

    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.queryByText('Sessions')).toBeNull();
    expect(screen.queryByText('Patches')).toBeNull();
    expect(screen.queryByText('MIDI')).toBeNull();
    expect(screen.queryByText('Progress')).toBeNull();
  });
});
