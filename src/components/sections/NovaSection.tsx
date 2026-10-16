import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUp, RotateCcw, Sparkles } from 'lucide-react';
import { Section } from './Section';
import { NovaMarkdown } from '@/components/shared/NovaMarkdown';

/** Mirror of the server-side validation in `api/chat.ts`. */
const MAX_LEN = 200;

const SUGGESTIONS = [
  "What's his tech stack?",
  'Tell me about his experience.',
  'Show me his projects.',
  'How can I contact him?',
];

type ChatRole = 'user' | 'model';

interface ChatMessage {
  id: number;
  role: ChatRole;
  content: string;
  error?: boolean;
}

let messageId = 0;

/**
 * "Ask AI" section — a Claude-Code-style agent panel that talks to the Nova
 * chatbot via the serverless `/api/chat` endpoint.
 */
export const NovaSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<{ role: ChatRole; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Keep the transcript pinned to the latest turn.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending]);

  // Auto-grow the composer up to a few lines.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  const send = useCallback(
    async (raw?: string) => {
      const text = (raw ?? input).trim();
      if (!text || pending) return;

      setInput('');
      setMessages((prev) => [...prev, { id: ++messageId, role: 'user', content: text }]);
      setPending(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history }),
          signal: controller.signal,
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data?.error ?? `Request failed (${response.status})`);
        }

        const reply: string = data.text ?? '(empty response)';
        setMessages((prev) => [...prev, { id: ++messageId, role: 'model', content: reply }]);
        setHistory((prev) => [
          ...prev,
          { role: 'user', content: text },
          { role: 'model', content: reply },
        ]);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        const msg = err instanceof Error ? err.message : String(err);
        setMessages((prev) => [...prev, { id: ++messageId, role: 'model', content: msg, error: true }]);
      } finally {
        setPending(false);
        abortRef.current = null;
      }
    },
    [input, pending, history],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setHistory([]);
    setInput('');
    setPending(false);
  }, []);

  const remaining = MAX_LEN - input.length;

  return (
    <Section id="nova" command="nova" comment="ask about eli">
      <div className="flex h-[28rem] flex-col overflow-hidden rounded-xl border border-border/70 bg-card/40 backdrop-blur-sm sm:h-[32rem]">
        {/* Status bar */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border/50 bg-muted/40 px-3 py-2">
          <div className="flex min-w-0 items-center gap-2 font-mono text-[10px] uppercase tracking-wider sm:text-xs">
            <span className="flex shrink-0 gap-1" aria-hidden>
              <span className="size-2.5 rounded-full bg-rose-500/70" />
              <span className="size-2.5 rounded-full bg-amber-500/70" />
              <span className="size-2.5 rounded-full bg-emerald-500/70" />
            </span>
            <span className="text-primary font-bold">nova</span>
            <span className="text-border">·</span>
            <span className="truncate text-muted-foreground">about eli</span>
            <span className="hidden shrink-0 items-center gap-1 text-emerald-500 sm:flex">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              online
            </span>
          </div>
          <button
            type="button"
            onClick={reset}
            disabled={messages.length === 0 && !pending}
            className="flex shrink-0 items-center gap-1.5 rounded-md border border-border/50 bg-muted/30 px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw size={11} />
            <span className="hidden sm:inline">clear</span>
          </button>
        </div>

        {/* Transcript */}
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          data-lenis-prevent="true"
          className="term-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-4 font-mono text-xs sm:px-4 sm:text-sm"
        >
          {messages.length === 0 && !pending ? (
            <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary">
                <Sparkles size={13} />
                <span>Nova</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Hey! I'm Nova, Eli's AI assistant. Ask me anything about his background,
                experience, projects, skills, or how to get in touch.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void send(suggestion)}
                    className="rounded-md border border-border/50 bg-muted/30 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="flex items-start gap-2">
                <span
                  className={`mt-0.5 shrink-0 select-none font-bold ${
                    message.role === 'user'
                      ? 'text-muted-foreground'
                      : message.error
                        ? 'text-rose-500'
                        : 'text-primary'
                  }`}
                  aria-hidden
                >
                  {message.role === 'user' ? '>' : '⏺'}
                </span>
                {message.role === 'user' ? (
                  <span className="min-w-0 flex-1 whitespace-pre-wrap break-words text-foreground">
                    {message.content}
                  </span>
                ) : message.error ? (
                  <span className="min-w-0 flex-1 break-words text-rose-500/90">
                    {message.content}
                  </span>
                ) : (
                  <NovaMarkdown className="min-w-0 flex-1 text-xs sm:text-sm">
                    {message.content}
                  </NovaMarkdown>
                )}
              </div>
            ))
          )}

          {pending && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="select-none font-bold text-primary" aria-hidden>
                ⏺
              </span>
              <span className="flex items-center gap-2">
                <span>Thinking</span>
                <span className="flex gap-0.5" aria-hidden>
                  <span className="size-1 animate-bounce rounded-full bg-primary/70 [animation-delay:-0.3s]" />
                  <span className="size-1 animate-bounce rounded-full bg-primary/70 [animation-delay:-0.15s]" />
                  <span className="size-1 animate-bounce rounded-full bg-primary/70" />
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void send();
          }}
          className="flex shrink-0 items-end gap-2 border-t border-border/60 bg-muted/20 px-3 py-2.5"
        >
          <span
            className="select-none font-mono font-bold text-primary"
            aria-hidden
          >
            &gt;
          </span>
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            maxLength={MAX_LEN}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                void send();
              }
            }}
            placeholder="Ask about Eli's experience, projects, or skills…"
            aria-label="Ask Nova a question"
            className="term-scrollbar max-h-30 min-w-0 flex-1 resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none sm:text-sm"
          />
          <button
            type="submit"
            disabled={pending || input.trim().length === 0}
            aria-label="Send message"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary transition-colors hover:bg-primary/20 disabled:cursor-not-allowed disabled:border-border/50 disabled:bg-muted/30 disabled:text-muted-foreground"
          >
            <ArrowUp size={16} />
          </button>
        </form>

        {/* Hint row */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-border/40 bg-muted/10 px-3 py-1.5 font-mono text-[10px] text-muted-foreground">
          <span className="hidden sm:inline">enter to send · shift + enter for a new line</span>
          <span className="sm:hidden">enter to send</span>
          <span className={remaining <= 20 ? 'text-amber-500' : ''}>{remaining}</span>
        </div>
      </div>
    </Section>
  );
};

export default NovaSection;
