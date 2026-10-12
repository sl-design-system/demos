import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-tool-bar accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-tool-bar');
  });

  test('should have no accessibility violations', async ({ page }) => {
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
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-tool-bar'); // for Firefox to properly apply the viewport size before page load
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
    await page.goto('/sl-tool-bar'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ['Cut', 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test('should have correct tab order in mobile view', async ({ page }) => {
    const activeElements = ['Cut', 'Focus me'] as const;

    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-tool-bar'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await expect(page.getByRole('button', { name: 'Cut' })).toBeVisible();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test(`should be reachable with arrow keys`, async ({ page }) => {
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(getFocusedElement(page)).resolves.toBe('Cut');
    await page.keyboard.press('ArrowRight');
    await expect(getFocusedElement(page)).resolves.toBe('Copy');

    await page.keyboard.press('ArrowRight');
    await expect(getFocusedElement(page)).resolves.not.toBe('Paste');
    await expect(
      page.getByRole('button', { name: 'Edit', exact: true }),
    ).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(getFocusedElement(page)).resolves.toBe('Copy');
  });

  test(`should be reachable with arrow keys in mobile view`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-tool-bar'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await expect(page.getByRole('button', { name: 'Cut' })).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(getFocusedElement(page)).resolves.toBe('Cut');
    await page.keyboard.press('ArrowRight');
    await expect(getFocusedElement(page)).resolves.toBe('Copy');

    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('button', { name: 'Show more' })).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(getFocusedElement(page)).resolves.toBe('Copy');
  });

  for (const key of ['Space', 'Enter'] as const) {
    test(`should be activated with ${key} key`, async ({ page }) => {
      const item = page.getByRole('button', { name: 'Copy' });

      await item.focus();

      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.keyboard.press(key),
      ]);
      await expect(newPage).toHaveURL('about:blank');
    });
  }

  for (const key of ['Space', 'Enter'] as const) {
    test(`menu item should be activated with ${key} key`, async ({ page }) => {
      const editButton = page.getByRole('button', { name: 'Edit' });

      await editButton.focus();
      await page.keyboard.press(key);
      await page.keyboard.press('ArrowDown');

      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.keyboard.press(key),
      ]);
      await expect(newPage).toHaveURL('about:blank');
    });
  }
  
  test(`should have keyboard operable 'Show more' menu in mobile view`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-tool-bar'); // for Firefox to properly apply the viewport size before page load
    const showButton = page.getByRole('button', { name: 'Show more' });
    const editItem = page.getByRole('menuitem', { name: 'Edit' });
    const deleteItem = page.getByRole('menuitem', { name: 'Delete' });

    await showButton.focus();
    await page.keyboard.press('Space');

    await expect(editItem).toBeVisible();

    await editItem.focus();
    await page.keyboard.press('Space');

    await expect(deleteItem).toBeVisible();
    await deleteItem.focus();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.keyboard.press('Space'),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });

  test(`should have disabled attribute`, async ({ page }) => {
    const disabledButton = page.getByRole('button', { name: 'Paste' });

    await expect(disabledButton).toHaveAttribute('disabled');
  });

  test(`should have aria-disabled attribute when in 'Show more' menu`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-tool-bar'); // for Firefox to properly apply the viewport size before page load

    const disabledButton = page.getByRole('menuitem', { name: 'Paste' });

    await page.getByRole('button', { name: 'Show more' }).click();
    await expect(disabledButton).toHaveAttribute('aria-disabled', 'true');
  });
});
