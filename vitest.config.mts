/// <reference types="vitest/config" />

import { defineConfig } from 'vitest/config';

import os from 'os';

const cpus = os.cpus();
console.log(`Number of available CPUs: ${cpus.length}`);

const minWorkers = 1;
const maxWorkers = 2;
console.log(`Running tests with { minWorkers: ${minWorkers}, maxWorkers: ${maxWorkers} }`);

export default defineConfig({
  test: {
    include: ['./tests/**/*.test.ts'],
    minWorkers,
    maxWorkers,
    browser: {
      instances: [{ browser: 'chromium' }],
      provider: 'playwright',
      enabled: true,
      headless: true,
      screenshotFailures: false,
      fileParallelism: true,
    },
  },
});
