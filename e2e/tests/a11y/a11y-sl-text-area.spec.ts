import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-text-area accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-text-area');
  });

  test('should have no accessibility violations', async ({ page }) => {
    await expect(
      page.getByRole('textbox', { name: 'Text area', exact: true }),
    ).toBeVisible();
    const axe = new AxeBuilder({ page }).withTags(['wcag22a', 'wcag22aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have no accessibility violations in 320px width of <main>', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-text-area'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    const axe = new AxeBuilder({ page }).withTags(['wcag22a', 'wcag22aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('component fits without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-text-area'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have accessible name', async ({ page }) => {
    const item = page
      .locator('sl-text-area')
      .getByPlaceholder('Type your message');
    await expect(item).toHaveAccessibleName('Text area');
  });

  test('should have correct tab order', async ({ page }) => {
    const item = page.getByRole('textbox', { name: 'Text area', exact: true });

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(item).toBeFocused();
  });

  test(`should be keyboard operable`, async ({ page }) => {
    const item = page.getByRole('textbox', { name: 'Text area', exact: true });

    await item.focus();
    await page.keyboard.type('Hello world');
    await expect(item).toHaveValue('Hello world');
  });
});
