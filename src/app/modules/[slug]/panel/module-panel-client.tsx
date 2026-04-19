'use client';

import { MathsPanel } from '@/components/maths-panel';
import { PlaitsPanel } from '@/components/plaits-panel';
import { BeadsPanel } from '@/components/beads-panel';
import { SwellsPanel } from '@/components/swells-panel';
import { IkariePanel } from '@/components/ikarie-panel';
import { JustFriendsPanel } from '@/components/just-friends-panel';
import { CrowPanel } from '@/components/crow-panel';

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
  if (moduleSlug === 'swells') {
    return <SwellsPanel />;
  }
  if (moduleSlug === 'ikarie') {
    return <IkariePanel />;
  }
  if (moduleSlug === 'just-friends') {
    return <JustFriendsPanel />;
  }
  if (moduleSlug === 'crow') {
    return <CrowPanel />;
  }
  return null;
}
