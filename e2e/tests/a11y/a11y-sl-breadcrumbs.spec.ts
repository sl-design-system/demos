import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-breadcrumbs accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-breadcrumbs');
  });

  test('should have no accessibility violations in standard viewport', async ({ page }) => {
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have no accessibility violations in mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-breadcrumbs'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have correct tab order', async ({ page, browserName }) => {
    const activeElements = ['Home', 'Test 1'] as const;
    const nextFocusKey = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press(nextFocusKey);
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test(`should allow keyboard operability of home link`, async ({ page }) => {
    const baseUrl = '/sl-accordion';
    await Promise.all([
      page.waitForURL(baseUrl),
      page.getByRole('link', { name: 'Home' }).press('Enter'),
    ]);

    await expect(page).toHaveURL(baseUrl);
  });

  test(`should allow keyboard operability of current page link`, async ({ page }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      await page.getByRole('link', { name: 'Test 1' }).focus(),
      await page.keyboard.press('Enter'),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });

  test('should have aria-current attribute on the current page link', async ({ page }) => {
    const item = page.getByRole('link', { name: 'Test 1' });
    await expect(item).toHaveAttribute('aria-current', 'page');
  });

  test('should have aria-label on nav element', async ({ page }) => {
    const nav = page.getByRole('navigation').filter({ hasText: 'Home' });
    await expect(nav).toHaveAttribute('aria-label', 'Breadcrumb trail');
  });

  test('should have aria-label when first link is icon-only', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 });
    await page.goto('/sl-breadcrumbs'); // for Firefox to properly apply the viewport size before page load
    await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-label', 'Home');
  });
});
