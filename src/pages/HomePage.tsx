import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          I'm Darl Ellison Floresca
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
          A software engineer and full-stack developer building modern web & mobile applications. BSIT graduate and Custom Software Engineer at Accenture.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Explore My Work <ArrowRight size={18} />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
          >
            View Projects
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
