import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { computedDescription } from '../../utils/computedDescription.js';

test.describe('sl-tooltip accessibility', () => {
  const tooltipText = 'This is the tooltip message';

  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-tooltip');
  });

  test('should have no accessibility violations in standard viewport', async ({
    page,
  }) => {
    const item = page.getByRole('button', { name: 'Button' });
    await item.focus();
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
    const item = page.getByRole('button', { name: 'Button' });

    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-tooltip'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await item.focus();
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
    await page.goto('/sl-tooltip'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should display tooltip on focus and hide on blur', async ({ page }) => {
    const item = page.getByRole('button', { name: 'Button' });

    await item.focus();
    await expect(page.getByText(tooltipText)).toBeVisible();
    await item.blur();
    await expect(page.getByText(tooltipText)).toBeHidden();
  });

  test(`should hide tooltip when button clicked with space`, async ({
    page,
  }) => {
    const item = page.getByRole('button', { name: 'Button' });

    await item.focus();
    await expect(page.getByText(tooltipText)).toBeVisible();

    await page.keyboard.press('Space');
    await expect(page.getByText(tooltipText)).toBeHidden();
  });

  test(`should have correct ARIA attributes`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'Button' });
    const tooltip = page.locator('sl-tooltip');
    const descriptions = await computedDescription(item);

    expect(descriptions).toContain(tooltipText);
    await expect(tooltip).toHaveAttribute('role', 'tooltip');
  });
});
