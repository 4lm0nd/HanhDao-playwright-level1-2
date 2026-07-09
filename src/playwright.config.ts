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
        channel: 'chrome', 
        headless: false,
        baseURL: constant.baseUrl,
        screenshot: 'on',
      }
    }
  ]
});