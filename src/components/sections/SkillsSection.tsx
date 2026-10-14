import React from 'react';
import { Section } from './Section';
import { SKILL_DATA } from '@/constants/constants';
import type { SkillItem } from '@/types/types';

const CATEGORY_LABEL: Record<SkillItem['category'], string> = {
  frontend: 'frontend',
  backend: 'backend',
  tools: 'tools',
};

const CATEGORY_COLOR: Record<SkillItem['category'], string> = {
  frontend: 'text-sky-400',
  backend: 'text-amber-400',
  tools: 'text-purple-400',
};

/** Skills section — grouped chips (no terminal-window chrome). */
export const SkillsSection: React.FC = () => {
  const categories: SkillItem['category'][] = ['frontend', 'backend', 'tools'];

  return (
    <Section id="skills" command="skills" comment="grouped by category">
      <div className="space-y-8">
        {categories.map((category) => {
          const skills = SKILL_DATA.filter((skill) => skill.category === category);
          if (skills.length === 0) return null;

          return (
            <div key={category}>
              <h3
                className={`font-mono text-xs uppercase tracking-[0.2em] ${CATEGORY_COLOR[category]}`}
              >
                <span className="text-muted-foreground">// </span>
                {CATEGORY_LABEL[category]}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card/40 px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/40 sm:text-sm"
                  >
                    {skill.name}
                    {skill.core && (
                      <span className="text-[9px] font-bold uppercase text-emerald-500">
                        core
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default SkillsSection;
