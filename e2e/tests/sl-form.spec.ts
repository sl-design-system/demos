import { test, expect } from '@playwright/test';

const variants = [
  { name: 'sl-form', path: '/sl-form', angularOnly: false },
  { name: 'sl-form (reactive)', path: '/sl-form-reactive', angularOnly: true },
  { name: 'sl-form (template)', path: '/sl-form-template', angularOnly: true },
];

for (const { name, path, angularOnly } of variants) {
  test.describe(name, () => {
    test.beforeEach(async ({ page }, testInfo) => {
      const isAngular = testInfo.project.name.startsWith('angular');
      test.skip(
        angularOnly ? !isAngular : isAngular,
        angularOnly ? 'Angular-only test' : 'Non-Angular test',
      );
      await page.goto(path);
    });

    test('should show validation errors when submitting empty form', async ({
      page,
    }) => {
      await page.locator('sl-button', { hasText: 'Confirm' }).click();

      await expect(page.locator('sl-text-field')).toHaveAttribute(
        'show-validity',
        'invalid',
      );
      await expect(page.locator('sl-checkbox')).toHaveAttribute(
        'show-validity',
        'invalid',
      );
    });

    test('should not open a new tab when only name is filled', async ({
      page,
    }) => {
      await page.getByRole('textbox', { name: 'Name' }).fill('Test');

      const pagesBefore = page.context().pages().length;
      await page.locator('sl-button', { hasText: 'Confirm' }).click();

      await expect(page.locator('sl-checkbox')).toHaveAttribute(
        'show-validity',
        'invalid',
      );
      expect(page.context().pages().length).toEqual(pagesBefore);
    });

    test('should not open a new tab when only checkbox is checked', async ({
      page,
    }) => {
      await page.locator('sl-checkbox').click();

      const pagesBefore = page.context().pages().length;
      await page.locator('sl-button', { hasText: 'Confirm' }).click();

      await expect(page.locator('sl-text-field')).toHaveAttribute(
        'show-validity',
        'invalid',
      );
      expect(page.context().pages().length).toEqual(pagesBefore);
    });

    test('should open a new tab when the form is fully filled', async ({
      page,
    }) => {
      await page.getByRole('textbox', { name: 'Name' }).fill('Test');
      await page.locator('sl-checkbox').click();

      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.locator('sl-button', { hasText: 'Confirm' }).click(),
      ]);
      await expect(newPage).toHaveURL('about:blank');
    });
  });
}
