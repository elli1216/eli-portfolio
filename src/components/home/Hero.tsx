import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { HeroContent } from '@/components/home/HeroContent';

/**
 * Landing section. The page-wide backdrop (grid, scanlines, glow) is rendered
 * once at the app root; the hero only lays out its content and a scroll hint.
 * The floating command bar stays hidden while this section is in view.
 */
export const Hero: React.FC = () => (
  <section
    id="home"
    className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden"
  >
    <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-center px-6 py-16 md:py-20">
      <HeroContent />
    </div>

    {/* Scroll affordance linking into the first section */}
    <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-10">
      <motion.a
        href="#about"
        className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/40 bg-card/40 backdrop-blur-sm font-mono text-xs sm:text-sm text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="text-primary">$</span>
        <span className="text-muted-foreground">scroll to explore</span>
        <ChevronDown size={15} className="text-primary shrink-0 animate-bounce" />
      </motion.a>
    </div>
  </section>
);

export default Hero;
