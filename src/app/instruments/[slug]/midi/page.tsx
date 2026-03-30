'use client';

import { use } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { MidiPage } from '@/components/midi-page';

export default function MidiRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <div>
      <header className="sticky top-0 z-40 h-[48px] bg-surface flex items-center px-lg border-b border-muted/20">
        <Link
          href={`/instruments/${slug}`}
          aria-label="Back to instrument overview"
          className="flex items-center text-muted hover:text-text transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="text-sm ml-xs">{slug}</span>
        </Link>
        <span className="flex-1 text-center text-sm text-muted truncate px-md">
          MIDI Tools
        </span>
        <div className="w-[80px]" />
      </header>
      <MidiPage instrumentSlug={slug} />
    </div>
  );
}
