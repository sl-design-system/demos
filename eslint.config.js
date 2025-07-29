import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';

const compat = new FlatCompat({ baseDirectory: import.meta.url });

export default [
  // ignore output and dependencies - must be first and global
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.wireit/**',
      'dist/**',
      'node_modules/**',
      '.wireit/**'
    ]
  },

  // extend recommended ESLint and plugin configs
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ),

  // apply parser and project settings to TS, JS, Vue, Svelte and HTML files
  {
    files: ['**/*.{ts,js,vue,svelte,html}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          './tsconfig.json',
          './apps/angular-demo/tsconfig.app.json',
          './apps/lit-demo/tsconfig.json',
          './apps/svelte-demo/tsconfig.json',
          './apps/vue-demo/tsconfig.json'
        ],
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue', '.svelte', '.html']
      }
    }
  }
];
