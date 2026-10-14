import React, { forwardRef } from 'react';
import { useAccent } from '@/contexts/AccentContext';
import type { TerminalInputApi } from './useTerminalInput';

interface Props {
  api: TerminalInputApi;
  /** Extra classes merged onto the input form (e.g. corner rounding). */
  className?: string;
}

/**
 * The input row: terminal prompt, editable command, and a blinking caret.
 * Uses a native input so the mobile soft keyboard opens on tap.
 */
export const TerminalInput = forwardRef<HTMLInputElement, Props>(({ api, className = '' }, ref) => {
  const { currentAccent } = useAccent();
  const show = api.suggestions.length > 0;

  return (
    <div className="relative">
      {/* Live autocomplete dropdown (renders above the input row). */}
      {show && (
        <div
          role="listbox"
          aria-label="Command autocomplete"
          className="absolute bottom-full left-3 sm:left-4 right-3 sm:right-4 mb-1 z-30 max-h-48 overflow-y-auto no-scrollbar rounded-lg border border-border/70 bg-card/95 backdrop-blur-md shadow-xl py-1 term-scrollbar"
        >
          {api.suggestions.map((s) => (
            <button
              key={s}
              role="option"
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                api.setValue(s);
              }}
              className="w-full text-left px-3 py-1.5 font-mono text-xs sm:text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
            >
              <span className="text-primary shrink-0">{'>'}</span>
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          api.submit();
        }}
        className={`px-3 sm:px-4 py-3 border-t border-border/70 bg-muted/20 flex items-center gap-2 shrink-0 rounded-b-xl ${className}`}
      >
        <span className="text-primary font-bold text-xs sm:text-sm shrink-0 font-mono select-none">
          eli@portfolio:~$
        </span>
        <input
          ref={ref}
          type="text"
          value={api.value}
          onChange={(e) => api.setValue(e.target.value)}
          onKeyDown={api.onKeyDown}
          aria-label="Type a command"
          aria-autocomplete="list"
          aria-expanded={show}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="type a command — try 'help'"
          className="flex-1 min-w-0 bg-transparent text-foreground text-xs sm:text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none caret-transparent"
          style={{ caretColor: currentAccent }}
        />
        <button
          type="submit"
          tabIndex={-1}
          aria-hidden
          className="hidden"
        />
      </form>
    </div>
  );
});

TerminalInput.displayName = 'TerminalInput';
export default TerminalInput;
