
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/generate-story': 'http://localhost:3000',
      '/save-story': 'http://localhost:3000',
      '/continue-story': 'http://localhost:3000',
    },
  },
  test: {
    reporters: ['verbose'],
    environment: 'jsdom', 
    setupFiles: ['./vitest.setup.js'], 
    coverage: {
      exclude: [...configDefaults.coverage.exclude, 'src/main.jsx'],
    },
  },
});