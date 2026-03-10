import type { FrameworkIconId } from '@/types/builder';
import type { EslintConfig } from '@/types/frameworks';

type EslintFrameworkId = Exclude<FrameworkIconId, 'laravel'>;

const STYLISTIC_ESLINT_PACKAGE = '@stylistic/eslint-plugin';
const STYLISTIC_ESLINT_PLUGIN = '@stylistic';
const STYLISTIC_ESLINT_RULES: Record<string, unknown> = {
  '@stylistic/padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: 'import',
      next: '*'
    },
    {
      blankLine: 'any',
      prev: 'import',
      next: 'import'
    },
    {
      blankLine: 'always',
      prev: ['const', 'let', 'var'],
      next: '*'
    },
    {
      blankLine: 'always',
      prev: '*',
      next: ['return', 'throw']
    },
    {
      blankLine: 'always',
      prev: 'block-like',
      next: '*'
    },
    {
      blankLine: 'any',
      prev: ['const', 'let', 'var'],
      next: ['const', 'let', 'var']
    }
  ],
  '@stylistic/lines-between-class-members': [
    'error',
    'always',
    {
      exceptAfterSingleLine: true
    }
  ]
};

export const BASE_ESLINT_CONFIG: EslintConfig = {
  extends: ['eslint:recommended'],
  plugins: [STYLISTIC_ESLINT_PLUGIN],
  rules: {
    ...STYLISTIC_ESLINT_RULES,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'all',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_'
      }
    ],
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: false, allowTernary: false }
    ],
    'no-unused-labels': 'error',
    'no-unused-private-class-members': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }]
  }
};

export const TYPESCRIPT_ESLINT_CONFIG: EslintConfig = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', STYLISTIC_ESLINT_PLUGIN],
  rules: {
    ...STYLISTIC_ESLINT_RULES,
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'all',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false
      }
    ],
    'no-unused-labels': 'error',
    'no-unused-private-class-members': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
};

export const REACT_ESLINT_CONFIG: EslintConfig = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    STYLISTIC_ESLINT_PLUGIN
  ],
  rules: {
    ...TYPESCRIPT_ESLINT_CONFIG.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es2021: true
  }
};

export const VUE_ESLINT_CONFIG: EslintConfig = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint', 'vue', STYLISTIC_ESLINT_PLUGIN],
  rules: {
    ...TYPESCRIPT_ESLINT_CONFIG.rules,
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'vue/prop-name-casing': 'off',
    'vue/no-v-html': 'warn',
    'vue/html-self-closing': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  }
};

export const NEXTJS_ESLINT_CONFIG: EslintConfig = {
  extends: ['next/core-web-vitals'],
  plugins: ['react', 'react-hooks', STYLISTIC_ESLINT_PLUGIN],
  rules: {
    ...REACT_ESLINT_CONFIG.rules
  }
};

export const NUXT_ESLINT_CONFIG: EslintConfig = {
  extends: ['./.nuxt/eslint.config.mjs'],
  plugins: [STYLISTIC_ESLINT_PLUGIN],
  rules: {
    ...TYPESCRIPT_ESLINT_CONFIG.rules,
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'vue/prop-name-casing': 'off',
    'vue/no-v-html': 'warn',
    'vue/html-self-closing': 'off'
  }
};

export const ASTRO_ESLINT_CONFIG: EslintConfig = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'astro', STYLISTIC_ESLINT_PLUGIN],
  rules: {
    ...TYPESCRIPT_ESLINT_CONFIG.rules
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  }
};

export const SVELTE_ESLINT_CONFIG: EslintConfig = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'svelte', STYLISTIC_ESLINT_PLUGIN],
  rules: {
    ...TYPESCRIPT_ESLINT_CONFIG.rules
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2021: true
  }
};

export const ANGULAR_ESLINT_CONFIG: EslintConfig = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@angular-eslint/recommended',
    'plugin:@angular-eslint/template/process-inline-templates'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@angular-eslint', STYLISTIC_ESLINT_PLUGIN],
  rules: {
    ...TYPESCRIPT_ESLINT_CONFIG.rules
  },
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es2021: true
  }
};

export const NESTJS_ESLINT_CONFIG: EslintConfig = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', STYLISTIC_ESLINT_PLUGIN],
  rules: {
    ...TYPESCRIPT_ESLINT_CONFIG.rules,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: '.',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    node: true,
    es2021: true
  }
};

export const ESLINT_DEV_DEPENDENCIES: Record<EslintFrameworkId, string[]> = {
  vanilla: [
    'eslint',
    '@eslint/js',
    'typescript-eslint',
    'typescript',
    STYLISTIC_ESLINT_PACKAGE
  ],
  vite: [
    'eslint',
    '@eslint/js',
    'typescript-eslint',
    'typescript',
    STYLISTIC_ESLINT_PACKAGE
  ],
  react: [
    'eslint',
    '@eslint/js',
    'typescript-eslint',
    'typescript',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    STYLISTIC_ESLINT_PACKAGE
  ],
  vue: [
    'eslint',
    '@eslint/js',
    'typescript-eslint',
    'typescript',
    'eslint-plugin-vue',
    'vue-eslint-parser',
    STYLISTIC_ESLINT_PACKAGE
  ],
  nextjs: [
    'eslint',
    '@eslint/js',
    'typescript-eslint',
    'typescript',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-config-next',
    STYLISTIC_ESLINT_PACKAGE
  ],
  nuxt: ['eslint', '@nuxt/eslint', STYLISTIC_ESLINT_PACKAGE],
  astro: [
    'eslint',
    '@eslint/js',
    'typescript-eslint',
    'typescript',
    'eslint-plugin-astro',
    STYLISTIC_ESLINT_PACKAGE
  ],
  svelte: [
    'eslint',
    '@eslint/js',
    'typescript-eslint',
    'typescript',
    'eslint-plugin-svelte',
    'svelte-eslint-parser',
    STYLISTIC_ESLINT_PACKAGE
  ],
  nestjs: [
    'eslint',
    '@eslint/js',
    'typescript-eslint',
    'typescript',
    STYLISTIC_ESLINT_PACKAGE
  ],
  angular: [
    'eslint',
    '@eslint/js',
    'typescript-eslint',
    'typescript',
    'angular-eslint',
    '@angular-eslint/eslint-plugin',
    '@angular-eslint/eslint-plugin-template',
    '@angular-eslint/template-parser',
    STYLISTIC_ESLINT_PACKAGE
  ]
};
