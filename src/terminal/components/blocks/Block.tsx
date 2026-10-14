import React from 'react';

interface BlockProps {
  title: string;
  tone?: 'default' | 'accent' | 'ok' | 'err';
  children: React.ReactNode;
  className?: string;
}

/**
 * A shared bordered "output block" used to render rich command output as a
 * single cohesive unit inside the terminal scrollback.
 */
export const Block: React.FC<BlockProps> = ({ title, tone = 'default', children, className = '' }) => {
  const titleTone =
    tone === 'accent'
      ? 'text-primary'
      : tone === 'ok'
        ? 'text-emerald-500'
        : tone === 'err'
          ? 'text-rose-500'
          : 'text-muted-foreground';

  return (
    <div
      className={`my-1 flex h-full flex-col rounded-lg border border-border/60 bg-card/40 overflow-hidden ${className}`}
    >
      <div
        className={`px-3 py-1.5 bg-muted/40 border-b border-border/50 text-[10px] font-mono uppercase tracking-wider flex items-center gap-2 ${titleTone}`}
      >
        <span className="text-primary font-bold shrink-0">▸</span>
        <span className="truncate">{title}</span>
      </div>
      <div className="flex-1 p-3 sm:p-4 text-xs sm:text-sm font-mono text-foreground">
        {children}
      </div>
    </div>
  );
};

export default Block;
