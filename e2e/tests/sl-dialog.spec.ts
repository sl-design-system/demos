import { test, expect } from '@playwright/test';

test.describe('sl-dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-dialog');
  });

  test('should open a dialog and close it via close button', async ({
    page,
  }) => {
    const dialog = page.locator('sl-dialog');

    await expect(dialog).toHaveAttribute('inert', '');

    await page.locator('sl-button', { hasText: 'Test' }).click();
    await expect(dialog).not.toHaveAttribute('inert');

    await dialog.locator('sl-button', { hasText: 'Close' }).click();
    await expect(dialog).toHaveAttribute('inert', '');
  });

  test('should open a dialog and close it via Escape key', async ({ page }) => {
    const dialog = page.locator('sl-dialog');

    await page.locator('sl-button', { hasText: 'Test' }).click();
    await expect(dialog).not.toHaveAttribute('inert');

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveAttribute('inert', '');
  });

  test('should open a dialog and close it by clicking outside', async ({
    page,
  }) => {
    const dialog = page.locator('sl-dialog');

    await page.locator('sl-button', { hasText: 'Test' }).click();
    await expect(dialog).not.toHaveAttribute('inert');

    await page.evaluate(() => {
      const native = document
        .querySelector('sl-dialog')
        ?.shadowRoot?.querySelector('dialog');
      native?.dispatchEvent(
        new MouseEvent('click', { clientX: 10, clientY: 10, bubbles: true }),
      );
    });
    await expect(dialog).toHaveAttribute('inert', '');
  });
});
