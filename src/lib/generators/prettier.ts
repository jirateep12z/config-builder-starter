import { SNAKE_TO_CAMEL_REGEX } from '@/constants/builder';
import {
  COMMON_IGNORE_PATTERNS,
  PRETTIERIGNORE_FRAMEWORK_MAP
} from '@/constants/ignore-maps';
import { IGNORE_PATTERNS_CATEGORY_ORDER } from '@/constants/ignore-patterns';
import { BuildIgnoreSections } from '@/lib/ignore-sections';
import { ConvertToYaml } from '@/lib/yaml';
import type { OutputFormat, PrettierConfigState } from '@/types/builder';
import type { FrameworkConfig } from '@/types/frameworks';

export function GeneratePrettierrc(
  config: PrettierConfigState,
  format: OutputFormat
): string {
  const output: Record<string, unknown> = {
    semi: config.semi,
    singleQuote: config.single_quote,
    tabWidth: config.tab_width,
    trailingComma: config.trailing_comma,
    printWidth: config.print_width,
    useTabs: config.use_tabs,
    bracketSpacing: config.bracket_spacing,
    bracketSameLine: config.bracket_same_line,
    arrowParens: config.arrow_parens,
    endOfLine: config.end_of_line,
    proseWrap: config.prose_wrap,
    htmlWhitespaceSensitivity: config.html_whitespace_sensitivity
  };

  if (config.plugins.length > 0) {
    output.plugins = config.plugins;
  }

  if (config.overrides && config.overrides.length > 0) {
    output.overrides = config.overrides.map(o => ({
      files: o.files,
      options: Object.fromEntries(
        Object.entries(o.options).map(([k, v]) => [
          k.replace(SNAKE_TO_CAMEL_REGEX, (_, c: string) => c.toUpperCase()),
          v
        ])
      )
    }));
  }

  switch (format) {
    case 'json':
      return JSON.stringify(output, null, 2);
    case 'yaml':
      return ConvertToYaml(output);
    case 'js':
      return `module.exports = ${JSON.stringify(output, null, 2)};`;
    default: {
      const _exhaustive: never = format;
      throw new Error(
        `[GeneratePrettierrc] Unsupported format: ${_exhaustive}`
      );
    }
  }
}

export function GeneratePrettierignore(
  ignore_patterns: string[],
  custom_patterns: string[],
  selected_framework: FrameworkConfig | null
): string {
  const framework_id = selected_framework?.id ?? 'vanilla';
  const common_categories = IGNORE_PATTERNS_CATEGORY_ORDER.map(
    cat => [cat, COMMON_IGNORE_PATTERNS[cat]] as [string, string[]]
  );
  const framework_category_map =
    PRETTIERIGNORE_FRAMEWORK_MAP[framework_id] ?? {};
  return BuildIgnoreSections(
    ignore_patterns,
    common_categories,
    framework_category_map,
    custom_patterns
  );
}
