import {
  GITIGNORE_COMMON_CATEGORY_MAP,
  GITIGNORE_FRAMEWORK_MAP
} from '@/constants/ignore-maps';
import { BuildIgnoreSections } from '@/lib/ignore-sections';
import type { FrameworkConfig } from '@/types/frameworks';

export function GenerateGitignore(
  selected_framework: FrameworkConfig | null
): string {
  if (!selected_framework) return '';
  const common_categories = Object.entries(GITIGNORE_COMMON_CATEGORY_MAP);
  const framework_category_map =
    GITIGNORE_FRAMEWORK_MAP[selected_framework.id] ?? {};
  return BuildIgnoreSections(
    selected_framework.gitignore,
    common_categories,
    framework_category_map
  );
}
