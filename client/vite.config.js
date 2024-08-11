import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        },
    },
  },
  test: {
    // jest config here
    // reporters: ['verbose'],
    environment: 'jsdom',
    globals: true,
    // setupFiles: ['./vitest.setup.js'],
    setupFiles: './vitest.setup.js',
    coverage: {
      exclude: [...configDefaults.coverage.exclude, 'src/main.jsx'],
    },
  },
});
