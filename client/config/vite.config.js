import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
// eslint-disable-next-line import/default
import react from '@vitejs/plugin-react'

import fs from 'fs'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const branch = process.env.BRANCH || 'dev'
const envFile = `.env.client.${branch}`
const envPath = resolve(__dirname, '../../env', envFile)

// Load environment variables
if (fs.existsSync(envPath)) {
  const env = loadEnv('', resolve(__dirname, '../../env'), `.env.client.${branch}`)
  process.env = { ...process.env, ...env }
  console.log(`Loaded ${envFile}`)
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      global: 'globalThis',
      '@': resolve(__dirname, '../../client/src'),
      '@book': resolve(__dirname, '../../client/src/modules/book'),
      '@reader': resolve(__dirname, '../../client/src/modules/reader'),
      '@upload': resolve(__dirname, '../../client/src/modules/uploadPDF'),
      '@library': resolve(__dirname, '../../client/src/modules/library'),
      '@user': resolve(__dirname, '../../client/src/modules/user'),
      '@home': resolve(__dirname, '../../client/src/modules/home'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
