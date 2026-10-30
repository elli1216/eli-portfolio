import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { certificates } from '@/constants/constants';
import { ExternalLink, Award } from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 md:py-32 px-6 md:px-0">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          number="05"
          title="Certificates"
          description="Online certificates and badges I've earned."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
            <motion.a
              key={cert.alt}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg border border-border/60 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col h-full min-h-48"
            >
              {/* Background accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Certificate Image - appears on hover */}
              {cert.src && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm">
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    className="max-w-full max-h-full object-contain rounded"
                  />
                </div>
              )}

              {/* Content */}
              <div className="relative p-6 flex flex-col gap-4 flex-1 group-hover:opacity-0 transition-opacity duration-300">
                {/* Icon and Issuer */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  {cert.issuer && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">
                      {cert.issuer}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {cert.alt}
                  </h3>
                </div>

                {/* CTA Arrow - hidden initially */}
                <div className="flex items-center gap-1 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:gap-2">
                  <span>View Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* CTA Button - appears on hover over image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 bg-gradient-to-t from-black/40 to-transparent pointer-events-none">
                <div className="flex items-center gap-1 text-white text-sm font-semibold">
                  <span>View Credential</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              {/* Hover border accent */}
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 rounded-lg transition-colors duration-300 pointer-events-none" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};
