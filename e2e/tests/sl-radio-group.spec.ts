import { test, expect } from '@playwright/test';

test.describe('sl-radio-group', () => {
  const errorMsg = 'Pick the middle option';

  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-radio-group');
  });

  test('should be clear on initial load', async ({ page }) => {
    const activeRadios = page.getByRole('radio', { disabled: false });
    for (const radio of await activeRadios.all()) {
      await expect(radio).not.toBeChecked();
    }
  });

  test('should check radio button on click', async ({ page }) => {
    await page.getByRole('radio', { name: 'One' }).click();
    await expect(page.getByRole('radio', { name: 'One' })).toBeChecked();
    await expect(page.getByRole('radio', { name: 'Two' })).not.toBeChecked();
  });

  test('should deselect radio button after other is clicked', async ({
    page,
  }) => {
    await page.getByRole('radio', { name: 'One' }).click();
    await expect(page.getByRole('radio', { name: 'One' })).toBeChecked();

    await page.getByRole('radio', { name: 'Two' }).click();
    await expect(page.getByRole('radio', { name: 'One' })).not.toBeChecked();
  });

  test('should not show error when correct option is checked', async ({
    page,
  }) => {
    await page.getByRole('radio', { name: 'Two' }).click();
    await page.getByRole('button', { name: 'Report validity' }).click();
    await expect(page.getByText(errorMsg)).not.toBeVisible();
  });

  test('should validate active radio group without any option checked', async ({
    page,
  }) => {
    const activeRadios = page.getByRole('radio', { disabled: false });
    for (const radio of await activeRadios.all()) {
      await expect(radio).not.toBeChecked();
    }
    await page.getByRole('button', { name: 'Report validity' }).click();
    await expect(page.getByText(errorMsg)).toBeVisible();
  });

  test('should hide validation message when no longer valid', async ({
    page,
  }) => {
    await page.getByRole('radio', { name: 'One' }).click();
    await page.getByRole('button', { name: 'Report validity' }).click();
    await expect(page.getByText(errorMsg)).toBeVisible();

    await page.getByRole('radio', { name: 'Two' }).click();
    await page.getByRole('button', { name: 'Report validity' }).click();
    await expect(page.getByText(errorMsg)).not.toBeVisible();
  });

  test('should not check any option in disabled radio group', async ({
    page,
  }) => {
    const disabledRadios = page.getByRole('radio', { disabled: true });
    for (const radio of await disabledRadios.all()) {
      await expect(radio).toBeDisabled();
      await radio.click({ force: true });
      await expect(radio).not.toBeChecked();
    }
  });
});
