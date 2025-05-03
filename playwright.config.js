const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never',
      host: '0.0.0.0'
    }],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      summary: true
    }]
  ],

  use: {
    baseURL: 'https://www.saucedemo.com/',
    headless: true,
    ignoreHTTPSErrors: true,
    bypassCSP: true,

    launchOptions: {
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-web-security',
        '--use-gl=swiftshader',
        '--window-size=1280,1024'
      ]
    }
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--start-maximized', '--use-gl=swiftshader']
        }
      }
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        launchOptions: {
          args: [
            '--disable-features=msEdgePreload',
            '--disable-gpu-compositing'
          ]
        }
      }
    }
  ],

  timeout: 30 * 1000,
  expect: { timeout: 5000 }
});
