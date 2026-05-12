import { test, expect } from '@playwright/test';

const variants = [
  { name: 'sl-radio-group', path: '/sl-radio-group', angularOnly: false },
  { name: 'sl-radio-group (reactive)', path: '/sl-radio-group-reactive', angularOnly: true },
  { name: 'sl-radio-group (template)', path: '/sl-radio-group-template', angularOnly: true },
];

for (const { name, path, angularOnly } of variants) {
  const requiredErrorMsg = 'Please select an option.';
  const invalidSelectionErrorMsg = 'Pick the second option';

  test.describe(name, () => {
    test.beforeEach(async ({ page }, testInfo) => {
      const isAngular = testInfo.project.name.startsWith('angular');
      test.skip(
        angularOnly ? !isAngular : isAngular,
        angularOnly ? 'Angular-only test' : 'Non-Angular test',
      );
      await page.goto(path);
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
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText(requiredErrorMsg)).not.toBeVisible();
    await expect(page.getByText(invalidSelectionErrorMsg)).not.toBeVisible();
  });

  test('should validate active radio group without any option checked', async ({
    page,
  }) => {
    const activeRadios = page.getByRole('radio', { disabled: false });
    for (const radio of await activeRadios.all()) {
      await expect(radio).not.toBeChecked();
    }
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText(requiredErrorMsg)).toBeVisible();
    await expect(page.getByText(invalidSelectionErrorMsg)).not.toBeVisible();
  });

  test('should validate active radio group when first option is checked', async ({
    page,
  }) => {
    await page.getByRole('radio', { name: 'One' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText(invalidSelectionErrorMsg)).toBeVisible();
    await expect(page.getByText(requiredErrorMsg)).not.toBeVisible();
  });

  test('should hide validation message when no longer valid', async ({
    page,
  }) => {
    await page.getByRole('radio', { name: 'One' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText(invalidSelectionErrorMsg)).toBeVisible();

    await page.getByRole('radio', { name: 'Two' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText(invalidSelectionErrorMsg)).not.toBeVisible();
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
}
