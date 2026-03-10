import type { EslintFormat } from '@/types/builder';
import type { FrameworkConfig } from '@/types/frameworks';

const DEFAULT_FLAT_FILES_PATTERN = "['**/*.{js,jsx,ts,tsx}']";

const FLAT_RULE_BLOCK_INDENT = 6;
const FLAT_RULE_TEMPLATE_INDENT = 4;
const FLAT_INDENT_PAD = ' '.repeat(FLAT_RULE_TEMPLATE_INDENT);

const BASE_FLAT_IMPORTS = [
  "import js from '@eslint/js';",
  "import tseslint from 'typescript-eslint';"
];

const BASE_FLAT_CONFIGS = [
  '  js.configs.recommended,',
  '  ...tseslint.configs.recommended,'
];

export function GenerateEslintConfig(
  selected_framework: FrameworkConfig | null,
  format: EslintFormat = 'flat'
): string | null {
  if (!selected_framework) return null;
  const { eslint_config, eslint_flat } = selected_framework;
  if (!eslint_config) return '';

  if (format === 'flat') {
    const imports = [...BASE_FLAT_IMPORTS];
    const configs = [...BASE_FLAT_CONFIGS];
    const plugin_entries: string[] = [];
    const files_pattern =
      eslint_flat?.files_pattern ?? DEFAULT_FLAT_FILES_PATTERN;

    for (const plugin of eslint_flat?.plugins ?? []) {
      imports.push(`import ${plugin.import_name} from ${plugin.from};`);
      configs.push(...plugin.configs);
      if (plugin.plugin_key) {
        plugin_entries.push(
          `      ${JSON.stringify(plugin.plugin_key)}: ${plugin.import_name},`
        );
      }
    }

    const rules_str = JSON.stringify(
      eslint_config.rules,
      null,
      FLAT_RULE_BLOCK_INDENT
    ).replace(/\n/g, `\n${FLAT_INDENT_PAD}`);

    const extra_configs_str = eslint_flat?.extra_blocks
      ? eslint_flat.extra_blocks(rules_str)
      : '';
    const plugins_str =
      plugin_entries.length > 0
        ? `\n    plugins: {\n${plugin_entries.join('\n')}\n    },`
        : '';

    return `${imports.join('\n')}

export default [
${configs.join('\n')}
  {
    files: ${files_pattern},${plugins_str}
    rules: ${rules_str},
  },${extra_configs_str}
];`;
  }

  const legacy_config = {
    env: eslint_config.env ?? { browser: true, es2021: true },
    extends: eslint_config.extends,
    parser: eslint_config.parser,
    parserOptions: eslint_config.parserOptions,
    plugins: eslint_config.plugins?.map(p => p.replace('eslint-plugin-', '')),
    rules: eslint_config.rules
  };
  return JSON.stringify(legacy_config, null, 2);
}
