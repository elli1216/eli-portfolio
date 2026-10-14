import { category } from '@/constants/constants';

export interface AccentColor {
  name: string;
  value: string;
}

export interface NavItem {
  label: string;
  href: string;
}

/**
 * A page section in the single-page layout. `id` is the DOM anchor, `command`
 * is the prompt line that heads the section and the command that navigates to
 * it from the floating terminal.
 */
export interface SectionLink {
  id: string;
  label: string;
  command: string;
  aliases: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  classname?: string;
  companyUrl?: string;
  period: string;
  location: string;
  description: string[];
  certificate?: string;
}

export interface ProjectItem {
  title: string;
  position?: string;
  hackathonTitle?: string;
  theme?: string;
  description: string;
  problem?: string;
  features?: string[];
  architecture?: string | string[];
  metrics?: { label: string; value: string }[];
  techStack: string[];
  collaborators?: { name: string; link: string }[] | null;
  image: string;
  repoLink?: string;
  demoLink?: string;
  category?: (typeof category)[keyof typeof category];
  placement?: string;
  placementOutOf?: string;
  certificate?: string;
}

export interface SkillItem {
  name: string;
  icon?: string;
  category: 'frontend' | 'backend' | 'tools';
  core?: boolean;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}
