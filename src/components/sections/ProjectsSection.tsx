import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Section } from './Section';
import { PROJECT_DATA } from '@/constants/constants';
import { getBadgeStyles } from '@/lib/utils';
import type { ProjectItem } from '@/types/types';

/** A single project card with a collapsible description. */
const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const expandedRef = useRef(expanded);
  expandedRef.current = expanded;

  // Only surface the toggle when the clamped description is actually truncated.
  // Re-measure on resize so the control tracks the responsive card width.
  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const check = () => {
      if (expandedRef.current) return;
      setOverflowing(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="flex flex-col h-fit rounded-xl border border-border/60 bg-card/40 p-5 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground sm:text-lg">{project.title}</h3>
        <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
        {project.category && (
          <span
            className={`px-2 py-0.5 rounded-full border font-bold uppercase tracking-wide ${getBadgeStyles(project.category)}`}
          >
            {project.category}
          </span>
        )}
        {project.position && (
          <span className="text-muted-foreground">
            ROLE: <span className="text-primary">{project.position}</span>
          </span>
        )}
        {project.placement && <span className="text-emerald-500">{project.placement}</span>}
      </div>

      {project.hackathonTitle && (
        <p className="mt-2 text-xs text-muted-foreground">🏆 {project.hackathonTitle}</p>
      )}

      <p
        ref={descRef}
        className={`mt-3 text-sm leading-relaxed text-muted-foreground ${
          expanded ? '' : 'line-clamp-4'
        }`}
      >
        {project.description}
      </p>

      {(overflowing || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-2 inline-flex items-center gap-1 self-start font-mono text-[11px] text-primary transition-colors hover:text-primary/80"
        >
          {expanded ? 'show less' : 'read more'}
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="rounded border border-border/50 bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 6 && (
          <span className="px-2 py-0.5 text-[10px] text-muted-foreground">
            +{project.techStack.length - 6} more
          </span>
        )}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/20"
          >
            live demo →
          </a>
        )}
        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:border-primary/40"
          >
            source
          </a>
        )}
      </div>
    </article>
  );
};

/** Projects section — a responsive card grid (no terminal-window chrome). */
export const ProjectsSection: React.FC = () => (
  <Section id="projects" command="projects" comment={`${PROJECT_DATA.length} entries`}>
    <div className="grid gap-5 md:grid-cols-2">
      {PROJECT_DATA.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i} />
      ))}
    </div>
  </Section>
);

export default ProjectsSection;
