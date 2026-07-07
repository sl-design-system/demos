import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-combobox accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-combobox');
  });

  test('should have no accessibility violations in standard viewport', async ({
    page,
  }) => {
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']);
    const results = await axe.analyze();
    await expect(results.violations).toEqual([]);
  });

  test('should have no accessibility violations in 320px width of <main>', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-combobox'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('component fits without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-combobox'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have accessible name', async ({ page }) => {
    const item = page
      .locator('sl-combobox')
      .getByRole('combobox');

    await expect(item).toHaveAccessibleName('Label');
  });

  test('should have correct tab order', async ({ page }) => {
    const item = page
      .getByRole('combobox');
    const listbox = page.locator('sl-listbox');
    const tag = item.locator('sl-tag', { hasText: 'Test 2' });

    await item.click();
    await listbox.locator('sl-option', { hasText: 'Test 2' }).click();

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(tag.getByRole('button')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(item).toBeFocused();
  });

  test(`should have keyboard operable listbox`, async ({ page }) => {
    const item = page.locator('sl-combobox').getByRole('combobox');
    const listbox = page.locator('sl-listbox');
    const tag = page
      .locator('sl-combobox')
      .locator('sl-tag', { hasText: 'Test 1' });

    await item.focus();
    await page.keyboard.press('ArrowDown');

    await expect(listbox).toBeVisible();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(listbox).toBeVisible();
    await expect(tag).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(listbox).not.toBeVisible();
  });

  test(`should have keyboard navigable taglist`, async ({ page }) => {
    const item = page
      .getByRole('combobox');
    const listbox = page.locator('sl-listbox');
    const tag1 = item.locator('sl-tag', { hasText: 'Test 1' });
    const tag2 = item.locator('sl-tag', { hasText: 'Test 2' });

    await item.click();
    await listbox.locator('sl-option', { hasText: 'Test 1' }).click();
    await listbox.locator('sl-option', { hasText: 'Test 2' }).click();
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');

    await expect(tag1).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(tag2).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(item).toBeFocused();
  });
});
