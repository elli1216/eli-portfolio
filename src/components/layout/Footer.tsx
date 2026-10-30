import React from 'react';
import { contactItems } from '@/constants/constants';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="relative z-10 mx-auto w-full px-6 pt-16 pb-6">
    <div className="max-w-6xl mx-auto">
      {/* Main footer content */}
      <div className="border-t border-muted-foreground/20 pt-12">
        <div className="grid gap-12 md:grid-cols-3 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Darl Ellison</h3>
            <p className="text-sm text-muted-foreground">
              Software Engineer & Full Stack Developer
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="/experience" className="hover:text-foreground transition-colors">Experience</a></li>
              <li><a href="/projects" className="hover:text-foreground transition-colors">Projects</a></li>
              <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex items-center gap-4">
              <a
                href={contactItems.find(i => i.label === 'GitHub')?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={contactItems.find(i => i.label === 'LinkedIn')?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={contactItems.find(i => i.label === 'Email')?.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-muted-foreground/20 pt-8 pb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Darl Ellison Floresca. All rights reserved.</span>
            <span className="flex items-center gap-2">
              Built with React 19 & Tailwind CSS v4
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
