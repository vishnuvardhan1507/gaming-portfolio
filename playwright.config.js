import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  testMatch: 'game.spec.js',
  fullyParallel: true,
  use: {
    baseURL: process.env.PREVIEW_URL || 'http://127.0.0.1:5173',
    browserName: 'chromium',
    channel: 'chrome',
    headless: true,
  },
  webServer: process.env.PREVIEW_URL ? undefined : {
    command: 'npm run dev -- --port 5173',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
  },
});
