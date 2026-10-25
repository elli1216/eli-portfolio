import React from 'react';
import { motion } from 'framer-motion';
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
 * line followed by the section content in a centered column with entrance
 * animations.
 */
export const Section: React.FC<Props> = ({ id, command, comment, children, className = '' }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`relative z-10 mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 ${className}`}
  >
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <SectionCommand command={command} comment={comment} className="mb-6 sm:mb-8" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </motion.section>
);

export default Section;
