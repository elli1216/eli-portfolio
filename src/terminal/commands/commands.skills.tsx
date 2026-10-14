import type { Command } from './types';
import { hasFlag, getFlag } from './args';
import { SkillGrid } from '../components/blocks';

const skills: Command = {
  name: 'skills',
  aliases: ['stack', 'tech', 'toolchain'],
  description: 'List skills grouped by category.',
  usage: 'skills [--core] [--category cat]',
  category: 'data',
  run(args, ctx) {
    const items = ctx.data.SKILL_DATA;
    const core = hasFlag(args, 'core');
    const category = getFlag(args, 'category') || getFlag(args, 'c');

    let filtered = items;
    if (core) filtered = filtered.filter((s) => s.core);
    if (category) {
      const needle = category.toLowerCase();
      filtered = filtered.filter((s) => s.category.toLowerCase().includes(needle));
      if (filtered.length === 0) {
        ctx.push(
          `No skills in category "${category}". Valid: frontend, backend, tools.`,
          'err',
        );
        return;
      }
    }

    if (core) ctx.push(`CORE skills (${filtered.length}):`, 'ok');
    ctx.pushBlock(<SkillGrid items={filtered} />);
  },
};

export const skillCommands: Command[] = [skills];
