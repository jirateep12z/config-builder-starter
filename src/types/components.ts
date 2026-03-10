import type {
  EslintFormat,
  GeneratedOutput,
  OutputFormat,
  PrettierConfigState
} from './builder';
import type { CommonIgnoreCategory } from './common-ignore-category';
import type { FrameworkConfig } from './frameworks';
import type { PackageManager } from './package-manager';

export type FrameworkCardProps = {
  framework: FrameworkConfig;
  is_selected: boolean;
  OnSelect: (framework_id: string) => void;
};

export type PrettierConfigEditorProps = {
  config: PrettierConfigState;
  OnUpdate: <K extends keyof PrettierConfigState>(
    key: K,
    value: PrettierConfigState[K]
  ) => void;
};

export type IgnorePatternsEditorProps = {
  patterns: string[];
  custom_patterns: string[];
  OnToggle: (pattern: string) => void;
  OnAddCustom: (pattern: string) => void;
  OnRemoveCustom: (pattern: string) => void;
  OnAddCommonPatterns: (category: CommonIgnoreCategory) => void;
};

export type OutputPreviewProps = {
  output: GeneratedOutput;
  output_format: OutputFormat;
  OnFormatChange: (format: OutputFormat) => void;
  OnCopy: (text: string) => Promise<boolean>;
  GenerateInstallCommand: (package_manager: PackageManager) => string;
  GenerateEslintConfig: (format: EslintFormat) => string | null;
};

export type FrameworkSelectorProps = {
  selected_framework: string;
  OnSelect: (framework_id: string) => void;
};

export type SimpleTabValue = 'prettierrc' | 'prettierignore' | 'gitignore';

export type CopyButtonProps = {
  button_key: string;
  copied_key: string | null;
  OnCopy: () => void;
};

export type InstallTabProps = {
  package_manager: PackageManager;
  install_command: string;
  copied_key: string | null;
  OnChangePackageManager: (pm: PackageManager) => void;
  OnCopy: () => void;
};

export type EslintrcTabProps = {
  eslint_format: EslintFormat;
  content: string;
  copied_key: string | null;
  OnChangeFormat: (format: EslintFormat) => void;
  OnCopy: () => void;
};

export type SimpleCodeTabProps = {
  tab_value: SimpleTabValue;
  content: string;
  placeholder: string;
  button_key: SimpleTabValue;
  copied_key: string | null;
  OnCopy: () => void;
};

export type FormatTabProps = {
  content: string;
  copied_key: string | null;
  OnCopy: () => void;
};
