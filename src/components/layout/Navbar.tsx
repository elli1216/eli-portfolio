import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Palette, Terminal, Menu, X } from 'lucide-react';
import { ACCENT_COLORS, SECTIONS } from '@/constants/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccent } from '@/contexts/AccentContext';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Fixed navbar for the single-page layout: brand prompt, section links
 * (with scroll-spy highlight), and the theme + accent toggles.
 */
export const Navbar = ({ onHome }: { onHome?: () => void }) => {
  const { accentColor, setAccentColor } = useAccent();
  const { darkMode, toggleTheme } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const goHome = () => {
    if (onHome) onHome();
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Navigate to a section via `scrollIntoView` rather than the native
   * `href="#id"` jump. Native fragment scrolling is unreliable here because the
   * page sets `overflow-x: hidden` on `html`/`body`, which turns the root into a
   * (nested) scroll container and breaks anchor scrolling on mobile WebKit.
   * This mirrors the mechanism the floating terminal already uses.
   */
  const goToSection = (id: string) => {
    setMobileOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    setActiveSection(id);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowColorPicker(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!colorPickerRef.current?.contains(target)) {
        setShowColorPicker(false);
      }
      if (navRef.current && !navRef.current.contains(target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? 'bg-background/75 backdrop-blur-md' : 'bg-transparent'
      } ${scrolled && !mobileOpen ? 'border-b border-border/40' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Terminal Brand / Logo */}
        <motion.a
          href="#"
          className="font-mono text-base sm:text-lg font-bold text-foreground tracking-tight flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/40 border border-border/50 hover:border-primary/50 transition-colors shrink-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Back to top"
          onClick={(e) => {
            e.preventDefault();
            goHome();
          }}
        >
          <Terminal size={15} className="text-primary" />
          <span className="text-primary font-bold">eli</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-foreground">~#</span>
        </motion.a>

        {/* Section links */}
        <div className="hidden md:flex items-center gap-1 font-mono text-xs">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  goToSection(section.id);
                }}
                aria-current={isActive ? 'true' : undefined}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                }`}
              >
                {section.label}
              </a>
            );
          })}
        </div>

        {/* Controls (theme + accent) */}
        <div className="flex items-center gap-1 shrink-0">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <div className="relative" ref={colorPickerRef}>
            <motion.button
              onClick={() => setShowColorPicker((v) => !v)}
              className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
              aria-label="Choose accent color"
              aria-expanded={showColorPicker}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Palette size={20} />
            </motion.button>
            {showColorPicker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute right-0 top-full mt-2 p-3 bg-card border border-border rounded-lg shadow-lg flex gap-2"
                role="menu"
                aria-label="Accent color options"
              >
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setAccentColor(color.name);
                      setShowColorPicker(false);
                    }}
                    className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
                      accentColor === color.name
                        ? 'ring-2 ring-offset-2 ring-primary scale-110'
                        : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={`Set accent color to ${color.name}`}
                    aria-pressed={accentColor === color.name}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="md:hidden p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 max-h-[70vh] overflow-y-auto flex flex-col gap-1 font-mono text-sm">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      goToSection(section.id);
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={`px-3 py-2.5 rounded-md transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                    }`}
                  >
                    {section.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
