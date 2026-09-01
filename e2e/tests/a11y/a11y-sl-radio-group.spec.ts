import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

const variants = [
  { name: 'sl-radio-group', path: '/sl-radio-group', angularOnly: false },
  {
    name: 'sl-radio-group (reactive)',
    path: '/sl-radio-group-reactive',
    angularOnly: true,
  },
  {
    name: 'sl-radio-group (template)',
    path: '/sl-radio-group-template',
    angularOnly: true,
  },
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

    test('should have no accessibility violations in standard viewport', async ({
      page,
    }) => {
      const axe = new AxeBuilder({ page }).withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22a',
        'wcag22aa',
      ]);
      const results = await axe.analyze();
      expect(results.violations).toEqual([]);
    });

    test('should have no accessibility violations in 320px width of <main>', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
      await page.goto(path); // for Firefox to properly apply the viewport size before page load
      await page.getByRole('button', { name: 'Collapse navigation' }).click();
      const axe = new AxeBuilder({ page }).withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22a',
        'wcag22aa',
      ]);
      const results = await axe.analyze();
      expect(results.violations).toEqual([]);
    });

    test('component fits without horizontal scroll', async ({ page }) => {
      await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
      await page.goto(path); // for Firefox to properly apply the viewport size before page load
      await page.getByRole('button', { name: 'Collapse navigation' }).click();

      const hasOverflow = await hasMainHorizontalOverflow(page);
      expect(hasOverflow).toBe(false);
    });

    test('should have group description', async ({ page }) => {
      test.skip(path == '/sl-radio-group-reactive' || path == '/sl-radio-group-template');

      const group = page.locator('sl-form-field', { hasText: 'Active' }).locator('sl-radio-group');
      const disabled = page.locator('sl-form-field', { hasText: 'Disabled' }).locator('sl-radio-group');

      await expect(group).toHaveAccessibleDescription('This story has both builtin validation (required) and custom validation. You need to check the second option to make the field valid.');
      await expect(disabled).toHaveAccessibleDescription('This radio group is disabled; no interaction is possible.');
    });

    test('should have group description (angular reactive)', async ({ page }) => {
      test.skip(path !== '/sl-radio-group-reactive');

      const group = page.locator('sl-form-field', { hasText: 'Active' }).locator('sl-radio-group');
      const disabled = page.locator('sl-form-field', { hasText: 'Disabled' }).locator('sl-radio-group');

      await expect(group).toHaveAccessibleDescription('This example uses reactive forms. You need to check the second option to make the field valid.');
      await expect(disabled).toHaveAccessibleDescription('This radio group is disabled; no interaction is possible.');
    });

    test('should have group description (angular template-driven)', async ({ page }) => {
      test.skip(path !== '/sl-radio-group-template');

      const group = page.locator('sl-form-field', { hasText: 'Active' }).locator('sl-radio-group');
      const disabled = page.locator('sl-form-field', { hasText: 'Disabled' }).locator('sl-radio-group');

      await expect(group).toHaveAccessibleDescription('This example uses template-driven forms. You need to check the second option to make the field valid.');
      await expect(disabled).toHaveAccessibleDescription('This radio group is disabled; no interaction is possible.');
    });

    test('should have correct ARIA role', async ({ page }) => {
      const one = page.locator('sl-radio').filter({ hasText: 'One' });
      const two = page.locator('sl-radio').filter({ hasText: 'Two' });
      const four = page.locator('sl-radio').filter({ hasText: 'Four' });
      const five = page.locator('sl-radio').filter({ hasText: 'Five' });

      await expect(one).toHaveAttribute('role', 'radio');
      await expect(two).toHaveAttribute('role', 'radio');
      await expect(four).toHaveAttribute('role', 'radio');
      await expect(five).toHaveAttribute('role', 'radio');
    });

    test('should have correct aria-checked attributes', async ({ page }) => {
      const item = page.locator('sl-radio').filter({ hasText: 'One' });


      await expect(item).toHaveAttribute('aria-checked', 'false');

      await item.click();
      await expect(item).toHaveAttribute('aria-checked', 'true');
    });

    test('should have correct tab order', async ({ page }) => {
      const item = page.locator('sl-radio').filter({ hasText: 'One' });
      const disabledItem = page
        .locator('sl-radio-button')
        .filter({ hasText: 'Two' });

      await page.getByRole('button', { name: 'Collapse navigation' }).click();

      await page.keyboard.press('Tab');
      await expect(item).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(item).not.toBeFocused();
      await expect(disabledItem).toBeFocused();
    });

    test(`should be keyboard operable`, async ({ page }) => {
      const item = page.locator('sl-radio-button').filter({ hasText: 'One' });

      await expect(item).toHaveAttribute('aria-checked', 'false');
      await item.focus();
      await page.keyboard.press('Enter');
      await expect(item).toHaveAttribute('aria-checked', 'true');
      await page.keyboard.press('Enter');
      await expect(item).toHaveAttribute('aria-checked', 'false');
      await page.keyboard.press('Space');
      await expect(item).toHaveAttribute('aria-checked', 'true');
      await page.keyboard.press('Space');
      await expect(item).toHaveAttribute('aria-checked', 'false');
    });

    test('should have aria-disabled attribute when disabled', async ({
      page,
    }) => {
      const item = page.locator('sl-radio-button').filter({ hasText: 'Two' });

      await expect(item).toHaveAttribute('aria-disabled', 'true');
    });
  });
}