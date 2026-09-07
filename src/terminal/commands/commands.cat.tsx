import type { Command } from './types';
import type { CommandContext } from './types';
import { getPositional } from './args';

type CatFn = (ctx: CommandContext) => void;

const pre = (text: string, size = 'text-[11px] sm:text-xs') => (
  <pre
    className={`whitespace-pre leading-relaxed text-muted-foreground overflow-x-auto no-scrollbar ${size}`}
  >
    {text}
  </pre>
);

/* -------------------------------------------------------------------------- */
/*  Virtual filesystem                                                        */
/* -------------------------------------------------------------------------- */

const FILE_META: Array<{ name: string; desc: string }> = [
  { name: 'aboutme.yaml', desc: 'Personal profile (YAML)' },
  { name: 'experience.json', desc: 'Work experience (JSON)' },
  { name: 'projects.json', desc: 'Projects dataset (JSON)' },
  { name: 'skills.json', desc: 'Skills inventory (JSON)' },
  { name: 'certificates.json', desc: 'Certifications (JSON)' },
  { name: 'contact.json', desc: 'Contact info (JSON)' },
  { name: 'readme', desc: 'How to use this terminal' },
];

const FILES: Record<string, CatFn> = {
  'aboutme.yaml': (ctx) => {
    const d = ctx.data.PERSONAL_DATA;
    const e = ctx.data.EDUCATION;
    const body = [
      '---',
      `name: ${JSON.stringify(d.names[0])}`,
      'variants:',
      ...d.names.map((n) => `  - ${JSON.stringify(n)}`),
      `based_in: ${JSON.stringify(d.based_in)}`,
      `age: ${JSON.stringify(d.age)}`,
      `birthdate: ${JSON.stringify(d.birthdate)}`,
      'education:',
      `  university: ${JSON.stringify(e.university_attended)}`,
      `  location: ${JSON.stringify(e.location)}`,
      `  course: ${JSON.stringify(e.course)}`,
      `  date_started: ${JSON.stringify(e.date_started)}`,
      `  date_graduated: ${JSON.stringify(e.date_graduated)}`,
      `  gpa: ${e.gpa}`,
      'emails:',
      ...d.emails.map((em) => `  - ${JSON.stringify(em)}`),
      'github:',
      `  username: ${JSON.stringify(d.github.username)}`,
      `  link: ${JSON.stringify(d.github.link)}`,
      'linkedin:',
      `  link: ${JSON.stringify(d.linkedid.link)}`,
      'interests:',
      ...d.interests.INTERESTS.map((i) => `  - ${JSON.stringify(i)}`),
      'exploring:',
      ...d.interests.EXPLORING.map((i) => `  - ${JSON.stringify(i)}`),
    ].join('\n');
    ctx.pushBlock(pre(`$ cat aboutme.yaml\n${body}`));
  },

  'experience.json': (ctx) => {
    ctx.pushBlock(
      pre(`$ cat experience.json\n${JSON.stringify(ctx.data.EXPERIENCE_DATA, null, 2)}`)
    );
  },

  'projects.json': (ctx) => {
    ctx.pushBlock(
      pre(
        `$ cat projects.json\n${JSON.stringify(ctx.data.PROJECT_DATA, null, 2)}`,
        'text-[10px] sm:text-xs'
      )
    );
  },

  'skills.json': (ctx) => {
    ctx.pushBlock(pre(`$ cat skills.json\n${JSON.stringify(ctx.data.SKILL_DATA, null, 2)}`));
  },

  'certificates.json': (ctx) => {
    ctx.pushBlock(
      pre(`$ cat certificates.json\n${JSON.stringify(ctx.data.certificates, null, 2)}`)
    );
  },

  'contact.json': (ctx) => {
    const items = ctx.data.contactItems.map((c) => ({
      label: c.label,
      value: c.value,
      href: c.href,
    }));
    ctx.pushBlock(pre(`$ cat contact.json\n${JSON.stringify(items, null, 2)}`));
  },

  readme: (ctx) => {
    const body = [
      '# eli@portfolio — README',
      '',
      'Welcome to the interactive terminal portfolio.',
      "All of Eli's details live in virtual files here.",
      '',
      '  ls                  list available files',
      "  cat <file>          view a file's contents",
      '  more <file>         same as cat',
      '',
      'Quick commands:',
      '  help                list every command',
      '  whoami              confirm identity',
      '  about               compact profile',
      '  about --verbose     detailed profile',
      '  neofetch            stylized system info',
      '  experience          career history',
      '  experience <n>      one entry in detail',
      '  projects            project list',
      '  projects <n>        one project in detail',
      '  projects --category capstone',
      '  skills --core       the core stack',
      '  certificates        credentials',
      '  contact             how to reach out',
      '  compare             side-by-side project table',
      '  achievements        hackathon placements & awards',
      '  timeline            chronological career path',
      '  stats               contribution activity + metrics',
      '  github | linkedin | email',
      '  resume              open the PDF CV',
      '  nova <question>     ask the AI assistant',
      '  clear | cls         reset the terminal',
      '',
      'Use up/down arrows for history and Tab for completion.',
    ].join('\n');
    ctx.pushBlock(pre(`$ cat readme\n${body}`, 'text-[11px] sm:text-xs text-foreground'));
  },
};

/* -------------------------------------------------------------------------- */
/*  Commands: ls · cat · more                                                 */
/* -------------------------------------------------------------------------- */

const ls: Command = {
  name: 'ls',
  description: 'List files in the virtual filesystem.',
  usage: 'ls',
  category: 'data',
  run(_args, ctx) {
    const maxName = Math.max(...FILE_META.map((f) => f.name.length));
    const lines = FILE_META.map((f) => `  ${f.name.padEnd(maxName + 2)}${f.desc}`);
    ctx.pushBlock(
      <pre className="whitespace-pre text-[11px] sm:text-xs leading-relaxed text-foreground overflow-x-auto no-scrollbar">
        {`$ ls\n${lines.join('\n')}`}
      </pre>
    );
  },
};

const cat: Command = {
  name: 'cat',
  aliases: ['more'],
  description: 'Print the contents of a virtual file.',
  usage: 'cat <file>  |  ls to see available files',
  category: 'data',
  run(args, ctx) {
    const file = (getPositional(args, 0) ?? '').toLowerCase();
    const render = FILES[file];
    if (!render) {
      ctx.push(`cat: ${file || '(no file)'}: No such file or directory.`, 'err');
      ctx.push('Run "ls" to see available files.', 'muted');
      return;
    }
    render(ctx);
  },
};

export const catCommands: Command[] = [ls, cat];
