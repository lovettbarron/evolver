import { notFound } from 'next/navigation';
import { StickyHeader } from '@/components/sticky-header';
import { StandalonePanelClient } from './standalone-panel-client';

export default async function PanelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Only Evolver has a panel visualizer
  if (slug !== 'evolver') return notFound();

  return (
    <div>
      <StickyHeader
        backHref={`/instruments/${slug}`}
        sessionIdentifier="Panel"
        quickRefContent={[]}
      />
      <div className="max-w-[1200px] mx-auto px-lg py-2xl">
        <h1 className="text-2xl font-bold mb-lg">Evolver Panel</h1>
        <p className="text-muted mb-xl">
          Interactive panel reference. Drag knobs to explore parameter ranges.
        </p>
        <StandalonePanelClient />
      </div>
    </div>
  );
}
