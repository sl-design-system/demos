import { test, expect } from '@playwright/test';

test.describe('sl-popover', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-popover');
  });

  test('should show popover when clicking the trigger button', async ({ page }) => {
    await page.locator('sl-button', { hasText: 'Show more information' }).click();
    await expect(page.locator('sl-popover')).toBeVisible();
    await expect(page.locator('sl-popover h2')).toHaveText('test title');
  });

  test('should hide popover when clicking the trigger button again', async ({ page }) => {
    await page.locator('sl-button', { hasText: 'Show more information' }).click();
    await expect(page.locator('sl-popover')).toBeVisible();
    await page.locator('sl-button', { hasText: 'Show more information' }).click();
    await expect(page.locator('sl-popover')).not.toBeVisible();
  });

  test('should hide popover when clicking outside', async ({ page }) => {
    await page.locator('sl-button', { hasText: 'Show more information' }).click();
    await expect(page.locator('sl-popover')).toBeVisible();
    await page.mouse.click(10, 10);
    await expect(page.locator('sl-popover')).not.toBeVisible();
  });

  test('should hide popover when pressing Escape', async ({ page }) => {
    await page.locator('sl-button', { hasText: 'Show more information' }).click();
    await expect(page.locator('sl-popover')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('sl-popover')).not.toBeVisible();
  });
});
