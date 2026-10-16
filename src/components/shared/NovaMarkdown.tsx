import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

/**
 * Terminal-themed Markdown renderers. Shared by the `nova` terminal command and
 * the dedicated "Ask AI" section so assistant replies look identical everywhere.
 */
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-base font-bold text-primary mt-3 mb-1 border-b border-border/60 pb-1">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-sm font-bold text-primary mt-3 mb-1">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-semibold text-primary/90 mt-2 mb-0.5">{children}</h3>
  ),
  p: ({ children }) => <p className="leading-relaxed">{children}</p>,
  strong: ({ children }) => (
    <strong className="text-foreground font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="text-primary/80 italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:text-primary/70 transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="space-y-0.5 pl-4 list-[disc] marker:text-primary/60">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-0.5 pl-4 list-[decimal] marker:text-primary/60">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  code: ({ className, children, ...rest }) => {
    const isBlock = className?.includes('language-');
    return isBlock ? (
      <pre className="bg-muted/60 border border-border/50 rounded-md px-3 py-2 overflow-x-auto my-2 no-scrollbar">
        <code className="text-xs font-mono text-foreground/80" {...rest}>
          {children}
        </code>
      </pre>
    ) : (
      <code
        className="bg-muted/60 border border-border/50 rounded px-1 py-0.5 text-xs font-mono text-primary/90"
        {...rest}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => <>{children}</>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary/50 pl-3 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-2 no-scrollbar">
      <table className="text-xs border-collapse w-full">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border/70">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="text-left px-2 py-1 text-primary font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-2 py-1 border-b border-border/30">{children}</td>
  ),
  hr: () => <hr className="border-border/50 my-3" />,
};

interface Props {
  children: string;
  className?: string;
}

export const NovaMarkdown: React.FC<Props> = ({ children, className = '' }) => (
  <div className={`leading-relaxed text-foreground/90 space-y-2 ${className}`}>
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {children}
    </ReactMarkdown>
  </div>
);

export default NovaMarkdown;
