'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight, CheckCircle, Play } from 'lucide-react';
import { useHydrated } from '@/hooks/use-hydrated';
import { useLearnerStore } from '@/stores/learner-store';
import { mergeCompletions, computeNextSession } from '@/lib/learner-utils';

interface ResumeBarProps {
  instrumentSlug: string;
  vaultCompletions: number[];
  sessions: Array<{ slug: string; data: { session_number: number; title: string; module: string } }>;
  isDemo: boolean;
}

export function ResumeBar({ instrumentSlug, vaultCompletions, sessions, isDemo }: ResumeBarProps) {
  const hydrated = useHydrated();
  const manualCompletions = useLearnerStore((s) => s.getCompletedSessions(instrumentSlug));
  const lastVisited = useLearnerStore((s) => s.lastVisited[instrumentSlug]);

  if (!hydrated) return null;

  const merged = mergeCompletions(new Set(vaultCompletions), manualCompletions);
  const next = computeNextSession(lastVisited, merged, sessions);

  // All sessions complete
  if (next === null) {
    return (
      <Link
        href={`/instruments/${instrumentSlug}/patches`}
        className="flex items-center gap-md justify-between bg-surface rounded-lg p-lg hover:bg-[#1e1e1e] transition-colors duration-150 cursor-pointer"
        aria-label="All sessions complete — explore patches and challenges"
      >
        <CheckCircle size={20} className="text-accent shrink-0" />
        <div className="flex flex-col flex-1">
          <span className="text-sm text-accent">All sessions complete</span>
          <span className="text-base text-text">Explore patches and challenges</span>
        </div>
        <ArrowRight size={20} className="text-muted shrink-0" />
      </Link>
    );
  }

  // No sessions visited and no completions — ready to start
  if (lastVisited === undefined && merged.size === 0) {
    const first = sessions[0];
    if (!first) return null;
    return (
      <Link
        href={`/instruments/${instrumentSlug}/sessions/${first.slug}`}
        className="flex items-center gap-md justify-between bg-surface rounded-lg p-lg hover:bg-[#1e1e1e] transition-colors duration-150 cursor-pointer"
        aria-label={`Continue to session ${first.data.session_number}: ${first.data.title}`}
      >
        <Play size={20} className="text-accent shrink-0" />
        <div className="flex flex-col flex-1">
          <span className="text-sm text-muted">Ready to start?</span>
          <span className="text-base text-text">Session {first.data.session_number}: {first.data.title}</span>
        </div>
        <ArrowRight size={20} className="text-accent shrink-0" />
      </Link>
    );
  }

  // Has next session — continue where you left off
  return (
    <Link
      href={`/instruments/${instrumentSlug}/sessions/${next.slug}`}
      className="flex items-center gap-md justify-between bg-surface rounded-lg p-lg hover:bg-[#1e1e1e] transition-colors duration-150 cursor-pointer"
      aria-label={`Continue to session ${next.sessionNumber}: ${next.title}`}
    >
      <BookOpen size={20} className="text-muted shrink-0" />
      <div className="flex flex-col flex-1">
        <span className="text-sm text-muted">Continue where you left off</span>
        <span className="text-base text-text">Session {next.sessionNumber}: {next.title}</span>
      </div>
      <ArrowRight size={20} className="text-accent shrink-0" />
    </Link>
  );
}
