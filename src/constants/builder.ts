import type {
  EslintFormat,
  OutputFormat,
  PrettierConfigState
} from '@/types/builder';

export const NEWLINE_REGEX = /[\r\n]/;
export const SNAKE_TO_CAMEL_REGEX = /_([a-z])/g;

export const DEFAULT_PRETTIER_CONFIG: PrettierConfigState = {
  semi: true,
  single_quote: true,
  tab_width: 2,
  trailing_comma: 'none',
  print_width: 80,
  use_tabs: false,
  bracket_spacing: true,
  bracket_same_line: false,
  arrow_parens: 'avoid',
  end_of_line: 'lf',
  prose_wrap: 'preserve',
  html_whitespace_sensitivity: 'css',
  plugins: []
};

export const VALID_OUTPUT_FORMATS: OutputFormat[] = ['json', 'yaml', 'js'];

export const ESLINT_FILENAME_MAP: Record<EslintFormat, string> = {
  flat: 'eslint.config.js',
  legacy: '.eslintrc.json'
};

export const PRETTIER_FILENAME_MAP: Record<OutputFormat, string> = {
  json: '.prettierrc',
  yaml: '.prettierrc.yaml',
  js: '.prettierrc.cjs'
};
