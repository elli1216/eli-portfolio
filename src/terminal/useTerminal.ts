import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { OutputLine, Tone } from './types';
import type { CommandContext } from './commands/types';
import { runCommand, getCommandList, getRegistry, buildRegistry } from './commands';
import { data } from './commands/data';
import { buildWelcomeIntro } from './data/banner';

export const MAX_LINES = 1500;
const RESUME_PATH = '/Floresca-Darl-Resume-2026.pdf';

export interface TerminalApi {
  lines: OutputLine[];
  history: string[];
  execute(input: string): Promise<void>;
  onScroll(): void;
  addWelcome(): void;
  push(text: string, tone?: Tone): void;
  scrollToBottom(): void;
}

interface TerminalRefs {
  inputRef: React.RefObject<HTMLInputElement | null>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  /** Print the welcome banner on mount (default true). */
  autoWelcome?: boolean;
}

export function useTerminal({ inputRef, scrollRef, autoWelcome = true }: TerminalRefs): TerminalApi {
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const blockId = useRef(0);
  const nearBottom = useRef(true);
  const booted = useRef(false);

  const pushLine = useCallback((line: OutputLine) => {
    setLines((prev) => {
      if (prev.length >= MAX_LINES) return [...prev.slice(-(MAX_LINES - 1)), line];
      return [...prev, line];
    });
  }, []);

  const pushMany = useCallback((next: OutputLine[]) => {
    setLines((prev) => {
      const all = next.length >= MAX_LINES ? next.slice(-MAX_LINES) : prev.concat(next);
      return all.length > MAX_LINES ? all.slice(-MAX_LINES) : all;
    });
  }, []);

  const push = useCallback(
    (text: string, tone?: Tone) => pushLine({ kind: 'text', text, tone }),
    [pushLine],
  );

  const pushBlock = useCallback(
    (node: React.ReactNode) => {
      blockId.current += 1;
      pushLine({ kind: 'block', id: blockId.current, node });
    },
    [pushLine],
  );

  const spacer = useCallback(() => pushLine({ kind: 'spacer' }), [pushLine]);
  const clear = useCallback(() => setLines([]), []);
  const echo = useCallback((command: string) => pushLine({ kind: 'cmd', command }), [pushLine]);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    nearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
  }, []);

  const openLink = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const openResume = useCallback(async () => {
    try {
      const response = await fetch(RESUME_PATH);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error opening resume:', err);
    }
  }, []);

  const addWelcome = useCallback(() => {
    const intro = buildWelcomeIntro();
    setLines([
      { kind: 'ascii' },
      ...intro.map((t) => ({ kind: 'text' as const, text: t, tone: 'default' as const })),
      { kind: 'spacer' },
      { kind: 'text', text: '──────────────────────────────────────────────────', tone: 'muted' },
      { kind: 'spacer' },
    ]);
  }, []);

  // Auto-scroll on new output (only when near the bottom).
  useEffect(() => {
    const el = scrollRef.current;
    if (el && nearBottom.current) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Bootstrap the registry (and optionally the welcome banner) once on mount.
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    buildRegistry();
    if (autoWelcome) addWelcome();
  }, [addWelcome, autoWelcome]);

  const execute = useCallback(
    async (input: string) => {
      const trimmed = input.trim();
      if (!trimmed) return;

      buildRegistry();

      const ctx: CommandContext = {
        push,
        pushBlock,
        pushLine,
        pushMany,
        spacer,
        clear,
        resetWelcome: () => {
          clear();
          setTimeout(addWelcome, 0);
        },
        echo,
        scrollToBottom,
        openLink,
        openResume,
        commands: getCommandList(),
        registry: getRegistry,
        history,
        data,
      };

      await runCommand(trimmed, ctx, getRegistry());
      setHistory((prev) => [...prev, trimmed]);
    },
    [push, pushBlock, pushLine, pushMany, spacer, clear, echo, scrollToBottom, openLink, openResume, history, addWelcome],
  );

  const api = useMemo<TerminalApi>(
    () => ({ lines, history, execute, onScroll, addWelcome, push, scrollToBottom }),
    [lines, history, execute, onScroll, addWelcome, push, scrollToBottom],
  );

  return api;
}
