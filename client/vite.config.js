/** eslint-disable import/default */
/**
 * @file vite.config.js
 * @description Vite configuration for the Reader-App client (ESM syntax).
 *   - Loads environment variables from .env.client.<branch>
 *   - Sets up React plugin for JSX/TSX and HMR
 *   - Defines path aliases for cleaner imports
 *   - Applies Node globals polyfill for buffer and process
 *   - Enables HTTPS locally in `dev` via devcert
 */

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'


// -------- __dirname replacement in ESM --------
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Export default Vite configuration.
 * @async
 * @param {{ mode: string }} options - Vite mode (e.g. 'development', 'production').
 * @returns {Promise<import('vite').UserConfig>} User configuration for Vite.
 */
export default defineConfig(async ({ mode }) => {
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
  const { certificateFor } = await import('devcert')
  // Generate HTTPS options only for local dev branch
  let httpsOptions = false
  if (branch === 'dev') {
    try {
      const { certificateFor } = await import('devcert')
      httpsOptions = await certificateFor('localhost')
    } catch (e) {
      console.warn(' Devcert HTTPS nie zadziałał, fallback do HTTP:', e.message)
      httpsOptions = false
    }
  }

  return {
    plugins: [react()],

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

    optimizeDeps: {
      esbuildOptions: {
        define: { global: 'globalThis' },
        plugins: [
          NodeGlobalsPolyfillPlugin({ process: true, buffer: true }),
        ],
      },
    },

    server: {
      https: httpsOptions,
      proxy: {
        // Proxy API calls to local backend over HTTPS
        '/api': 'https://localhost:5000',
      },
    },
  }
})
