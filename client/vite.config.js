import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { defineConfig } from 'vite'
// eslint-disable-next-line import/default
import react from '@vitejs/plugin-react'


import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
  alias: {
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
        'process.env': JSON.stringify({}),
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
