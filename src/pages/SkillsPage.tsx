import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { SKILL_DATA } from '@/constants/constants';

export const SkillsPage: React.FC = () => {
  // Group skills by category
  const categories = SKILL_DATA.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof SKILL_DATA>
  );

  return (
    <div className="min-h-screen py-20 md:py-32 px-6 md:px-0">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          number="04"
          title="Skills & Stack"
          description="Technologies and tools I work with."
        />

        <div className="space-y-12">
          {Object.entries(categories).map(([category, skills], categoryIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIdx * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-6 capitalize">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: categoryIdx * 0.1 + skillIdx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border/40 bg-card/20 hover:border-primary/60 hover:bg-card/40 transition-all duration-300"
                  >
                    {skill.icon && (
                      <div className="w-12 h-12 flex items-center justify-center text-2xl">
                        {typeof skill.icon === 'string' ? skill.icon : skill.icon}
                      </div>
                    )}
                    <span className="text-sm font-medium text-center text-foreground">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
