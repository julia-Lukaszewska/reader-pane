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
const envPath = resolve(__dirname, '..', 'env', envFile)


if (fs.existsSync(envPath)) {
  const env = loadEnv('', resolve(__dirname, '..', 'env'), `.env.client.${branch}`)
  process.env = { ...process.env, ...env }
  console.log(`Loaded ${envFile}`)
}

export default defineConfig({
  plugins: [react()],
  resolve: {
  alias: {
    global: 'globalThis',
    '@': resolve(__dirname, 'src'),
    '@book': resolve(__dirname, 'src/modules/book'),
    '@reader': resolve(__dirname, 'src/modules/reader'),
    '@upload': resolve(__dirname, 'src/modules/uploadPDF'),
    '@library': resolve(__dirname, 'src/modules/library'),
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
})
