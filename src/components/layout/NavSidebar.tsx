import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { useTheme } from '@/contexts/ThemeContext';
import { useAccent } from '@/contexts/AccentContext';

interface NavItem {
  label: string;
  path: string;
  id: string;
}

interface NavSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/', id: 'home' },
  { label: 'About', path: '/about', id: 'about' },
  { label: 'Experience', path: '/experience', id: 'experience' },
  { label: 'Projects', path: '/projects', id: 'projects' },
  { label: 'Skills', path: '/skills', id: 'skills' },
  { label: 'Activities', path: '/activities', id: 'activities' },
  { label: 'Certificates', path: '/certificates', id: 'certificates' },
  { label: 'Contact', path: '/contact', id: 'contact' },
];

export const NavSidebar: React.FC<NavSidebarProps> = ({ isOpen, onClose, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
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

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-30 ${isMobile ? 'lg:hidden' : 'hidden lg:block'}`}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-18 w-56 z-40 transition-transform duration-300 ease-out ${
          isMobile ? 'lg:hidden' : 'hidden lg:block'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 pt-24">
          <DecorativeFrame className='bg-background' accentColor={currentAccentColor}>
            <nav className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : `text-primary hover:bg-primary/10 ${
                          theme === 'dark'
                            ? 'hover:bg-white/10'
                            : 'hover:bg-black/10'
                        }`
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </DecorativeFrame>
        </div>
      </aside>
    </>
  );
};
