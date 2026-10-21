import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import pluginSvelte from 'eslint-plugin-svelte';
import pluginVue from 'eslint-plugin-vue';
import svelteParser from 'svelte-eslint-parser';
import vueParser from 'vue-eslint-parser';

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
      '**/scripts/**', // Exclude build scripts
      '**/*.scss.js', // Exclude generated SCSS files
    ],
  },

  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...pluginVue.configs['flat/recommended'],
  ...pluginSvelte.configs['flat/recommended'],
  prettier,
  ...pluginSvelte.configs['flat/prettier'],

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

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },
    rules: {
      // Native slot attribute is required to target slots of web components
      'vue/no-deprecated-slot-attribute': 'off',
    },
  },

  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.svelte'],
      },
    },
  },
];
