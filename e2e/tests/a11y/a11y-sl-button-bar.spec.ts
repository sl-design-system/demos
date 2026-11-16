import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-button-bar accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-button-bar');
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
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have no accessibility violations in mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-button-bar'); // for Firefox to properly apply the viewport size before page load
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
    await page.goto('/sl-button-bar'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct tab order', async ({ page }) => {
    const item = page.getByRole('button', { name: 'Test 2' });

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(item).toBeFocused();
  });

  test(`should be activated with Enter key`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'Test 2' });

    const pagePromise = page.context().waitForEvent('page');
    await item.focus();
    await page.keyboard.press('Enter');
    const newPage = await pagePromise;

    await expect(newPage).toHaveURL('about:blank');
    await newPage.close();
  });

  test(`should be activated with Space key`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'Test 2' });

    const pagePromise = page.context().waitForEvent('page');
    await item.focus();
    await page.keyboard.press('Space');
    const newPage = await pagePromise;

    await expect(newPage).toHaveURL('about:blank');
    await newPage.close();
  });
});
