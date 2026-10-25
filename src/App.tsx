import React from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingTerminal } from '@/components/layout/FloatingTerminal';
import { BackToTop } from '@/components/layout/BackToTop';
import { Hero } from '@/components/home/Hero';
import { NotFound } from '@/components/home/NotFound';
import {
  AboutSection,
  StorySection,
  StatsSection,
  WorkflowSection,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  CertificatesSection,
  NovaSection,
  ContactSection,
} from '@/components/sections';
import { AccentProvider } from '@/contexts/AccentContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

/**
 * Single-page terminal-themed portfolio. Sections scroll normally; the floating
 * command bar at the bottom navigates between them and runs any other command
 * in its output drawer.
 */
const App: React.FC = () => {
  const isNotFound = window.location.pathname !== '/';

  return (
    <ThemeProvider>
      <AccentProvider>
        <MotionConfig reducedMotion="user">
          {isNotFound ? (
            <NotFound />
          ) : (
            <div className="relative min-h-dvh">
              <Navbar />
              <main>
                <Hero />
                <AboutSection />
                <StatsSection />
                <WorkflowSection />
                <ExperienceSection />
                <SkillsSection />
                <ProjectsSection />
                <CertificatesSection />
                <NovaSection />
                <StorySection />
                <ContactSection />
              </main>
              <Footer />
              <FloatingTerminal />
              <BackToTop />
            </div>
          )}
        </MotionConfig>
      </AccentProvider>
    </ThemeProvider>
  );
};

export default App;
