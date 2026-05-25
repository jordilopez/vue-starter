import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

/**
 * Vite configuration for the Vue starter project.
 *
 * Plugins:
 * - `@vitejs/plugin-vue` — Vue 3 SFC compilation
 *
 * Resolve:
 * - `@` alias maps to `src/` for clean imports
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
})
