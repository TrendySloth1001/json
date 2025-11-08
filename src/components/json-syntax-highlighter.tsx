'use client';

import { useMemo } from 'react';

type JsonSyntaxHighlighterProps = {
  jsonString: string;
};

export function JsonSyntaxHighlighter({ jsonString }: JsonSyntaxHighlighterProps) {
  const highlightedJson = useMemo(() => {
    if (!jsonString) {
      return '';
    }
    const html = jsonString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return html.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'text-syntax-number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'text-syntax-key';
          } else {
            cls = 'text-syntax-string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'text-syntax-boolean';
        } else if (/null/.test(match)) {
          cls = 'text-syntax-null';
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  }, [jsonString]);

  return (
    <pre className="p-4 text-sm font-mono">
      <code dangerouslySetInnerHTML={{ __html: highlightedJson }} />
    </pre>
  );
}
