import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';

interface NavToggleProps {
  isOpen: boolean;
  onClick: () => void;
  isMobile: boolean;
}

export const NavToggle: React.FC<NavToggleProps> = ({ isOpen, onClick, isMobile }) => {
  const { accentColor } = useAccent();

  const accentColorMap: Record<string, string> = {
    green: '#10b981',
    blue: '#3b82f6',
    red: '#ef4444',
    orange: '#f97316',
    purple: '#a855f7',
    gray: '#6b7280',
  };

  const currentAccentColor = accentColorMap[accentColor] || accentColorMap.green;

  return (
    <motion.button
      onClick={onClick}
      className={`fixed left-4 top-30 z-50 p-2 rounded-lg transition-colors ${
        isMobile ? 'lg:hidden' : 'hidden lg:block'
      }`}
      style={{
        backgroundColor: `${currentAccentColor}5`,
        borderColor: `${currentAccentColor}`,
        border: '1px solid',
      }}
      aria-label="Toggle navigation"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isOpen ? (
        <ChevronLeft size={24} style={{ color: currentAccentColor }} />
      ) : (
        <ChevronRight size={24} style={{ color: currentAccentColor }} />
      )}
    </motion.button>
  );
};
