import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // jest config here
    reporters: ['verbose'],
    environment: 'jsdom',
    // globals: true,
    setupFiles: ['./vitest.setup.js'],
    coverage: {
      exclude: [...configDefaults.coverage.exclude, 'src/main.jsx'],
    },
  },
});
