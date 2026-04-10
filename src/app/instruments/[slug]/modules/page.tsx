import { listModules, loadInstrumentConfig } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { ModuleIndex } from '@/components/module-index';
import { WideShell } from '@/components/page-shell';

/**
 * Extract a purpose line from markdown content.
 * Returns the first non-heading, non-empty paragraph after frontmatter.
 */
function extractPurpose(content: string): string {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('#')) continue;
    if (trimmed.startsWith('---')) continue;
    if (trimmed.startsWith('|')) continue;
    return trimmed.length > 140 ? trimmed.slice(0, 137) + '...' : trimmed;
  }
  return '';
}

export default async function ModulesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = await loadConfig();
  const instrumentConfig = await loadInstrumentConfig(slug, config);
  const modules = await listModules(slug, config);

  if (modules.length === 0) {
    return (
      <WideShell className="lg:px-xl py-2xl text-center">
        <h1 className="text-4xl font-bold leading-[1.1] mb-sm">No modules documented yet</h1>
        <p className="text-muted text-base">
          Module documentation is coming soon. Check back after the next update.
        </p>
      </WideShell>
    );
  }

  const mappedModules = modules.map((mod) => ({
    slug: mod.slug,
    title: mod.data.title,
    category: mod.data.category,
    controlCount: mod.data.control_count,
    jackCount: mod.data.jack_count,
    hasNormals: mod.data.has_normals,
    purpose: extractPurpose(mod.content),
  }));

  return (
    <ModuleIndex
      instrumentSlug={slug}
      instrumentName={instrumentConfig.display_name}
      modules={mappedModules}
    />
  );
}
