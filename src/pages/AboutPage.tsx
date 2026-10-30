import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { EDUCATION, EXPERIENCE_DATA, PERSONAL_DATA } from '@/constants/constants';

export const AboutPage: React.FC = () => {
  const d = PERSONAL_DATA;
  const firstRole = EXPERIENCE_DATA[0];

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: 'name', value: d.names[0] },
    {
      label: 'role',
      value: (
        <>
          <span className="text-primary">{firstRole.role}</span> @ {firstRole.company}
        </>
      ),
    },
    { label: 'based in', value: d.based_in },
    { label: 'age', value: d.age },
    {
      label: 'education',
      value: `${EDUCATION.course} · ${EDUCATION.university_attended}`,
    },
    {
      label: 'graduated',
      value: `${EDUCATION.date_graduated} · GPA ${EDUCATION.gpa}`,
    },
    { label: 'interests', value: d.interests.INTERESTS.join(', ') },
    { label: 'exploring', value: d.interests.EXPLORING.join(', ') },
  ];

  return (
    <div className="min-h-screen py-20 md:py-32 px-6 md:px-0">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          number="01"
          title="About Me"
          description="Get to know who I am, what drives me, and where I'm headed."
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-16"
        >
          {/* Profile Info */}
          <dl className="space-y-6">
            {rows.map((row, idx) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <dt className="w-32 shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="text-base text-foreground">{row.value}</dd>
              </motion.div>
            ))}
          </dl>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-foreground/90">
              {d.short_introduction}
            </p>
            <p className="text-base leading-relaxed text-foreground/80">
              I'm passionate about building intuitive, performant applications that solve real problems. Whether it's crafting delightful user experiences or optimizing backend systems, I approach every project with attention to detail and a commitment to clean, maintainable code.
            </p>
            <p className="text-base leading-relaxed text-foreground/80">
              Currently at Accenture, I work on custom software solutions for enterprise clients. In my free time, I explore emerging technologies and contribute to the developer community.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
