import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { PROJECT_DATA } from '@/constants/constants';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 md:py-32 px-6 md:px-0">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="03"
          title="Projects"
          description="A selection of projects I've built and contributed to."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECT_DATA.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-lg border border-border overflow-hidden hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Project image */}
              {project.image && (
                <div className="relative overflow-hidden bg-muted h-40">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Project content */}
              <div className="p-6 bg-card/40 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech stack */}
                {project.techs && project.techs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techs.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techs.length > 3 && (
                      <span className="text-xs px-2 py-1 text-muted-foreground">
                        +{project.techs.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Visit →
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
