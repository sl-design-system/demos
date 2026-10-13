import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-search-field accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-search-field');
  });

  test('should have no accessibility violations', async ({ page }) => {
    const axe = new AxeBuilder({ page }).withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'wcag22a',
      'wcag22aa',
    ]);
    await expect(
      page.getByRole('textbox', {
        name: 'Enabled search field',
        exact: true,
      }),
    ).toBeVisible();
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have no accessibility violations in mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-search-field'); // for Firefox to properly apply the viewport size before page load
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
    await page.goto('/sl-search-field'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ['Enabled search field', 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test('should have accessible name', async ({ page }) => {
    const active = page
      .locator('sl-form-field')
      .filter({ hasText: 'Enabled' })
      .getByRole('textbox');

    const disabled = page
      .locator('sl-form-field')
      .filter({ hasText: 'Disabled' })
      .getByRole('textbox');

    await expect(active).toHaveAccessibleName('Enabled search field');
    await expect(disabled).toHaveAccessibleName('Disabled search field');
  });

  test(`should be keyboard operable`, async ({ page }) => {
    const item = page
      .locator('sl-form-field')
      .filter({ hasText: 'Enabled' })
      .getByRole('textbox');

    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page.keyboard.press('Tab');
    await page.keyboard.type('Test 1');

    await expect(item).toHaveValue('Test 1');
  });

  test(`should have accessible name for Clear button`, async ({ page }) => {
    const item = page
      .locator('sl-form-field')
      .filter({ hasText: 'Enabled' })
      .getByRole('textbox');
    const clearButton = page.getByRole('button', { name: 'Clear text' });

    await item.fill('Test');

    await expect(clearButton).toHaveAccessibleName('Clear text');
  });

  test('should have keyboard operable Clear button', async ({ page }) => {
    const item = page
      .locator('sl-form-field')
      .filter({ hasText: 'Enabled' })
      .getByRole('textbox');
    const clearButton = page.getByRole('button', { name: 'Clear text' });

    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page.keyboard.press('Tab');
    await item.fill('Test');
    await page.keyboard.press('Tab');

    await expect(clearButton).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(item).toHaveValue('');
  });
});
