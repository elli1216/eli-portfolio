import React from 'react';
import { Section } from './Section';
import { EDUCATION, EXPERIENCE_DATA, PERSONAL_DATA } from '@/constants/constants';

/** About section — a plain profile layout (no terminal-window chrome). */
export const AboutSection: React.FC = () => {
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
    <Section id="about" command="about" comment="compact profile">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-14">
        <dl>
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-0.5 border-b border-border/40 py-2.5 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <dt className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {row.label}
              </dt>
              <dd className="text-sm text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div>
          <p className="text-sm leading-relaxed text-foreground/90 sm:text-[15px]">
            {d.short_introduction}
          </p>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
