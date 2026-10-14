import React from 'react';
import { Section } from './Section';
import { EXPERIENCE_DATA } from '@/constants/constants';

/** Experience section — a clean timeline (no terminal-window chrome). */
export const ExperienceSection: React.FC = () => (
  <Section id="experience" command="experience" comment="work history">
    <ol className="relative space-y-10 border-l border-border/50 pl-6 sm:pl-8">
      {EXPERIENCE_DATA.map((entry) => (
        <li key={entry.company + entry.period} className="relative">
          <span className="absolute -left-6 top-1.5 size-2.5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background sm:-left-8" />

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-base font-semibold text-foreground sm:text-lg">{entry.role}</h3>
            <span className="font-mono text-[11px] text-muted-foreground sm:text-xs">
              {entry.period}
            </span>
          </div>

          <p className="mt-0.5 text-sm">
            <span className="text-primary">{entry.company}</span>
            <span className="text-border"> ┆ </span>
            <span className="text-muted-foreground">{entry.location}</span>
          </p>

          <ul className="mt-3 space-y-1.5">
            {entry.description.map((line, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/60" />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          {entry.certificate && (
            <a
              href={entry.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-mono text-[11px] text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
            >
              view certificate →
            </a>
          )}
        </li>
      ))}
    </ol>
  </Section>
);

export default ExperienceSection;
