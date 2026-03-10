import type { CommonIgnoreCategory, FrameworkConfig } from '@/types';
import {
  ANGULAR_ESLINT_CONFIG,
  ASTRO_ESLINT_CONFIG,
  ESLINT_DEV_DEPENDENCIES,
  NESTJS_ESLINT_CONFIG,
  NEXTJS_ESLINT_CONFIG,
  NUXT_ESLINT_CONFIG,
  REACT_ESLINT_CONFIG,
  SVELTE_ESLINT_CONFIG,
  TYPESCRIPT_ESLINT_CONFIG,
  VUE_ESLINT_CONFIG
} from './eslint.constants';

export const FRAMEWORKS: FrameworkConfig[] = [
  {
    id: 'vanilla',
    name: 'Vanilla',
    icon_id: 'vanilla',
    description: 'JavaScript/TypeScript แบบไม่ใช้ framework (ทั่วไป)',
    category: 'frontend',
    prettier_config: {
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
      html_whitespace_sensitivity: 'css'
    },
    prettier_ignore: [
      'node_modules/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*',
      '!.env.example'
    ],
    gitignore: [
      'node_modules/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '.env',
      '.env.*',
      '!.env.example',
      'logs/',
      '*.log',
      '.DS_Store'
    ],
    eslint_config: TYPESCRIPT_ESLINT_CONFIG,
    format_script: 'prettier --write "src/**/*.{js,ts,json,css,html}"',
    install: {
      dependencies: [],
      dev_dependencies: ['prettier', ...ESLINT_DEV_DEPENDENCIES.vanilla]
    }
  },
  {
    id: 'vite',
    name: 'Vite',
    icon_id: 'vite',
    description: 'Build tool สำหรับ modern web projects (Vite)',
    category: 'frontend',
    prettier_config: {
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
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*',
      '!.env.example'
    ],
    gitignore: [
      'node_modules/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'dist/',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '.env',
      '.env.*',
      '!.env.example',
      'logs/',
      '*.log',
      '.DS_Store'
    ],
    eslint_config: TYPESCRIPT_ESLINT_CONFIG,
    format_script: 'prettier --write "src/**/*.{js,ts,jsx,tsx,json,css,html}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss',
        ...ESLINT_DEV_DEPENDENCIES.vite
      ]
    }
  },
  {
    id: 'laravel',
    name: 'Laravel',
    icon_id: 'laravel',
    description: 'PHP Framework สำหรับ Web Artisans',
    category: 'backend',
    prettier_config: {
      semi: true,
      single_quote: true,
      tab_width: 4,
      trailing_comma: 'none',
      print_width: 120,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'css',
      plugins: [
        '@prettier/plugin-php',
        'prettier-plugin-blade',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ],
      overrides: [
        {
          files: '*.blade.php',
          options: {
            tab_width: 4
          }
        }
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'vendor/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'composer.lock',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*',
      '!.env.example',
      'storage/',
      'bootstrap/cache/',
      'public/build/',
      'public/hot'
    ],
    gitignore: [
      'node_modules/',
      '/vendor/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'composer.lock',
      'junit.xml',
      '*.junit.xml',
      '.env',
      '.env.*',
      '!.env.example',
      'logs/',
      '*.log',
      '.DS_Store',
      '/public/build/',
      '/public/hot',
      '/public/storage',
      '/storage/*.key',
      '/storage/pail'
    ],
    format_script:
      'prettier --write "resources/**/*.{js,ts,vue,blade.php,css}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        '@prettier/plugin-php',
        'prettier-plugin-blade',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    }
  },
  {
    id: 'react',
    name: 'React',
    icon_id: 'react',
    description: 'JavaScript library สำหรับ building UIs',
    category: 'frontend',
    prettier_config: {
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
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*',
      '!.env.example'
    ],
    gitignore: [
      'node_modules/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'dist/',
      'build/',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '.env',
      '.env.*',
      '!.env.example',
      'logs/',
      '*.log',
      '.DS_Store'
    ],
    eslint_config: REACT_ESLINT_CONFIG,
    format_script: 'prettier --write "src/**/*.{js,jsx,ts,tsx,json,css}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss',
        ...ESLINT_DEV_DEPENDENCIES.react
      ]
    }
  },
  {
    id: 'nextjs',
    name: 'Next',
    icon_id: 'nextjs',
    description: 'React Framework สำหรับ Production',
    category: 'fullstack',
    prettier_config: {
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
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      '.next/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*',
      '!.env.example'
    ],
    gitignore: [
      'node_modules/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '.next/',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '.env',
      '.env.*',
      '!.env.example',
      'logs/',
      '*.log',
      '.DS_Store'
    ],
    eslint_config: NEXTJS_ESLINT_CONFIG,
    format_script:
      'prettier --write "{app,pages,components,lib,src}/**/*.{js,jsx,ts,tsx,json,css,md}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss',
        ...ESLINT_DEV_DEPENDENCIES.nextjs
      ]
    }
  },
  {
    id: 'vue',
    name: 'Vue',
    icon_id: 'vue',
    description: 'Progressive JavaScript Framework',
    category: 'frontend',
    prettier_config: {
      semi: false,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'none',
      print_width: 100,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'ignore',
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*',
      '!.env.example'
    ],
    gitignore: [
      'node_modules/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'dist/',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '.env',
      '.env.*',
      '!.env.example',
      'logs/',
      '*.log',
      '.DS_Store'
    ],
    eslint_config: VUE_ESLINT_CONFIG,
    format_script: 'prettier --write "src/**/*.{js,ts,vue,json,css}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss',
        ...ESLINT_DEV_DEPENDENCIES.vue
      ]
    }
  },
  {
    id: 'nuxt',
    name: 'Nuxt',
    icon_id: 'nuxt',
    description: 'Vue.js Meta Framework',
    category: 'fullstack',
    prettier_config: {
      semi: false,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'none',
      print_width: 100,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'ignore',
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      '.nuxt/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*',
      '!.env.example'
    ],
    gitignore: [
      'node_modules/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '.nuxt/',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '.env',
      '.env.*',
      '!.env.example',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.DS_Store'
    ],
    eslint_config: NUXT_ESLINT_CONFIG,
    format_script:
      'prettier --write "{app,components,composables,layouts,pages,plugins,server}/**/*.{js,ts,vue,json,css}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss',
        ...ESLINT_DEV_DEPENDENCIES.nuxt
      ]
    }
  },
  {
    id: 'svelte',
    name: 'Svelte',
    icon_id: 'svelte',
    description: 'Cybernetically enhanced web apps',
    category: 'frontend',
    prettier_config: {
      semi: true,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'none',
      print_width: 100,
      use_tabs: true,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'ignore',
      plugins: [
        'prettier-plugin-svelte',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*',
      '!.env.example'
    ],
    gitignore: [
      'node_modules/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'dist/',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '.env',
      '.env.*',
      '!.env.example',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.DS_Store'
    ],
    eslint_config: SVELTE_ESLINT_CONFIG,
    format_script: 'prettier --write "src/**/*.{js,ts,svelte,json,css}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-svelte',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss',
        ...ESLINT_DEV_DEPENDENCIES.svelte
      ]
    }
  },
  {
    id: 'astro',
    name: 'Astro',
    icon_id: 'astro',
    description: 'Build faster websites',
    category: 'fullstack',
    prettier_config: {
      semi: true,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'none',
      print_width: 100,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'css',
      plugins: [
        'prettier-plugin-astro',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ],
      overrides: [
        {
          files: '*.astro',
          options: {}
        }
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*',
      '!.env.example'
    ],
    gitignore: [
      'node_modules/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'dist/',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '.env',
      '.env.*',
      '!.env.example',
      'logs/',
      '*.log',
      '.DS_Store'
    ],
    eslint_config: ASTRO_ESLINT_CONFIG,
    format_script: 'prettier --write "src/**/*.{js,ts,astro,json,css,md}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-astro',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss',
        ...ESLINT_DEV_DEPENDENCIES.astro
      ]
    }
  },
  {
    id: 'angular',
    name: 'Angular',
    icon_id: 'angular',
    description: 'Platform สำหรับ building web apps',
    category: 'frontend',
    prettier_config: {
      semi: true,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'none',
      print_width: 140,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'ignore',
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*',
      '!.env.example'
    ],
    gitignore: [
      'node_modules/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'dist/',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '.env',
      '.env.*',
      '!.env.example',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.DS_Store'
    ],
    eslint_config: ANGULAR_ESLINT_CONFIG,
    format_script: 'prettier --write "src/**/*.{js,ts,html,css,scss}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss',
        ...ESLINT_DEV_DEPENDENCIES.angular
      ]
    }
  },
  {
    id: 'nestjs',
    name: 'Nest',
    icon_id: 'nestjs',
    description:
      'Progressive Node.js framework for building server-side applications',
    category: 'backend',
    prettier_config: {
      semi: true,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'all',
      print_width: 100,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'css',
      plugins: ['prettier-plugin-organize-imports']
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*',
      '!.env.example'
    ],
    gitignore: [
      'node_modules/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'dist/',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '.env',
      '.env.*',
      '!.env.example',
      'logs/',
      '*.log',
      '.DS_Store'
    ],
    eslint_config: NESTJS_ESLINT_CONFIG,
    format_script: 'prettier --write "{src,test}/**/*.ts"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        ...ESLINT_DEV_DEPENDENCIES.nestjs
      ]
    }
  }
];

