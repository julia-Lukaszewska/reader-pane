/* eslint-disable import/default */
/**
 * @file vite.config.js
 * @description Vite configuration for the Reader-App client (ESM syntax).
 *   - Loads environment variables from .env.client.<branch>
 *   - Sets up React plugin for JSX/TSX and HMR
 *   - Defines path aliases for cleaner imports
 *   - Applies Node globals polyfill for buffer and process
 *   - Enables HTTPS locally in `dev` via mkcert-generated certs
 */

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import dotenv from 'dotenv'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// -------- __dirname replacement in ESM --------
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * @async
 * @param {{ mode: string }} options
 * @returns {Promise<import('vite').UserConfig>}
 */
export default defineConfig(async ({ mode }) => {
  const branch = process.env.BRANCH || mode
  const envFile = `.env.client.${branch}`
  const envPath = resolve(__dirname, '../env', envFile)

  // Load env vars from the exact file
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath })
    console.log(`Loaded environment variables from ${envFile}`)
  }

  // Paths to mkcert-generated files (placed in client root)
  const certDir = resolve(__dirname, '.')
  const certFile = resolve(certDir, 'localhost.pem')
  const keyFile = resolve(certDir, 'localhost-key.pem')
  const hasCerts = fs.existsSync(certFile) && fs.existsSync(keyFile)

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
      https: hasCerts
        ? {
            key: fs.readFileSync(keyFile),
            cert: fs.readFileSync(certFile)
          }
        : false,
      proxy: {
        '/api': {
          target: 'https://localhost:5000',
          changeOrigin: true,
          secure: false
        },
      },
    },
  }
})
