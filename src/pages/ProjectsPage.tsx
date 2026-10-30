import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { PROJECT_DATA } from '@/constants/constants';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 });
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="min-h-screen py-20 md:py-32 px-6 md:px-0">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="03"
          title="Projects"
          description="Featured work including hackathon winners, commercial applications, and personal tools."
        />

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {PROJECT_DATA.map((project, index) => (
                <div
                  key={project.title}
                  className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(50%-12px)] min-w-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="h-full rounded-lg border border-border/60 bg-card/40 backdrop-blur-sm hover:border-primary/60 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Main content */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-start gap-2 mb-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {project.title}
                          </h3>
                          {project.hackathonTitle && (
                            <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded font-medium whitespace-nowrap">
                              {project.hackathonTitle.split(' ')[0]} Winner
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {project.position}
                          {project.collaborators && project.collaborators.length > 0 && (
                            <> · with {project.collaborators.map(c => c.name).join(', ')}</>
                          )}
                        </p>
                      </div>

                      {/* Description & Problem */}
                      <div className="space-y-4 mb-4 flex-1">
                        <div>
                          <p className="text-sm leading-relaxed text-foreground/90 line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                        {project.problem && (
                          <div className="pt-4 border-t border-border/40">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                              Problem
                            </p>
                            <p className="text-xs text-foreground/80 line-clamp-2">
                              {project.problem}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-4 pb-4 border-b border-border/40">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {(project.techStack || project.techs || []).slice(0, 6).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {(project.techStack || project.techs || []).length > 6 && (
                            <span className="text-xs px-2 py-1 text-muted-foreground">
                              +{(project.techStack || project.techs || []).length - 6}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap gap-2">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-2 bg-primary/10 text-primary rounded text-xs hover:bg-primary/20 transition-colors font-medium"
                          >
                            <ExternalLink size={13} />
                            Demo
                          </a>
                        )}
                        {project.repoLink && (
                          <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-2 border border-border/60 text-foreground rounded text-xs hover:bg-muted transition-colors font-medium"
                          >
                            <Github size={13} />
                            Repo
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project image */}
                    {project.image && (
                      <div className="relative overflow-hidden bg-muted h-32 border-t border-border/40">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 px-0 md:px-0 flex justify-between pointer-events-none">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="pointer-events-auto -ml-12 md:-ml-16 p-2 rounded-full border border-border/60 bg-card/60 hover:border-primary/60 hover:bg-primary/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="pointer-events-auto -mr-12 md:-mr-16 p-2 rounded-full border border-border/60 bg-card/60 hover:border-primary/60 hover:bg-primary/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {PROJECT_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!emblaApi) return;
                emblaApi.scrollTo(index);
              }}
              className="w-2 h-2 rounded-full bg-border/40 hover:bg-primary/60 transition-colors"
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
