import { test, expect } from '@playwright/test';

test.describe('sl-number-field', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-number-field');
  });

  test('should increment value when clicking the step up button', async ({
    page,
  }) => {
    const input = page.getByRole('textbox', { name: 'Number field' });
    await expect(input).toHaveValue('1');

    await page.getByRole('button', { name: 'Step up' }).click();
    await expect(input).toHaveValue('2');
  });

  test('should decrement value when clicking the step down button', async ({
    page,
  }) => {
    const input = page.getByRole('textbox', { name: 'Number field' });
    await expect(input).toHaveValue('1');

    await page.getByRole('button', { name: 'Step down' }).click();
    await expect(input).toHaveValue('0');
  });
});
