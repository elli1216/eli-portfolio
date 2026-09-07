import React, { useCallback, useEffect, useRef } from 'react';
import { Terminal, Keyboard } from 'lucide-react';
import { useTerminal } from './useTerminal';
import { useTerminalInput } from './useTerminalInput';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { TerminalBadge } from '@/components/shared/terminal';
import { getRegistry, getCommandList } from './commands';

const QUICK_COMMANDS = [
  'ls',
  'cat aboutme.yaml',
  'cat readme',
  'experience',
  'projects',
  'skills --core',
  'whoami',
  'neofetch',
];

/**
 * The full-screen interactive terminal. Owns the chrome (header + scrollback +
 * input) and wires together the terminal state hook and input hook.
 */
export const TerminalEmulator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const term = useTerminal({ inputRef, scrollRef });
  const input = useTerminalInput({
    registry: getRegistry,
    commands: getCommandList,
    onSubmit: (v) => void term.execute(v),
    onHint: (t) => term.push(t, 'muted'),
  });

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  return (
    <section className="relative w-full h-[100dvh]" data-terminal>
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-5 h-full flex">
        <div className="flex flex-col w-full rounded-xl border border-border/70 bg-card/60 backdrop-blur-md overflow-hidden shadow-2xl">
          {/* Terminal chrome header */}
          <div
            className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-muted/40 border-b border-border/70 select-none"
            onClick={focusInput}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* All three traffic-light buttons close the terminal (return to Hero) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="size-2.5 sm:size-3 rounded-full bg-rose-500/80 hover:bg-rose-500 inline-block transition-colors cursor-target"
                aria-label="Close terminal"
                title="Close terminal"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="size-2.5 sm:size-3 rounded-full bg-amber-500/80 hover:bg-amber-500 inline-block transition-colors cursor-target"
                aria-label="Close terminal"
                title="Close terminal"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="size-2.5 sm:size-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 inline-block transition-colors cursor-target"
                aria-label="Close terminal"
                title="Close terminal"
              />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-muted-foreground truncate min-w-0">
              <Terminal size={12} className="text-primary shrink-0" />
              <span className="truncate">eli@portfolio — zsh (interactive)</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <TerminalBadge
                variant="success"
                label="ONLINE"
                pulse
                className="hidden sm:inline-flex"
              />
              <Keyboard size={13} className="text-muted-foreground" />
            </div>
          </div>

          {/* Scrollback */}
          <div
            ref={scrollRef}
            onScroll={term.onScroll}
            data-lenis-prevent="true"
            onClick={focusInput}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-5 py-4 font-mono text-xs sm:text-sm term-scrollbar"
          >
            <TerminalOutput lines={term.lines} />
          </div>

          {/* Quick command chips (touch friendly / discoverability) */}
          <div
            className="px-3 sm:px-5 py-1.5 bg-muted/10 border-t border-border/40 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0"
            onClick={focusInput}
          >
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  input.addHistory(cmd);
                  void term.execute(cmd);
                }}
                className="cursor-target shrink-0 px-2.5 py-1 rounded-md bg-muted/40 border border-border/50 text-[10px] font-mono text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Input row */}
          <TerminalInput ref={inputRef} api={input} />
        </div>
      </div>
    </section>
  );
};

export default TerminalEmulator;
