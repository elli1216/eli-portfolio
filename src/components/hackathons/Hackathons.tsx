import React, { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { useAccent } from '@/contexts/AccentContext';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Github,
  Trophy,
  Users,
  Target,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Palette,
  Award,
} from 'lucide-react';
import { getInitials } from '@/lib/utils';
import { ProjectMetrics } from '@/components/shared/ProjectMetrics';
import { TechStack } from '@/components/shared/TechStack';
import { PROJECT_DATA, category } from '@/constants/constants';
import { CertificateModal, CertificateModalData } from '@/components/shared/CertificateModal';
import {
  TerminalSectionHeader,
  TerminalWindow,
  TerminalBadge,
  TerminalButton,
} from '@/components/shared/terminal';

const HACKATHON_PROJECTS = PROJECT_DATA.filter((p) => p.category === category.HACKATHON);

const ExpandableText: React.FC<{
  text: string;
  className?: string;
  accentColor?: string;
  threshold?: number;
}> = ({ text, className = '', accentColor, threshold = 180 }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > threshold;

  return (
    <motion.div layout className="relative">
      <motion.p
        layout
        className={`${className} ${!expanded && isLong ? 'line-clamp-2' : ''}`}
        style={accentColor ? { borderColor: `${accentColor}66` } : undefined}
      >
        {text}
      </motion.p>
      {isLong && (
        <motion.button
          layout
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-bold text-primary hover:underline mt-1.5  inline-block font-mono"
        >
          {expanded ? '[-- collapse --]' : '[++ read more ++]'}
        </motion.button>
      )}
    </motion.div>
  );
};

interface HackathonCardProps {
  project: (typeof HACKATHON_PROJECTS)[number];
  index: number;
  accentColor: string;
  onViewCertificate: (cert: CertificateModalData) => void;
}

const HackathonCard: React.FC<HackathonCardProps> = ({
  project,
  index,
  accentColor,
  onViewCertificate,
}) => {
  const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <TerminalWindow
      title={`hackathon://${slug}.event`}
      command={`git log -1 --stat ${slug}`}
      className="w-full shadow-2xl"
    >
      <div className="flex flex-col flex-1 font-mono">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 border-b border-border/40 pb-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              {project.hackathonTitle && (
                <TerminalBadge
                  variant="accent"
                  icon={Trophy}
                  label={project.hackathonTitle}
                  pulse
                />
              )}
              {project.placement && <TerminalBadge variant="success" label={project.placement} />}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight tracking-tight">
              {project.title}
            </h3>

            {project.position && (
              <p className="text-xs text-muted-foreground mt-1">
                ROLE: <span className="text-primary font-semibold">{project.position}</span>
              </p>
            )}
          </div>

          <span
            aria-hidden
            className="text-4xl sm:text-5xl font-extrabold text-foreground/10 leading-none select-none shrink-0"
          >
            #{String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Metrics & Placement */}
        <ProjectMetrics project={project} className="mb-6" />

        {/* Theme */}
        {project.theme && (
          <div className="mb-5 p-3 rounded-lg bg-muted/20 border border-border/40">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
              <Palette size={13} /> # HACKATHON THEME
            </p>
            <ExpandableText
              text={project.theme}
              className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
            />
          </div>
        )}

        {/* Problem */}
        {project.problem && (
          <div className="mb-5 p-3 rounded-lg bg-muted/20 border border-border/40">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
              <Target size={13} className="text-rose-500" /> # THE PROBLEM STATEMENT
            </p>
            <ExpandableText
              text={project.problem}
              className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic"
              accentColor={accentColor}
            />
          </div>
        )}

        {/* Solution */}
        <div className="mb-6 p-3 rounded-lg bg-muted/20 border border-border/40">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
            <Lightbulb size={13} /> # ARCHITECTURE & WHAT I BUILT
          </p>
          <ExpandableText
            text={project.description}
            className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
          />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-border/50 space-y-4">
          {/* Collaborators */}
          {project.collaborators && project.collaborators.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground font-bold flex items-center gap-1 mr-1">
                <Users size={12} className="text-primary" /> TEAM:
              </span>
              {project.collaborators.map(({ name, link }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-muted/40 hover:bg-primary/15 hover:text-primary rounded-md border border-border/50 transition-all"
                >
                  <span className="size-4 rounded-full bg-primary/15 text-primary text-[9px] font-bold flex items-center justify-center">
                    {getInitials(name)}
                  </span>
                  <span>{name}</span>
                </a>
              ))}
            </div>
          )}

          {/* Tech Stack & Executables */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <TechStack
              technologies={project.techStack}
              className="gap-1.5"
              itemClassName="text-[11px]"
            />

            <div className="flex items-center gap-2 shrink-0">
              {project.certificate && (
                <TerminalButton
                  command="./view-cert.sh"
                  size="sm"
                  variant="outline"
                  icon={Award}
                  onClick={() =>
                    onViewCertificate({
                      src: project.certificate as string,
                      alt: `${project.title} Certificate`,
                    })
                  }
                />
              )}

              {project.repoLink && (
                <TerminalButton
                  command="./git-repo.sh"
                  size="sm"
                  variant="secondary"
                  icon={Github}
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </TerminalWindow>
  );
};

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

export const Hackathons: React.FC = () => {
  const { currentAccent } = useAccent();
  const [[current, direction], setPage] = useState<[number, number]>([0, 0]);
  const [selectedCert, setSelectedCert] = useState<CertificateModalData | null>(null);

  if (HACKATHON_PROJECTS.length === 0) return null;

  const paginate = (dir: number) => {
    setPage(([prev]) => [
      (prev + dir + HACKATHON_PROJECTS.length) % HACKATHON_PROJECTS.length,
      dir,
    ]);
  };

  const goTo = (index: number) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
  };

  return (
    <Section id="hackathons">
      <TerminalSectionHeader
        command='git tag -l "competition-*"'
        title="Activities"
        description="Extra activities I've participated in."
        executionTime="7ms"
      />

      <div
        className="relative max-w-4xl mx-auto font-mono"
        role="region"
        aria-roledescription="carousel"
        aria-label="Hackathon projects gallery"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') paginate(1);
          if (e.key === 'ArrowLeft') paginate(-1);
        }}
      >
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              layout
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80 || info.velocity.x < -400) paginate(1);
                else if (info.offset.x > 80 || info.velocity.x > 400) paginate(-1);
              }}
            >
              <HackathonCard
                project={HACKATHON_PROJECTS[current]}
                index={current}
                accentColor={currentAccent}
                onViewCertificate={setSelectedCert}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Terminal Carousel Controls */}
        <div className="flex items-center justify-between mt-6 px-2 text-xs">
          <TerminalButton
            command="< PREV"
            size="sm"
            variant="outline"
            icon={ChevronLeft}
            iconPosition="left"
            onClick={() => paginate(-1)}
          />

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">EVENT:</span>
            {HACKATHON_PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
                className={`h-2 rounded-full transition-all  ${
                  i === current ? 'w-6' : 'w-2 bg-muted-foreground/40 hover:scale-125'
                }`}
                style={{
                  backgroundColor: i === current ? currentAccent : undefined,
                }}
              />
            ))}
            <span className="text-muted-foreground font-bold ml-1">
              [{String(current + 1).padStart(2, '0')}/
              {String(HACKATHON_PROJECTS.length).padStart(2, '0')}]
            </span>
          </div>

          <TerminalButton
            command="NEXT >"
            size="sm"
            variant="outline"
            icon={ChevronRight}
            onClick={() => paginate(1)}
          />
        </div>
      </div>

      <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </Section>
  );
};

export default Hackathons;
