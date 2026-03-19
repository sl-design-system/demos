import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'angular',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4200' },
    },
    {
      name: 'lit',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:8009' },
    },
    {
      name: 'svelte',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:8000' },
    },
    {
      name: 'vue',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:8008' },
    },
  ],
});
