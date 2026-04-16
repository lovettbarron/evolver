import { notFound } from 'next/navigation';
import { StickyHeader } from '@/components/sticky-header';
import { StandalonePanelClient } from './standalone-panel-client';

const PANEL_CONFIG: Record<string, { title: string; description: string; maxWidth: string }> = {
  evolver: {
    title: 'Evolver Panel',
    description: 'Interactive panel reference. Drag knobs to explore parameter ranges.',
    maxWidth: 'max-w-[1200px]',
  },
  cascadia: {
    title: 'Cascadia Panel',
    description: 'Interactive panel reference. Drag knobs and sliders to explore. Patch jacks show cable connection points.',
    maxWidth: 'max-w-[1800px]',
  },
  octatrack: {
    title: 'Octatrack Panel',
    description: 'Interactive front panel reference. Drag the data entry knobs and crossfader to explore parameter ranges.',
    maxWidth: 'max-w-[1400px]',
  },
};

export default async function PanelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = PANEL_CONFIG[slug];
  if (!config) return notFound();

  return (
    <div>
      <StickyHeader
        backHref={`/instruments/${slug}`}
        sessionIdentifier="Panel"
        quickRefContent={[]}
        instrumentSlug={slug}
      />
      <div className={`${config.maxWidth} mx-auto px-lg py-2xl`}>
        <h1 className="text-2xl font-bold mb-lg">{config.title}</h1>
        <p className="text-muted mb-xl">{config.description}</p>
        <StandalonePanelClient instrumentSlug={slug} />
      </div>
    </div>
  );
}
