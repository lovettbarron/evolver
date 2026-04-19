import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/content/reader', () => ({
  discoverModules: vi.fn(),
  listSessions: vi.fn(),
  loadModuleConfig: vi.fn(),
}));

import { buildCrossReferenceMap } from '../cross-references';
import { discoverModules, listSessions, loadModuleConfig } from '@/lib/content/reader';

const mockedDiscoverModules = vi.mocked(discoverModules);
const mockedListSessions = vi.mocked(listSessions);
const mockedLoadModuleConfig = vi.mocked(loadModuleConfig);

const mockConfig = { instrument: 'evolver' };

function makeSession(slug: string, title: string, crossRefs?: Array<{ ref: string; reason: string }>) {
  return {
    data: {
      title,
      section: 'Foundations',
      session_number: 1,
      duration: 20,
      prerequisite: null,
      output_type: 'patch' as const,
      difficulty: 'beginner' as const,
      tags: [],
      instrument: 'maths',
      cross_references: crossRefs,
    },
    content: '',
    slug,
  };
}

describe('buildCrossReferenceMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty map when no sessions have cross_references', async () => {
    mockedDiscoverModules.mockResolvedValue(['maths']);
    mockedListSessions.mockResolvedValue([makeSession('01-basics', 'Basics')] as any);
    mockedLoadModuleConfig.mockResolvedValue({
      display_name: 'Maths',
      tagline: 'test',
      manufacturer: 'Make Noise',
      hp_width: 20,
      categories: ['function-generator'],
      power_specs: { plus_12v_ma: 60, minus_12v_ma: 50 },
      reference_pdfs: [],
    });

    const result = await buildCrossReferenceMap(mockConfig);
    expect(result.size).toBe(0);
  });

  it('returns forward references from session frontmatter', async () => {
    mockedDiscoverModules.mockResolvedValue(['maths', 'plaits']);
    mockedListSessions.mockImplementation(async (slug: string) => {
      if (slug === 'maths') {
        return [makeSession('03-slew', 'Slew & Portamento', [
          { ref: 'plaits/05-formant', reason: 'Formant synthesis connection' },
        ])] as any;
      }
      return [makeSession('05-formant', 'Formant Synthesis')] as any;
    });
    mockedLoadModuleConfig.mockImplementation(async (slug: string) => ({
      display_name: slug === 'maths' ? 'Maths' : 'Plaits',
      tagline: 'test',
      manufacturer: 'Test',
      hp_width: 20,
      categories: ['function-generator'],
      power_specs: { plus_12v_ma: 60, minus_12v_ma: 50 },
      reference_pdfs: [],
    }));

    const result = await buildCrossReferenceMap(mockConfig);
    // maths/03-slew should have a forward ref to plaits/05-formant
    const mathsRefs = result.get('maths/03-slew');
    expect(mathsRefs).toBeDefined();
    expect(mathsRefs!.some(r => r.moduleSlug === 'plaits' && r.sessionSlug === '05-formant')).toBe(true);
  });

  it('returns reverse references (auto-bidirectional)', async () => {
    mockedDiscoverModules.mockResolvedValue(['maths', 'plaits']);
    mockedListSessions.mockImplementation(async (slug: string) => {
      if (slug === 'maths') {
        return [makeSession('03-slew', 'Slew & Portamento', [
          { ref: 'plaits/05-formant', reason: 'Formant synthesis connection' },
        ])] as any;
      }
      return [makeSession('05-formant', 'Formant Synthesis')] as any;
    });
    mockedLoadModuleConfig.mockImplementation(async (slug: string) => ({
      display_name: slug === 'maths' ? 'Maths' : 'Plaits',
      tagline: 'test',
      manufacturer: 'Test',
      hp_width: 20,
      categories: ['function-generator'],
      power_specs: { plus_12v_ma: 60, minus_12v_ma: 50 },
      reference_pdfs: [],
    }));

    const result = await buildCrossReferenceMap(mockConfig);
    // plaits/05-formant should have a reverse ref back to maths/03-slew
    const plaitsRefs = result.get('plaits/05-formant');
    expect(plaitsRefs).toBeDefined();
    expect(plaitsRefs!.some(r => r.moduleSlug === 'maths' && r.sessionSlug === '03-slew')).toBe(true);
  });

  it('deduplicates when both sides reference each other', async () => {
    mockedDiscoverModules.mockResolvedValue(['maths', 'plaits']);
    mockedListSessions.mockImplementation(async (slug: string) => {
      if (slug === 'maths') {
        return [makeSession('03-slew', 'Slew & Portamento', [
          { ref: 'plaits/05-formant', reason: 'Formant connection' },
        ])] as any;
      }
      return [makeSession('05-formant', 'Formant Synthesis', [
        { ref: 'maths/03-slew', reason: 'Slew connection' },
      ])] as any;
    });
    mockedLoadModuleConfig.mockImplementation(async (slug: string) => ({
      display_name: slug === 'maths' ? 'Maths' : 'Plaits',
      tagline: 'test',
      manufacturer: 'Test',
      hp_width: 20,
      categories: ['function-generator'],
      power_specs: { plus_12v_ma: 60, minus_12v_ma: 50 },
      reference_pdfs: [],
    }));

    const result = await buildCrossReferenceMap(mockConfig);
    // Each should reference the other exactly once (no duplicates)
    const mathsRefs = result.get('maths/03-slew')!;
    const plaitsEntries = mathsRefs.filter(r => r.moduleSlug === 'plaits' && r.sessionSlug === '05-formant');
    expect(plaitsEntries).toHaveLength(1);

    const plaitsRefs = result.get('plaits/05-formant')!;
    const mathsEntries = plaitsRefs.filter(r => r.moduleSlug === 'maths' && r.sessionSlug === '03-slew');
    expect(mathsEntries).toHaveLength(1);
  });
});
