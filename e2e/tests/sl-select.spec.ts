import { test, expect } from '@playwright/test';

test.describe('sl-select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-select');
  });

  test('should expand listbox on click', async ({
    page,
  }) => {
    await page.getByRole('combobox').filter({ hasText: 'Select an option' }).click();
    await expect(page.getByRole('option', { name: 'Option 1' })).toBeVisible();
  });

  test('should allow to click option in listbox', async ({
    page,
  }) => {
    await page.getByRole('combobox').filter({ hasText: 'Select an option' }).click();
    await page.getByRole('option', { name: 'Option 1' }).click();
    await expect(page.getByRole('combobox').filter({ hasText: 'Option 1' })).toBeVisible();
  });

  test('should change selected option on click', async ({
    page,
  }) => {
    await page.getByRole('combobox').filter({ hasText: 'Select an option' }).click();
    await page.getByRole('option', { name: 'Option 1' }).click();
    await page.getByRole('combobox').filter({ hasText: 'Option 1' }).click();
    await page.getByRole('option', { name: 'Option 2' }).click();
    await expect(page.getByRole('combobox').filter({ hasText: 'Option 2' })).toBeVisible();
  });

  test('should collapse listbox after click outside listbox', async ({
    page,
  }) => {
    await page.getByRole('combobox').filter({ hasText: 'Select an option' }).click();
    await page.mouse.click(10, 10);
    await expect(page.getByRole('combobox').filter({ hasText: 'Select an option' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Option 1' })).not.toBeVisible();
  });

  test('should show validation message after clicking report validity button', async ({
    page,
  }) => {
    await expect(page.getByRole('combobox').filter({ hasText: 'Select an option' })).toBeVisible();
    await page.getByRole('button', { name: 'Report validity' }).click();
    await expect(page.getByText('Please choose an option from the list.', { exact: true })).toBeVisible();
  });

  test('should not show validation message after clicking report validity button when option is selected', async ({
    page,
  }) => {
    await page.getByRole('combobox').filter({ hasText: 'Select an option' }).click();
    await page.getByRole('option', { name: 'Option 1' }).click();
    await page.getByRole('button', { name: 'Report validity' }).click();
    await expect(page.getByText('Please choose an option from the list.', { exact: true })).not.toBeVisible();
  });

  test('should clear selected option when clicking the clear button', async ({
    page,
  }) => {
    await page.getByRole('combobox').filter({ hasText: 'Select an option' }).click();
    await page.getByRole('option', { name: 'Option 1' }).click();
    await page.getByRole('button', { name: 'Clear selection' }).click();
    await expect(page.getByRole('combobox').filter({ hasText: 'Select an option' })).toBeVisible();
  });

  test('should not allow to click options in disabled select', async ({
    page,
  }) => {
    const disabledSelect = page.getByRole('combobox').filter({ hasText: 'Disabled select' });
    await expect(disabledSelect).toHaveAttribute('disabled', '');
    await disabledSelect.click({ force: true });
    await expect(page.getByRole('option', { name: 'Disabled value 1' })).not.toBeVisible();
    await expect(page.getByRole('option', { name: 'Disabled value 2' })).not.toBeVisible();
  });
});
