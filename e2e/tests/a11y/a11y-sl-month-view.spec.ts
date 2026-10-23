import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-month-view accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(new Date(2026, 9, 15, 12));
    await page.goto('/sl-month-view');
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
    await page.goto('/sl-month-view'); // for Firefox to properly apply the viewport size before page load
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
    await page.goto('/sl-month-view'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have accessible name for calendar', async ({ page }) => {
    const calendar = page.getByRole('grid', { name: 'October 2026' });
    await expect(calendar).toHaveAccessibleName('Days of October 2026');
  });

  test('should have buttons with accessible names', async ({ page }) => {
    const button = page.getByRole('button', { name: '1, Thursday October 2026' });
    await expect(button).toHaveAccessibleName('1, Thursday October 2026');
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = [
      '1, Thursday October 2026',
      'Focus me',
    ] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test('should be navigable with arrows', async ({ page }) => {
    const button = page.getByRole('button', { name: '1, Thursday October 2026' });
    await button.focus();

    await page.keyboard.press('ArrowRight');
    expect(await getFocusedElement(page)).toBe('2, Friday October 2026');

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedElement(page)).toBe('9, Friday October 2026');

    await page.keyboard.press('ArrowLeft');
    expect(await getFocusedElement(page)).toBe('8, Thursday October 2026');

    await page.keyboard.press('ArrowUp');
    expect(await getFocusedElement(page)).toBe('1, Thursday October 2026');
  });

  test('should skip disabled dates with keyboard', async ({ page }) => {
  const day = (name: string) =>
    page.getByRole('button', { name, exact: true });

  await page.getByRole('button', { name: '1, Thursday October 2026'}).focus();

  for (const name of [ // used becuase focusing directly on a date other than October 1st makes test flaky
    '2, Friday October 2026',
    '3, Saturday October 2026',
    '4, Sunday October 2026',
    '5, Monday October 2026',
    '7, Wednesday October 2026',
  ]) {
    await page.keyboard.press('ArrowRight');
    await expect(day(name)).toBeFocused();
  }

  await page.keyboard.press('ArrowLeft');
  await expect(day('5, Monday October 2026')).toBeFocused();
  });

  test('should not select dates on arrow navigation', async ({ page }) => {
    const day1 = page.getByRole('button', { name: '1, Thursday October 2026' });
    const day2 = page.getByRole('button', { name: '2, Friday October 2026' });

    await day1.focus();
    await expect(day1).not.toHaveAttribute('part', /\bselected\b/);
    await expect(day1).not.toHaveAttribute('aria-pressed', 'true');

    await page.keyboard.press('ArrowRight');
    await expect(day2).toBeFocused();
    await expect(day2).not.toHaveAttribute('part', /\bselected\b/);
    await expect(day2).not.toHaveAttribute('aria-pressed', 'true');

    await expect(day1).not.toHaveAttribute('part', /\bselected\b/);
    await expect(day1).not.toHaveAttribute('aria-pressed', 'true');
  });

  for (const key of ['Space', 'Enter'] as const) {
    test(`should have keyboard accessible buttons with ${key}`, async ({
      page,
    }) => {
      const button = page.getByRole('button', { name: '1, Thursday October 2026' });

      await button.focus();
      await page.keyboard.press(key);

      await expect(button).toHaveAttribute('part', /\bselected\b/);
    });
  }

  test('should not select disabled date with keyboard', async ({ page }) => {
    const button = page.getByRole('button', { name: '6, Tuesday October 2026' });

    await button.focus();
    await page.keyboard.press('Space');

    await expect(button).not.toHaveAttribute('part', /\bselected\b/);
    await expect(button).not.toHaveAttribute('aria-pressed');
  });

  test('should have aria-pressed attribute', async ({ page }) => {
    const button = page.getByRole('button', { name: '1, Thursday October 2026' });

    await button.focus();
    await page.keyboard.press('Space');

    await expect(button).toHaveAttribute('aria-pressed', 'true');
  });
})
