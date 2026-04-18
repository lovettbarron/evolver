import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { StickyHeader } from '@/components/sticky-header';
import { StandalonePanelClient } from './standalone-panel-client';

const PANEL_CONFIG: Record<
  string,
  { title: string; description: string; maxWidth: string; hasPanel: boolean }
> = {
  evolver: {
    title: 'Evolver Panel',
    description: 'Interactive panel reference. Drag knobs to explore parameter ranges.',
    maxWidth: 'max-w-[1200px]',
    hasPanel: true,
  },
  cascadia: {
    title: 'Cascadia Panel',
    description:
      'Interactive panel reference. Drag knobs and sliders to explore. Patch jacks show cable connection points.',
    maxWidth: 'max-w-[1800px]',
    hasPanel: true,
  },
  octatrack: {
    title: 'Octatrack Panel',
    description:
      'Interactive front panel reference. Drag the data entry knobs and crossfader to explore parameter ranges.',
    maxWidth: 'max-w-[1400px]',
    hasPanel: true,
  },
  maths: {
    title: 'Maths Panel',
    description: 'Make Noise Maths — analog function generator and utility module.',
    maxWidth: 'max-w-[800px]',
    hasPanel: false,
  },
  plaits: {
    title: 'Plaits Panel',
    description: 'Mutable Instruments Plaits — macro oscillator with 16 synthesis models.',
    maxWidth: 'max-w-[800px]',
    hasPanel: false,
  },
  beads: {
    title: 'Beads Panel',
    description: 'Mutable Instruments Beads — granular texture synthesizer.',
    maxWidth: 'max-w-[800px]',
    hasPanel: false,
  },
  swells: {
    title: 'Swells Panel',
    description: 'Electrosmith Swells — multi-effects module.',
    maxWidth: 'max-w-[800px]',
    hasPanel: false,
  },
  ikarie: {
    title: 'Ikarie Panel',
    description: 'Bastl Instruments Ikarie — stereo analog filter with body interaction.',
    maxWidth: 'max-w-[800px]',
    hasPanel: false,
  },
};

async function photoExists(slug: string): Promise<boolean> {
  try {
    await fs.access(path.join(process.cwd(), 'public', 'modules', `${slug}.jpg`));
    return true;
  } catch {
    return false;
  }
}

export default async function PanelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = PANEL_CONFIG[slug];
  if (!config) return notFound();

  const hasPhoto = await photoExists(slug);
  const showSideBySide = hasPhoto && config.hasPanel;

  return (
    <div>
      <StickyHeader
        backHref={`/instruments/${slug}`}
        sessionIdentifier="Panel"
        quickRefContent={[]}
        instrumentSlug={slug}
      />
      <div
        className={`${showSideBySide ? 'max-w-[900px]' : config.maxWidth} mx-auto px-lg py-2xl`}
      >
        <h1 className="text-2xl font-bold mb-lg">{config.title}</h1>
        <p className="text-muted mb-xl">{config.description}</p>

        {showSideBySide ? (
          <div className="flex flex-col md:flex-row gap-xl items-start">
            <div className="flex-shrink-0 w-full md:w-[200px]">
              <Image
                src={`/modules/${slug}.jpg`}
                alt={`${config.title} — physical module photo`}
                width={200}
                height={600}
                className="w-full max-h-[600px] object-contain rounded-md"
              />
              <p className="text-xs text-muted mt-sm">Photo: ModularGrid</p>
            </div>
            <div className={`flex-1 ${config.maxWidth}`}>
              <StandalonePanelClient instrumentSlug={slug} />
            </div>
          </div>
        ) : hasPhoto ? (
          <div>
            <Image
              src={`/modules/${slug}.jpg`}
              alt={`${config.title} — physical module photo`}
              width={400}
              height={800}
              className="max-h-[600px] object-contain rounded-md"
            />
            <p className="text-xs text-muted mt-sm">Photo: ModularGrid</p>
          </div>
        ) : config.hasPanel ? (
          <StandalonePanelClient instrumentSlug={slug} />
        ) : (
          <p className="text-muted">Panel coming soon.</p>
        )}
      </div>
    </div>
  );
}
