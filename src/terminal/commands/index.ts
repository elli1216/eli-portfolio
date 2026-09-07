import type { Command } from './types';
import { cacheCommands } from './registry';
import { aboutCommands, generalCommands } from './commands.about';
import { experienceCommands } from './commands.experience';
import { projectCommands } from './commands.projects';
import { skillCommands } from './commands.skills';
import { otherCommands } from './commands.other';
import { assistantCommands } from './commands.chat';
import { catCommands } from './commands.cat';
import { insightCommands } from './commands.insights';

export const COMMANDS: Command[] = [
  ...generalCommands,
  ...aboutCommands,
  ...experienceCommands,
  ...projectCommands,
  ...skillCommands,
  ...otherCommands,
  ...assistantCommands,
  ...catCommands,
  ...insightCommands,
];

/** Populate the registry cache with the full command set. */
export function buildRegistry(): void {
  cacheCommands(COMMANDS);
}

export { runCommand, getCommandList, getRegistry, cacheCommands, asMap } from './registry';
export { getFlag, getPositional, getPositionals, hasFlag } from './args';
export {
  type Command,
  type CommandContext,
  type CommandResult,
  type ArgToken,
  type CommandCategory,
  type Registry,
} from './types';
