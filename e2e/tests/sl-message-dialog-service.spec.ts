import { test, expect } from '@playwright/test';

test.describe('sl-message-dialog-service', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (!testInfo.project.name.startsWith('angular')) {
      test.skip();
    }
    await page.goto('/sl-message-dialog-service');
  });

  test.describe('alert', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('sl-button', { hasText: 'Show alert' }).click();
      await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();
    });

    test('should close the alert when clicking the OK button', async ({ page }) => {
      await page.getByRole('button', { name: 'OK' }).click();
      await expect(page.getByRole('button', { name: 'OK' })).not.toBeVisible();
    });

    test('should close the alert when pressing Escape', async ({ page }) => {
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'OK' })).not.toBeVisible();
    });

    test('should close the alert when clicking outside', async ({ page }) => {
      await page.mouse.click(10, 10);
      await expect(page.getByRole('button', { name: 'OK' })).not.toBeVisible();
    });
  });

  test.describe('modal with custom component', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('sl-button', { hasText: 'Show modal' }).click();
      await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();
    });

    test('should close the modal when clicking the OK button', async ({ page }) => {
      await page.getByRole('button', { name: 'OK' }).click();
      await expect(page.getByRole('button', { name: 'OK' })).not.toBeVisible();
    });

    test('should close the modal when clicking the Cancel button', async ({ page }) => {
      await page.getByRole('button', { name: 'Cancel' }).click();
      await expect(page.getByRole('button', { name: 'OK' })).not.toBeVisible();
    });

    test('should close the modal when pressing Escape', async ({ page }) => {
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'OK' })).not.toBeVisible();
    });

    test('should close the modal when clicking outside', async ({ page }) => {
      await page.mouse.click(10, 10);
      await expect(page.getByRole('button', { name: 'OK' })).not.toBeVisible();
    });
  });
});
