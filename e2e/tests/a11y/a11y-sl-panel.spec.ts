import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getFocusedElement } from '../../utils/getFocusedElement.js';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';

test.describe('sl-panel accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-panel');
  });

  test('should have no accessibility violations in standard viewport', async ({
    page,
  }) => {
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
    await page.goto('/sl-panel'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
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
    await page.goto('/sl-panel'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ['Collapse panel', 'Pinata', 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test('should have correct tab order in mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-panel'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const activeElements = ['Collapse panel', 'Show more', 'Focus me'] as const;

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  for (const key of ['Space', 'Enter'] as const) {
    test(`should have keyboard accessible buttons with ${key}`, async ({
      page,
    }) => {
      const button = page
        .locator('sl-button')
        .filter({ hasText: 'Warning' })
        .locator('#button');
      await button.focus();
      await expect(button).toBeFocused();

      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.keyboard.press(key),
      ]);
      await expect(newPage).toHaveURL('about:blank');
    });
  }

  for (const key of ['Space', 'Enter'] as const) {
    test(`should have keyboard accessible buttons with ${key} on mobile viewport`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
      await page.goto('/sl-panel'); // for Firefox to properly apply the viewport size before page load
      await page.getByRole('button', { name: 'Collapse navigation' }).click();

      const button = page.getByRole('button', { name: 'Show more' });
      const menuitem = page
        .locator('sl-panel')
        .getByRole('menuitem', { name: 'Warning' });
      await button.focus();
      await expect(button).toBeFocused();

      await page.keyboard.press(key);

      await menuitem.focus();
      await expect(menuitem).toBeFocused();

      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.keyboard.press(key),
      ]);
      await expect(newPage).toHaveURL('about:blank');
    });
  }

  test('should navigate actions with arrow keys', async ({ page }) => {
    const pinataButton = page
      .locator('sl-button')
      .filter({ hasText: 'Pinata' })
      .locator('#button');
    const smileButton = page
      .locator('sl-button')
      .filter({ hasText: 'Smile' })
      .locator('#button');
    const warningButton = page
      .locator('sl-button')
      .filter({ hasText: 'Warning' })
      .locator('#button');

    await pinataButton.focus();
    await expect(pinataButton).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(smileButton).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(warningButton).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(pinataButton).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(warningButton).toBeFocused();
  });

  test('should navigate actions with arrow keys in mobile view', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-panel'); // for Firefox to properly apply the viewport size before page load
    const menu = page.getByRole('button', { name: 'Show more' });
    const pinataButton = page
      .locator('sl-panel')
      .getByRole('menuitem', { name: 'Pinata' });
    const smileButton = page
      .locator('sl-panel')
      .getByRole('menuitem', { name: 'Smile' });
    const warningButton = page
      .locator('sl-panel')
      .getByRole('menuitem', { name: 'Warning' });

    await menu.click();

    await pinataButton.focus();
    await expect(pinataButton).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(smileButton).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(warningButton).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(pinataButton).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(warningButton).toBeFocused();
  });

  test('should have `aria-expanded` attribute for collapsible button', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-panel'); // for Firefox to properly apply the viewport size before page load

    const exandedButton = page.getByRole('button', { name: 'Collapse panel' });
    const collapsedButton = page.getByRole('button', { name: 'Expand panel' });
    await expect(exandedButton).toHaveAttribute('aria-expanded', 'true');
    await exandedButton.click();
    await expect(collapsedButton).toHaveAttribute('aria-expanded', 'false');
    await collapsedButton.click();
    await expect(exandedButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should have `aria-expanded` attribute for menu in mobile view', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-panel'); // for Firefox to properly apply the viewport size before page load

    const menu = page.getByRole('button', { name: 'Show more' });
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
  });
});
