import { WideShell } from '@/components/page-shell';
import { ModulePanelClient } from './module-panel-client';

const PANEL_CONFIG: Record<string, { title: string; description: string; maxWidth: string }> = {
  ikarie: {
    title: 'Ikarie Panel',
    description: 'Interactive panel reference for Bastl Instruments Ikarie. Stereo dual-peak resonant filter with envelope follower. Drag knobs to explore.',
    maxWidth: 'max-w-[300px]',
  },
};

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

  return (
    <div className={`${config.maxWidth} mx-auto px-lg py-2xl`}>
      <h1 className="text-2xl font-bold mb-lg">{config.title}</h1>
      <p className="text-muted mb-xl">{config.description}</p>
      <ModulePanelClient moduleSlug={slug} />
    </div>
  );
}
