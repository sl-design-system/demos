import { test, expect } from '@playwright/test';

test.describe('sl-form-field', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-form-field');
  });

  test('should type and clear text in the enabled field', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Enabled' });

    await input.fill('Test');
    await expect(input).toHaveValue('Test');

    await input.clear();
    await expect(input).toHaveValue('');
  });

  test('should not allow typing in the disabled field', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Disabled' });
    await expect(input).toBeDisabled();

    await input.fill('Test', { force: true });
    await expect(input).not.toHaveValue('Test');
  });
});
