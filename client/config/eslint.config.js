/**
 * @file eslint.config.js
 * @description ESLint configuration for React + Vite project using ESM syntax and no semicolons.
 *   - Ignores build and config files
 *   - Enforces single quotes, no semicolons
 *   - Supports React, hooks, accessibility, and import rules
 *   - Resolves imports from both project root and client/node_modules
 */

import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'

export default [
  // ----------------------------------------------------------------
  // Ignore files and folders
  // ----------------------------------------------------------------
  {
    ignores: [
      'dist',
      'node_modules/**',
      'public/pdf.worker.min.js',
      'docs',
      'united*',
      '**/*.pl.md',
      '*.docx',
      '**/*.pl.*',
      'uploads/**',
      'coverage/**',
      'build/**',
      'out/**',
    ],
  },

  // ----------------------------------------------------------------
  // Base rule overrides
  // ----------------------------------------------------------------
  {
    rules: {
      // Enforce no semicolons
      semi: ['error', 'never'],
      // Enforce single quotes
      quotes: ['error', 'single'],
    },
  },

  // ----------------------------------------------------------------
  // All JS/JSX files
  // ----------------------------------------------------------------
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        process: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    rules: {
      // Base recommended rules
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // Import rules
      'import/no-unresolved': ['error', { commonjs: true, amd: true }],
      'import/named': 'error',
      'import/default': 'error',
      'import/export': 'error',

      // Fast refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        // Resolve modules from root and client/node_modules
        node: {
          moduleDirectory: ['node_modules', 'client/node_modules'],
          extensions: ['.js', '.jsx', '.mjs', '.cjs', '.json'],
        },
        // Support path aliases defined in jsconfig.json
        typescript: {
          project: './client/jsconfig.json',
          alwaysTryTypes: true,
        },
      },
    },
  },
]
