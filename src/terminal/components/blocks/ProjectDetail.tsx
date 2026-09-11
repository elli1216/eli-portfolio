import React from 'react';
import type { ProjectItem } from '@/types/types';
import { Block } from './Block';

interface Props {
  project: ProjectItem;
  index: number;
}

/**
 * Full detail for a single project: position, category, placement, theme,
 * problem, features, architecture, description, tech stack and links.
 */
export const ProjectDetail: React.FC<Props> = ({ project, index }) => (
  <Block title={`manifest://projects/${index + 1}.json`} tone="accent">
    <div className="space-y-3">
      <div>
        <div className="flex items-center gap-2 flex-wrap text-[11px] text-muted-foreground">
          <span className="text-primary font-bold">[{index + 1}]</span>
          {project.category && (
            <span className="text-secondary-foreground">--{project.category}</span>
          )}
          {project.position && (
            <span>
              ROLE: <span className="text-primary">{project.position}</span>
            </span>
          )}
          {project.placement && <span className="text-emerald-500">{project.placement}</span>}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-foreground mt-1">{project.title}</h3>
        {project.hackathonTitle && (
          <p className="text-[11px] text-muted-foreground mt-0.5">🏆 {project.hackathonTitle}</p>
        )}
        {project.theme && (
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Theme: <span className="text-foreground/80">{project.theme}</span>
          </p>
        )}
      </div>

      <Section label="# DESCRIPTION">
        <p className="leading-relaxed text-foreground/90">{project.description}</p>
      </Section>

      {project.problem && (
        <Section label="# PROBLEM STATEMENT">
          <p className="leading-relaxed text-muted-foreground">{project.problem}</p>
        </Section>
      )}

      {Array.isArray(project.architecture) && project.architecture.length > 0 && (
        <Section label="# SYSTEM ARCHITECTURE">
          <ul className="space-y-1.5">
            {project.architecture.map((a, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-primary shrink-0">❯</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {project.features && project.features.length > 0 && (
        <Section label="# KEY FEATURES">
          <ul className="space-y-1.5">
            {project.features.map((f, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-500 shrink-0">✔</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {project.metrics && project.metrics.length > 0 && (
        <Section label="# METRICS">
          <div className="flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <span
                key={m.label}
                className="px-2 py-1 rounded bg-muted/40 border border-border/50 text-[11px]"
              >
                <span className="text-muted-foreground">{m.label}: </span>
                <span className="text-emerald-500">{m.value}</span>
              </span>
            ))}
          </div>
        </Section>
      )}

      <Section label="# TECH STACK">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded bg-muted/40 border border-border/50 text-[11px]"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {(project.demoLink || project.repoLink) && (
        <div className="flex flex-wrap gap-2 pt-1">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target px-2.5 py-1 rounded bg-primary/10 border border-primary/30 text-primary text-[11px] font-medium hover:bg-primary/20"
            >
              ./launch-live.sh
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target px-2.5 py-1 rounded bg-muted/40 border border-border/60 text-foreground text-[11px] font-medium hover:border-primary/40"
            >
              ./git-clone.sh
            </a>
          )}
          {project.certificate && (
            <a
              href={project.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target px-2.5 py-1 rounded bg-muted/40 border border-border/60 text-foreground text-[11px] font-medium hover:border-primary/40"
            >
              ./view-certficate.sh
            </a>
          )}
        </div>
      )}

      {project.collaborators && project.collaborators.length > 0 && (
        <Section label="# COLLABORATORS">
          <div className="flex flex-wrap gap-1.5">
            {project.collaborators.map((c) => (
              <a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target px-2 py-0.5 rounded bg-muted/40 border border-border/60 text-[11px] hover:text-primary hover:border-primary/40"
              >
                {c.name}
              </a>
            ))}
          </div>
        </Section>
      )}
    </div>
  </Block>
);

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-1 pt-1 border-t border-border/30">
    <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary">{label}</h4>
    <div className="text-[11px] sm:text-xs leading-relaxed">{children}</div>
  </div>
);

export default ProjectDetail;
