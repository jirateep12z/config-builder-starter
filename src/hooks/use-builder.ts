import {
  COMMON_IGNORE_PATTERNS,
  DEFAULT_PRETTIER_CONFIG,
  FRAMEWORKS,
  GITIGNORE_COMMON_CATEGORY_MAP,
  GITIGNORE_FRAMEWORK_MAP,
  IGNORE_PATTERNS_CATEGORY_ORDER,
  PRETTIERIGNORE_FRAMEWORK_MAP
} from '@/constants';
import type {
  BuilderState,
  CommonIgnoreCategory,
  GeneratedOutput,
  OutputFormat,
  PackageManager,
  PrettierConfigState
} from '@/types';
import { ConvertToYaml } from '@/utils';
import { useCallback, useMemo, useState } from 'react';

export function UseBuilder() {
  const default_framework = FRAMEWORKS[0];

  const [state, set_state] = useState<BuilderState>({
    selected_framework: default_framework.id,
    prettier_config: {
      ...DEFAULT_PRETTIER_CONFIG,
      plugins: default_framework.prettier_config.plugins || [],
      overrides: default_framework.prettier_config.overrides
    },
    ignore_patterns: [...default_framework.prettier_ignore],
    custom_patterns: []
  });

  const [output_format, set_output_format] = useState<OutputFormat>('json');

  const selected_framework_data = useMemo(() => {
    if (!state.selected_framework) return null;
    return (
      FRAMEWORKS.find(framework => framework.id === state.selected_framework) ||
      null
    );
  }, [state.selected_framework]);

  const SelectFramework = useCallback((framework_id: string) => {
    const framework = FRAMEWORKS.find(f => f.id === framework_id);
    if (!framework) return;
    set_state({
      selected_framework: framework_id,
      prettier_config: {
        ...DEFAULT_PRETTIER_CONFIG,
        plugins: framework.prettier_config.plugins || [],
        overrides: framework.prettier_config.overrides
      },
      ignore_patterns: [...framework.prettier_ignore],
      custom_patterns: []
    });
  }, []);

  const UpdatePrettierConfig = useCallback(
    <K extends keyof PrettierConfigState>(
      key: K,
      value: PrettierConfigState[K]
    ) => {
      set_state(prev => ({
        ...prev,
        prettier_config: {
          ...prev.prettier_config,
          [key]: value
        }
      }));
    },
    []
  );

  const ToggleIgnorePattern = useCallback((pattern: string) => {
    set_state(prev => {
      const is_included = prev.ignore_patterns.includes(pattern);
      return {
        ...prev,
        ignore_patterns: is_included
          ? prev.ignore_patterns.filter(p => p !== pattern)
          : [...prev.ignore_patterns, pattern]
      };
    });
  }, []);

  const AddCustomPattern = useCallback((pattern: string) => {
    const trimmed = pattern.split(/[\r\n]/)[0].trim();
    if (!trimmed) return;
    set_state(prev => {
      if (
        prev.custom_patterns.includes(trimmed) ||
        prev.ignore_patterns.includes(trimmed)
      )
        return prev;
      return {
        ...prev,
        custom_patterns: [...prev.custom_patterns, trimmed],
        ignore_patterns: [...prev.ignore_patterns, trimmed]
      };
    });
  }, []);

  const RemoveCustomPattern = useCallback((pattern: string) => {
    set_state(prev => ({
      ...prev,
      custom_patterns: prev.custom_patterns.filter(p => p !== pattern),
      ignore_patterns: prev.ignore_patterns.filter(p => p !== pattern)
    }));
  }, []);

  const AddCommonPatterns = useCallback((category: CommonIgnoreCategory) => {
    const patterns = COMMON_IGNORE_PATTERNS[category];
    set_state(prev => ({
      ...prev,
      ignore_patterns: [...new Set([...prev.ignore_patterns, ...patterns])]
    }));
  }, []);

  const ResetToFrameworkDefaults = useCallback(() => {
    if (!state.selected_framework) return;
    SelectFramework(state.selected_framework);
  }, [state.selected_framework, SelectFramework]);

  const GeneratePrettierrc = useCallback(
    (format: OutputFormat): string => {
      const config: Record<string, unknown> = {
        semi: state.prettier_config.semi,
        singleQuote: state.prettier_config.single_quote,
        tabWidth: state.prettier_config.tab_width,
        trailingComma: state.prettier_config.trailing_comma,
        printWidth: state.prettier_config.print_width,
        useTabs: state.prettier_config.use_tabs,
        bracketSpacing: state.prettier_config.bracket_spacing,
        bracketSameLine: state.prettier_config.bracket_same_line,
        arrowParens: state.prettier_config.arrow_parens,
        endOfLine: state.prettier_config.end_of_line,
        proseWrap: state.prettier_config.prose_wrap,
        htmlWhitespaceSensitivity:
          state.prettier_config.html_whitespace_sensitivity
      };
      if (state.prettier_config.plugins.length > 0) {
        config.plugins = state.prettier_config.plugins;
      }
      if (
        state.prettier_config.overrides &&
        state.prettier_config.overrides.length > 0
      ) {
        config.overrides = state.prettier_config.overrides.map(o => ({
          files: o.files,
          options: Object.fromEntries(
            Object.entries(o.options).map(([k, v]) => [
              k.replace(/_([a-z])/g, (_match, c: string) => c.toUpperCase()),
              v
            ])
          )
        }));
      }
      switch (format) {
        case 'json':
          return JSON.stringify(config, null, 2);
        case 'yaml':
          return ConvertToYaml(config);
        case 'js':
          return `export default ${JSON.stringify(config, null, 2)};`;
      }
    },
    [state.prettier_config]
  );

  const GeneratePrettierignore = useCallback((): string => {
    const all_patterns = [...new Set(state.ignore_patterns)];
    const custom_patterns = [...new Set(state.custom_patterns)];
    const framework_id = selected_framework_data?.id || 'vanilla';
    const category_order: CommonIgnoreCategory[] =
      IGNORE_PATTERNS_CATEGORY_ORDER;
    const used_patterns = new Set<string>();
    const sections: string[] = [];
    for (const category of category_order) {
      const category_patterns = COMMON_IGNORE_PATTERNS[category].filter(
        pattern => all_patterns.includes(pattern)
      );
      if (category_patterns.length === 0) continue;
      for (const pattern of category_patterns) {
        used_patterns.add(pattern);
      }
      sections.push(`# ${category}`, ...category_patterns, '');
    }
    const framework_categories =
      PRETTIERIGNORE_FRAMEWORK_MAP[framework_id] || {};
    for (const [category, patterns] of Object.entries(framework_categories)) {
      const category_patterns = patterns.filter(
        pattern => all_patterns.includes(pattern) && !used_patterns.has(pattern)
      );
      if (category_patterns.length === 0) continue;
      for (const pattern of category_patterns) {
        used_patterns.add(pattern);
      }
      sections.push(`# ${category}`, ...category_patterns, '');
    }
    const uncategorized_custom = custom_patterns.filter(
      p => !used_patterns.has(p) && all_patterns.includes(p)
    );
    if (uncategorized_custom.length > 0) {
      for (const pattern of uncategorized_custom) {
        used_patterns.add(pattern);
      }
      sections.push('# custom', ...uncategorized_custom, '');
    }
    const remaining_patterns = all_patterns
      .filter(
        pattern => !used_patterns.has(pattern) && !pattern.startsWith('#')
      )
      .sort((a, b) => a.localeCompare(b));
    if (remaining_patterns.length > 0) {
      sections.push('# other', ...remaining_patterns, '');
    }
    return sections.join('\n').trim();
  }, [state.ignore_patterns, state.custom_patterns, selected_framework_data]);

  const GenerateGitignore = useCallback((): string => {
    if (!selected_framework_data) return '';
    const gitignore_patterns = selected_framework_data.gitignore;
    const framework_id = selected_framework_data.id;
    const sections: string[] = [];
    const used_patterns = new Set<string>();
    const common_category_order = [
      'dependencies',
      'lock_files',
      'build',
      'cache',
      'coverage',
      'environment',
      'logs',
      'ide'
    ];
    for (const category of common_category_order) {
      const category_patterns = GITIGNORE_COMMON_CATEGORY_MAP[category].filter(
        pattern => gitignore_patterns.includes(pattern)
      );
      if (category_patterns.length === 0) continue;
      for (const pattern of category_patterns) {
        used_patterns.add(pattern);
      }
      sections.push(`# ${category}`, ...category_patterns, '');
    }
    const framework_categories = GITIGNORE_FRAMEWORK_MAP[framework_id] || {};
    for (const [category, patterns] of Object.entries(framework_categories)) {
      const category_patterns = patterns.filter(
        pattern =>
          gitignore_patterns.includes(pattern) && !used_patterns.has(pattern)
      );
      if (category_patterns.length === 0) continue;
      for (const pattern of category_patterns) {
        used_patterns.add(pattern);
      }
      sections.push(`# ${category}`, ...category_patterns, '');
    }
    const remaining_patterns = gitignore_patterns
      .filter(
        pattern => !used_patterns.has(pattern) && !pattern.startsWith('#')
      )
      .sort((a, b) => a.localeCompare(b));
    if (remaining_patterns.length > 0) {
      sections.push('# other', ...remaining_patterns, '');
    }
    return sections.join('\n').trim();
  }, [selected_framework_data]);

  const GenerateEslintConfig = useCallback(
    (format: 'flat' | 'legacy' = 'flat'): string => {
      if (!selected_framework_data) return '';
      const eslint_config = selected_framework_data.eslint_config;
      if (!eslint_config) return '';
      const framework_id = selected_framework_data.id;
      if (format === 'flat') {
        const imports: string[] = [];
        const configs: string[] = [];
        const plugins_map: string[] = [];
        const settings_str = eslint_config.settings
          ? `    settings: ${JSON.stringify(eslint_config.settings, null, 6).replace(/\n/g, '\n    ')},`
          : '';
        imports.push("import js from '@eslint/js';");
        imports.push("import tseslint from 'typescript-eslint';");
        configs.push('  js.configs.recommended,');
        configs.push('  ...tseslint.configs.recommended,');
        plugins_map.push("      '@typescript-eslint': tseslint.plugin,");
        let parser_str = 'tseslint.parser';
        let files_pattern = "['**/*.{js,jsx,ts,tsx}']";
        let extra_parser_options = '';
        if (framework_id === 'react' || framework_id === 'nextjs') {
          imports.push("import react from 'eslint-plugin-react';");
          imports.push("import reactHooks from 'eslint-plugin-react-hooks';");
          plugins_map.push('      react,');
          plugins_map.push("      'react-hooks': reactHooks,");
          extra_parser_options = `
        ecmaFeatures: {
          jsx: true,
        },`;
        }
        if (framework_id === 'vue' || framework_id === 'nuxt') {
          imports.push("import vue from 'eslint-plugin-vue';");
          imports.push("import vueParser from 'vue-eslint-parser';");
          configs.push("  ...vue.configs['flat/vue3-recommended'],");
          plugins_map.push('      vue,');
          parser_str = 'vueParser';
          files_pattern = "['**/*.{js,ts,vue}']";
          extra_parser_options = `
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],`;
        }
        if (framework_id === 'svelte') {
          imports.push("import svelte from 'eslint-plugin-svelte';");
          imports.push("import svelteParser from 'svelte-eslint-parser';");
          configs.push("  ...svelte.configs['flat/recommended'],");
          plugins_map.push('      svelte,');
          parser_str = 'svelteParser';
          files_pattern = "['**/*.{js,ts,svelte}']";
          extra_parser_options = `
        parser: tseslint.parser,
        extraFileExtensions: ['.svelte'],`;
        }
        if (framework_id === 'astro') {
          imports.push("import astro from 'eslint-plugin-astro';");
          files_pattern = "['**/*.{js,ts}']";
        }
        if (framework_id === 'angular') {
          imports.push("import angular from '@angular-eslint/eslint-plugin';");
          imports.push(
            "import angularTemplateParser from '@angular-eslint/template-parser';"
          );
          plugins_map.push("      '@angular-eslint': angular,");
          files_pattern = "['**/*.{js,ts}']";
        }
        if (framework_id === 'nestjs') {
          files_pattern = "['**/*.{js,ts}']";
        }
        if (framework_id === 'nextjs') {
          imports.push("import next from '@next/eslint-plugin-next';");
          plugins_map.push("      '@next/next': next,");
        }
        const rules_str = JSON.stringify(eslint_config.rules, null, 6).replace(
          /\n/g,
          '\n    '
        );
        let extra_configs_str = '';
        if (framework_id === 'angular') {
          extra_configs_str = `
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint': angular,
    },
    rules: {},
  },`;
        }
        if (framework_id === 'astro') {
          extra_configs_str = `
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    rules: ${rules_str},
  },`;
        }
        const flat_config = `${imports.join('\n')}

export default [
${configs.join('\n')}
  {
    files: ${files_pattern},
    languageOptions: {
      parser: ${parser_str},
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',${extra_parser_options}
      },
    },
    plugins: {
${plugins_map.join('\n')}
    },
${settings_str ? settings_str + '\n' : ''}    rules: ${rules_str},
  },${extra_configs_str}
];`;
        return flat_config;
      } else {
        const legacy_config = {
          env: eslint_config.env || { browser: true, es2021: true },
          extends: eslint_config.extends,
          parser: eslint_config.parser,
          parserOptions: eslint_config.parserOptions,
          plugins: eslint_config.plugins?.map(p =>
            p.replace('eslint-plugin-', '')
          ),
          settings: eslint_config.settings,
          rules: eslint_config.rules
        };
        return JSON.stringify(legacy_config, null, 2);
      }
    },
    [selected_framework_data]
  );

  const output: GeneratedOutput = useMemo(
    () => ({
      prettierrc: GeneratePrettierrc(output_format),
      prettierignore: GeneratePrettierignore(),
      gitignore: GenerateGitignore(),
      format_script: selected_framework_data?.format_script || ''
    }),
    [
      GeneratePrettierrc,
      GeneratePrettierignore,
      GenerateGitignore,
      output_format,
      selected_framework_data
    ]
  );

  const CopyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  const GenerateInstallCommand = useCallback(
    (package_manager: PackageManager): string => {
      if (!selected_framework_data) {
        switch (package_manager) {
          case 'npm':
            return 'npm install -D prettier';
          case 'yarn':
            return 'yarn add -D prettier';
          case 'pnpm':
            return 'pnpm add -D prettier';
          case 'bun':
            return 'bun add -D prettier';
          default:
            return 'npm install -D prettier';
        }
      }
      const dep_packages = selected_framework_data.install.dependencies;
      const dev_packages = selected_framework_data.install.dev_dependencies;
      const parts: string[] = [];
      if (dep_packages.length > 0) {
        switch (package_manager) {
          case 'npm':
            parts.push(`npm install ${dep_packages.join(' ')}`);
            break;
          case 'yarn':
            parts.push(`yarn add ${dep_packages.join(' ')}`);
            break;
          case 'pnpm':
            parts.push(`pnpm add ${dep_packages.join(' ')}`);
            break;
          case 'bun':
            parts.push(`bun add ${dep_packages.join(' ')}`);
            break;
        }
      }
      if (dev_packages.length > 0) {
        switch (package_manager) {
          case 'npm':
            parts.push(`npm install -D ${dev_packages.join(' ')}`);
            break;
          case 'yarn':
            parts.push(`yarn add -D ${dev_packages.join(' ')}`);
            break;
          case 'pnpm':
            parts.push(`pnpm add -D ${dev_packages.join(' ')}`);
            break;
          case 'bun':
            parts.push(`bun add -D ${dev_packages.join(' ')}`);
            break;
        }
      }
      return parts.join(' && ');
    },
    [selected_framework_data]
  );

  return {
    state,
    output,
    output_format,
    selected_framework_data,
    set_output_format,
    SelectFramework,
    UpdatePrettierConfig,
    ToggleIgnorePattern,
    AddCustomPattern,
    RemoveCustomPattern,
    AddCommonPatterns,
    ResetToFrameworkDefaults,
    GenerateEslintConfig,
    GenerateInstallCommand,
    CopyToClipboard
  };
}
