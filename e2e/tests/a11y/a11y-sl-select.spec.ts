import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-select accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-select');
  });

  test('should have no accessibility violations in standard viewport', async ({
    page,
  }) => {
    await page.locator('#disabled').evaluate((element) => element.remove());
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
    await page.goto('/sl-select'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();
    await page.locator('#disabled').evaluate((element) => element.remove());
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
    await page.goto('/sl-select'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have accessible name', async ({ page }) => {
    const active = page.getByRole('combobox', { name: 'Label' });
    const disabled = page.getByRole('combobox', { name: 'Disabled' });

    await expect(active).toHaveAccessibleName('Label');
    await expect(disabled).toHaveAccessibleName('Disabled');
  });

  test('should have aria-expanded attribute', async ({ page }) => {
    const active = page.getByRole('combobox', { name: 'Label' });

    await expect(active).toHaveAttribute('aria-expanded', 'false');

    await active.click();
    await expect(active).toHaveAttribute('aria-expanded', 'true');
  });

  test('should have aria-haspopup attribute', async ({ page }) => {
    const active = page.getByRole('combobox', { name: 'Label' });

    await expect(active).toHaveAttribute('aria-haspopup', 'listbox');
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ['Label', 'Report validity', 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test(`should have keyboard operable listbox`, async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Label' });
    const listbox = page.getByRole('listbox', { name: 'Label' });

    await item.focus();
    await page.keyboard.press('ArrowDown');

    await expect(listbox).toBeVisible();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Escape');

    await expect(listbox).not.toBeVisible();
    await expect(item).toBeVisible();

    await item.focus();
    await page.keyboard.press('Enter');
    await expect(listbox).toBeVisible();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(listbox).not.toBeVisible();
  });

  test(`should have keyboard accessible clear button`, async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Label' });
    const option1 = page.getByRole('option', { name: 'Option 1' });
    const clearButton = page.getByRole('button', { name: 'Clear' });

    await item.click({ force: true });
    await expect(option1).toBeVisible();
    await option1.click({ force: true });

    await expect(clearButton).toBeVisible();

    await clearButton.click({ force: true });
    await expect(
      page.getByRole('combobox', { name: 'Label' }),
    ).toMatchAriaSnapshot(`- combobox "Label": Select an option`);
  });

  test(`should have options with aria attributes`, async ({ page }) => {
    const item = page.getByRole('combobox', { name: 'Label' });
    const option1 = page.getByRole('option', { name: 'Option 1' });
    const option2 = page.getByRole('option', { name: 'Option 2' });

    await item.click({ force: true });

    await expect(option1).toBeVisible();
    await expect(option1).toHaveAttribute('role', 'option');
    await expect(option1).toHaveAttribute('aria-selected', 'false');

    await expect(option2).toBeVisible();
    await expect(option2).toHaveAttribute('role', 'option');
    await expect(option2).toHaveAttribute('aria-selected', 'false');

    await option1.click({ force: true });

    await item.click({ force: true });

    await expect(option1).toHaveAttribute('aria-selected', 'true');
    await expect(option2).toHaveAttribute('aria-selected', 'false');
  });

  test(`should not have keyboard accessible disabled select`, async ({
    page,
  }) => {
    const disabled = page.getByRole('combobox', { name: 'Disabled' });

    await disabled.focus();
    await page.keyboard.press('ArrowDown');

    const listbox = page.getByRole('listbox', { name: 'Disabled' });
    await expect(listbox).not.toBeVisible();

    await disabled.focus();
    await page.keyboard.press('Enter');

    await expect(listbox).not.toBeVisible();
  });
});
