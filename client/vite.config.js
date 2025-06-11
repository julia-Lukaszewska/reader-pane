/**
 * @file vite.config.js
 * @description Vite configuration for the Reader-App client (ESM syntax).
 *   - Uses Vercel-provided environment variables (no local .env)
 *   - Sets up React plugin for JSX/TSX and HMR
 *   - Defines path aliases for cleaner imports
 *   - Applies Node globals polyfill for buffer and process
 */

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { defineConfig } from 'vite'
/** eslint-disable import/default */
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * @function
 * @name default
 * @description Defines and exports Vite configuration for Reader-App.
 * @returns {import('vite').UserConfig} Vite user configuration object
 */
export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@/': resolve(__dirname, 'src/'),
        '@book/': resolve(__dirname, 'src/modules/book'),
        '@reader/': resolve(__dirname, 'src/modules/reader'),
        '@upload/': resolve(__dirname, 'src/modules/uploadPDF'),
        '@library/': resolve(__dirname, 'src/modules/library'),
        '@user/': resolve(__dirname, 'src/modules/user'),
        '@home/': resolve(__dirname, 'src/modules/home'),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: { global: 'globalThis' },
        plugins: [NodeGlobalsPolyfillPlugin({ process: true, buffer: true })],
      },
    },
    server: {
      proxy: {
        '/api': 'http://localhost:5000',
      },
    },
  }
})
