'use client';

import { MathsPanel } from '@/components/maths-panel';
import { PlaitsPanel } from '@/components/plaits-panel';
import { BeadsPanel } from '@/components/beads-panel';

export function ModulePanelClient({ moduleSlug }: { moduleSlug: string }) {
  if (moduleSlug === 'maths') {
    return <MathsPanel />;
  }
  if (moduleSlug === 'plaits') {
    return <PlaitsPanel />;
  }
  if (moduleSlug === 'beads') {
    return <BeadsPanel />;
  }
  return null;
}
