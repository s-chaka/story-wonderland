import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ['src/tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
        exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**']
      }
    });