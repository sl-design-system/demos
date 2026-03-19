import { test, expect, Page } from '@playwright/test';

test.describe('sl-button', () => {
  let newPage: Page;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async () => {
    await newPage?.close();
  });

  test('should click the sl-button and open a new page', async ({ page }) => {
    await page.waitForTimeout(1000);
    [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-button').click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
    await page.waitForTimeout(1000);
  });
});