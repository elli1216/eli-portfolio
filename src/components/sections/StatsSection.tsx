import React from 'react';
import { Section } from './Section';
import { getPortfolioStats } from '@/constants/constants';

export const StatsSection: React.FC = () => {
  const stats = getPortfolioStats();

  return (
    <Section id="stats" command="stats" comment="quick numbers">
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-xl border border-border/60 bg-card/40 px-6 py-6 text-center backdrop-blur-sm"
          >
            <div className="font-mono text-4xl font-bold text-primary sm:text-5xl">
              {stat.value}
              {stat.suffix}
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-xs text-muted-foreground/70">
        curious explorer · build. learn. ship.
      </p>
    </Section>
  );
};

export default StatsSection;
