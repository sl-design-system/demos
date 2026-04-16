import { test, expect } from '@playwright/test';

test.describe('sl-inline-message', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-inline-message');
  });

  test('should close inline message when clicking the close button', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.locator('sl-inline-message')).not.toBeVisible();
  });
});
