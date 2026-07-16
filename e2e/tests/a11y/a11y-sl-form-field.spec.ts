import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-form-field accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-form-field');
  });

  test('should have no accessibility violations', async ({ page }) => {
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have no accessibility violations in mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-form-field'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('component fits without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-form-field'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct tab order', async ({ page }) => {
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page.keyboard.press('Tab');

    let focusedOn = await getFocusedElement(page);
    expect(focusedOn).toBe('Enabled');

    await page.keyboard.press('Tab');

    focusedOn = await getFocusedElement(page);
    expect(focusedOn).not.toBe('Disabled');
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

    await expect(active).toHaveAccessibleName('Enabled');
    await expect(disabled).toHaveAccessibleName('Disabled');
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
});
