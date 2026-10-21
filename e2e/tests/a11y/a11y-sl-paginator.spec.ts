import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-paginator accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-paginator');
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
    await page.goto('/sl-paginator'); // for Firefox to properly apply the viewport size before page load
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
    await page.goto('/sl-paginator'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ['1', '2', 'Go to the next page (2)', 'Items per page', 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test('should have correct tab order in mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-paginator'); // for Firefox to properly apply the viewport size before page load
    const activeElements = ['Page', 'Items per page', 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  for (const key of ['Space', 'Enter'] as const) {
    test(`should have keyboard accessible buttons with ${key}`, async ({ page }) => {
      const items = page.locator('main ul li');
      const button1 = page.getByRole('button', { name: '1', exact: true });
      const button2 = page.getByRole('button', { name: '2', exact: true });
      const buttonNext = page.getByRole('button', { name: 'Go to the next page (2)' });
      const buttonPrev = page.getByRole('button', { name: 'Go to the previous page (1)' });

      await button2.focus();
      await page.keyboard.press(key);

      await expect(items.nth(0)).toHaveText('Item 6');

      await button1.focus();
      await page.keyboard.press(key);

      await expect(items.nth(0)).toHaveText('Item 1');

      await buttonNext.focus();
      await page.keyboard.press(key);

      await expect(items.nth(0)).toHaveText('Item 6');

      await buttonPrev.focus();
      await page.keyboard.press(key);

      await expect(items.nth(0)).toHaveText('Item 1');
    });
  }

  test(`should have keyboard accessible buttons in mobile view`, async ({ page }) => {
    const items = page.locator('main ul li');
    const select = page.getByRole('combobox', { name: 'Page', exact: true });
    const listbox = page.getByRole('listbox', { name: 'Page', exact: true });
    const page1 = page.getByRole('option', { name: '1, page' });
    const page2 = page.getByRole('option', { name: '2, page' });

    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-paginator'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    
    await select.focus();
    await page.keyboard.press('Space');

    await expect(listbox).toBeVisible();
    await expect(getFocusedElement(page)).resolves.toBe('1, page');
    await expect(page1).toHaveAttribute('role', 'option');
    await expect(page1).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('ArrowDown');

    await expect(getFocusedElement(page)).resolves.toBe('2, page');
    await expect(page2).toHaveAttribute('role', 'option');
    await expect(page2).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('Space');

    await expect(items.nth(0)).toHaveText('Item 6');
  });

  test(`should have keyboard accessible size selection`, async ({ page }) => {
    const items = page.locator('main ul li');
    const select = page.getByRole('combobox', { name: 'Items per page', exact: true });
    const listbox = page.getByRole('listbox', { name: 'Items per page', exact: true });
    const page1 = page.getByRole('option', { name: '5' });
    const page2 = page.getByRole('option', { name: '10' });

    await select.focus();
    await page.keyboard.press('Space');

    await expect(listbox).toBeVisible();
    await expect(getFocusedElement(page)).resolves.toBe('5 items per page');
    await expect(page1).toHaveAttribute('role', 'option');
    await expect(page1).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('ArrowDown');

    await expect(getFocusedElement(page)).resolves.toBe('10 items per page');
    await expect(page2).toHaveAttribute('role', 'option');
    await expect(page2).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('Space');    

    await expect(items.nth(5)).toHaveText('Item 6');
  });

  test(`should have aria-current on button`, async ({ page }) => {
    const page1 = page.getByRole('button', { name: '1', exact: true });
    const page2 = page.getByRole('button', { name: '2', exact: true });

    await expect(page1).toHaveAttribute('aria-current', 'page');
    await expect(page2).not.toHaveAttribute('aria-current');

    await page2.click();
    await expect(page1).not.toHaveAttribute('aria-current');
    await expect(page2).toHaveAttribute('aria-current', 'page');
  });

  test(`should have disabled attribute`, async ({ page }) => {
    const disabledButton = page.getByRole('button', { name: 'Go to the previous page (0)' });

    await expect(disabledButton).toHaveAttribute('disabled');
  });

  test(`should not have keyboard accessible disabled tab`, async ({ page }) => {
    const disabledButton = page.getByRole('button', { name: 'Go to the previous page (0)' });
    const items = page.locator('main ul li');

    await disabledButton.focus();
    await page.keyboard.press('Space');
    await expect(items.nth(0)).toHaveText('Item 1');
  });
})  
