import type { FrameworkConfig } from '@/types/frameworks';

export const CATEGORY_COLOR_MAP: Record<FrameworkConfig['category'], string> = {
  frontend:
    'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400',
  backend:
    'bg-orange-500/10 text-orange-700 border-orange-500/20 dark:text-orange-400',
  fullstack:
    'bg-purple-500/10 text-purple-700 border-purple-500/20 dark:text-purple-400'
};

export const CATEGORY_LABEL_MAP: Record<FrameworkConfig['category'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Full Stack'
};
