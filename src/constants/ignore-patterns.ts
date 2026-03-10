import type { CommonIgnoreCategory } from '@/types/common-ignore-category';
import { COMMON_IGNORE_PATTERNS } from './ignore-maps';

export function IsCommonIgnoreCategory(
  value: string
): value is CommonIgnoreCategory {
  return value in COMMON_IGNORE_PATTERNS;
}

export const COMMON_IGNORE_CATEGORY_KEYS = Object.keys(
  COMMON_IGNORE_PATTERNS
).filter(IsCommonIgnoreCategory);

export const IGNORE_PATTERNS_CATEGORY_ORDER: CommonIgnoreCategory[] = [
  'dependencies',
  'build',
  'cache',
  'coverage',
  'lock_files',
  'minified',
  'environment',
  'ide',
  'logs'
];

export const IGNORE_PATTERNS_CATEGORY_LABELS: Record<
  CommonIgnoreCategory,
  string
> = {
  dependencies: 'Dependencies',
  build: 'Build Output',
  cache: 'Cache',
  coverage: 'Coverage',
  lock_files: 'Lock Files',
  minified: 'Minified',
  environment: 'Environment',
  ide: 'IDE',
  logs: 'Logs'
};
