import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * rehype plugin that replaces mermaid code blocks with placeholder divs.
 * Must run BEFORE rehype-highlight to prevent mermaid code from being syntax-highlighted.
 *
 * Transforms: <pre><code class="language-mermaid">graph LR</code></pre>
 * Into: <div class="mermaid-placeholder" data-chart="graph LR"><noscript>...</noscript></div>
 */
export function rehypeMermaidPlaceholder() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (
        node.tagName !== 'pre' ||
        !parent ||
        index === undefined
      ) return;

      const codeEl = node.children.find(
        (child): child is Element =>
          child.type === 'element' && child.tagName === 'code'
      );

      if (!codeEl) return;

      const className = codeEl.properties?.className;
      if (!Array.isArray(className) || !className.includes('language-mermaid')) return;

      // Extract text content from the code element
      const chartContent = extractText(codeEl).trim();

      // Replace the <pre> node with a mermaid placeholder div
      const placeholder: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['mermaid-placeholder'],
          'data-chart': chartContent,
        },
        children: [
          {
            type: 'element',
            tagName: 'noscript',
            properties: {},
            children: [
              { type: 'text', value: 'Mermaid diagram (requires JavaScript)' },
            ],
          },
        ],
      };

      (parent as Element).children[index] = placeholder;
    });
  };
}

function extractText(node: any): string {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(extractText).join('');
  return '';
}
