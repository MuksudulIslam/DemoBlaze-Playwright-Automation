import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
    use: {
        headless: true, 
        baseURL: 'https://www.demoblaze.com/',
        trace: 'on',
        screenshot: 'on',
        video: 'off',
    },

});