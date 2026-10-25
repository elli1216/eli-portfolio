import React from 'react';
import { Section } from './Section';
import { ArrowDown } from 'lucide-react';
import { DEVELOPMENT_WORKFLOW } from '@/constants/constants';

export const WorkflowSection: React.FC = () => (
  <Section id="workflow" command="workflow" comment="plan -> prototype -> iterate -> ship">
    <div className="relative mx-auto max-w-2xl">
      <div className="flex flex-col gap-8">
        {DEVELOPMENT_WORKFLOW.map((step, index) => (
          <div key={step.step} className="relative">
            <article className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:bg-card/60">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/60 bg-primary/10 font-mono text-sm text-primary">
                    {step.step.toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    {step.command && (
                      <span className="mt-1 inline-block font-mono text-[10px] text-muted-foreground/70">
                        {step.command}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </article>
            {index < DEVELOPMENT_WORKFLOW.length - 1 && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                <ArrowDown className="text-primary/60" size={24} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export default WorkflowSection;
