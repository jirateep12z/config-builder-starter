import type { PrettierConfig } from './frameworks';

export type FrameworkIconId =
  | 'vanilla'
  | 'vite'
  | 'laravel'
  | 'react'
  | 'nextjs'
  | 'vue'
  | 'nuxt'
  | 'svelte'
  | 'astro'
  | 'angular'
  | 'nestjs';

export type OutputFormat = 'json' | 'yaml' | 'js';

export type EslintFormat = 'flat' | 'legacy';

export type CopyMode = 'content' | 'filename';

export type BuilderState = {
  selected_framework: string;
  prettier_config: PrettierConfigState;
  ignore_patterns: string[];
  custom_patterns: string[];
};

export type PrettierConfigState = Omit<PrettierConfig, 'plugins'> & {
  plugins: string[];
};

export type GeneratedOutput = {
  prettierrc: string;
  prettierignore: string;
  gitignore: string;
  format_script: string;
};
