import { test, expect } from '@playwright/test';

test.describe('sl-radio-group', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-radio-group');
  });

  test('should be clear on initial load', async ({
    page,
  }) => {
    const radios = page.getByRole('radio');
    for (const radio of await radios.all()) {
      await expect(radio).not.toBeChecked();
    }
  });

  test('should check radio group on click', async ({
    page,
  }) => {
    await page.getByRole('radio', { name: 'One' }).click();
    await expect(page.getByRole('radio', { name: 'One' })).toBeChecked();
    await expect(page.getByRole('radio', { name: 'Two' })).not.toBeChecked();
    await expect(page.getByRole('radio', { name: 'Three' })).not.toBeChecked();
  });

  test('should close the menu when clicking outside', async ({ page }) => {
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'Test 1' })).toBeVisible();

    await page.mouse.click(10, 10);

    await expect(
      page.getByRole('menuitem', { name: 'Test 1' }),
    ).not.toBeVisible();
  });
});
