import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

const variants = [
  {
    name: 'sl-radio-group',
    path: '/sl-radio-group',
    angularOnly: false,
    hint: 'This story has both builtin validation (required) and custom validation. You need to check the second option to make the field valid.',
  },
  {
    name: 'sl-radio-group (reactive)',
    path: '/sl-radio-group-reactive',
    angularOnly: true,
    hint: 'This example uses reactive forms. You need to check the second option to make the field valid.',
  },
  {
    name: 'sl-radio-group (template)',
    path: '/sl-radio-group-template',
    angularOnly: true,
    hint: 'This example uses template-driven forms. You need to check the second option to make the field valid.',
  },
];

for (const { name, path, angularOnly, hint } of variants) {
  const requiredErrorMsg = 'Please select an option.';
  const invalidSelectionErrorMsg = 'Pick the second option';
  const activeHint = hint;
  const disabledHint =
    'This radio group is disabled; no interaction is possible.';

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
      const group = page
        .locator('sl-form-field', { hasText: 'Active' })
        .locator('sl-radio-group');
      const disabled = page
        .locator('sl-form-field', { hasText: 'Disabled' })
        .locator('sl-radio-group');

      await expect(group).toHaveAccessibleDescription(activeHint);
      await expect(disabled).toHaveAccessibleDescription(disabledHint);
    });


    test('should have correct ARIA role and accessibility name', async ({
      page,
    }) => {
      const one = page.getByRole('radio', { name: 'One' });
      const two = page.getByRole('radio', { name: 'Two' });
      const four = page.getByRole('radio', { name: 'Four' });
      const five = page.getByRole('radio', { name: 'Five' });

      await expect(one).toHaveAccessibleName('One');
      await expect(two).toHaveAccessibleName('Two');
      await expect(four).toHaveAccessibleName('Four');
      await expect(five).toHaveAccessibleName('Five');
    });

    test('should have correct tab order', async ({ page }) => {
      const one = page.locator('sl-radio').filter({ hasText: 'One' });
      const two = page.locator('sl-radio').filter({ hasText: 'Two' });
      const four = page.locator('sl-radio').filter({ hasText: 'Four' });

      await page.getByRole('button', { name: 'Collapse navigation' }).click();

      await page.keyboard.press('Tab');
      await expect(one).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await expect(one).not.toBeFocused();
      await expect(two).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(two).not.toBeFocused();
      await expect(four).not.toBeFocused(); //shouldn't be focused as it's disabled
    });

    test(`should be keyboard operable with enter and space`, async ({
      page,
    }) => {
      const one = page.locator('sl-radio').filter({ hasText: 'One' });
      const two = page.locator('sl-radio').filter({ hasText: 'Two' });

      await expect(one).toHaveAttribute('aria-checked', 'false');
      await expect(two).toHaveAttribute('aria-checked', 'false');

      await one.focus();
      await page.keyboard.press('Enter');

      await expect(one).toHaveAttribute('aria-checked', 'true');
      await expect(two).toHaveAttribute('aria-checked', 'false');

      await two.focus();
      await page.keyboard.press('Enter');

      await expect(one).toHaveAttribute('aria-checked', 'false');
      await expect(two).toHaveAttribute('aria-checked', 'true');

      await one.focus();
      await page.keyboard.press('Space');

      await expect(one).toHaveAttribute('aria-checked', 'true');
      await expect(two).toHaveAttribute('aria-checked', 'false');

      await two.focus();
      await page.keyboard.press('Space');

      await expect(one).toHaveAttribute('aria-checked', 'false');
      await expect(two).toHaveAttribute('aria-checked', 'true');
    });

    test(`should be keyboard operable with arrow keys`, async ({ page }) => {
      const one = page.locator('sl-radio').filter({ hasText: 'One' });
      const two = page.locator('sl-radio').filter({ hasText: 'Two' });

      await expect(one).toHaveAttribute('aria-checked', 'false');
      await expect(two).toHaveAttribute('aria-checked', 'false');

      await one.focus();
      await page.keyboard.press('ArrowDown');

      await expect(one).toHaveAttribute('aria-checked', 'false');
      await expect(two).toHaveAttribute('aria-checked', 'true');

      await page.keyboard.press('ArrowUp');

      await expect(one).toHaveAttribute('aria-checked', 'true');
      await expect(two).toHaveAttribute('aria-checked', 'false');
    });

    test('should have aria-disabled attribute when disabled', async ({
      page,
    }) => {
      const four = page.locator('sl-radio').filter({ hasText: 'Four' });
      const five = page.locator('sl-radio').filter({ hasText: 'Five' });

      await expect(four).toHaveAttribute('disabled');
      await expect(five).toHaveAttribute('disabled');
    });

    test('should have error message as accessibility description', async ({
      page
    }) => {
      const group = page
        .locator('sl-form-field', { hasText: 'Active' })
        .locator('sl-radio-group');
      const one = page.locator('sl-radio').filter({ hasText: 'One' });

      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(group).toHaveAccessibleDescription(
        activeHint + ' ' + requiredErrorMsg,
      );

      await one.click();

      await expect(group).toHaveAccessibleDescription(
        activeHint + ' ' + invalidSelectionErrorMsg,
      );
    });
  });
}
