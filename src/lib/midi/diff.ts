import { PROGRAM_PARAMETERS } from './parameters';
import { PARAMETER_SECTIONS } from './types';
import type { ParsedPatch, ParameterSection } from './types';

export interface ParameterDiff {
  key: string;
  name: string;
  section: ParameterSection;
  valueA: number;
  valueB: number;
  changed: boolean;
}

export interface SectionDiff {
  section: ParameterSection;
  sectionName: string;
  parameters: ParameterDiff[];
  hasChanges: boolean;
}

export interface DiffResult {
  sections: SectionDiff[];
  diffCount: number;
  totalCount: number;
}

const SECTION_DISPLAY_NAMES: Record<ParameterSection, string> = {
  oscillators: 'Oscillators',
  filter: 'Filter',
  envelopes: 'Envelopes',
  vca: 'VCA',
  feedback: 'Feedback',
  delay: 'Delay',
  lfos: 'LFOs',
  modulation: 'Modulation',
  sequencer: 'Sequencer',
  external_input: 'External Input',
  misc: 'Miscellaneous',
};

export function diffPatches(patchA: ParsedPatch, patchB: ParsedPatch): DiffResult {
  const allDiffs: ParameterDiff[] = [];

  // Compare program parameters
  for (const def of PROGRAM_PARAMETERS) {
    const valueA = patchA.parameters[def.key] ?? 0;
    const valueB = patchB.parameters[def.key] ?? 0;
    allDiffs.push({
      key: def.key,
      name: def.name,
      section: def.section as ParameterSection,
      valueA,
      valueB,
      changed: valueA !== valueB,
    });
  }

  // Compare sequencer steps
  const seqTracks = ['seq1_steps', 'seq2_steps', 'seq3_steps', 'seq4_steps'] as const;
  for (const track of seqTracks) {
    const stepsA = patchA.sequencer[track];
    const stepsB = patchB.sequencer[track];
    for (let i = 0; i < 16; i++) {
      const stepNum = String(i + 1).padStart(2, '0');
      const trackNum = track.charAt(3);
      allDiffs.push({
        key: `${track.replace('_steps', '')}_step_${stepNum}`,
        name: `Sequencer ${trackNum} Step ${i + 1}`,
        section: 'sequencer',
        valueA: stepsA[i] ?? 0,
        valueB: stepsB[i] ?? 0,
        changed: (stepsA[i] ?? 0) !== (stepsB[i] ?? 0),
      });
    }
  }

  // Group by section in PARAMETER_SECTIONS order
  const sections: SectionDiff[] = PARAMETER_SECTIONS.map((section) => {
    const params = allDiffs.filter((d) => d.section === section);
    return {
      section,
      sectionName: SECTION_DISPLAY_NAMES[section],
      parameters: params,
      hasChanges: params.some((p) => p.changed),
    };
  }).filter((s) => s.parameters.length > 0);

  const diffCount = allDiffs.filter((d) => d.changed).length;

  return {
    sections,
    diffCount,
    totalCount: allDiffs.length,
  };
}
