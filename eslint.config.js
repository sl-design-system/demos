import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';

const compat = new FlatCompat({ baseDirectory: import.meta.url });

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.wireit/**',
      'dist/**',
      'node_modules/**',
      '.wireit/**',
      '**/*.html',
      '**/*.vue',
      '**/*.svelte',
      '**/scripts/**', // Exclude build scripts
      '**/*.scss.js', // Exclude generated SCSS files
    ],
  },

  ...compat.extends('plugin:@typescript-eslint/recommended', 'prettier'),

  // apply TypeScript parser only to TS and JS files
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          './tsconfig.json',
          './apps/angular-demo/tsconfig.app.json',
          './apps/lit-demo/tsconfig.json',
          './apps/svelte-demo/tsconfig.json',
          './apps/vue-demo/tsconfig.json',
        ],
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
];
