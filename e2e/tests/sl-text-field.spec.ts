import { test, expect } from '@playwright/test';

test.describe('sl-text-field', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-text-field');
  });

  test('should type and clear text in the enabled field', async ({ page }) => {
    const input = page.getByRole('textbox', {
      name: 'Text field',
      exact: true,
    });

    await input.fill('Test');
    await expect(input).toHaveValue('Test');

    await input.clear();
    await expect(input).toHaveValue('');
  });

  test('should show the placeholder text when empty', async ({ page }) => {
    const input = page.getByRole('textbox', {
      name: 'Text field',
      exact: true,
    });

    await expect(input).toHaveAttribute('placeholder', 'Type your message');
    await expect(input).toHaveValue('');
  });

  test('should not allow typing in the disabled field', async ({ page }) => {
    const input = page.getByRole('textbox', {
      name: 'Disabled text field',
      exact: true,
    });
    await expect(input).toBeDisabled();

    await input.fill('Test', { force: true });
    await expect(input).not.toHaveValue('Test');
  });
});
