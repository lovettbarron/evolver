import { listSessions } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { HeroCard } from '@/components/hero-card';
import Link from 'next/link';

export default async function Home() {
  const config = await loadConfig();
  // Default instrument is evolver
  const instrument = config.instrument || 'evolver';
  const sessions = await listSessions(instrument, config);

  // Next session defaults to Session 1 until Phase 5 adds real progress tracking
  const nextSession = sessions[0];

  if (!nextSession) {
    // Empty state per UI-SPEC copywriting
    return (
      <div className="flex flex-col items-center justify-center py-3xl text-center">
        <h1 className="text-4xl font-bold mb-md">Curriculum not loaded</h1>
        <p className="text-muted max-w-md">
          Session content could not be loaded. Check that your vault path is configured or restart in demo mode.
        </p>
      </div>
    );
  }

  // Extract objective from session content: use the first non-empty, non-heading line
  const contentLines = nextSession.content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  const objective = contentLines.length > 0 ? contentLines[0].trim().slice(0, 120) : nextSession.data.title;

  return (
    <div className="flex flex-col items-center py-3xl">
      <p className="text-muted mb-lg">Your next session is ready</p>
      <HeroCard
        moduleName={nextSession.data.module}
        sessionTitle={nextSession.data.title}
        objective={objective}
        duration={nextSession.data.duration}
        href={`/instruments/${instrument}/sessions/${nextSession.slug}`}
      />
      <p className="text-muted mt-2xl text-sm">
        Browse sessions to pick up where you left off
      </p>
      <div className="flex gap-lg mt-md">
        <Link href={`/instruments/${instrument}/sessions`} className="text-text underline underline-offset-2 hover:text-accent">
          Browse All Sessions
        </Link>
      </div>
    </div>
  );
}
