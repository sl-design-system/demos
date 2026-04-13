import { test, expect } from '@playwright/test';

test.describe('sl-dialog-service', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (!testInfo.project.name.startsWith('angular')) {
      test.skip();
    }
    await page.goto('/sl-dialog-service');
  });

  test.describe('basic dialog', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('sl-button', { hasText: 'Test 1' }).click();
      await expect(page.locator('sl-dialog')).not.toHaveAttribute('inert');
    });

    test('should close dialog with the Cancel button', async ({ page }) => {
      const dialog = page.locator('sl-dialog');

      await dialog.locator('sl-button', { hasText: 'Cancel' }).click();
      await expect(dialog).not.toBeVisible();
    });

    test('should close dialog with the Confirm button', async ({ page }) => {
      const dialog = page.locator('sl-dialog');

      await dialog.locator('sl-button', { hasText: 'Confirm' }).click();
      await expect(dialog).not.toBeVisible();
    });

    test('should close dialog with the Escape key', async ({ page }) => {
      const dialog = page.locator('sl-dialog');

      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
    });

    test('should close dialog by clicking outside', async ({ page }) => {
      const dialog = page.locator('sl-dialog');

      await dialog.evaluate((el) => {
        el.shadowRoot?.querySelector('dialog')?.dispatchEvent(
          new MouseEvent('click', { clientX: 10, clientY: 10, bubbles: true }),
        );
      });
      await expect(dialog).not.toBeVisible();
    });
  });

  test.describe('non-cancellable dialog', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('sl-button', { hasText: 'Test 2' }).click();
      await expect(page.locator('sl-dialog')).not.toHaveAttribute('inert');
    });

    test('should not close when pressing Escape', async ({ page }) => {
      await page.keyboard.press('Escape');
      await expect(page.locator('sl-dialog')).not.toHaveAttribute('inert');
    });

    test('should not close when clicking the backdrop', async ({ page }) => {
      await page.evaluate(() => {
        const native = document
          .querySelector('sl-dialog')
          ?.shadowRoot?.querySelector('dialog');
        native?.dispatchEvent(
          new MouseEvent('click', { clientX: 10, clientY: 10, bubbles: true }),
        );
      });
      await expect(page.locator('sl-dialog')).not.toHaveAttribute('inert');
    });

    test('should close with the Cancel button', async ({ page }) => {
      await page.locator('sl-button', { hasText: 'Cancel' }).click();
      await expect(page.locator('sl-dialog')).not.toBeVisible();
    });

    test('should close with the Confirm button', async ({ page }) => {
      await page.locator('sl-button', { hasText: 'Confirm' }).click();
      await expect(page.locator('sl-dialog')).not.toBeVisible();
    });
  });
});
