import React from 'react';
import type { Command } from './types';
import type { ProjectItem } from '@/types/types';
import { Block } from '../components/blocks';
import { col, headerRow, rule, columnWidths } from '../lib/format';
import { getFlag } from './args';

/* ── deterministic PRNG (no Math.random at render) ────────────────────── */

function seeded(seed: number): () => number {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WEEKLY = 52; // GitHub-style weeks in a year view

/* ── 1. stats ─────────────────────────────────────────────────────────── */

const stats: Command = {
  name: 'stats',
  aliases: ['contribs', 'gh-stats', 'activity'],
  description: 'GitHub-style contribution activity + portfolio metrics.',
  usage: 'stats [--wide]',
  category: 'web',
  run(args, ctx) {
    const wide = getFlag(args, 'wide') !== undefined;
    const d = ctx.data;
    const rnd = seeded(d.PROJECT_DATA.length);
    const weeks = wide ? WEEKLY : 26;

    ctx.pushBlock(
      <Block title="contribution-activity — elli1216">
        <Heatmap weeks={weeks} rnd={rnd} />
        <div className="mt-3 pt-2 border-t border-border/40 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          <Stat label="projects" value={String(d.PROJECT_DATA.length)} />
          <Stat label="skills" value={String(d.SKILL_DATA.length)} />
          <Stat label="certificates" value={String(d.certificates.length)} />
          <Stat label="roles" value={String(d.EXPERIENCE_DATA.length)} />
        </div>
      </Block>
    );
  },
};

function Heatmap({ weeks, rnd }: { weeks: number; rnd: () => number }) {
  const rows = 7; // Sun..Sat
  const cells = Array.from({ length: weeks * rows }, () => Math.floor(rnd() * 5));
  const levels = [
    'bg-foreground/10',
    'bg-emerald-500/25',
    'bg-emerald-500/45',
    'bg-emerald-500/70',
    'bg-emerald-500',
  ];
  return (
    <div className="flex justify-center gap-[3px] overflow-x-auto no-scrollbar pb-1">
      {Array.from({ length: weeks }, (_, w) => (
        <div key={w} className="flex flex-col gap-[3px]">
          {Array.from({ length: rows }, (_, r) => (
            <span
              key={r}
              className={`size-2 rounded-[2px] shrink-0 ${levels[cells[w * rows + r]]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── 2. achievements ──────────────────────────────────────────────────── */

const achievements: Command = {
  name: 'achievements',
  aliases: ['awards', 'wins', 'honors'],
  description: 'Hackathon placements, awards, and highlight projects.',
  category: 'about',
  run(_args, ctx) {
    const awards = ctx.data.PROJECT_DATA.filter(
      (p) => p.hackathonTitle || p.placement || p.metrics
    );
    if (awards.length === 0) {
      ctx.push('no tracked achievements yet.', 'muted');
      return;
    }
    ctx.pushBlock(<AchievementList items={awards} />);
  },
};

function AchievementList({ items }: { items: ProjectItem[] }) {
  return (
    <Block title="honors.txt — hackathons & highlights">
      <div className="space-y-3">
        {items.map((p) => (
          <div key={p.title} className="space-y-0.5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-primary font-semibold">◆ {p.title}</span>
              {p.placement && (
                <span className="text-emerald-500 font-bold text-[11px]">{p.placement}</span>
              )}
            </div>
            {p.hackathonTitle && (
              <div className="text-accent-foreground text-[11px] pl-5">🏆 {p.hackathonTitle}</div>
            )}
            {p.metrics && (
              <div className="flex gap-3 pl-5 text-[11px] text-muted-foreground">
                {p.metrics.map((m) => (
                  <span key={m.label}>
                    <span className="text-foreground font-bold">{m.value}</span> {m.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Block>
  );
}

/* ── 3. timeline ──────────────────────────────────────────────────────── */

const timeline: Command = {
  name: 'timeline',
  aliases: ['journey', 'path', 'career'],
  description: 'Chronological career path.',
  category: 'about',
  run(_args, ctx) {
    const experiences = [...ctx.data.EXPERIENCE_DATA].reverse(); // oldest → newest
    ctx.pushBlock(
      <Block title="career.gpg — chronological path">
        <div className="space-y-2.5">
          {experiences.map((e, i) => {
            const last = i === experiences.length - 1;
            return (
              <div key={`${e.company}-${e.period}`} className="flex gap-3">
                {/* rail */}
                <div className="flex flex-col items-center shrink-0">
                  <span className="size-2.5 rounded-full bg-primary mt-1" />
                  {!last && <span className="w-px flex-1 min-h-6 bg-border" />}
                </div>
                {/* content */}
                <div className="pb-2 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="text-foreground font-semibold">{e.role}</span>
                    <span className="text-primary text-[11px]">{e.period}</span>
                  </div>
                  <div className="text-accent text-[11px]">{e.company}</div>
                  <div className="text-muted-foreground text-[11px]">{e.location}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Block>
    );
  },
};

/* ── 4. compare ───────────────────────────────────────────────────────── */

const compare: Command = {
  name: 'compare',
  aliases: ['projects-table', 'matrix'],
  description: 'Side-by-side project comparison table.',
  usage: 'compare [--stack N]',
  category: 'data',
  run(args, ctx) {
    const stackN = Math.max(1, Math.min(6, Number(getFlag(args, 'stack') ?? '3') || 3));
    const rows = ctx.data.PROJECT_DATA.map((p) => [
      truncate(p.title, 22),
      truncate(p.category ?? '—', 10),
      truncate(
        p.techStack.slice(0, stackN).join(', ') +
          (p.techStack.length > stackN ? `+${p.techStack.length - stackN}` : ''),
        34
      ),
      stringifyLink(p.demoLink || p.repoLink),
    ]);
    const widths = columnWidths(rows, 6);
    const out = [
      headerRow(['TITLE', 'CATEGORY', `TECH (${stackN})`, 'LINK'], widths),
      rule(
        '─',
        widths.reduce((a, b) => a + b, 0)
      ),
      ...rows.map((r) =>
        r
          .map((cell, i) => col(cell, widths[i]))
          .join('')
          .trimEnd()
      ),
    ];
    ctx.pushBlock(
      <Block title="projects.compare()">
        <pre className="whitespace-pre-wrap break-words text-[11px] sm:text-xs leading-snug">
          {out.join('\n')}
        </pre>
      </Block>
    );
  },
};

function stringifyLink(link?: string): string {
  if (!link) return '—';
  return link.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1) + '…';
}

/* ── small shared helpers ─────────────────────────────────────────────── */

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="px-2 py-1.5 rounded bg-muted/30 border border-border/40 text-center">
    <div className="text-lg font-bold text-primary leading-none">{value}</div>
    <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>
  </div>
);

export const insightCommands: Command[] = [stats, achievements, timeline, compare];
