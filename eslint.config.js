import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const base = {
  plugins: {
    import: importPlugin,
    prettier: prettierPlugin,
  },
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  languageOptions: {
    ecmaVersion: 2022,
    globals: globals.browser,
  },
};

export default defineConfig([
  globalIgnores(['**/dist/**', '**/.vite/**', '**/node_modules/**', '**/coverage/**']),
  {
    files: ['apps/*/src/**/*.{ts,tsx}', 'packages/*/src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    ...base,
  },

  // 2) Archivos de configuración (vite, eslint, commitlint, etc.)
  {
    files: ['**/vite.config.{ts,js}', '**/*.config.{ts,js}', '**/eslint.config.{js,ts}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    ...base,
  },
]);
