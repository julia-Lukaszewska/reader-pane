/**
 * @file eslint.config.js
 * @description ESLint configuration for React + Vite + JSDoc (ESM, no semicolons, path aliases).
 */

import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import jsdoc from 'eslint-plugin-jsdoc'

export default [
  {
    ignores: [
      'dist',
      'build',
      'coverage',
      'node_modules/**',
      'uploads/**',
      'docs/**',
      'public/pdf.worker.min.js',
      '**/*.pl.*',
      '*.docx',
    ],
  },
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
    },
  },
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
      jsdoc,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

     
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      
      'import/no-unresolved': ['error', { commonjs: true, amd: true }],
      'import/named': 'error',
      'import/default': 'error',
      'import/export': 'error',

     
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      
      'jsdoc/check-alignment': 'off',
      'jsdoc/check-indentation': 'off',

      'jsdoc/require-description': 'off',  
      'jsdoc/require-jsdoc': [
        'off',
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
        },
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
            ['@user', './src/modules/user'],
            ['@home', './src/modules/home'],
          ],
          extensions: ['.js', '.jsx', '.mjs', '.cjs', '.json'],
        },
        node: {
          extensions: ['.js', '.jsx', '.mjs', '.cjs', '.json'],
        },
      },
    },
  },
]