export const PRETTIERIGNORE_FRAMEWORK_MAP: Record<
  string,
  Record<string, string[]>
> = {
  vanilla: {},
  vite: {},
  react: {},
  nextjs: {},
  vue: {},
  nuxt: {},
  svelte: {},
  astro: {},
  angular: {},
  nestjs: {},
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

export const PRETTIER_OPTIONS_INFO = {
  semi: {
    label: 'Semicolons',
    description: 'เพิ่ม semicolon ท้ายคำสั่ง'
  },
  single_quote: {
    label: 'Single Quotes',
    description: 'ใช้ single quotes แทน double quotes'
  },
  tab_width: {
    label: 'Tab Width',
    description: 'จำนวน spaces ต่อ indentation level'
  },
  trailing_comma: {
    label: 'Trailing Comma',
    description: 'เพิ่ม trailing commas'
  },
  print_width: {
    label: 'Print Width',
    description: 'ความยาวบรรทัดสูงสุด'
  },
  use_tabs: {
    label: 'Use Tabs',
    description: 'ใช้ tabs แทน spaces สำหรับ indentation'
  },
  bracket_spacing: {
    label: 'Bracket Spacing',
    description: 'เพิ่ม spaces ใน object literals'
  },
  bracket_same_line: {
    label: 'Bracket Same Line',
    description: 'วาง > ของ element ไว้บรรทัดเดียวกัน'
  },
  arrow_parens: {
    label: 'Arrow Parens',
    description: 'วงเล็บรอบ arrow function parameter'
  },
  end_of_line: {
    label: 'End of Line',
    description: 'รูปแบบ line ending'
  },
  prose_wrap: {
    label: 'Prose Wrap',
    description: 'วิธีการ wrap markdown text'
  },
  html_whitespace_sensitivity: {
    label: 'HTML Whitespace',
    description: 'ความไวต่อ whitespace ใน HTML'
  }
};
