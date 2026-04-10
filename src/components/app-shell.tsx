'use client';

import { usePathname } from 'next/navigation';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { SearchProvider } from '@/components/search-provider';
import type { InstrumentConfig } from '@/lib/content/schemas';
import type { SearchableSession, SearchablePatch } from '@/lib/search';

export function AppShell({
  children,
  isDemoMode,
  instruments,
  searchSessions,
  searchPatches,
}: {
  children: React.ReactNode;
  isDemoMode: boolean;
  instruments: Array<{ slug: string; config: InstrumentConfig }>;
  searchSessions: SearchableSession[];
  searchPatches: SearchablePatch[];
}) {
  const pathname = usePathname();
  const slugMatch = pathname.match(/\/instruments\/([^/]+)/);
  const instrumentSlug = slugMatch?.[1] ?? '';

  const navInstruments = instruments.map((i) => ({
    slug: i.slug,
    displayName: i.config.display_name,
    sysex: i.config.sysex,
  }));

  const footerInstruments = instruments.map((i) => ({
    slug: i.slug,
    displayName: i.config.display_name,
  }));

  return (
    <SearchProvider sessions={searchSessions} patches={searchPatches}>
      <div className="flex flex-col min-h-screen" data-instrument={instrumentSlug || undefined}>
        <Nav isDemoMode={isDemoMode} instruments={navInstruments} />
        <main className="flex-1">{children}</main>
        <Footer instruments={footerInstruments} isDemoMode={isDemoMode} />
      </div>
    </SearchProvider>
  );
}
