import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
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

describe('Nav visual styling', () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
  });

  test('renders brand wordmark with Space Grotesk display font', () => {
    mockUsePathname.mockReturnValue('/');
    const { container } = render(<Nav instruments={instruments} />);

    const brandSpan = container.querySelector('.font-display');
    expect(brandSpan).toBeDefined();
    expect(brandSpan?.textContent).toContain('evolver');
  });

  test('renders active link with accent indicator bar', () => {
    mockUsePathname.mockReturnValue('/instruments/evolver/sessions');
    render(<Nav instruments={instruments} />);

    const sessionsLink = screen.getByText('Sessions').closest('a');
    expect(sessionsLink?.getAttribute('aria-current')).toBe('page');

    // Check for accent indicator bar
    const indicatorBar = sessionsLink?.querySelector('.bg-accent');
    expect(indicatorBar).toBeDefined();
    expect(indicatorBar).not.toBeNull();
  });

  test('renders inactive link with muted color', () => {
    mockUsePathname.mockReturnValue('/instruments/evolver/sessions');
    render(<Nav instruments={instruments} />);

    const patchesLink = screen.getByText('Patches').closest('a');
    expect(patchesLink?.className).toContain('text-muted');
  });

  test('nav bar has 60px height class', () => {
    mockUsePathname.mockReturnValue('/');
    const { container } = render(<Nav instruments={instruments} />);

    const nav = container.querySelector('nav');
    expect(nav?.className).toContain('h-[60px]');
  });

  test('inactive link does not have aria-current attribute', () => {
    mockUsePathname.mockReturnValue('/instruments/evolver/sessions');
    render(<Nav instruments={instruments} />);

    const patchesLink = screen.getByText('Patches').closest('a');
    expect(patchesLink?.getAttribute('aria-current')).toBeNull();
  });

  test('nav bar has sticky positioning and raised surface', () => {
    mockUsePathname.mockReturnValue('/');
    const { container } = render(<Nav instruments={instruments} />);

    const nav = container.querySelector('nav');
    expect(nav?.className).toContain('sticky');
    expect(nav?.className).toContain('bg-surface-raised');
  });
});

describe('Nav mobile hamburger menu', () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
  });

  test('renders hamburger button on mobile (md:hidden)', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Nav instruments={instruments} />);

    const button = screen.getByLabelText('Toggle navigation');
    expect(button).toBeDefined();
    expect(button.className).toContain('md:hidden');
  });

  test('hamburger button has aria-expanded=false by default', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Nav instruments={instruments} />);

    const button = screen.getByLabelText('Toggle navigation');
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  test('mobile menu is not rendered when closed', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Nav instruments={instruments} />);

    const mobileMenu = screen.queryByRole('navigation', { name: 'Navigation menu' });
    expect(mobileMenu).toBeNull();
  });

  test('clicking hamburger opens mobile menu', () => {
    mockUsePathname.mockReturnValue('/instruments/evolver/sessions');
    render(<Nav instruments={instruments} />);

    const button = screen.getByLabelText('Toggle navigation');
    fireEvent.click(button);

    const mobileMenu = screen.getByRole('navigation', { name: 'Navigation menu' });
    expect(mobileMenu).toBeDefined();
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  test('clicking hamburger again closes mobile menu', () => {
    mockUsePathname.mockReturnValue('/instruments/evolver/sessions');
    render(<Nav instruments={instruments} />);

    const button = screen.getByLabelText('Toggle navigation');
    fireEvent.click(button);
    fireEvent.click(button);

    const mobileMenu = screen.queryByRole('navigation', { name: 'Navigation menu' });
    expect(mobileMenu).toBeNull();
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  test('mobile menu renders all nav links', () => {
    mockUsePathname.mockReturnValue('/instruments/evolver/sessions');
    render(<Nav instruments={instruments} />);

    const button = screen.getByLabelText('Toggle navigation');
    fireEvent.click(button);

    const mobileMenu = screen.getByRole('navigation', { name: 'Navigation menu' });
    expect(mobileMenu.textContent).toContain('Home');
    expect(mobileMenu.textContent).toContain('Sessions');
    expect(mobileMenu.textContent).toContain('Patches');
    expect(mobileMenu.textContent).toContain('Progress');
  });
});
