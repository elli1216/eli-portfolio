import React from 'react';

export const HeroBackground: React.FC = () => (
  <>
    {/* Scanlines */}
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 1px, currentColor 1px, currentColor 2px)',
        backgroundSize: '100% 3px',
      }}
    />
    {/* Accent glow */}
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(ellipse 50% 50% at 65% 50%, rgba(var(--accent-rgb), 0.07) 0%, transparent 70%)',
      }}
    />
    {/* Readability gradient so foreground content stays crisp */}
    <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-background/70 via-transparent to-background/80" />
  </>
);