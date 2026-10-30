import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  title: string;
  description?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 md:mb-16"
    >
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-6xl md:text-8xl font-light text-muted-foreground opacity-50">
          {number}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
      </div>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};
