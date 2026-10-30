import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ExperiencePage } from '@/pages/ExperiencePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { SkillsPage } from '@/pages/SkillsPage';
import { CertificatesPage } from '@/pages/CertificatesPage';
import { ContactPage } from '@/pages/ContactPage';
import { ChatPage } from '@/pages/ChatPage';
import { NotFound } from '@/components/home/NotFound';

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'experience', element: <ExperiencePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'skills', element: <SkillsPage /> },
      { path: 'certificates', element: <CertificatesPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
