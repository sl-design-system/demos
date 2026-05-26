import { test, expect } from '@playwright/test';

test.describe('sl-text-area', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-text-area');
  });

  test('should type and clear text in the enabled field', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Text area' });

    await input.fill('Test');
    await expect(input).toHaveValue('Test');

    await input.clear();
    await expect(input).toHaveValue('');
  });

  test('should accept multi-line input with newlines', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Text area' });

    await input.fill('Test');
    await page.keyboard.press('Enter');
    await input.pressSequentially('1234');
    await expect(input).toHaveValue('Test\n1234');

    await input.clear();
    await expect(input).toHaveValue('');
  });

  test('should not allow typing in the disabled field', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Disabled text area' });
    await expect(input).toBeDisabled();

    await input.fill('Test', { force: true });
    await expect(input).not.toHaveValue('Test');
  });
});
