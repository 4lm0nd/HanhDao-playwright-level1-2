import { defineConfig, devices } from '@playwright/test';
import { constant } from './constants/constant';

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
        headless: false,
        baseURL: constant.baseUrl,
        screenshot: 'on',
      }
    }
  ]
});