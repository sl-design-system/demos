import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-popover accessibility', () => {
  const popoverText = "I'm a popover example with";

  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-popover');
  });

  test('should have no accessibility violations in standard viewport', async ({
    page,
  }) => {
    const item = page.getByRole('button', { name: 'Toggle Popover' });
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

  test('should have no accessibility violations in 320px width of <main>', async ({
    page,
  }) => {
    const item = page.getByRole('button', { name: 'Toggle Popover' });

    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-popover'); // for Firefox to properly apply the viewport size before page load
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
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-popover'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ['Toggle Popover', 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test(`should toggle popover when button clicked with space and enter`, async ({
    page,
  }) => {
    const item = page.getByRole('button', { name: 'Toggle Popover' });

    await expect(page.getByText(popoverText)).toBeHidden();

    await item.focus();
    await page.keyboard.press('Space');
    await expect(page.getByText(popoverText)).toBeVisible();

    await page.keyboard.press('Space');
    await expect(page.getByText(popoverText)).toBeHidden();

    await page.keyboard.press('Enter');
    await expect(page.getByText(popoverText)).toBeVisible();

    await page.keyboard.press('Enter');
    await expect(page.getByText(popoverText)).toBeHidden();
  });

  test(`should allow focus inside opened popover`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'Toggle Popover' });
    const action = page.getByRole('button', { name: 'Action' });
    const button = page.getByRole('button', { name: 'Focus me' });

    await item.focus();
    await page.keyboard.press('Space');
    await expect(page.getByText(popoverText)).toBeVisible();

    await page.keyboard.press('Tab');

    await expect(action).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(button).toBeFocused();
  });

  test(`should close popover when with Esc`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'Toggle Popover' });

    await item.click();
    await expect(page.getByText(popoverText)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByText(popoverText)).toBeHidden();
  });

  test(`should have correct ARIA attributes for popover`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'Toggle Popover' });

    await expect(item).toHaveAttribute('aria-expanded', 'false');

    await item.click();
    await expect(item).toHaveAttribute('aria-expanded', 'true');

    await item.click();
    await expect(item).toHaveAttribute('aria-expanded', 'false');
  });
});
