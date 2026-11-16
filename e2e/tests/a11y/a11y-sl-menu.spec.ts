import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-menu accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-menu');
  });

  test('should have no accessibility violations in standard viewport', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.locator('sl-menu-item').filter({ hasText: 'Test 2' }).hover();
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
    await page.goto('/sl-menu'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.locator('sl-menu-item').filter({ hasText: 'Test 2' }).hover();
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
    await page.goto('/sl-menu'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.locator('sl-menu-item').filter({ hasText: 'Test 2' }).hover();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct ARIA roles', async ({ page }) => {
    const menu = page.getByRole('button', { name: 'Menu' });
    const test1 = page.locator('sl-menu-item').filter({ hasText: 'Test 1' });
    const test2 = page.locator('sl-menu-item').filter({ hasText: 'Test 2' });
    const test3 = test2.locator('sl-menu-item').filter({ hasText: 'Test 3' });
    const test4 = page.locator('sl-menu-item').filter({ hasText: 'Test 4' });

    await expect(menu).toHaveAttribute('aria-haspopup', 'menu');

    await menu.click();

    await expect(test1).toHaveAttribute('role', 'menuitem');
    await expect(test2).toHaveAttribute('role', 'menuitem');
    await expect(test4).toHaveAttribute('role', 'menuitem');

    await test2.hover();

    await expect(test3).toHaveAttribute('role', 'menuitem');
  });

  test('should have correct aria-expanded', async ({ page }) => {
    const menu = page.getByRole('button', { name: 'Menu' });
    const test2 = page.locator('sl-menu-item').filter({ hasText: 'Test 2' });

    await expect(menu).toHaveAttribute('aria-expanded', 'false');

    await menu.click();

    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(test2).toHaveAttribute('aria-expanded', 'false');

    await test2.hover();

    await expect(test2).toHaveAttribute('aria-expanded', 'true');
  });

  test('should have correct tab order', async ({ page }) => {
    const menu = page.getByRole('button', { name: 'Menu' });
    const test1 = page.locator('sl-menu-item').filter({ hasText: 'Test 1' });
    const test2 = page.locator('sl-menu-item').filter({ hasText: 'Test 2' });
    const test4 = page.locator('sl-menu-item').filter({ hasText: 'Test 4' });

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(menu).toBeFocused();
    await page.keyboard.press('Space');
    await expect(test1).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(test2).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(test4).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
  });

  test('should have keyboard accessible submenu', async ({ page }) => {
    const menu = page.getByRole('button', { name: 'Menu' });
    const test2 = page.locator('sl-menu-item').filter({ hasText: 'Test 2' });
    const test3 = test2.locator('sl-menu-item').filter({ hasText: 'Test 3' });

    await menu.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(test2).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(test3).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect(test2).toBeFocused();
    await page.keyboard.press('Space');
    await expect(test3).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(test2).toBeFocused();

    await expect(menu).not.toBeFocused();
  });

  test(`should be keyboard operable`, async ({ page }) => {
    const menu = page.getByRole('button', { name: 'Menu' });
    const test1 = page.locator('sl-menu-item').filter({ hasText: 'Test 1' });

    await menu.click();
    await test1.focus();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.keyboard.press('Space'),
    ]);

    await expect(newPage).toHaveURL('about:blank');
  });

  test(`should have keyboard operable submenu`, async ({ page }) => {
    const menu = page.getByRole('button', { name: 'Menu' });
    const test2 = page.locator('sl-menu-item').filter({ hasText: 'Test 2' });
    const test3 = test2.locator('sl-menu-item').filter({ hasText: 'Test 3' });

    await menu.click();
    await test2.hover();
    await test3.focus();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.keyboard.press('Space'),
    ]);

    await expect(newPage).toHaveURL('about:blank');
  });

  test('should have aria-disabled attribute when disabled', async ({
    page,
  }) => {
    const test4 = page.locator('sl-menu-item').filter({ hasText: 'Test 4' });

    await expect(test4).toHaveAttribute('aria-disabled', 'true');
  });

  test('should not be keyboard operable when disabled', async ({ page }) => {
    const menu = page.getByRole('button', { name: 'Menu' });
    const test4 = page.locator('sl-menu-item').filter({ hasText: 'Test 4' });

    await menu.click();
    await test4.focus();
    const pagesBefore = page.context().pages().length;
    await page.keyboard.press('Space');
    expect(page.context().pages().length).toEqual(pagesBefore);
  });
});
