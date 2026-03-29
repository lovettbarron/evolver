import type { Root, Text } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * remark plugin (runs on mdast, before remark-rehype) that handles
 * Obsidian embed syntax: ![[filename]]
 *
 * Replaces with a raw HTML node that produces:
 * <div class="obsidian-embed" data-embed="filename">
 *   <p class="embed-placeholder">Embedded content: filename</p>
 * </div>
 */
export function remarkObsidianEmbeds() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return;

      const embedPattern = /!\[\[([^\]]+)\]\]/g;
      const text = node.value;
      let match: RegExpExecArray | null;
      const parts: any[] = [];
      let lastIndex = 0;

      while ((match = embedPattern.exec(text)) !== null) {
        const [fullMatch, filename] = match;
        const matchStart = match.index;

        // Add text before the match
        if (matchStart > lastIndex) {
          parts.push({
            type: 'text',
            value: text.slice(lastIndex, matchStart),
          });
        }

        // Add HTML node for the embed
        parts.push({
          type: 'html',
          value: `<div class="obsidian-embed" data-embed="${filename}"><p class="embed-placeholder">Embedded content: ${filename}</p></div>`,
        });

        lastIndex = matchStart + fullMatch.length;
      }

      if (parts.length === 0) return;

      // Add remaining text
      if (lastIndex < text.length) {
        parts.push({ type: 'text', value: text.slice(lastIndex) });
      }

      // Replace the text node with the parts
      parent.children.splice(index, 1, ...parts);

      return index + parts.length;
    });
  };
}
