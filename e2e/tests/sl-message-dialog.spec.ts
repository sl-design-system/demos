import { test, expect } from '@playwright/test';

test.describe('sl-message-dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-message-dialog');
  });

  test('should open and close message dialog when clicking the OK button', async ({ page }) => {
    await page.locator('sl-button', { hasText: 'Show' }).click();
    await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.getByRole('button', { name: 'OK' })).not.toBeVisible();
  });

  test('should open and close message dialog when pressing Escape', async ({ page }) => {
    await page.locator('sl-button', { hasText: 'Show' }).click();
    await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'OK' })).not.toBeVisible();
  });

  test('should open and close message dialog when clicking outside', async ({ page }) => {
    await page.locator('sl-button', { hasText: 'Show' }).click();
    await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();

    await page.mouse.click(10, 10);
    await expect(page.getByRole('button', { name: 'OK' })).not.toBeVisible();
  });
});
