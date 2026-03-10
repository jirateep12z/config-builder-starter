import type { EslintFormat } from '../../types/builder';
import type { FrameworkConfig } from '../../types/frameworks';

import {
  CALLBACK_ORDER_EXCLUDED_FILES,
  CALLBACK_ORDER_RULES,
  DISABLED_CALLBACK_ORDER_RULES,
  PERFECTIONIST_ESLINT_PLUGIN
} from '../../constants/callback-order';

const DEFAULT_FLAT_FILES_PATTERN = "['**/*.{js,jsx,ts,tsx}']";

const FLAT_RULE_BLOCK_INDENT = 6;
const FLAT_RULE_TEMPLATE_INDENT = 4;
const FLAT_INDENT_PAD = ' '.repeat(FLAT_RULE_TEMPLATE_INDENT);

const BASE_FLAT_IMPORTS = [
  "import js from '@eslint/js';",
  "import stylistic from '@stylistic/eslint-plugin';",
  "import perfectionist from 'eslint-plugin-perfectionist';",
  "import tseslint from 'typescript-eslint';"
];

const BASE_FLAT_CONFIGS = [
  '  js.configs.recommended,',
  '  ...tseslint.configs.recommended,',
  `  {
    plugins: {
      '@stylistic': stylistic,
      perfectionist: perfectionist,
    },
  },`
];

function SerializeRules(rules: Readonly<Record<string, unknown>>): string {
  return JSON.stringify(rules, null, FLAT_RULE_BLOCK_INDENT).replace(
    /\n/g,
    `\n${FLAT_INDENT_PAD}`
  );
}

function BuildCallbackOrderOverride(
  selected_framework: FrameworkConfig
): string {
  if (selected_framework.category === 'backend') return '';

  return `  {
    files: ${JSON.stringify(CALLBACK_ORDER_EXCLUDED_FILES)},
    rules: ${SerializeRules(DISABLED_CALLBACK_ORDER_RULES)},
  }`;
}

export function GenerateEslintConfig(
  selected_framework: FrameworkConfig | null,
  format: EslintFormat = 'flat'
): string | null {
  if (!selected_framework) return null;
  const { eslint_config, eslint_flat } = selected_framework;

  if (!eslint_config) return '';
  const callback_order_override =
    BuildCallbackOrderOverride(selected_framework);

  if (format === 'flat') {
    const imports = [...BASE_FLAT_IMPORTS, ...(eslint_flat?.imports ?? [])];
    const configs = [...BASE_FLAT_CONFIGS, ...(eslint_flat?.configs ?? [])];
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

    const combined_rules = {
      ...eslint_config.rules,
      ...CALLBACK_ORDER_RULES
    };
    const rules_str = SerializeRules(combined_rules);

    if (eslint_flat?.config_template) {
      return eslint_flat.config_template(rules_str, callback_order_override);
    }

    const extra_configs_str = eslint_flat?.extra_blocks
      ? eslint_flat.extra_blocks(rules_str)
      : '';
    const plugins_str =
      plugin_entries.length > 0
        ? `\n    plugins: {\n${plugin_entries.join('\n')}\n    },`
        : '';
    const config_block =
      eslint_flat?.config_block?.(rules_str) ??
      `  {
    files: ${files_pattern},${plugins_str}
    rules: ${rules_str},
  }`;

    return `${imports.join('\n')}

export default [
${configs.join('\n')}
${config_block},${extra_configs_str}${callback_order_override ? `\n${callback_order_override},` : ''}
];`;
  }

  const legacy_plugins = Array.from(
    new Set([
      ...(eslint_config.plugins ?? []).map(plugin =>
        plugin.replace('eslint-plugin-', '')
      ),
      PERFECTIONIST_ESLINT_PLUGIN
    ])
  );
  const legacy_config = {
    env: eslint_config.env ?? { browser: true, es2021: true },
    extends: eslint_config.extends,
    parser: eslint_config.parser,
    parserOptions: eslint_config.parserOptions,
    plugins: legacy_plugins,
    rules: {
      ...eslint_config.rules,
      ...CALLBACK_ORDER_RULES
    },
    ...(callback_order_override
      ? {
          overrides: [
            {
              files: CALLBACK_ORDER_EXCLUDED_FILES,
              rules: DISABLED_CALLBACK_ORDER_RULES
            }
          ]
        }
      : {})
  };

  return JSON.stringify(legacy_config, null, 2);
}
