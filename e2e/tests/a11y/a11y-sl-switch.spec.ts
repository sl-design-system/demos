import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-switch accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-switch');
  });

  test('should have no accessibility violations in standard viewport', async ({
    page,
  }) => {
    await page
      .locator('sl-switch')
      .filter({ hasText: 'Text inside the switch' })
      .click();
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
    await page.goto('/sl-switch'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page
      .locator('sl-switch')
      .filter({ hasText: 'Text inside the switch' })
      .click();
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
    await page.goto('/sl-switch'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have accessible name', async ({ page }) => {
    const item = page
      .locator('sl-switch')
      .filter({ hasText: 'Text inside the switch' })
      .getByRole('switch');
    await expect(item).toHaveAccessibleName('Text inside the switch');
  });

  test('should have correct aria-checked attributes', async ({ page }) => {
    const item = page
      .locator('sl-switch')
      .filter({ hasText: 'Text inside the switch' });
    const input = item.getByRole('switch');

    await expect(input).toHaveAttribute('aria-checked', 'false');

    await item.click();
    await expect(input).toHaveAttribute('aria-checked', 'true');
  });

  test('should have correct tab order', async ({ page }) => {
    const item = page
      .locator('sl-switch')
      .filter({ hasText: 'Text inside the switch' })
      .getByRole('switch');

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(item).toBeFocused();
  });

  test(`should be keyboard operable`, async ({ page }) => {
    const item = page
      .locator('sl-switch')
      .filter({ hasText: 'Text inside the switch' })
      .getByRole('switch');

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
});
