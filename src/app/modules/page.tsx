import { Suspense } from 'react';
import { loadConfig } from '@/lib/config';
import { discoverModules, loadModuleConfig } from '@/lib/content/reader';
import { WideShell } from '@/components/page-shell';
import { ModuleCategoryTabs } from '@/components/module-category-tabs';

export default async function ModulesPage() {
  const config = await loadConfig();
  const moduleSlugs = await discoverModules(config);
  const modules = await Promise.all(
    moduleSlugs.map(async (slug) => {
      const moduleConfig = await loadModuleConfig(slug, config);
      return {
        slug,
        displayName: moduleConfig.display_name,
        manufacturer: moduleConfig.manufacturer,
        hpWidth: moduleConfig.hp_width,
        categories: moduleConfig.categories,
        sessionCount: 0, // No sessions until Phase 29+
      };
    })
  );

  return (
    <WideShell className="py-2xl">
      <h1 className="font-display text-[clamp(1.75rem,1.2rem+2vw,2.4375rem)] font-bold text-text leading-[1.15] mb-sm">
        Modules
      </h1>
      <p className="text-base text-muted mb-2xl">
        Eurorack modules with guided learning sessions
      </p>
      <Suspense fallback={null}>
        <ModuleCategoryTabs modules={modules} />
      </Suspense>
    </WideShell>
  );
}
