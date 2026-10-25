import React from 'react';
import { Section } from './Section';
import { EXPERIENCE_DATA } from '@/constants/constants';

/** Experience section — zigzag timeline of roles. */
export const ExperienceSection: React.FC = () => (
  <Section id="experience" command="experience" comment="work history">
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-border/40 to-transparent sm:left-1/2 sm:-translate-x-px" />
      <div className="space-y-10">
        {EXPERIENCE_DATA.map((entry, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={entry.company + entry.period} className="relative">
              <div className="absolute left-4 top-6 -translate-x-1/2 sm:left-1/2">
                <span className="flex size-3 items-center justify-center rounded-full bg-primary ring-8 ring-primary/10" />
              </div>
              <div
                className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                  isLeft ? 'sm:mr-auto' : 'sm:ml-auto'
                }`}
              >
                <article className="relative overflow-hidden rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:bg-card/60 sm:p-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground sm:text-xl">{entry.role}</h3>
                        <p className="mt-1 text-sm">
                          <span className="text-primary font-medium">{entry.company}</span>
                          <span className="mx-2 text-border">•</span>
                          <span className="text-muted-foreground">{entry.location}</span>
                        </p>
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground sm:text-xs">
                        {entry.period}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {entry.description.map((line, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  {entry.certificate && (
                    <a
                      href={entry.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                    >
                      view certificate <span aria-hidden>→</span>
                    </a>
                  )}
                </article>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </Section>
);

export default ExperienceSection;
