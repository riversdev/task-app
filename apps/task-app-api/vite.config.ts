import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'node20',
    outDir: './dist',
    lib: {
      entry: './src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['express', 'http', 'https', 'os', 'path', 'crypto', 'fs', 'mongoose', 'dotenv', 'cors', 'zod'],
      output: {
        entryFileNames: 'index.cjs',
      },
    },
  },
})
