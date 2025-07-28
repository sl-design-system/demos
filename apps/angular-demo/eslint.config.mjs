import tseslint from 'typescript-eslint';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import prettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  { ignores: ['dist/**', '.wireit/**', 'node_modules/**'] },
  prettier,
  tseslint.configs.recommendedTypeChecked,
  angular.configs.recommended,
  angularTemplate.configs['process-inline-templates'],
  angularTemplate.configs.recommended,
  angularTemplate.configs.accessibility
);
