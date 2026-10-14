import React from 'react';
import { Section } from './Section';
import { certificates } from '@/constants/constants';

/** Certificates section — a credentials grid (no terminal-window chrome). */
export const CertificatesSection: React.FC = () => (
  <Section id="certificates" command="certificates" comment="credentials.db">
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {certificates.map((cert, i) => (
        <li key={cert.alt} className="min-w-0">
          <a
            href={cert.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-3 rounded-lg border border-border/60 bg-card/40 px-4 py-3 transition-colors hover:border-primary/50"
          >
            <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm text-foreground transition-colors group-hover:text-primary">
                {cert.alt}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">{cert.issuer}</span>
            </span>
            <span className="shrink-0 text-xs text-muted-foreground transition-colors group-hover:text-primary">
              verify →
            </span>
          </a>
        </li>
      ))}
    </ul>
  </Section>
);

export default CertificatesSection;
