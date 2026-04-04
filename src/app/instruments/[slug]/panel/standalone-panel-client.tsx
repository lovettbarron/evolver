'use client';

import { EvolverPanel } from '@/components/evolver-panel';
import { CascadiaPanel } from '@/components/cascadia-panel';

export function StandalonePanelClient({ instrumentSlug }: { instrumentSlug: string }) {
  if (instrumentSlug === 'cascadia') {
    return <CascadiaPanel />;
  }
  return <EvolverPanel />;
}
