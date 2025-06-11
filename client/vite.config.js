/**
 * @file vite.config.js
 * @description Vite configuration for the Reader-App client (ESM syntax).
 *   - Loads environment variables from .env.client.<branch>
 *   - Sets up React plugin for JSX/TSX and HMR
 *   - Defines path aliases for cleaner imports
 *   - Applies Node globals polyfill for buffer and process
 */

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
/** eslint-disable import/default */
import react from '@vitejs/plugin-react'
import fs from 'fs'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// -------- __dirname replacement in ESM --------
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * @description Export default Vite configuration
 * @param {{ mode: string }} options - Vite mode (e.g. 'development', 'production')
 * @returns {import('vite').UserConfig}
 */
export default defineConfig(({ mode }) => {
  // Determine branch for env files
  const branch = process.env.BRANCH || mode
  const envFile = `.env.client.${branch}`
  const envDir = resolve(__dirname, '../env')
  const envPath = resolve(envDir, envFile)

  // Load environment variables if .env.client.<branch> exists
  if (fs.existsSync(envPath)) {
    const env = loadEnv(branch, envDir, envFile)
    Object.assign(process.env, env)
    console.log(`Loaded environment variables from ${envFile}`)
  }

  return {
    /**
     * Vite plugins
     */
    plugins: [
      /**
       * React plugin adds HMR, JSX support, and fast refresh
       */
      react(),
    ],

    /**
     * Module resolution aliases
     */
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/'),
        '@book': resolve(__dirname, 'src/modules/book'),
        '@reader': resolve(__dirname, 'src/modules/reader'),
        '@upload': resolve(__dirname, 'src/modules/uploadPDF'),
        '@library': resolve(__dirname, 'src/modules/library'),
        '@user': resolve(__dirname, 'src/modules/user'),
        '@home': resolve(__dirname, 'src/modules/home'),
      },
    },

    /**
     * Dependency optimization (polyfill Node globals)
     */
    optimizeDeps: {
      esbuildOptions: {
        define: { global: 'globalThis' },
        plugins: [
          /**
           * Polyfills `process` and `buffer` for browser
           */
          NodeGlobalsPolyfillPlugin({ process: true, buffer: true }),
        ],
      },
    },

    /**
     * Dev server configuration
     */
    server: {
      proxy: {
        /**
         * Proxy API calls to local backend
         */
        '/api': 'http://localhost:5000',
      },
    },
  }
})
