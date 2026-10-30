import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { certificates } from '@/constants/constants';

export const CertificatesPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 md:py-32 px-6 md:px-0">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          number="05"
          title="Certificates"
          description="Professional certifications and credentials."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((cert, index) => (
            <motion.a
              key={cert.name}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-lg border border-border bg-card/40 p-6 backdrop-blur-sm hover:border-primary/60 hover:bg-card/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cert.name}
                </h3>
                {cert.issuer && (
                  <span className="text-xs px-3 py-1 rounded bg-primary/10 text-primary whitespace-nowrap">
                    {cert.issuer}
                  </span>
                )}
              </div>
              {cert.date && (
                <p className="text-sm text-muted-foreground">{cert.date}</p>
              )}
              {cert.description && (
                <p className="text-sm text-muted-foreground mt-3">{cert.description}</p>
              )}
              <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View credential
                <span>→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};
