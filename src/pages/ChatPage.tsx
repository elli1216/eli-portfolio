import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { NovaMarkdown } from '@/components/shared/NovaMarkdown';
import { ArrowUp, RotateCcw, Sparkles, Loader } from 'lucide-react';

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

export const ChatPage: React.FC = () => {
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
    <div className="min-h-screen py-20 md:py-32 px-6 md:px-0">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          number="07"
          title="Ask AI"
          description="Chat with Nova, an AI assistant trained on my portfolio."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex h-[28rem] md:h-[32rem] flex-col rounded-lg border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-colors"
        >
          {/* Messages Area */}
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
          >
            {messages.length === 0 && !pending ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Hi, I'm Nova</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  I'm an AI assistant trained on Eli's portfolio. Ask me anything about his background, projects, or skills.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void send(suggestion)}
                      className="px-3 py-2 text-xs rounded-lg border border-border/60 bg-card/40 text-foreground hover:border-primary/60 hover:bg-card/60 transition-all duration-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 items-start"
                >
                  {message.role === 'model' && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`inline-block max-w-xs md:max-w-md px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary/10 text-foreground'
                          : message.error
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-muted/40 text-foreground'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      ) : message.error ? (
                        <p className="text-sm">{message.content}</p>
                      ) : (
                        <div className="text-sm leading-relaxed">
                          <NovaMarkdown>{message.content}</NovaMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {pending && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 items-start"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader className="w-3.5 h-3.5 text-primary animate-spin" />
                </div>
                <div className="bg-muted/40 px-4 py-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Nova is thinking...</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-border/40 bg-muted/20 px-6 py-4 space-y-3">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void send();
              }}
              className="flex gap-3 items-end"
            >
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
                placeholder="Ask me anything..."
                aria-label="Ask Nova a question"
                className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none max-h-20"
              />
              <div className="flex gap-2">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    disabled={messages.length === 0 && !pending}
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border border-border/60 bg-muted/40 text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors disabled:opacity-50"
                    aria-label="Clear chat"
                  >
                    <RotateCcw size={18} />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={pending || input.trim().length === 0}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
                  aria-label="Send message"
                >
                  <ArrowUp size={18} />
                </button>
              </div>
            </form>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Enter to send · Shift + Enter for new line</span>
              <span className={remaining <= 20 ? 'text-amber-500' : ''}>{remaining}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
