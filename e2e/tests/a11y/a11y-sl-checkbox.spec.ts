import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-checkbox accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-checkbox');
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
    await page.goto('/sl-checkbox'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('component fits without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-checkbox'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have accessible name', async ({ page }) => {
    const active = page
      .locator('sl-checkbox')
      .filter({ hasText: 'Test 1' })
      .getByRole('checkbox');

    const disabled = page
      .locator('sl-checkbox')
      .filter({ hasText: 'Test 2' })
      .getByRole('checkbox');

    await expect(active).toHaveAccessibleName('Test 1');
    await expect(disabled).toHaveAccessibleName('Test 2');
  });

  test('should have correct tab order', async ({ page }) => {
    const active = page
      .locator('sl-checkbox')
      .filter({ hasText: 'Test 1' })
      .getByRole('checkbox');

    const disabled = page
      .locator('sl-checkbox')
      .filter({ hasText: 'Test 2' })
      .getByRole('checkbox');

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(active).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(disabled).not.toBeFocused();
  });

  test(`should be keyboard operable`, async ({ page }) => {
    const item = page.locator('sl-checkbox').filter({ hasText: 'Test 1' });

    const input = item.getByRole('checkbox', { name: 'Test 1' });

    await expect(item).not.toHaveAttribute('checked', '');
    await input.focus();
    await page.keyboard.press('Enter');
    await expect(item).toHaveAttribute('checked', '');
    await page.keyboard.press('Enter');
    await expect(item).not.toHaveAttribute('checked', '');
    await page.keyboard.press('Space');
    await expect(item).toHaveAttribute('checked', '');
    await page.keyboard.press('Space');
    await expect(item).not.toHaveAttribute('checked', '');
  });
});
