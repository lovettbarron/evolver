import fs from 'fs/promises';
import path from 'path';
import { renderMarkdown } from '@/lib/markdown/processor';
import { loadConfig } from '@/lib/config';

export default async function AboutPage() {
  const config = await loadConfig();
  const isDemoMode = !config.vaultPath;
  // Read framework docs from project root (not from content directory)
  // These are bundled in src/content/framework/ by the bundle script,
  // but also exist at project root. Try bundled first, fall back to root.
  let readmeMd = '';
  let adhdMd = '';

  try {
    readmeMd = await fs.readFile(path.join(process.cwd(), 'src/content/framework/README.md'), 'utf-8');
  } catch {
    try {
      readmeMd = await fs.readFile(path.join(process.cwd(), 'framework/README.md'), 'utf-8');
    } catch {
      readmeMd = '# Framework\n\nFramework documentation not found.';
    }
  }

  try {
    adhdMd = await fs.readFile(path.join(process.cwd(), 'src/content/framework/adhd-design.md'), 'utf-8');
  } catch {
    try {
      adhdMd = await fs.readFile(path.join(process.cwd(), 'framework/adhd-design.md'), 'utf-8');
    } catch {
      adhdMd = '';
    }
  }

  const readmeHtml = await renderMarkdown(readmeMd);
  const adhdHtml = adhdMd ? await renderMarkdown(adhdMd) : '';

  return (
    <div className="max-w-[720px] mx-auto px-lg lg:px-xl py-2xl">
      <h1 className="text-4xl font-bold mb-2xl">About This Method</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: readmeHtml }} />
      {adhdHtml && (
        <>
          <hr className="border-muted/30 my-2xl" />
          <div className="prose" dangerouslySetInnerHTML={{ __html: adhdHtml }} />
        </>
      )}
      {isDemoMode && (
        <section className="mt-2xl p-lg bg-surface rounded border border-surface">
          <h2 className="text-xl font-bold mb-md">Run It Yourself</h2>
          <p className="text-muted mb-md">
            This is a demo showing the Evolver learning system with synthetic practice data.
            To use it with your own Evolver and Obsidian vault:
          </p>
          <ol className="list-decimal pl-lg text-muted space-y-xs">
            <li>Clone the repository: <code className="text-param">git clone https://github.com/lovettbarron/evolver.git</code></li>
            <li>Install dependencies: <code className="text-param">npm install</code></li>
            <li>Create <code className="text-param">evolver.config.json</code> with your vault path</li>
            <li>Run <code className="text-param">npm run dev</code></li>
          </ol>
        </section>
      )}
    </div>
  );
}
