import React from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';
import { HeroBackground } from '@/components/home/HeroBackground';
import { HeroContent } from '@/components/home/HeroContent';
import FaultyTerminal from '@/components/shared/terminal/FaultyTerminal';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => (
  <section className="relative isolate flex items-center justify-center h-full overflow-hidden">
    <HeroBackground />

    {/* Spacer keeps FaultyTerminal (w-full h-full) out of FLEX layout —
        it is absolutely positioned behind the content instead */}
    <div className="absolute inset-0 -z-10" aria-hidden>
      <FaultyTerminal
        mouseReact={false}
        brightness={1.3}
        gridMul={[2, 1]}
        glitchAmount={1}
        curvature={0.1}
        className="opacity-[0.06]"
      />
    </div>

    <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 md:py-20 flex items-center justify-center">
      <HeroContent />
    </div>

    {/* Open-terminal affordance pinned to the bottom of the hero */}
    <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-8">
      <motion.button
        onClick={onOpenTerminal}
        className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/40 bg-card/40 backdrop-blur-sm font-mono text-xs sm:text-sm text-foreground hover:border-primary hover:bg-primary/10 transition-colors cursor-target"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Terminal size={15} className="text-primary shrink-0" />
        <span className="text-primary">$</span>
        <span className="text-muted-foreground">click here to open the terminal</span>
      </motion.button>
    </div>
  </section>
);
