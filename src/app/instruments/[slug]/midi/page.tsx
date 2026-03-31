import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { loadConfig } from '@/lib/config';
import { loadInstrumentConfig } from '@/lib/content/reader';
import { MidiPage } from '@/components/midi-page';
import { NoSysexPage } from '@/components/no-sysex-page';

export default async function MidiRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = await loadConfig();
  const instrumentConfig = await loadInstrumentConfig(slug, config);

  if (!instrumentConfig.sysex) {
    return <NoSysexPage
      displayName={instrumentConfig.display_name}
      patchesHref={`/instruments/${slug}/patches`}
    />;
  }

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
