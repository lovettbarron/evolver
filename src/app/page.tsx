import { discoverInstruments, loadInstrumentConfig, listSessions, listPatches } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { InstrumentCard } from '@/components/instrument-card';

export default async function Home() {
  const config = await loadConfig();
  const slugs = await discoverInstruments(config);

  if (slugs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-3xl text-center">
        <h1 className="text-2xl font-bold">No instruments found</h1>
        <p className="text-muted max-w-md">
          No instrument directories were discovered. Check that your vault contains an instruments/ folder with at least one instrument.
        </p>
      </div>
    );
  }

  const instruments = await Promise.all(
    slugs.map(async (slug) => {
      const instrumentConfig = await loadInstrumentConfig(slug, config);
      const sessions = await listSessions(slug, config);
      const patches = await listPatches(slug, config);
      return {
        slug,
        displayName: instrumentConfig.display_name,
        tagline: instrumentConfig.tagline,
        sessionCount: sessions.length,
        patchCount: patches.length,
      };
    })
  );

  return (
    <div className="max-w-[720px] mx-auto py-3xl">
      <h1 className="text-4xl font-bold text-center">Choose Your Instrument</h1>
      <p className="text-base text-muted text-center mt-md">Pick up where you left off</p>
      <div className="flex justify-center mt-2xl">
        <div className="flex flex-col sm:flex-row gap-lg">
          {instruments.map((instrument) => (
            <div key={instrument.slug} className="flex-1 min-w-[280px] max-w-[360px]">
              <InstrumentCard
                slug={instrument.slug}
                displayName={instrument.displayName}
                tagline={instrument.tagline}
                sessionCount={instrument.sessionCount}
                patchCount={instrument.patchCount}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
