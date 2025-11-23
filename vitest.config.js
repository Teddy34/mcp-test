import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: [
        'src/tools/*.js',
        'src/prompts/*.js',
        'src/resources/*.js',
      ],
      exclude: [
        'src/**/index.js',
        'src/**/*.test.js',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
      },
    },
  },
});
