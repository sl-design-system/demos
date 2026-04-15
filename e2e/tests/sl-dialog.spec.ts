import { test, expect } from '@playwright/test';

test.describe('sl-dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-dialog');
    await page.locator('sl-button', { hasText: 'Test' }).click();
    await expect(page.locator('sl-dialog')).not.toHaveAttribute('inert');
  });

  test('should close via close button', async ({ page }) => {
    await page.locator('sl-button', { hasText: 'Close' }).click();
    await expect(page.locator('sl-dialog')).not.toBeVisible();
  });

  test('should close via Escape key', async ({ page }) => {
    await page.keyboard.press('Escape');
    await expect(page.locator('sl-dialog')).not.toBeVisible();
  });

  test('should close by clicking outside', async ({ page }) => {
    await page.locator('sl-dialog').evaluate((el) => {
      el.shadowRoot
        ?.querySelector('dialog')
        ?.dispatchEvent(
          new MouseEvent('click', { clientX: 10, clientY: 10, bubbles: true }),
        );
    });
    await expect(page.locator('sl-dialog')).not.toBeVisible();
  });
});
