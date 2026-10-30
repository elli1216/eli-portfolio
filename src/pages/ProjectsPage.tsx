import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { PROJECT_DATA } from '@/constants/constants';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-20 md:py-32 px-6 md:px-0">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="03"
          title="Projects"
          description="Featured work including hackathon winners, commercial applications, and personal tools."
        />

        <div className="space-y-6">
          {PROJECT_DATA.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-lg border border-border/60 bg-card/40 backdrop-blur-sm hover:border-primary/60 transition-all duration-300 overflow-hidden"
            >
              {/* Main content */}
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      {project.hackathonTitle && (
                        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded font-medium">
                          {project.hackathonTitle.split(' ')[0]} Winner
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.position}
                      {project.collaborators && project.collaborators.length > 0 && (
                        <> · with {project.collaborators.map(c => c.name).join(', ')}</>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => setExpandedId(expandedId === project.title ? null : project.title)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    aria-label="Toggle details"
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        expandedId === project.title ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Description & Problem */}
                <div className="space-y-4 mb-4">
                  <div>
                    <p className="text-base leading-relaxed text-foreground/90">
                      {project.description}
                    </p>
                  </div>
                  {project.problem && (
                    <div className="pt-4 border-t border-border/40">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Problem
                      </p>
                      <p className="text-sm text-foreground/80">
                        {project.problem}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="mb-6 pb-6 border-b border-border/40">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(project.techStack || project.techs || []).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable details */}
                <AnimatePresence>
                  {expandedId === project.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 mb-6 pb-6 border-b border-border/40"
                    >
                      {/* Features */}
                      {project.features && project.features.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                            Key Features
                          </p>
                          <ul className="space-y-2">
                            {project.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                <span className="text-primary mt-1">·</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Architecture */}
                      {project.architecture && project.architecture.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                            Architecture
                          </p>
                          <ul className="space-y-2">
                            {project.architecture.map((arch, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                <span className="text-primary mt-1">·</span>
                                <span>{arch}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Metrics */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                            Results
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {project.metrics.map((metric, i) => (
                              <div key={i} className="bg-muted/50 p-3 rounded">
                                <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                                <p className="text-lg font-semibold text-primary">{metric.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Links */}
                <div className="flex flex-wrap items-center gap-3">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm"
                    >
                      <ExternalLink size={16} />
                      Demo / Live
                    </a>
                  )}
                  {project.repoLink && (
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-border/60 text-foreground rounded-lg hover:bg-muted transition-colors font-medium text-sm"
                    >
                      <Github size={16} />
                      Repository
                    </a>
                  )}
                </div>
              </div>

              {/* Project image */}
              {project.image && (
                <div className="relative overflow-hidden bg-muted h-48 border-t border-border/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
