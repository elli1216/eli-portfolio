import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { FloatingNavSidebar } from '@/components/layout/FloatingNavSidebar';
import { Hero } from '@/components/home/Hero';
import { SectionLoader } from '@/components/layout/SectionLoader';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/layout/BackToTop';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { AccentProvider } from '@/contexts/AccentContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotFound } from '@/components/home/NotFound';
import { ThemedCursor } from './components/home/cursor/ThemedCursor';
import { useMobile } from './lib/utils';

const About = React.lazy(() => import('@/components/about/About').then(m => ({ default: m.About })));
const Experience = React.lazy(() => import('@/components/experience/Experience').then(m => ({ default: m.Experience })));
const Hackathons = React.lazy(() => import('@/components/hackathons/Hackathons').then(m => ({ default: m.Hackathons })));
const Projects = React.lazy(() => import('@/components/projects/Projects').then(m => ({ default: m.Projects })));
const Skills = React.lazy(() => import('@/components/skills/Skills').then(m => ({ default: m.Skills })));
const Contact = React.lazy(() => import('@/components/contact/Contact').then(m => ({ default: m.Contact })));
const Certificates = React.lazy(() => import('@/components/certificates/Certificates').then(m => ({ default: m.Certificates })));
const ChatWidget = React.lazy(() => import('@/components/chat/ChatWidget').then(m => ({ default: m.ChatWidget })));

const AppContent: React.FC = () => {
  const isMobile = useMobile();

  return (
    <SmoothScroll>
      <div className="min-h-dvh w-full overflow-x-hidden flex flex-col">
        {isMobile ? null : <ThemedCursor />}
        <Navbar />
        <FloatingNavSidebar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route
              path="/about"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/experience"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <Experience />
                </Suspense>
              }
            />
            <Route
              path="/projects"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <Projects />
                </Suspense>
              }
            />
            <Route
              path="/skills"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <Skills />
                </Suspense>
              }
            />
            <Route
              path="/activities"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <Hackathons />
                </Suspense>
              }
            />
            <Route
              path="/certificates"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <Certificates />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </div>
    </SmoothScroll>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AccentProvider>
          <AppContent />
        </AccentProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;