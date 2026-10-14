import React from 'react';
import type { SkillItem } from '@/types/types';
import { Block } from './Block';

interface Props {
  items: SkillItem[];
}

const CATEGORY_COLORS: Record<SkillItem['category'], string> = {
  frontend: 'text-sky-400',
  backend: 'text-amber-400',
  tools: 'text-purple-400',
};

/** Skills grouped into 3-per-row grids under category headers. */
export const SkillGrid: React.FC<Props> = ({ items }) => {
  const categories: SkillItem['category'][] = ['frontend', 'backend', 'tools'];

  return (
    <Block title="skill-tree — grouped by category">
      <div className="space-y-3">
        {categories.map((cat) => {
          const skills = items.filter((s) => s.category === cat);
          if (skills.length === 0) return null;
          return (
            <div key={cat}>
              <div
                className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${CATEGORY_COLORS[cat]}`}
              >
                ┌─ {cat}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pl-2">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="px-2 py-1 rounded bg-muted/30 border border-border/40 text-[11px] flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{skill.name}</span>
                    {skill.core ? (
                      <span className="text-[9px] text-emerald-500 font-bold shrink-0">CORE</span>
                    ) : (
                      <span className="text-[9px] text-muted-foreground shrink-0">ok</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 pt-2 border-t border-border/40 text-[10px] text-muted-foreground">
        run <span className="text-primary">skills --core</span> for the 12 core skills
      </p>
    </Block>
  );
};

export default SkillGrid;
