module.exports = {
  ignores: ['dist/**', '.wireit/**', 'node_modules/**'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', '@angular-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@angular-eslint/recommended',
    'plugin:@angular-eslint/template/recommended',
    'plugin:@angular-eslint/template/accessibility'
  ],
  overrides: [
    {
      files: ['src/**/*.html'],
      parser: '@angular-eslint/template-parser',
      plugins: ['@angular-eslint/template'],
      extends: ['plugin:@angular-eslint/template/recommended', 'plugin:@angular-eslint/template/accessibility']
    }
  ]
};
