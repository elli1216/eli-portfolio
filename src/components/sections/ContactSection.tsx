import React from 'react';
import { Section } from './Section';
import { contactItems } from '@/constants/constants';

/** Contact section — channel cards (no terminal-window chrome). */
export const ContactSection: React.FC = () => (
  <Section id="contact" command="contact" comment="get in touch">
    <div className="grid gap-3 sm:grid-cols-2">
      {contactItems.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-3 rounded-lg border border-border/60 bg-card/40 px-4 py-3.5 transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <Icon size={18} className="shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                {item.label}
              </span>
              <span className="block truncate text-sm text-foreground transition-colors group-hover:text-primary">
                {item.value}
              </span>
            </span>
            <span className="shrink-0 text-xs text-muted-foreground transition-colors group-hover:text-primary">
              open →
            </span>
          </a>
        );
      })}
    </div>

    <p className="mt-4 font-mono text-[11px] text-muted-foreground">
      tip: run <span className="text-primary">email</span>,{' '}
      <span className="text-primary">github</span>, or <span className="text-primary">linkedin</span>{' '}
      from the command bar to open them instantly.
    </p>
  </Section>
);

export default ContactSection;
