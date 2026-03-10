import type { CommonIgnoreCategory } from '@/types/common-ignore-category';

export const COMMON_IGNORE_PATTERNS: Record<CommonIgnoreCategory, string[]> = {
  dependencies: ['node_modules/', 'vendor/'],
  build: [
    'dist/',
    'build/',
    'out/',
    '.next/',
    '.nuxt/',
    '.output/',
    '.svelte-kit/',
    '.astro/',
    '.angular/'
  ],
  cache: ['.cache/', '.parcel-cache/', '.turbo/', '.vercel/', '.netlify/'],
  coverage: ['coverage/', '.nyc_output/', 'junit.xml', '*.junit.xml'],
  lock_files: [
    '*.lock',
    '*.lockb',
    'package-lock.json',
    'pnpm-lock.yaml',
    'composer.lock'
  ],
  minified: ['*.min.js', '*.min.css', '*.min.html'],
  environment: ['.env', '.env.*', '!.env.example'],
  ide: ['.idea/', '.vscode/', '*.swp', '*.swo', '.DS_Store'],
  logs: [
    'logs/',
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*'
  ]
};

export const PRETTIERIGNORE_FRAMEWORK_MAP: Record<
  string,
  Record<string, string[]>
> = {
  laravel: {
    laravel: ['storage/', 'bootstrap/cache/', 'public/build/', 'public/hot']
  }
};
