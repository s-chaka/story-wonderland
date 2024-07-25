
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Ensure this is set
    setupFiles: ['./vitest.setup.js'], // Path to setup files
    coverage: {
      exclude: [...configDefaults.coverage.exclude, 'src/main.jsx'],
    },
  },
});