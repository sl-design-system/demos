import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-dialog accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-dialog');
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
    await page.goto('/sl-dialog'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('component fits without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-dialog'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct tab order', async ({ page }) => {
    const item = page.getByRole('button', { name: 'Test' });

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(item).toBeFocused();

    await page.keyboard.press('Enter');
    
    const focusedElement = await page.evaluate(() => {
      const active = document.activeElement;
      return active?.tagName;
    });
    expect(['SL-DIALOG', 'SL-BUTTON']).toContain(focusedElement);
  });

  test(`should be activated and closed with Enter key`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'Test' });
    const dialog = page.locator('sl-dialog');
    const closeButton = page.getByRole('button', { name: 'Close' });

    await item.focus();
    await page.keyboard.press('Enter');
    await expect(dialog).toBeVisible();

    await closeButton.focus();
    await page.keyboard.press('Enter');
    await expect(dialog).not.toBeVisible();
  });

  test(`should be activated and closed with Space key`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'Test' });
    const dialog = page.locator('sl-dialog');
    const closeButton = page.getByRole('button', { name: 'Close' });

    await item.focus();
    await page.keyboard.press('Space');
    await expect(dialog).toBeVisible();

    await closeButton.focus();
    await page.keyboard.press('Space');
    await expect(dialog).not.toBeVisible();
  });
});
