'use client';

import { useEffect } from 'react';

export function MermaidRenderer() {
  useEffect(() => {
    const renderDiagrams = async () => {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#161616',
          primaryTextColor: '#e8e8e8',
          lineColor: '#737373',
        },
      });
      const placeholders = document.querySelectorAll('.mermaid-placeholder');
      for (const el of placeholders) {
        const diagram = el.getAttribute('data-diagram');
        if (diagram) {
          try {
            const { svg } = await mermaid.render(
              `mermaid-${Date.now()}-${Math.random().toString(36).slice(2)}`,
              diagram,
            );
            el.innerHTML = svg;
            el.classList.remove('mermaid-placeholder');
          } catch (e) {
            console.error('Mermaid render error:', e);
          }
        }
      }
    };
    renderDiagrams();
  }, []);

  return null;
}
