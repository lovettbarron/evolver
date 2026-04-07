import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { AppShell } from '@/components/app-shell';
import { loadConfig } from '@/lib/config';
import { discoverInstruments, loadInstrumentConfig, listSessions, listPatches } from '@/lib/content/reader';
import { toSearchableSession, toSearchablePatch } from '@/lib/search';
import type { SearchableSession, SearchablePatch } from '@/lib/search';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['700'],
});

export const metadata = {
  title: 'Evolver - Instrument Deep Learning',
  description: 'ADHD-friendly structured instrument mastery',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await loadConfig();
  const isDemoMode = !config.vaultPath;

  const slugs = await discoverInstruments(config);
  const instruments = await Promise.all(
    slugs.map(async (slug) => ({
      slug,
      config: await loadInstrumentConfig(slug, config),
    }))
  );

  // Build search index from all instruments
  const allSearchData = await Promise.all(
    slugs.map(async (slug) => {
      const [sessions, patches] = await Promise.all([
        listSessions(slug, config),
        listPatches(slug, config),
      ]);
      return {
        sessions: sessions.map(toSearchableSession),
        patches: patches.map(toSearchablePatch),
      };
    })
  );
  const searchSessions = allSearchData.flatMap((d) => d.sessions);
  const searchPatches = allSearchData.flatMap((d) => d.patches);

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body>
        <AppShell isDemoMode={isDemoMode} instruments={instruments}
          searchSessions={searchSessions} searchPatches={searchPatches}>{children}</AppShell>
      </body>
    </html>
  );
}
