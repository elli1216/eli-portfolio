import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { AccentProvider } from '@/contexts/AccentContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { routes } from '@/routes';

const Router = () => useRoutes(routes);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AccentProvider>
          <MotionConfig reducedMotion="user">
            <Router />
          </MotionConfig>
        </AccentProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
