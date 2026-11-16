import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-dialog accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-dialog');
  });

  test('should have no accessibility violations', async ({ page }) => {
    const item = page.getByRole('button', { name: 'Test' });
    await item.click();

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
    const item = page.getByRole('button', { name: 'Test' });
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-dialog'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await item.click();

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
    const item = page.getByRole('button', { name: 'Test' });
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-dialog'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await item.click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct tab order', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');

    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page.keyboard.press('Tab');

    let focusedOn = await getFocusedElement(page);
    expect(focusedOn).toBe('Test');
    await expect(page.getByRole('button', { name: 'Test' })).toBeVisible();

    await page.keyboard.press('Space');
    await page.keyboard.press('Tab');

    focusedOn = await getFocusedElement(page);
    expect(focusedOn).toBe('Close');
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();

    await page.keyboard.press('Space');

    await expect(page.getByRole('button', { name: 'Close' })).not.toBeVisible();
    focusedOn = await getFocusedElement(page);
    expect(focusedOn).toBe('Test');
  });

  test('should have correct tab order in chromium', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium');

    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page.keyboard.press('Tab');

    let focusedOn = await getFocusedElement(page);
    expect(focusedOn).toBe('Test');
    await expect(page.getByRole('button', { name: 'Test' })).toBeVisible();

    await page.keyboard.press('Space');

    focusedOn = await getFocusedElement(page);
    expect(focusedOn).toBe('Close');
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();

    await page.keyboard.press('Space');

    await expect(page.getByRole('button', { name: 'Close' })).not.toBeVisible();
    focusedOn = await getFocusedElement(page);
    expect(focusedOn).toBe('Test');
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

  test(`should be closed with Escape key`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'Test' });
    const dialog = page.locator('sl-dialog');
    const closeButton = page.getByRole('button', { name: 'Close' });

    await item.focus();
    await page.keyboard.press('Enter');
    await expect(dialog).toBeVisible();

    await closeButton.focus();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});
