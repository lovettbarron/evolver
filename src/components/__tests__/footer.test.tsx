import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/footer';

// Mock next/link as plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, className, ...rest }: { href: string; children: React.ReactNode; className?: string; [key: string]: unknown }) => (
    <a href={href} className={className} {...rest}>{children}</a>
  ),
}));

const instruments = [
  { slug: 'evolver', displayName: 'Mono Evolver' },
  { slug: 'cascadia', displayName: 'Cascadia' },
];

describe('Footer', () => {
  test('renders project identity text', () => {
    render(<Footer instruments={instruments} />);
    expect(screen.getByText('Evolver Deep Learning')).toBeDefined();
    expect(screen.getByText('Structured instrument mastery')).toBeDefined();
  });

  test('renders instrument quick-links for each instrument', () => {
    render(<Footer instruments={instruments} />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/instruments/evolver/sessions');
    expect(hrefs).toContain('/instruments/evolver/patches');
    expect(hrefs).toContain('/instruments/cascadia/sessions');
    expect(hrefs).toContain('/instruments/cascadia/patches');
  });

  test('renders about link', () => {
    render(<Footer instruments={instruments} />);
    const aboutLink = screen.getByText('About this method');
    expect(aboutLink.getAttribute('href')).toBe('/about');
  });

  test('renders demo mode text when isDemoMode is true', () => {
    render(<Footer instruments={instruments} isDemoMode={true} />);
    expect(screen.getByText(/Demo mode/)).toBeDefined();
    expect(screen.getByText('Run it yourself')).toBeDefined();
  });

  test('hides demo mode text when isDemoMode is false', () => {
    render(<Footer instruments={instruments} isDemoMode={false} />);
    expect(screen.queryByText(/Demo mode/)).toBeNull();
  });

  test('footer has border-top and surface background classes', () => {
    const { container } = render(<Footer instruments={instruments} />);
    const footer = container.querySelector('footer') as HTMLElement;
    expect(footer.className).toContain('border-t');
    expect(footer.className).toContain('border-border');
    expect(footer.className).toContain('bg-surface');
  });
});
