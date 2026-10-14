import React from 'react';

interface Props {
  /** The command echoed after the prompt, e.g. `experience`. */
  command: string;
  /** Optional inline comment rendered after the command (`# ...`). */
  comment?: string;
  className?: string;
}

/**
 * The prompt line that opens every section:
 * `eli@portfolio:~$ <command>` with a blinking block caret.
 */
export const SectionCommand: React.FC<Props> = ({ command, comment, className = '' }) => (
  <div
    className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-xs sm:text-sm ${className}`}
  >
    <span className="text-primary font-bold select-none">eli@portfolio</span>
    <span className="text-muted-foreground/50 select-none">:</span>
    <span className="text-muted-foreground/70 select-none">~</span>
    <span className="text-muted-foreground/50 select-none">$</span>
    <span className="text-foreground">{command}</span>
    {comment && <span className="text-muted-foreground/50 select-none"># {comment}</span>}
    <span
      className="animate-caret inline-block h-[1.05em] w-[0.5em] translate-y-[0.1em] bg-primary"
      aria-hidden
    />
  </div>
);

export default SectionCommand;
