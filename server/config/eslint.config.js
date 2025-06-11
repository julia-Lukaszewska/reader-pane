import { configs } from '@eslint/js'

export default [
  configs.recommended, 
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
      'docs/',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        Buffer: 'readonly',
        process: 'readonly',
        console: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        test: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
    },
  },
]
