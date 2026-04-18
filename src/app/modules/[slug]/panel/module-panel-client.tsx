'use client';

import { IkariePanel } from '@/components/ikarie-panel';

export function ModulePanelClient({ moduleSlug }: { moduleSlug: string }) {
  if (moduleSlug === 'ikarie') {
    return <IkariePanel />;
  }
  return null;
}
