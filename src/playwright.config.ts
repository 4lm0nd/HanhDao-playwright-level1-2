import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',

  projects: [
    {
      name: 'playwright-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 1920,
          height: 1080,
        },
        channel: 'chrome',
        headless: true,
        baseURL: 'https://www.agoda.com/',
        screenshot: 'on',
      }
    }
  ]
});