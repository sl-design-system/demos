import { test, expect } from '@playwright/test';

test.describe('sl-toggle-button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-toggle-button');
  });

  test('should toggle button on click', async ({ page }) => {
    const item = page
      .locator('sl-toggle-button')
      .filter({ hasText: 'Test 1' });
    await expect(item).not.toHaveAttribute('pressed');
    await item.click();
    await expect(item).toHaveAttribute('pressed');
    await item.click();
    await expect(item).not.toHaveAttribute('pressed');
  });

  test('should not allow to toggle disabled button', async ({ page }) => {
    const item = page
      .locator('sl-toggle-button')
      .filter({ hasText: 'Test 2' });
    await expect(item).toHaveAttribute('disabled', '');
    await expect(item).not.toHaveAttribute('pressed');
    await item.click({ force: true });
    await expect(item).not.toHaveAttribute('pressed');
  });
});
