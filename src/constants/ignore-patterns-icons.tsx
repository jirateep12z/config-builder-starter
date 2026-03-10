import type { CommonIgnoreCategory } from '@/types/common-ignore-category';
import {
  ClipboardList,
  FileCode,
  FolderClosed,
  Key,
  Lock,
  Monitor,
  Package,
  Shield,
  Zap
} from 'lucide-react';
import type { ReactNode } from 'react';

export const IGNORE_PATTERNS_CATEGORY_ICONS: Record<
  CommonIgnoreCategory,
  () => ReactNode
> = {
  dependencies: () => <Package className="h-4 w-4" />,
  build: () => <Zap className="h-4 w-4" />,
  cache: () => <FolderClosed className="h-4 w-4" />,
  coverage: () => <Shield className="h-4 w-4" />,
  lock_files: () => <Lock className="h-4 w-4" />,
  minified: () => <FileCode className="h-4 w-4" />,
  environment: () => <Key className="h-4 w-4" />,
  ide: () => <Monitor className="h-4 w-4" />,
  logs: () => <ClipboardList className="h-4 w-4" />
};
