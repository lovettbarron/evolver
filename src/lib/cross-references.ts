import { discoverModules, listSessions, loadModuleConfig } from './content/reader';
import type { AppConfig } from './content/schemas';

export interface ResolvedReference {
  moduleSlug: string;
  sessionSlug: string;
  sessionTitle: string;
  moduleName: string;
  reason: string;
}

/**
 * Build a bidirectional cross-reference map from session frontmatter.
 *
 * Algorithm:
 * 1. Discover all modules and load their sessions + configs
 * 2. Collect forward refs from session.data.cross_references
 * 3. For each forward ref A->B, also record reverse ref B->A
 * 4. Deduplicate by moduleSlug/sessionSlug key per target session
 *
 * Returns Map keyed by "moduleSlug/sessionSlug" -> ResolvedReference[]
 */
export async function buildCrossReferenceMap(
  config: AppConfig
): Promise<Map<string, ResolvedReference[]>> {
  const moduleSlugs = await discoverModules(config);

  // Load all module configs and sessions in parallel
  const moduleData = await Promise.all(
    moduleSlugs.map(async (slug) => {
      const [moduleConfig, sessions] = await Promise.all([
        loadModuleConfig(slug, config),
        listSessions(slug, config),
      ]);
      return { slug, moduleConfig, sessions };
    })
  );

  // Build lookup maps for session titles and module names
  const sessionTitleMap = new Map<string, string>();
  const moduleNameMap = new Map<string, string>();
  for (const { slug, moduleConfig, sessions } of moduleData) {
    moduleNameMap.set(slug, moduleConfig.display_name);
    for (const session of sessions) {
      sessionTitleMap.set(`${slug}/${session.slug}`, session.data.title);
    }
  }

  // Collect all references (forward + reverse)
  const refMap = new Map<string, Map<string, ResolvedReference>>();

  function addRef(sourceKey: string, targetKey: string, targetModuleSlug: string, targetSessionSlug: string, reason: string) {
    if (!refMap.has(sourceKey)) {
      refMap.set(sourceKey, new Map());
    }
    const entries = refMap.get(sourceKey)!;
    // Deduplicate by target key
    if (!entries.has(targetKey)) {
      entries.set(targetKey, {
        moduleSlug: targetModuleSlug,
        sessionSlug: targetSessionSlug,
        sessionTitle: sessionTitleMap.get(targetKey) || targetSessionSlug,
        moduleName: moduleNameMap.get(targetModuleSlug) || targetModuleSlug,
        reason,
      });
    }
  }

  for (const { slug: moduleSlug, sessions } of moduleData) {
    for (const session of sessions) {
      const crossRefs = session.data.cross_references;
      if (!crossRefs || crossRefs.length === 0) continue;

      const sourceKey = `${moduleSlug}/${session.slug}`;

      for (const ref of crossRefs) {
        const [targetModuleSlug, targetSessionSlug] = ref.ref.split('/');
        const targetKey = ref.ref;

        // Forward: source -> target
        addRef(sourceKey, targetKey, targetModuleSlug, targetSessionSlug, ref.reason);

        // Reverse: target -> source
        addRef(targetKey, sourceKey, moduleSlug, session.slug, ref.reason);
      }
    }
  }

  // Convert inner maps to arrays
  const result = new Map<string, ResolvedReference[]>();
  for (const [key, innerMap] of refMap) {
    result.set(key, Array.from(innerMap.values()));
  }

  return result;
}
