import { GeneratePrettierignore } from '@/lib/generators/prettier';
import type { FrameworkConfig } from '@/types/frameworks';

export function GenerateGitignore(
  ignore_patterns: string[],
  custom_patterns: string[],
  selected_framework: FrameworkConfig | null
): string {
  return GeneratePrettierignore(
    ignore_patterns,
    custom_patterns,
    selected_framework
  );
}
