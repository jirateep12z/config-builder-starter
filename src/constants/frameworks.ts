import type { FrameworkConfig } from '@/types/frameworks';
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
} from './eslint';

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
    eslint_flat: {
      plugins: [
        {
          import_name: 'react',
          from: "'eslint-plugin-react'",
          configs: ["  react.configs.flat['jsx-runtime'],"]
        },
        {
          import_name: 'reactHooks',
          from: "'eslint-plugin-react-hooks'",
          configs: ["  reactHooks.configs.flat['recommended'],"]
        }
      ]
    },
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
    eslint_flat: {
      plugins: [
        {
          import_name: 'nextPlugin',
          from: "'@next/eslint-plugin-next'",
          configs: [],
          plugin_key: '@next/next'
        },
        {
          import_name: 'react',
          from: "'eslint-plugin-react'",
          configs: ["  react.configs.flat['jsx-runtime'],"]
        },
        {
          import_name: 'reactHooks',
          from: "'eslint-plugin-react-hooks'",
          configs: ["  reactHooks.configs.flat['recommended'],"]
        }
      ]
    },
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
    eslint_flat: {
      plugins: [
        {
          import_name: 'vue',
          from: "'eslint-plugin-vue'",
          configs: ["  ...vue.configs['flat/vue3-recommended'],"]
        }
      ],
      files_pattern: "['**/*.{js,ts,vue}']"
    },
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
    eslint_flat: {
      plugins: [
        {
          import_name: 'vue',
          from: "'eslint-plugin-vue'",
          configs: ["  ...vue.configs['flat/vue3-recommended'],"]
        }
      ],
      files_pattern: "['**/*.{js,ts,vue}']"
    },
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
    eslint_flat: {
      plugins: [
        {
          import_name: 'svelte',
          from: "'eslint-plugin-svelte'",
          configs: ["  ...svelte.configs['flat/recommended'],"]
        }
      ],
      files_pattern: "['**/*.{js,ts,svelte}']"
    },
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
    eslint_flat: {
      plugins: [
        {
          import_name: 'astro',
          from: "'eslint-plugin-astro'",
          configs: []
        }
      ],
      files_pattern: "['**/*.{js,ts}']",
      extra_blocks: (rules_str: string) =>
        `\n  ...astro.configs['flat/recommended'],\n  {\n    files: ['**/*.astro'],\n    rules: ${rules_str},\n  },`
    },
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
    eslint_flat: {
      files_pattern: "['**/*.{js,ts}']",
      extra_blocks: (_rules_str: string) =>
        "\n  {\n    files: ['**/*.html'],\n    rules: {},\n  },"
    },
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
    eslint_flat: {
      files_pattern: "['**/*.{js,ts}']"
    },
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

export const FRAMEWORKS_MAP = new Map(FRAMEWORKS.map(f => [f.id, f]));
