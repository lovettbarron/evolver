import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkWikiLink from 'remark-wiki-link';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeCallouts from 'rehype-callouts';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';

import { rehypeMermaidPlaceholder } from './plugins/mermaid-placeholder';
import { rehypeParamTable } from './plugins/param-table';
import { rehypeObsidianTags } from './plugins/obsidian-tags';
import { remarkObsidianEmbeds } from './plugins/obsidian-embeds';

/**
 * Creates a configured unified markdown processor with all Obsidian-flavored plugins.
 *
 * Plugin order (CRITICAL):
 * 1. remarkParse
 * 2. remarkFrontmatter(['yaml']) -- strip YAML from output
 * 3. remarkGfm -- tables, task lists
 * 4. remarkObsidianEmbeds -- before wikilinks
 * 5. remarkWikiLink -- configured with permalinks and href template
 * 6. remarkRehype({ allowDangerousHtml: true })
 * 7. rehypeRaw
 * 8. rehypeMermaidPlaceholder -- BEFORE highlight
 * 9. rehypeCallouts
 * 10. rehypeHighlight
 * 11. rehypeParamTable
 * 12. rehypeObsidianTags
 * 13. rehypeSlug
 * 14. rehypeAutolinkHeadings
 * 15. rehypeStringify
 */
export function createMarkdownProcessor(wikilinkPermalinks: string[] = []) {
  return unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkObsidianEmbeds)
    .use(remarkWikiLink, {
      permalinks: wikilinkPermalinks,
      hrefTemplate: (permalink: string) => `/instruments/evolver/${permalink}`,
      aliasDivider: '|',
      wikiLinkClassName: 'wikilink',
      newClassName: 'wikilink-broken',
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeMermaidPlaceholder)
    .use(rehypeCallouts, {
      callouts: {
        challenge: {
          title: 'Challenge',
          indicator: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
        },
      },
    })
    .use(rehypeHighlight)
    .use(rehypeParamTable)
    .use(rehypeObsidianTags)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'prepend',
      properties: { className: ['heading-anchor'], ariaHidden: 'true' },
      content: { type: 'text', value: '#' },
    })
    .use(rehypeStringify);
}

/**
 * Renders Obsidian-flavored markdown content to HTML.
 *
 * @param content - Raw markdown string (may include YAML frontmatter)
 * @param permalinks - Array of valid wikilink targets for link resolution
 * @returns Rendered HTML string
 */
export async function renderMarkdown(
  content: string,
  permalinks: string[] = []
): Promise<string> {
  const processor = createMarkdownProcessor(permalinks);
  const result = await processor.process(content);
  return String(result);
}
