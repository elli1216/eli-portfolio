import React, { useState } from 'react';
import { NavToggle } from './NavToggle';
import { NavSidebar } from './NavSidebar';
import { useMobile } from '@/lib/utils';

export const FloatingNavSidebar: React.FC = () => {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDesktop, setIsOpenDesktop] = useState(false);

  return (
    <>
      <NavToggle
        isOpen={isMobile ? isOpen : isOpenDesktop}
        onClick={() => (isMobile ? setIsOpen(!isOpen) : setIsOpenDesktop(!isOpenDesktop))}
        isMobile={isMobile}
      />
      <NavSidebar
        isOpen={isMobile ? isOpen : isOpenDesktop}
        onClose={() => (isMobile ? setIsOpen(false) : setIsOpenDesktop(false))}
        isMobile={isMobile}
      />
    </>
  );
};
