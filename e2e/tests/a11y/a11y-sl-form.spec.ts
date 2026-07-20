import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getFocusedElement } from '../../utils/getFocusedElement.js';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-form accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-form');
  });

  test('should have no accessibility violations in standard viewport', async ({
    page,
  }) => {
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have no accessibility violations in 320px width of <main>', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-form'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('component fits without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-form'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct accessible names', async ({ page }) => {
    const input = page.locator('sl-form-field').filter({ hasText: 'Name' }).getByRole('textbox');
    const checkbox = page.locator('sl-form-field').filter({ hasText: 'I agree' }).getByRole('checkbox');

    await expect(input).toHaveAccessibleName('Name');
    await expect(checkbox).toHaveAccessibleName('I agree');
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ['Name', 'I agree', 'Confirm'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test(`should be keyboard operable`, async ({ page }) => {
    const input = page.locator('sl-form-field').filter({ hasText: 'Name' }).getByRole('textbox');
    const checkbox = page.locator('sl-form-field').filter({ hasText: 'I agree' }).getByRole('checkbox');
    
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page.keyboard.press('Tab');
    await page.keyboard.type('Test 1');

    await expect(input).toHaveValue('Test 1');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await expect(checkbox).toBeChecked();

    await page.keyboard.press('Space');

    await expect(checkbox).not.toBeChecked();
  });
});
