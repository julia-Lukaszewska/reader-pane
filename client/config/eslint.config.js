/**
 * @file eslint.config.js
 * @description ESLint configuration for React + Vite project using ESM and no semicolons.
 */
// @ts-nocheck

import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'

export default [
  //------------------------------------------------------------------
  // Ignore files and folders
  //------------------------------------------------------------------
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

  //------------------------------------------------------------------
  // Base rule overrides (e.g. semicolon preference)
  //------------------------------------------------------------------
  {
    rules: {
      semi: ['error', 'never'],
    },
  },

  //------------------------------------------------------------------
  // Configuration for all JS/JSX files
  //------------------------------------------------------------------
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
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'quotes': ['error', 'single'],
      
      'import/no-unresolved': ['error', { commonjs: true, amd: true }],
      'import/named': 'error',
      'import/default': 'error',
      'import/export': 'error',

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
        alias: {
          map: [
            ['@', './src'],
            ['@book', './src/modules/book'],
            ['@reader', './src/modules/reader'],
            ['@upload', './src/modules/uploadPDF'],
            ['@library', './src/modules/library'],
          ],
          extensions: ['.js', '.jsx'],
        },
      },
    },
  },
]
