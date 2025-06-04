import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// -------- __dirname in ESM --------
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  // ------------- env -------------
  const branch   = process.env.BRANCH || mode
  const envFile  = `.env.client.${branch}`
  const envPath  = resolve(__dirname, '../env', envFile)

  if (fs.existsSync(envPath)) {
    Object.assign(process.env, loadEnv('', resolve(__dirname, '../env'), envFile))
    console.log(`Loaded ${envFile}`)
  }

  // ------------- config -------------
  return {
    plugins: [react()],
    resolve: {
      alias: {
        global: 'globalThis',
        '@':        resolve(__dirname, 'src'),
        '@book':    resolve(__dirname, 'src/modules/book'),
        '@reader':  resolve(__dirname, 'src/modules/reader'),
        '@upload':  resolve(__dirname, 'src/modules/uploadPDF'),
        '@library': resolve(__dirname, 'src/modules/library'),
        '@user':    resolve(__dirname, 'src/modules/user'),
        '@home':    resolve(__dirname, 'src/modules/home'),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: { global: 'globalThis' },
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
  }
})
