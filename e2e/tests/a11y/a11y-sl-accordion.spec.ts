import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-accordion accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-accordion');
  });

  test('should have no accessibility violations', async ({ page }) => {
    await page.locator('summary').filter({ hasText: 'Test 1' }).click();
    const axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have correct aria-expanded attributes', async ({ page }) => {
    const item = page.locator('summary').filter({ hasText: 'Test 1' });

    await expect(item).toHaveAttribute('aria-expanded', 'false');

    await item.click();
    await expect(item).toHaveAttribute('aria-expanded', 'true');
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ['Test 1'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test(`should be keyboard operable`, async ({ page }) => {
    const item = page.locator('summary').filter({ hasText: 'Test 1' });

    await expect(item).toHaveAttribute('aria-expanded', 'false');
    await item.focus();
    await page.keyboard.press('Enter');
    await expect(item).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Enter');
    await expect(item).toHaveAttribute('aria-expanded', 'false');
    await page.keyboard.press('Space');
    await expect(item).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Space');
    await expect(item).toHaveAttribute('aria-expanded', 'false');
  });
});
