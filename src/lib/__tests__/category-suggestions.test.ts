import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/content/reader', () => ({
  discoverModules: vi.fn(),
  loadModuleConfig: vi.fn(),
  listSessions: vi.fn(),
}));

import { buildCategorySuggestions } from '../category-suggestions';
import { discoverModules, loadModuleConfig, listSessions } from '@/lib/content/reader';

const mockedDiscoverModules = vi.mocked(discoverModules);
const mockedLoadModuleConfig = vi.mocked(loadModuleConfig);
const mockedListSessions = vi.mocked(listSessions);

const mockConfig = { instrument: 'evolver' };

function makeModuleConfig(name: string, categories: string[]) {
  return {
    display_name: name,
    tagline: `${name} tagline`,
    manufacturer: 'Test',
    hp_width: 20,
    categories,
    power_specs: { plus_12v_ma: 60, minus_12v_ma: 50 },
    reference_pdfs: [],
  };
}

describe('buildCategorySuggestions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty array when no other modules share a category', async () => {
    mockedDiscoverModules.mockResolvedValue(['maths']);
    mockedLoadModuleConfig.mockResolvedValue(makeModuleConfig('Maths', ['function-generator']) as any);
    mockedListSessions.mockResolvedValue([]);

    const result = await buildCategorySuggestions('maths', mockConfig);
    expect(result).toEqual([]);
  });

  it('groups modules by shared category excluding current module', async () => {
    mockedDiscoverModules.mockResolvedValue(['maths', 'just-friends', 'plaits']);
    mockedLoadModuleConfig.mockImplementation(async (slug: string) => {
      if (slug === 'maths') return makeModuleConfig('Maths', ['function-generator', 'modulator']) as any;
      if (slug === 'just-friends') return makeModuleConfig('Just Friends', ['modulator', 'vco']) as any;
      if (slug === 'plaits') return makeModuleConfig('Plaits', ['vco']) as any;
      throw new Error('Unknown module');
    });
    mockedListSessions.mockResolvedValue([]);

    const result = await buildCategorySuggestions('maths', mockConfig);
    // Maths has function-generator and modulator
    // function-generator: no other modules -> filtered out
    // modulator: just-friends shares it
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('modulator');
    expect(result[0].modules).toHaveLength(1);
    expect(result[0].modules[0].slug).toBe('just-friends');
  });

  it('shows multi-category modules in each matching group without deduplication', async () => {
    mockedDiscoverModules.mockResolvedValue(['maths', 'just-friends', 'plaits']);
    mockedLoadModuleConfig.mockImplementation(async (slug: string) => {
      if (slug === 'maths') return makeModuleConfig('Maths', ['function-generator', 'modulator', 'envelope-generator']) as any;
      if (slug === 'just-friends') return makeModuleConfig('Just Friends', ['modulator', 'envelope-generator', 'vco']) as any;
      if (slug === 'plaits') return makeModuleConfig('Plaits', ['vco']) as any;
      throw new Error('Unknown module');
    });
    mockedListSessions.mockResolvedValue([]);

    const result = await buildCategorySuggestions('maths', mockConfig);
    // Maths categories: function-generator, modulator, envelope-generator
    // function-generator: no others -> filtered
    // modulator: just-friends -> 1 module
    // envelope-generator: just-friends -> 1 module
    // just-friends appears in both groups (no dedup per D-07)
    expect(result).toHaveLength(2);
    const modulatorGroup = result.find(g => g.category === 'modulator');
    const egGroup = result.find(g => g.category === 'envelope-generator');
    expect(modulatorGroup).toBeDefined();
    expect(egGroup).toBeDefined();
    expect(modulatorGroup!.modules[0].slug).toBe('just-friends');
    expect(egGroup!.modules[0].slug).toBe('just-friends');
  });

  it('generates correct categoryLabel format', async () => {
    mockedDiscoverModules.mockResolvedValue(['maths', 'just-friends']);
    mockedLoadModuleConfig.mockImplementation(async (slug: string) => {
      if (slug === 'maths') return makeModuleConfig('Maths', ['function-generator']) as any;
      if (slug === 'just-friends') return makeModuleConfig('Just Friends', ['function-generator']) as any;
      throw new Error('Unknown module');
    });
    mockedListSessions.mockResolvedValue([]);

    const result = await buildCategorySuggestions('maths', mockConfig);
    expect(result).toHaveLength(1);
    expect(result[0].categoryLabel).toBe('Other Function Generators');
  });

  it('counts sessions per suggested module', async () => {
    mockedDiscoverModules.mockResolvedValue(['maths', 'just-friends']);
    mockedLoadModuleConfig.mockImplementation(async (slug: string) => {
      if (slug === 'maths') return makeModuleConfig('Maths', ['modulator']) as any;
      if (slug === 'just-friends') return makeModuleConfig('Just Friends', ['modulator']) as any;
      throw new Error('Unknown module');
    });
    mockedListSessions.mockImplementation(async (slug: string) => {
      if (slug === 'just-friends') {
        return [
          { data: {}, content: '', slug: '01' },
          { data: {}, content: '', slug: '02' },
          { data: {}, content: '', slug: '03' },
        ] as any;
      }
      return [];
    });

    const result = await buildCategorySuggestions('maths', mockConfig);
    expect(result[0].modules[0].sessionCount).toBe(3);
  });
});
