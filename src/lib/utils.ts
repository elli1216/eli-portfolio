import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useState, useEffect } from 'react';
import { MONTHS } from '@/constants/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    checkMobile();

    // Event listener for window resize
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [breakpoint]);

  return isMobile;
};

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const getBadgeStyles = (Category: string) => {
  // Using hardcoded strings to avoid circular dependency with constants.tsx if not needed,
  // or we can import category from constants.tsx
  switch (Category) {
    case 'Academic Project':
      return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
    case 'Freelance':
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'Capstone Project':
      return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    case 'Hackathon Project':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    default:
      return 'bg-primary/20 text-primary border-primary/30';
  }
};

export const getDurationLabel = (period: string): string => {
  const [startPart, endPart] = period.split(/\s*[-–]\s*/);
  const parse = (raw: string) => {
    const [monthName, year] = raw.split(' ');
    return new Date(Number(year), MONTHS.indexOf(monthName), 1);
  };
  const start = parse(startPart);
  const end = endPart && endPart.toLowerCase() !== 'present' ? parse(endPart) : new Date();

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  if (months <= 0) months = 1;

  if (months < 12) return `${months} mo${months > 1 ? 's' : ''}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem ? `${years} yr ${rem} mo` : `${years} yr${years > 1 ? 's' : ''}`;
};