import { test, expect } from '@playwright/test';

const variants = [
  { path: '/sl-search-field', angularOnly: false },
  { path: '/sl-search-field-reactive', angularOnly: true },
  { path: '/sl-search-field-template', angularOnly: true },
];

for (const { path, angularOnly } of variants) {
  test.describe(path, () => {
    test.beforeEach(async ({ page }, testInfo) => {
      const isAngular = testInfo.project.name.startsWith('angular');
      test.skip(angularOnly ? !isAngular : isAngular);
      await page.goto(path);
    });

    test('should type and clear text in the enabled field', async ({ page }) => {
      const input = page.getByRole('textbox', { name: 'Enabled' });

      await input.fill('Test');
      await expect(input).toHaveValue('Test');

      await input.clear();
      await expect(input).toHaveValue('');
    });

    test('should have functional "Clear button" after filling the field', async ({
      page,
    }) => {
      const input = page.getByRole('textbox', { name: 'Enabled' });
      const clearButton = page.getByRole('button', { name: 'Clear text' });

      await input.fill('Test');

      await expect(clearButton).toBeVisible();
      await clearButton.click();
      await expect(input).toHaveValue('');
    });

    test('should not allow typing in the disabled field', async ({ page }) => {
      const input = page.getByRole('textbox', { name: 'Disabled' });
      await expect(input).toBeDisabled();

      await input.fill('Test', { force: true });
      await expect(input).not.toHaveValue('Test');
    });

    test('should expose both Angular navigation entries and preserve the old URL', async ({
      page,
    }) => {
      test.skip(!angularOnly, 'Angular routes test');
      await page
        .getByRole('link', {
          name: 'sl-search-field (reactive)',
          exact: true,
        })
        .click();
      await expect(page).toHaveURL(/\/sl-search-field-reactive$/);
      await expect(
        page.getByText('This example uses reactive forms.', { exact: true }),
      ).toBeVisible();

      await page
        .getByRole('link', {
          name: 'sl-search-field (template)',
          exact: true,
        })
        .click();
      await expect(page).toHaveURL(/\/sl-search-field-template$/);
      await expect(
        page.getByText('This example uses template-driven forms.', {
          exact: true,
        }),
      ).toBeVisible();

      await page.goto('/sl-search-field');
      await expect(page).toHaveURL(/\/sl-search-field-reactive$/);
    });
  });
}
