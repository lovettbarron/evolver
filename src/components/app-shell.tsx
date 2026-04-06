import Link from 'next/link';
import { Nav } from '@/components/nav';
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
  const navInstruments = instruments.map((i) => ({
    slug: i.slug,
    displayName: i.config.display_name,
    sysex: i.config.sysex,
  }));

  return (
    <SearchProvider sessions={searchSessions} patches={searchPatches}>
      <div className="flex flex-col min-h-screen">
        <Nav isDemoMode={isDemoMode} instruments={navInstruments} />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-surface px-lg py-lg text-sm text-muted">
          <div className="max-w-[720px] mx-auto flex items-center justify-between">
            <span>Evolver Deep Learning</span>
            <div className="flex items-center gap-md">
              {isDemoMode && (
                <span className="text-muted text-xs">
                  Demo mode —{' '}
                  <a
                    href="https://github.com/lovettbarron/evolver#getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Run it yourself
                  </a>
                </span>
              )}
              <Link
                href="/about"
                className="text-muted hover:text-text underline underline-offset-2"
              >
                About this method
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </SearchProvider>
  );
}
