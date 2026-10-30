import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { EXPERIENCE_DATA } from '@/constants/constants';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 md:py-32 px-6 md:px-0">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          number="02"
          title="Experience"
          description="My professional journey and roles that shaped my career."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-border/40 to-transparent md:left-1/2 md:-translate-x-px" />

          {/* Experience items */}
          <div className="space-y-10">
            {EXPERIENCE_DATA.map((entry, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={entry.company + entry.period}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2">
                    <span className="flex size-3 items-center justify-center rounded-full bg-primary ring-8 ring-primary/10" />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <article className="rounded-lg border border-border bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:bg-card/60">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground md:text-xl">
                              {entry.role}
                            </h3>
                            <p className="mt-1 text-sm">
                              <span className="text-primary font-medium">{entry.company}</span>
                              <span className="mx-2 text-border">•</span>
                              <span className="text-muted-foreground">{entry.location}</span>
                            </p>
                          </div>
                          <span className="font-mono text-xs text-muted-foreground">
                            {entry.period}
                          </span>
                        </div>
                      </div>

                      {/* Description bullets */}
                      <ul className="mt-4 space-y-2">
                        {entry.description.map((line, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
