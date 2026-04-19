import { discoverModules, loadModuleConfig, listSessions } from './content/reader';
import type { AppConfig, ModuleConfig } from './content/schemas';

export interface CategoryGroup {
  category: string;
  categoryLabel: string;  // "Other VCOs", "Other Filters", etc.
  modules: Array<{
    slug: string;
    name: string;
    tagline: string;
    sessionCount: number;
  }>;
}

/**
 * Format a category slug into a human-readable plural label with "Other " prefix.
 * Examples: "vco" -> "Other VCOs", "filter" -> "Other Filters",
 * "function-generator" -> "Other Function Generators"
 */
function formatCategoryLabel(category: string): string {
  const parts = category.split('-');
  const capitalized = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  return `Other ${capitalized}s`;
}

/**
 * Build category-based module suggestions for a given module.
 *
 * For each category the current module belongs to, finds other modules
 * sharing that category. Multi-category modules appear in each matching
 * group without deduplication (per D-07).
 *
 * Groups with zero other modules are filtered out.
 */
export async function buildCategorySuggestions(
  currentModuleSlug: string,
  config: AppConfig
): Promise<CategoryGroup[]> {
  const moduleSlugs = await discoverModules(config);

  // Load all module configs
  const moduleConfigs = new Map<string, ModuleConfig>();
  await Promise.all(
    moduleSlugs.map(async (slug) => {
      const cfg = await loadModuleConfig(slug, config);
      moduleConfigs.set(slug, cfg);
    })
  );

  const currentConfig = moduleConfigs.get(currentModuleSlug);
  if (!currentConfig) return [];

  const currentCategories = currentConfig.categories;

  const groups: CategoryGroup[] = [];

  for (const category of currentCategories) {
    // Find other modules with this category
    const otherModules: Array<{ slug: string; config: ModuleConfig }> = [];
    for (const [slug, cfg] of moduleConfigs) {
      if (slug === currentModuleSlug) continue;
      if (cfg.categories.includes(category)) {
        otherModules.push({ slug, config: cfg });
      }
    }

    if (otherModules.length === 0) continue;

    // Count sessions for each module
    const modulesWithCounts = await Promise.all(
      otherModules.map(async (m) => {
        const sessions = await listSessions(m.slug, config);
        return {
          slug: m.slug,
          name: m.config.display_name,
          tagline: m.config.tagline,
          sessionCount: sessions.length,
        };
      })
    );

    groups.push({
      category,
      categoryLabel: formatCategoryLabel(category),
      modules: modulesWithCounts,
    });
  }

  return groups;
}
