import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Palette, Terminal } from 'lucide-react';
import { ACCENT_COLORS } from '@/constants/constants';
import { motion } from 'framer-motion';
import { useAccent } from '@/contexts/AccentContext';
import { useTheme } from '@/contexts/ThemeContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { accentColor, setAccentColor } = useAccent();
  const { darkMode, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const desktopColorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowColorPicker(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = desktopColorPickerRef.current?.contains(target);
      const insideMobile = mobileColorPickerRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectAccent = (name: string) => {
    setAccentColor(name);
    setShowColorPicker(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-card/85 backdrop-blur-md shadow-sm border-b border-border/70'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Terminal Brand / Logo */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => navigate('/')}
            className="cursor-target font-mono text-base sm:text-lg font-bold text-foreground tracking-tight flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/40 border border-border/50 hover:border-primary/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Go to home"
          >
            <Terminal size={15} className="text-primary" />
            <span className="text-primary font-bold">eli</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-foreground">~#</span>
          </motion.button>
        </div>

        {/* Desktop Theme & Color Controls */}
        <div className="hidden md:flex items-center gap-1">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <div className="relative" ref={desktopColorPickerRef}>
            <motion.button
              onClick={() => setShowColorPicker(!showColorPicker)}
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
                className="absolute right-0 top-full mt-2 p-3 bg-card border border-border rounded-lg shadow-lg flex gap-2"
                role="menu"
                aria-label="Accent color options"
              >
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => selectAccent(color.name)}
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
        </div>

        {/* Mobile Theme & Color Controls */}
        <div className="flex items-center md:hidden gap-2">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <div className="relative">
            <motion.button
              onClick={() => setShowColorPicker(!showColorPicker)}
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
                className="absolute top-10 right-0 p-3 bg-card border border-border rounded-lg shadow-lg flex gap-2 z-50"
                role="menu"
                aria-label="Accent color options"
              >
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => selectAccent(color.name)}
                    className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
                      accentColor === color.name ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={`Set accent color to ${color.name}`}
                    aria-pressed={accentColor === color.name}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
