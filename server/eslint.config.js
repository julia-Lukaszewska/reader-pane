/**
 * @file eslint.config.js
 * @description ESLint configuration for Node.js backend using ES Modules.
 * Ignores test files, uploads, and local documentation. Warns on unused vars,
 * and errors on undefined variables.
 */

export default [
  //------------------------------------------------------------------
  // Main ESLint config for all .js files
  //------------------------------------------------------------------
  {
    files: ['**/*.js'],
    ignores: [
      'uploads/**',
      '*.pl.md',
      '*.docx',
      '*.test.js',
      '*.test.jsx',
      '*.test.ts',
      '*.test.tsx',
    ],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
    },

    env: {
      jest: true,
    },
  },
]
