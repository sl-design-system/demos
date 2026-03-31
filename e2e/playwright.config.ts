import { defineConfig, devices } from '@playwright/test';

const apps = [
  { name: 'angular', baseURL: 'http://localhost:4200' },
  { name: 'lit', baseURL: 'http://localhost:8009' },
  { name: 'svelte', baseURL: 'http://localhost:8000' },
  { name: 'vue', baseURL: 'http://localhost:8008' },
];

const browsers = [
  { name: 'chromium', device: devices['Desktop Chrome'] },
  { name: 'firefox', device: devices['Desktop Firefox'] },
  { name: 'msedge', device: { ...devices['Desktop Edge'], channel: 'msedge' } },
  { name: 'webkit', device: devices['Desktop Safari'] },
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  reporter: 'html',
  expect: {
    timeout: 5000,
  },
  use: {
    trace: 'retain-on-failure',
    actionTimeout: 5000,
  },
  projects: apps.flatMap((app) =>
    browsers.map((browser) => ({
      name: `${app.name}-${browser.name}`,
      use: { ...browser.device, baseURL: app.baseURL },
    })),
  ),
});
