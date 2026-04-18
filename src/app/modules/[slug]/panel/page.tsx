import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { WideShell } from '@/components/page-shell';
import { ModulePanelClient } from './module-panel-client';

const PANEL_CONFIG: Record<string, { title: string; description: string; maxWidth: string }> = {
  maths: {
    title: 'Maths Panel',
    description: 'Interactive panel reference. Drag knobs to explore parameter ranges. Patch jacks show cable connection points.',
    maxWidth: 'max-w-[500px]',
  },
  plaits: {
    title: 'Plaits Panel',
    description: 'Interactive panel reference for Mutable Instruments Plaits. 16 synthesis models across 2 banks. Drag knobs to explore.',
    maxWidth: 'max-w-[400px]',
  },
  beads: {
    title: 'Beads Panel',
    description: 'Interactive panel reference for Mutable Instruments Beads. Granular texture synthesizer with 3 grain modes. Drag knobs to explore.',
    maxWidth: 'max-w-[400px]',
  },
  swells: {
    title: 'Swells Panel',
    description: 'Interactive panel reference for Intellijel Swells. Multi-algorithm stereo reverb with swell generator. Drag knobs and faders to explore.',
    maxWidth: 'max-w-[500px]',
  },
  ikarie: {
    title: 'Ikarie Panel',
    description: 'Interactive panel reference for Bastl Instruments Ikarie. Stereo dual-peak resonant filter. Drag knobs to explore.',
    maxWidth: 'max-w-[300px]',
  },
  'just-friends': {
    title: 'Just Friends Panel',
    description: 'Interactive panel reference for Mannequins Just Friends. Six-channel function generator and oscillator. Drag knobs to explore.',
    maxWidth: 'max-w-[400px]',
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

export default async function ModulePanelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = PANEL_CONFIG[slug];

  if (!config) {
    return (
      <WideShell className="py-2xl">
        <div className="bg-sunken rounded-lg p-2xl flex flex-col items-center text-center">
          <h2 className="font-display text-[20px] font-bold text-text">Panel coming soon</h2>
          <p className="text-base text-muted mt-sm max-w-[400px]">
            An interactive front-plate diagram for this module is in development.
          </p>
        </div>
      </WideShell>
    );
  }

  const hasPhoto = await photoExists(slug);

  return (
    <div className="max-w-[900px] mx-auto px-lg py-2xl">
      <h1 className="text-2xl font-bold mb-lg">{config.title}</h1>
      <p className="text-muted mb-xl">{config.description}</p>
      <div className={`flex flex-col ${hasPhoto ? 'md:flex-row' : ''} gap-xl items-start`}>
        {hasPhoto && (
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
        )}
        <div className={`flex-1 ${config.maxWidth}`}>
          <ModulePanelClient moduleSlug={slug} />
        </div>
      </div>
    </div>
  );
}
