import React from 'react';
import { contactItems } from '@/constants/constants';

/** Page footer. Extra bottom padding keeps it clear of the floating command bar. */
export const Footer: React.FC = () => (
  <footer className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-8 pb-40 sm:pb-44">
    <div className="flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 font-mono text-[11px] text-muted-foreground sm:flex-row">
      <span>© {new Date().getFullYear()} Darl Ellison Floresca</span>
      <span className="flex items-center gap-1.5">
        built with <span className="text-primary">React 19</span>
        <span className="text-border">·</span>
        <span className="text-primary">Tailwind v4</span>
      </span>
      <div className="flex items-center gap-3">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            {item.label.toLowerCase()}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
