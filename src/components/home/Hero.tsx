import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { HeroContent } from '@/components/home/HeroContent';

/**
 * Landing section. Redesigned with a cleaner layout, subtle ASCII accent,
 * and improved hierarchy. Mobile responsive.
 * The floating command bar stays hidden while this section is in view.
 */
export const Hero: React.FC = () => (
  <section
    id="home"
    className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden"
  >

    <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-16 sm:px-6 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <HeroContent />
      </motion.div>
    </div>

    <motion.div
      className="absolute inset-x-0 bottom-12 z-10 flex justify-center px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
    >
      <p className="font-mono text-center text-xs sm:text-sm text-primary/90">
        <span className="text-muted-foreground">$</span> Build. Learn. Ship.
      </p>
    </motion.div>

    {/* Scroll affordance linking into the first section */}
    <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-10">
      <motion.a
        href="#about"
        onClick={(event) => {
          event.preventDefault();
          document
            .getElementById('about')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/40 bg-card/40 backdrop-blur-sm font-mono text-xs sm:text-sm text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
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
