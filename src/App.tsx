import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { TerminalEmulator } from '@/terminal/TerminalEmulator';
import { AccentProvider } from '@/contexts/AccentContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotFound } from '@/components/home/NotFound';
import { ThemedCursor } from './components/home/cursor/ThemedCursor';
import { useMobile } from './lib/utils';

const App: React.FC = () => {
  const isNotFound = window.location.pathname !== '/';
  const isMobile = useMobile();

  // Two full-screen views toggled by the Hero's "open terminal" button (and the
  // navbar brand), replacing the old scroll/parallax navigation. No page scroll.
  const [view, setView] = useState<'hero' | 'terminal'>('hero');
  const openTerminal = () => setView('terminal');
  const goHome = () => setView('hero');

  return (
    <ThemeProvider>
      <AccentProvider>
        <MotionConfig reducedMotion="user">
          <div className="h-dvh overflow-hidden">
            {isNotFound ? (
              <NotFound />
            ) : (
              <div className="w-full h-full">
                {isMobile ? null : <ThemedCursor />}
                {view === 'hero' && <Navbar onHome={goHome} />}
                {view === 'hero' ? (
                  <Hero onOpenTerminal={openTerminal} />
                ) : (
                  <TerminalEmulator onClose={goHome} />
                )}
              </div>
            )}
          </div>
        </MotionConfig>
      </AccentProvider>
    </ThemeProvider>
  );
};

export default App;
