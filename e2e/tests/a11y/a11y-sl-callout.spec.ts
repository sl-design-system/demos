import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-callout accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-callout');
  });

  test('should have no accessibility violations in standard viewport', async ({ page }) => {
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have no accessibility violations in 320px width of <main>', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-callout'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    const axe = new AxeBuilder({ page }).withTags(['wcag22a', 'wcag22aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('component fits without horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-callout'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have title which is heading', async ({ page }) => {
    const item = page.getByRole('heading', { name: 'Test title' });
    await expect(item).toHaveRole('heading');
  });

  test('should have correct tab order', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const activeElements = ['Open link', 'Open page'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      const item = page.locator(`text=${activeElement}`);
      await page.keyboard.press('Tab');
      await expect(item).toBeFocused();
    }
  });

  test('should have correct tab order in webkit', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'webkit');
    const activeElements = ['Open link', 'Open page'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      const item = page.locator(`text=${activeElement}`);
      await page.keyboard.press('Alt+Tab');
      await expect(item).toBeFocused();
    }
  });

  test(`link should be keyboard operable`, async ({ page }) => {
    const item = page.getByRole('link', { name: 'Open link' });

    const pagePromise = page.context().waitForEvent('page');
    await item.focus();
    await page.keyboard.press('Enter');
    const newPage = await pagePromise;

    await expect(newPage).toHaveURL('about:blank');
    await newPage.close();
  });

  test(`button should be activated via enter`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'Open page' });

    const pagePromise = page.context().waitForEvent('page');
    await item.focus();
    await page.keyboard.press('Enter');
    const newPage = await pagePromise;

    await expect(newPage).toHaveURL('about:blank');
    await newPage.close();
  });

  test(`button should be activated via space`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'Open page' });

    const pagePromise = page.context().waitForEvent('page');
    await item.focus();
    await page.keyboard.press('Space');
    const newPage = await pagePromise;

    await expect(newPage).toHaveURL('about:blank');
    await newPage.close();
  });
});
