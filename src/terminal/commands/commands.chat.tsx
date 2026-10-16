import type { Command } from './types';
import { getPositionals } from './args';
import { Block } from '../components/blocks';
import { NovaMarkdown } from '@/components/shared/NovaMarkdown';

/* Session-scoped Nova conversation state (survives clear). */
let novaHistory: { role: 'user' | 'model'; content: string }[] = [];

const SUGGESTIONS = [
  'What are his tech stack?',
  'Tell me about his experience.',
  'Show me his projects.',
  'What are his interests?',
];

async function askNova(text: string, ctx: Parameters<Command['run']>[1]) {
  ctx.pushBlock(
    <Block title="nova@ai — thinking…" tone="accent">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>streaming response…</span>
      </div>
    </Block>,
  );

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: novaHistory }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data?.error ?? 'Failed to reach the assistant');
    }

    const data = await response.json();
    const reply: string = data.text ?? '(empty response)';
    novaHistory = [...novaHistory, { role: 'user', content: text }, { role: 'model', content: reply }];
    ctx.pushBlock(
      <Block title="nova@ai — response" tone="accent">
        <NovaMarkdown className="text-sm">{reply}</NovaMarkdown>
      </Block>,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    ctx.push(`ERROR_CONNECTION: ${message}`, 'err');
  }
}

const nova: Command = {
  name: 'nova',
  aliases: ['ai', 'ask', 'ellai'],
  description: 'Ask the built-in AI assistant about Eli.',
  usage: 'nova <question>',
  category: 'assistant',
  run(args, ctx) {
    const question = getPositionals(args).join(' ').trim();

    if (!question) {
      ctx.push('Ask Nova anything — e.g.:', 'accent');
      ctx.spacer();
      for (const s of SUGGESTIONS) ctx.push(`  nova "${s}"`, 'muted');
      return;
    }

    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>((resolve) => {
      void askNova(question, ctx).finally(() => resolve());
    });
  },
};

const reset: Command = {
  name: 'nova-reset',
  aliases: ['ai-reset', 'forget'],
  description: 'Reset the Nova conversation context.',
  category: 'assistant',
  run(_args, ctx) {
    novaHistory = [];
    ctx.push('Nova conversation context cleared.', 'ok');
  },
};

export const assistantCommands: Command[] = [nova, reset];
