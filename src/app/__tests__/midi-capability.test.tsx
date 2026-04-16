import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NoSysexPage } from '@/components/no-sysex-page';

// Mock next/link to render as a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('MIDI Capability Gating', () => {
  describe('NoSysexPage', () => {
    test('renders informational message for non-SysEx instrument', () => {
      render(
        <NoSysexPage displayName="Cascadia" patchesHref="/instruments/cascadia/patches" />,
      );
      expect(screen.getByText(/doesn.t support MIDI SysEx/)).toBeDefined();
    });

    test('displays instrument name in heading', () => {
      render(
        <NoSysexPage displayName="Cascadia" patchesHref="/instruments/cascadia/patches" />,
      );
      expect(screen.getByRole('heading').textContent).toContain('Cascadia');
    });

    test('renders CTA link to patches page', () => {
      render(
        <NoSysexPage displayName="Cascadia" patchesHref="/instruments/cascadia/patches" />,
      );
      const link = screen.getByText(/Browse Cascadia Patches/);
      expect(link).toBeDefined();
      expect(link.closest('a')?.getAttribute('href')).toBe('/instruments/cascadia/patches');
    });

    test('describes CV/gate patching approach', () => {
      render(
        <NoSysexPage displayName="Cascadia" patchesHref="/instruments/cascadia/patches" />,
      );
      expect(screen.getByText(/CV\/gate patching/)).toBeDefined();
    });
  });

  describe('MidiRoute capability check', () => {
    test('MidiRoute page.tsx is a server component (no use client directive)', async () => {
      const fs = await import('fs/promises');
      const path = await import('path');
      const content = await fs.readFile(
        path.join(process.cwd(), 'src/app/instruments/[slug]/midi/page.tsx'),
        'utf-8',
      );
      expect(content).not.toContain("'use client'");
      expect(content).toContain('loadInstrumentConfig');
      expect(content).toContain('instrumentConfig.sysex');
      expect(content).toContain('NoSysexPage');
    });

    // Phase 25 Wave 2 (plan 25-02): octatrack instrument.json now exists in
    // src/content/instruments/octatrack/. loadInstrumentConfig('octatrack')
    // returns sysex:false, so MidiRoute will route through NoSysexPage.
    test('renders NoSysexPage for octatrack (sysex:false)', async () => {
      // Load the actual bundled octatrack config that MidiRoute reads at runtime.
      const { loadInstrumentConfig } = await import('@/lib/content/reader');
      const instrumentConfig = await loadInstrumentConfig('octatrack', { instrument: 'octatrack' });

      // Assert the capability that drives the routing decision in MidiRoute.
      expect(instrumentConfig.sysex).toBe(false);
      expect(instrumentConfig.display_name).toBe('Octatrack MKII');

      // Render the NoSysexPage exactly as MidiRoute would when sysex===false.
      render(
        <NoSysexPage
          displayName={instrumentConfig.display_name}
          patchesHref={`/instruments/octatrack/patches`}
        />,
      );
      expect(screen.getByRole('heading').textContent).toContain('Octatrack MKII');
      expect(screen.getByText(/doesn.t support MIDI SysEx/)).toBeDefined();
      const link = screen.getByText(/Browse Octatrack MKII Patches/);
      expect(link.closest('a')?.getAttribute('href')).toBe('/instruments/octatrack/patches');
    });
  });
});
