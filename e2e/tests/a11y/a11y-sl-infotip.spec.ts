import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-infotip accessibility', () => {
  const infotipText = 'This is the infotip message';

  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-infotip');
  });

  test('should have no accessibility violations in standard viewport', async ({
    page,
  }) => {
    const item = page.getByRole('button', { name: 'More information' });
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
    const item = page.getByRole('button', { name: 'More information' });

    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-infotip'); // for Firefox to properly apply the viewport size before page load
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
    const item = page.getByRole('button', { name: 'More information' });

    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-infotip'); // for Firefox to properly apply the viewport size before page load
    await item.click();
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test(`should have correct tab order`, async ({ page }) => {
    const activeElements = ['More information', 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  for (const key of ['Space', 'Enter']) {
    test(`should display infotiptip when button clicked with ${key.toLowerCase()}`, async ({
      page,
    }) => {
      const item = page.getByRole('button', { name: 'More information' });

      await item.focus();
      await expect(page.getByText(infotipText)).toBeHidden();

      await page.keyboard.press(key);
      await expect(page.getByText(infotipText)).toBeVisible();
    });
  }

  test('should have accessible name', async ({ page }) => {
    const item = page.getByRole('button', { name: 'More information' });
    await expect(item).toHaveAccessibleName('More information');
  });

  test(`should have correct aria-expanded`, async ({ page }) => {
    const item = page.getByRole('button', { name: 'More information' });

    await expect(item).toHaveAttribute('aria-expanded', 'false');

    await item.click();
    await expect(item).toHaveAttribute('aria-expanded', 'true');

    await item.click();
    await expect(item).toHaveAttribute('aria-expanded', 'false');
  });
});
