import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-toggle-group accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-toggle-group');
  });

  test('should have no accessibility violations in standard viewport', async ({
    page,
  }) => {
    await page
      .locator('sl-toggle-button')
      .filter({ hasText: 'Test 1' })
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
    await page.goto('/sl-toggle-group'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page
      .locator('sl-toggle-button')
      .filter({ hasText: 'Test 1' })
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
    await page.goto('/sl-toggle-group'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct ARIA role', async ({ page }) => {
    const group = page.locator('sl-toggle-group');
    const item = group.locator('sl-toggle-button').filter({ hasText: 'Test 1' });

    await expect(group).toHaveAttribute('role', 'region');
    await expect(item).toHaveAttribute('role', 'button');
  });

  test('should have correct aria-pressed attributes', async ({ page }) => {
    const item = page.locator('sl-toggle-button').filter({ hasText: 'Test 1' });

    await expect(item).toHaveAttribute('aria-pressed', 'false');

    await item.click();

    await expect(item).toHaveAttribute('aria-pressed', 'true');
  });

  test('should have correct tab order', async ({ page }) => {
    const item1 = page.locator('sl-toggle-button').filter({ hasText: 'Test 1' });
    const item2 = page.locator('sl-toggle-button').filter({ hasText: 'Test 2' });
    const disabledItem = page.locator('sl-toggle-button').filter({ hasText: 'Test 3' });

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(item1).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(item1).not.toBeFocused();
    await expect(item2).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(item1).toBeFocused();
    await expect(disabledItem).not.toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect(item1).not.toBeFocused();
    await expect(item2).toBeFocused();
  });

  test('should be only one tab stop', async ({ page }) => {
    const item1 = page.locator('sl-toggle-button').filter({ hasText: 'Test 1' });
    const item2 = page.locator('sl-toggle-button').filter({ hasText: 'Test 2' });

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(item1).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(item1).not.toBeFocused();
    await expect(item2).not.toBeFocused();
  });

  test('should not toggle button on focus', async ({ page }) => {
    const item1 = page.locator('sl-toggle-button').filter({ hasText: 'Test 1' });
    const item2 = page.locator('sl-toggle-button').filter({ hasText: 'Test 2' });

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(item1).toHaveAttribute('aria-pressed', 'false');
    await page.keyboard.press('ArrowRight');
    await expect(item2).toHaveAttribute('aria-pressed', 'false');
    await expect(item1).toHaveAttribute('aria-pressed', 'false');
  });

  test(`should be keyboard operable`, async ({ page }) => {
    const item = page.locator('sl-toggle-button').filter({ hasText: 'Test 1' });

    await expect(item).toHaveAttribute('aria-pressed', 'false');
    await item.focus();
    await page.keyboard.press('Enter');
    await expect(item).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('Enter');
    await expect(item).toHaveAttribute('aria-pressed', 'false');
    await page.keyboard.press('Space');
    await expect(item).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('Space');
    await expect(item).toHaveAttribute('aria-pressed', 'false');
  });

  test('should have aria-disabled attribute when disabled', async ({
    page,
  }) => {
    const item = page.locator('sl-toggle-button').filter({ hasText: 'Test 3' });

    await expect(item).toHaveAttribute('aria-disabled', 'true');
  });
});
