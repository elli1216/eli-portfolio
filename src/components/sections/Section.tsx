import React from 'react';
import { SectionCommand } from './SectionCommand';

interface Props {
  /** DOM id used as the anchor target. */
  id: string;
  /** Command echoed in the section header. */
  command: string;
  comment?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared section shell for the single-page layout. Renders the section prompt
 * line followed by the section content in a centered column.
 */
export const Section: React.FC<Props> = ({ id, command, comment, children, className = '' }) => (
  <section
    id={id}
    className={`relative z-10 mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 ${className}`}
  >
    <SectionCommand command={command} comment={comment} className="mb-6 sm:mb-8" />
    {children}
  </section>
);

export default Section;
