'use client';

import { EvolverPanel } from '@/components/evolver-panel';
import { CascadiaPanel } from '@/components/cascadia-panel';
import { OctatrackPanel } from '@/components/octatrack-panel';

export function StandalonePanelClient({ instrumentSlug }: { instrumentSlug: string }) {
  if (instrumentSlug === 'octatrack') {
    return <OctatrackPanel />;
  }
  if (instrumentSlug === 'cascadia') {
    return <CascadiaPanel />;
  }
  return <EvolverPanel />;
}
