import { test, expect } from '@playwright/test';

test.describe('sl-button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-button');
  });

  test('should click the sl-button and open a new page', async ({ page }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-button', { hasText: 'Button' }).click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });
});
