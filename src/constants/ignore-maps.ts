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

export const GITIGNORE_COMMON_CATEGORY_MAP: Record<string, string[]> = {
  dependencies: ['node_modules/', '/vendor/', 'vendor/', 'bower_components/'],
  lock_files: [
    '*.lock',
    '*.lockb',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'bun.lock',
    'bun.lockb',
    'composer.lock'
  ],
  build: ['dist/', 'build/', 'out/', 'storybook-static/'],
  cache: ['.cache/', '.npm/'],
  coverage: ['coverage/', '*.lcov', '.nyc_output/', 'junit.xml', '*.junit.xml'],
  environment: [
    '.env',
    '.env.*',
    '.env.backup',
    '.env.production',
    '!.env.example'
  ],
  logs: [
    'logs/',
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    'lerna-debug.log*'
  ],
  ide: ['.DS_Store', '.idea/', '*.tsbuildinfo', '.eslintcache']
};

export const GITIGNORE_FRAMEWORK_MAP: Record<
  string,
  Record<string, string[]>
> = {
  vanilla: { misc: ['.stylelintcache', '*.tgz'] },
  vite: {
    vite: ['dist-ssr/', '.vite/', 'temp/', '*.local'],
    vite_cache: ['vite.config.js.timestamp-*', 'vite.config.ts.timestamp-*'],
    misc: ['.stylelintcache', '*.tgz']
  },
  react: {
    react: ['storybook-static/'],
    misc: ['.stylelintcache', '.vscode/', '*.local', '*.tgz']
  },
  nextjs: {
    nextjs: ['.next/', 'out/', '.swc/'],
    vercel: ['.vercel/', '.turbo/'],
    misc: ['.stylelintcache', '*.tgz']
  },
  vue: {
    vue: ['.vite/', 'temp/', '*.local'],
    vite_cache: ['vite.config.js.timestamp-*', 'vite.config.ts.timestamp-*'],
    misc: ['*.tgz']
  },
  nuxt: {
    nuxt: ['.nuxt/', '.nuxt-*', '.output/', '.output-*', '.data/', '.nitro/'],
    deployment: ['.vercel/', '.netlify/'],
    testing: ['test-results/', 'playwright-report/'],
    misc: ['.vscode/', '*.tgz']
  },
  svelte: {
    sveltekit: ['.svelte-kit/'],
    deployment: ['.vercel/', '.netlify/', '.cloudflare/', '.turbo/'],
    testing: ['test-results/', 'playwright-report/'],
    svelte_logs: ['.pnpm-debug.log'],
    vite_cache: ['vite.config.js.timestamp-*', 'vite.config.ts.timestamp-*'],
    misc: ['*.tgz']
  },
  astro: {
    astro: ['.astro/', '_site/'],
    deployment: ['.vercel/', '.netlify/', '.turbo/'],
    testing: ['test-results/', 'playwright-report/'],
    pnpm: ['.pnpm-store/'],
    misc: ['*.env', '*.tgz']
  },
  angular: {
    angular: ['.angular/', 'tmp/'],
    angular_logs: ['.ng-dev.log'],
    husky: ['.husky/_'],
    misc: ['.vscode/', '*.code-workspace', '*.tgz']
  },
  nestjs: { misc: ['.vscode/', '*.code-workspace', '*.tgz'] },
  laravel: {
    laravel: [
      '/public/build/',
      '/public/hot',
      '/public/storage',
      '/storage/*.key',
      '/storage/pail'
    ],
    php_testing: ['/.phpunit.cache', '.phpunit.result.cache'],
    php_tools: ['.phpactor.json', '/auth.json'],
    laravel_ide: ['/.fleet', '/.idea', '/.nova', '/.vscode', '/.zed'],
    misc: ['*.tgz']
  }
};
