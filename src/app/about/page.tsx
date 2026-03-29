import fs from 'fs/promises';
import path from 'path';
import { renderMarkdown } from '@/lib/markdown/processor';

export default async function AboutPage() {
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
    </div>
  );
}
