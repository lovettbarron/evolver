'use client';

import { EvolverPanel } from '@/components/evolver-panel';

export function StandalonePanelClient() {
  // EvolverPanel in uncontrolled mode: when knobValues is omitted,
  // the component uses internal useState initialized to {} and all
  // knobs default to midiToRotation(64) = 0deg/noon. Drag interactions
  // update the internal state, so knobs are fully interactive without
  // any parent state management needed.
  return <EvolverPanel />;
}
