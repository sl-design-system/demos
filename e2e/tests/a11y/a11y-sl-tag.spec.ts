import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-tag accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-tag');
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
    await page.goto('/sl-tag'); // for Firefox to properly apply the viewport size before page load
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
    await page.goto('/sl-tag'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ["Remove tag 'Mathematics'", 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test(`should be reachable with arrow keys`, async ({ page }) => {
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    await page.keyboard.press('Tab');
    await expect(getFocusedElement(page)).resolves.toBe(
      "Remove tag 'Mathematics'",
    );

    await page.keyboard.press('ArrowRight');
    await expect(getFocusedElement(page)).resolves.toBe("Remove tag 'Physics'");

    await page.keyboard.press('ArrowRight');
    await expect(getFocusedElement(page)).resolves.toBe(
      "Remove tag 'Chemistry'",
    );

    await page.keyboard.press('ArrowLeft');
    await expect(getFocusedElement(page)).resolves.toBe("Remove tag 'Physics'");
  });

  test(`should be removed with Space key`, async ({ page }) => {
    const tag = page.locator('sl-tag', { hasText: 'Mathematics' });
    const tagButton = page.getByRole('button', {
      name: "Remove tag 'Mathematics'",
    });

    await expect(tag).toBeVisible();
    await tagButton.focus();
    await page.keyboard.press('Space');

    await expect(tag).not.toBeVisible();
    await expect(tagButton).not.toBeVisible();
  });

  test(`should be removed with Enter key`, async ({ page }) => {
    const tag = page.locator('sl-tag', { hasText: 'Mathematics' });
    const tagButton = page.getByRole('button', {
      name: "Remove tag 'Mathematics'",
    });

    await expect(tag).toBeVisible();
    await tagButton.focus();
    await page.keyboard.press('Enter');

    await expect(tag).not.toBeVisible();
    await expect(tagButton).not.toBeVisible();
  });

  test(`should be removable with Backspace key`, async ({ page }) => {
    const tag = page.locator('sl-tag', { hasText: 'Mathematics' });
    const tagButton = page.getByRole('button', {
      name: "Remove tag 'Mathematics'",
    });

    await expect(tag).toBeVisible();
    await tagButton.focus();
    await page.keyboard.press('Backspace');

    await expect(tag).not.toBeVisible();
    await expect(tagButton).not.toBeVisible();
  });

  test(`tag list should have label`, async ({ page }) => {
    const tagList = page.locator('sl-tag-list');
    await expect(tagList).toHaveAttribute('aria-label', 'Subjects');
  });

  test('tag list should have role of a list and include tags as list items', async ({
    page,
  }) => {
    const tagList = page.locator('sl-tag-list');
    const item = page.locator('sl-tag', { hasText: 'Mathematics' });

    await expect(tagList).toHaveAttribute('role', 'list');
    await expect(item).toHaveAttribute('role', 'listitem');
  });

  test('tag buttons should have aria-describedby attribute', async ({
    page,
  }) => {
    const item = page.getByRole('button', { name: "Remove tag 'Mathematics'" });

    await expect(item).toHaveAttribute(
      'aria-describedby',
      'navigation-description',
    );
    await expect(item).toHaveAccessibleDescription(
      'Use arrow keys to move between removable tags.',
    );
  });

  test(`should have disabled attribute`, async ({ page }) => {
    const disabledTag = page.locator('sl-tag', { hasText: 'Chemistry' });
    const disabledButton = page.getByRole('button', {
      name: "Remove tag 'Chemistry'",
    });

    await expect(disabledTag).toHaveAttribute('disabled');
    await expect(disabledButton).toHaveAttribute('aria-disabled', 'true');
  });

  test(`should not have keyboard accessible disabled tab`, async ({ page }) => {
    const disabledTag = page.locator('sl-tag', { hasText: 'Chemistry' });
    const disabledButton = page.getByRole('button', {
      name: "Remove tag 'Chemistry'",
    });

    await expect(disabledTag).toBeVisible();
    await disabledButton.focus();
    await page.keyboard.press('Space');

    await expect(disabledTag).toBeVisible();
    await expect(disabledButton).toBeVisible();
  });
});
