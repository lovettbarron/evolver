import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock next/link to render as a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, className, ...rest }: { href: string; children: React.ReactNode; className?: string; [key: string]: unknown }) => (
    <a href={href} className={className} {...rest}>{children}</a>
  ),
}));

// Mock content reader
vi.mock('@/lib/content/reader', () => ({
  discoverInstruments: vi.fn().mockResolvedValue(['evolver', 'cascadia']),
  loadInstrumentConfig: vi.fn().mockImplementation((slug: string) => {
    const configs: Record<string, object> = {
      evolver: {
        display_name: 'Mono Evolver',
        tagline: 'DSI Mono Evolver keyboard synth',
        manufacturer: 'Dave Smith Instruments',
        sysex: true,
        patch_memory: true,
        reference_pdfs: [],
      },
      cascadia: {
        display_name: 'Cascadia',
        tagline: 'Intellijel Cascadia semi-modular',
        manufacturer: 'Intellijel',
        sysex: false,
        patch_memory: false,
        reference_pdfs: [],
      },
    };
    return Promise.resolve(configs[slug]);
  }),
  listSessions: vi.fn().mockImplementation((slug: string) => {
    if (slug === 'evolver') return Promise.resolve([{ data: {}, content: '', slug: '01' }, { data: {}, content: '', slug: '02' }, { data: {}, content: '', slug: '03' }]);
    return Promise.resolve([]);
  }),
  listPatches: vi.fn().mockImplementation((slug: string) => {
    if (slug === 'evolver') return Promise.resolve([{ data: {}, content: '', slug: 'p1' }, { data: {}, content: '', slug: 'p2' }]);
    return Promise.resolve([]);
  }),
}));

// Mock config
vi.mock('@/lib/config', () => ({
  loadConfig: vi.fn().mockResolvedValue({ vaultPath: '/test/vault', instrument: 'evolver' }),
}));

// Import after mocks
import Home from '@/app/page';

describe('Home page - instrument selector', () => {
  test('renders Choose Your Instrument heading', async () => {
    const Component = await Home();
    render(Component);
    expect(screen.getByText('Choose Your Instrument')).toBeDefined();
  });

  test('renders both instrument cards with display names', async () => {
    const Component = await Home();
    render(Component);
    expect(screen.getByText('Mono Evolver')).toBeDefined();
    expect(screen.getByText('Cascadia')).toBeDefined();
  });

  test('each card links to /instruments/{slug}', async () => {
    const Component = await Home();
    render(Component);

    const evolverLink = screen.getByText('Explore Mono Evolver').closest('a');
    expect(evolverLink?.getAttribute('href')).toBe('/instruments/evolver');

    const cascadiaLink = screen.getByText('Explore Cascadia').closest('a');
    expect(cascadiaLink?.getAttribute('href')).toBe('/instruments/cascadia');
  });

  test('displays session and patch counts for each instrument', async () => {
    const Component = await Home();
    render(Component);

    expect(screen.getByText('3 sessions / 2 patches')).toBeDefined();
    expect(screen.getByText('0 sessions / 0 patches')).toBeDefined();
  });

  test('does not render HeroCard', async () => {
    const Component = await Home();
    render(Component);
    expect(screen.queryByText('Start Session')).toBeNull();
  });

  test('renders subtitle text', async () => {
    const Component = await Home();
    render(Component);
    expect(screen.getByText('Pick up where you left off')).toBeDefined();
  });
});
