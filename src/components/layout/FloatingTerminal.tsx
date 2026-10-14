import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Terminal, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useTerminal } from '@/terminal/useTerminal';
import { useTerminalInput } from '@/terminal/useTerminalInput';
import { TerminalOutput } from '@/terminal/TerminalOutput';
import { TerminalInput } from '@/terminal/TerminalInput';
import { getRegistry, getCommandList } from '@/terminal/commands';
import { parseCommand } from '@/terminal/parser';
import { SECTIONS } from '@/constants/constants';

const QUICK_COMMANDS = ['help', 'ls', 'cat readme', 'whoami', 'neofetch', 'resume'];

/**
 * Sticky command bar pinned to the bottom of the single-page layout.
 *
 * Typing a section command (e.g. `experience`) smooth-scrolls to that section;
 * any other command prints into a collapsible output drawer above the input,
 * reusing the terminal command engine.
 *
 * The bar mounts/unmounts as the hero scrolls in and out of view; an
 * AnimatePresence wrapper animates it up on enter and down on exit.
 */
export const FloatingTerminal: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const term = useTerminal({ inputRef, scrollRef, autoWelcome: false });

  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [heroInView, setHeroInView] = useState(true);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Map every section command + alias to its DOM anchor. */
  const sectionByCommand = useMemo(() => {
    const map: Record<string, string> = {};
    for (const section of SECTIONS) {
      map[section.command] = section.id;
      for (const alias of section.aliases) map[alias] = section.id;
    }
    return map;
  }, []);

  const flashStatus = useCallback((message: string) => {
    setStatus(message);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(null), 1800);
  }, []);

  const handleSubmit = useCallback(
    (raw: string) => {
      const value = raw.trim();
      if (!value) return;

      const { command, args } = parseCommand(value);
      const targetId = sectionByCommand[command];

      // Bare section command → navigate. Commands with args (e.g. `experience 2`)
      // fall through to the engine so their detail output renders in the drawer.
      if (targetId && args.length === 0) {
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        flashStatus(`→ ${command}`);
        return;
      }

      setExpanded(true);
      void term.execute(value);
    },
    [sectionByCommand, flashStatus, term],
  );

  const input = useTerminalInput({
    registry: getRegistry,
    commands: getCommandList,
    onSubmit: handleSubmit,
    onHint: (text) => {
      setExpanded(true);
      term.push(text, 'muted');
    },
  });

  const runQuick = useCallback(
    (command: string) => {
      input.addHistory(command);
      handleSubmit(command);
    },
    [input, handleSubmit],
  );

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  // Escape collapses the output drawer.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Clear any pending status timer on unmount.
  useEffect(
    () => () => {
      if (statusTimer.current) clearTimeout(statusTimer.current);
    },
    [],
  );

  // Show the bar once roughly half of the hero has been scrolled past.
  // Compared against the hero's own height (hero is `min-h-[100dvh]`, so half
  // its height == half a viewport scrolled). Uses the same `window.scrollY`
  // approach as the Navbar.
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) {
      setHeroInView(false);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      setHeroInView(window.scrollY < hero.offsetHeight / 2);
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const hasOutput = term.lines.length > 0;

  // All hooks run above this point so terminal state survives while the bar is
  // hidden. AnimatePresence keeps the node mounted just long enough to play the
  // exit animation when the hero scrolls back into view.
  return (
    <AnimatePresence>
      {!heroInView && (
        <motion.div
          key="floating-terminal"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.8 }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 pl-3 pr-[4.5rem] pb-3 sm:pl-4 sm:pr-[4.5rem] sm:pb-4 lg:pr-4"
        >
          <div
            onClick={focusInput}
            className="pointer-events-auto mx-auto w-full max-w-3xl rounded-xl border border-border/70 bg-card/85 shadow-2xl backdrop-blur-md"
          >
            {hasOutput ? (
              <>
                {/* Output drawer header */}
                <div className="flex items-center justify-between gap-2 rounded-t-xl border-b border-border/60 bg-muted/40 px-3 py-1.5">
                  <div className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] text-muted-foreground sm:text-xs">
                    <Terminal size={12} className="shrink-0 text-primary" />
                    <span className="truncate">eli@portfolio — output</span>
                    <span className="hidden text-border sm:inline">┆</span>
                    <span className="hidden shrink-0 sm:inline">{term.lines.length} lines</span>
                    {status && <span className="shrink-0 text-primary">{status}</span>}
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setExpanded((value) => !value);
                      }}
                      aria-label={expanded ? 'Collapse output' : 'Expand output'}
                      className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        void term.execute('clear');
                      }}
                      aria-label="Clear output"
                      className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Scrollback (collapsible) */}
                {expanded && (
                  <div
                    ref={scrollRef}
                    onScroll={term.onScroll}
                    data-lenis-prevent="true"
                    role="log"
                    aria-live="polite"
                    aria-relevant="additions"
                    className="term-scrollbar max-h-[40vh] overflow-y-auto px-3 py-3 font-mono text-xs sm:px-4 sm:text-sm"
                  >
                    <TerminalOutput lines={term.lines} />
                  </div>
                )}
              </>
            ) : (
              /* Empty state: quick-command chips + hint */
              <div className="flex items-center gap-2 overflow-x-auto rounded-t-xl bg-muted/10 px-3 py-1.5 no-scrollbar">
                <span className="hidden shrink-0 font-mono text-[10px] text-muted-foreground sm:inline">
                  try:
                </span>
                {QUICK_COMMANDS.map((command) => (
                  <button
                    key={command}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      runQuick(command);
                    }}
                    className="shrink-0 rounded-md border border-border/50 bg-muted/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {command}
                  </button>
                ))}
              </div>
            )}

            <TerminalInput ref={inputRef} api={input} />
          </div>

          {/* Transient navigation status (shown while the drawer is collapsed) */}
          {status && !hasOutput && (
            <div className="mx-auto mt-1 max-w-3xl px-1 text-right font-mono text-[10px] text-primary">
              {status}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingTerminal;
