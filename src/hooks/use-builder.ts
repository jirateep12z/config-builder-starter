import {
  DEFAULT_PRETTIER_CONFIG,
  NEWLINE_REGEX,
  VALID_OUTPUT_FORMATS
} from '@/constants/builder';
import { FRAMEWORKS, FRAMEWORKS_MAP } from '@/constants/frameworks';
import { COMMON_IGNORE_PATTERNS } from '@/constants/ignore-maps';
import { GenerateEslintConfig as LibGenerateEslintConfig } from '@/lib/generators/eslint';
import { GenerateGitignore as LibGenerateGitignore } from '@/lib/generators/gitignore';
import { GenerateInstallCommand as LibGenerateInstallCommand } from '@/lib/generators/install';
import {
  GeneratePrettierignore as LibGeneratePrettierignore,
  GeneratePrettierrc as LibGeneratePrettierrc
} from '@/lib/generators/prettier';
import type {
  BuilderState,
  EslintFormat,
  GeneratedOutput,
  OutputFormat,
  PrettierConfigState
} from '@/types/builder';
import type { CommonIgnoreCategory } from '@/types/common-ignore-category';
import type { FrameworkConfig } from '@/types/frameworks';
import type { PackageManager } from '@/types/package-manager';
import { useCallback, useMemo, useState } from 'react';

function BuildStateFromFramework(framework: FrameworkConfig): BuilderState {
  return {
    selected_framework: framework.id,
    prettier_config: {
      ...DEFAULT_PRETTIER_CONFIG,
      ...framework.prettier_config,
      plugins: framework.prettier_config.plugins ?? []
    },
    ignore_patterns: [...framework.prettier_ignore],
    custom_patterns: []
  };
}

export function UseBuilder() {
  const default_framework = FRAMEWORKS[0];
  if (!default_framework) {
    throw new Error('FRAMEWORKS must contain at least one entry');
  }

  const [state, set_state] = useState<BuilderState>(() =>
    BuildStateFromFramework(default_framework)
  );

  const [output_format, set_output_format] = useState<OutputFormat>('json');

  const SelectOutputFormat = useCallback((format: OutputFormat) => {
    if (!VALID_OUTPUT_FORMATS.includes(format)) return;
    set_output_format(format);
  }, []);

  const selected_framework_data = useMemo(
    () => FRAMEWORKS_MAP.get(state.selected_framework) ?? null,
    [state.selected_framework]
  );

  const SelectFramework = useCallback((framework_id: string) => {
    const framework = FRAMEWORKS_MAP.get(framework_id);
    if (!framework) return;
    set_state(BuildStateFromFramework(framework));
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
    const lines = pattern
      .split(NEWLINE_REGEX)
      .map(l => l.trim())
      .filter(Boolean);
    if (lines.length === 0) return;
    set_state(prev => {
      const existing = new Set([
        ...prev.custom_patterns,
        ...prev.ignore_patterns
      ]);
      const new_lines = lines.filter(l => !existing.has(l));
      if (new_lines.length === 0) return prev;
      return {
        ...prev,
        custom_patterns: [...prev.custom_patterns, ...new_lines],
        ignore_patterns: [...prev.ignore_patterns, ...new_lines]
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
    set_state(prev => {
      const framework = FRAMEWORKS_MAP.get(prev.selected_framework);
      if (!framework) return prev;
      return BuildStateFromFramework(framework);
    });
  }, []);

  const prettierrc_output = useMemo(
    () => LibGeneratePrettierrc(state.prettier_config, output_format),
    [state.prettier_config, output_format]
  );

  const output: GeneratedOutput = useMemo(
    () => ({
      prettierrc: prettierrc_output,
      prettierignore: LibGeneratePrettierignore(
        state.ignore_patterns,
        state.custom_patterns,
        selected_framework_data
      ),
      gitignore: LibGenerateGitignore(selected_framework_data),
      format_script: selected_framework_data?.format_script ?? ''
    }),
    [
      prettierrc_output,
      state.ignore_patterns,
      state.custom_patterns,
      selected_framework_data
    ]
  );

  const GenerateEslintConfig = useCallback(
    (format: EslintFormat = 'flat') =>
      LibGenerateEslintConfig(selected_framework_data, format),
    [selected_framework_data]
  );

  const GenerateInstallCommand = useCallback(
    (package_manager: PackageManager) =>
      LibGenerateInstallCommand(selected_framework_data, package_manager),
    [selected_framework_data]
  );

  return {
    state,
    output,
    output_format,
    selected_framework_data,
    SelectOutputFormat,
    SelectFramework,
    UpdatePrettierConfig,
    ToggleIgnorePattern,
    AddCustomPattern,
    RemoveCustomPattern,
    AddCommonPatterns,
    ResetToFrameworkDefaults,
    GenerateEslintConfig,
    GenerateInstallCommand
  };
}
