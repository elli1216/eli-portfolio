import React from 'react';
import { Section } from './Section';
import { STORYLINE_MILESTONES } from '@/constants/constants';

/**
 * Storyline section — vertical timeline showing the journey from
 * first hello world in Java (2021) to now.
 */
export const StorySection: React.FC = () => (
  <Section id="story" command="story" comment="how i got here">
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary/70 via-border/40 to-transparent sm:left-28" />
      <div className="space-y-10">
        {STORYLINE_MILESTONES.map((milestone) => (
          <div key={`${milestone.year}-${milestone.title}`} className="relative flex gap-4 sm:gap-8">
            <div className="relative z-10 flex w-12 shrink-0 items-start justify-center sm:w-24">
              <span className="mt-1 flex h-12 w-12 items-center justify-center rounded-full border border-primary/60 bg-card/80 font-mono text-sm font-bold text-primary shadow-[0_0_0_8px_rgba(var(--accent-rgb),0.05)] sm:h-14 sm:w-14 sm:text-base">
                {milestone.year}
              </span>
            </div>
            <article className="relative flex-1 overflow-hidden rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:bg-card/60 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground sm:text-xl">{milestone.title}</h3>
                {milestone.period && (
                  <span className="font-mono text-[11px] text-muted-foreground sm:text-xs">
                    {milestone.period}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {milestone.description}
              </p>
              {milestone.tags && milestone.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {milestone.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/50 bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export default StorySection;
