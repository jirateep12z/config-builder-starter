import type { FrameworkConfig } from '../../types/frameworks';
import { GeneratePrettierignore } from './prettier';

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
