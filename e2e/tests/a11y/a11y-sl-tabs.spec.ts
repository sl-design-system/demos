import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { hasMainHorizontalOverflow } from '../../utils/checkForHorizontalScroll.js';
import { getFocusedElement } from '../../utils/getFocusedElement.js';

test.describe('sl-tabs accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-tab-group');
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
    await page.goto('/sl-tab-group'); // for Firefox to properly apply the viewport size before page load
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
    await page.goto('/sl-tab-group'); // for Firefox to properly apply the viewport size before page load
    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    const hasOverflow = await hasMainHorizontalOverflow(page);
    expect(hasOverflow).toBe(false);
  });

  test('should have aria-selected attributes', async ({ page }) => {
    const generalTab = page.locator('sl-tab').filter({ hasText: 'General' });
    const settingsTab = page.getByRole('tab', { name: 'Settings' });
    const disabledTab = page.getByRole('tab', { name: 'Disabled' });

    await expect(generalTab).not.toHaveAttribute('aria-selected');
    await expect(settingsTab).not.toHaveAttribute('aria-selected');
    await expect(disabledTab).not.toHaveAttribute('aria-selected');

    await generalTab.click();
    await expect(generalTab).toHaveAttribute('aria-selected', 'true');

    await settingsTab.click();
    await expect(generalTab).toHaveAttribute('aria-selected', 'false');
    await expect(settingsTab).toHaveAttribute('aria-selected', 'true');
  });

  test('should have correct tab order', async ({ page }) => {
    const activeElements = ['General', 'Focus me'] as const;

    await page.getByRole('button', { name: 'Collapse navigation' }).click();

    for (const activeElement of activeElements) {
      await page.keyboard.press('Tab');
      const focusedOn = await getFocusedElement(page);
      expect(focusedOn).toBe(activeElement);
    }
  });

  test('should have correct tab order in mobile view', async ({
    page,
    browserName,
  }) => {
    test.fixme(browserName === 'firefox'); // Skip this test for Firefox and Edge due to tab order issues
    const activeElements = ['General', 'Show all', 'Focus me'] as const;

    await page.setViewportSize({ width: 376, height: 667 }); // 320px width + 56px collapsed navigation
    await page.goto('/sl-tab-group'); // for Firefox to properly apply the viewport size before page load
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
    await expect(getFocusedElement(page)).resolves.toBe('General');
    await page.keyboard.press('ArrowRight');
    await expect(getFocusedElement(page)).resolves.toBe('Settings');

    await page.keyboard.press('ArrowRight');
    await expect(getFocusedElement(page)).resolves.not.toBe('Disabled');
    await expect(getFocusedElement(page)).resolves.toBe('General');

    await page.keyboard.press('ArrowLeft');
    await expect(getFocusedElement(page)).resolves.toBe('Settings');
  });

  test(`should be activated with Space and Enter key`, async ({ page }) => {
    const generalTab = page.locator('sl-tab', { hasText: 'General' });
    const generalContent = page.locator('sl-tab-panel', {
      hasText:
        'This is the General tab content. It contains basic information about the component.',
    });
    const settingsTab = page.locator('sl-tab', { hasText: 'Settings' });
    const settingsContent = page.locator('sl-tab-panel', {
      hasText:
        'This is the Settings tab content. Here you can configure various options.',
    });

    await generalTab.focus();
    await page.keyboard.press('Space');
    await expect(generalTab).toHaveAttribute('aria-selected', 'true');
    await expect(generalContent).toBeVisible();

    await settingsTab.focus();
    await page.keyboard.press('Space');
    await expect(settingsTab).toHaveAttribute('aria-selected', 'true');
    await expect(settingsContent).toBeVisible();

    await generalTab.focus();
    await page.keyboard.press('Enter');
    await expect(generalTab).toHaveAttribute('aria-selected', 'true');
    await expect(generalContent).toBeVisible();

    await settingsTab.focus();
    await page.keyboard.press('Enter');
    await expect(settingsTab).toHaveAttribute('aria-selected', 'true');
    await expect(settingsContent).toBeVisible();
  });

  test(`should have keyboard operable elements inside tabs`, async ({
    page,
  }) => {
    const generalTab = page.locator('sl-tab', { hasText: 'General' });
    const generalButton = page.getByRole('button', { name: 'Action' });

    const pagePromise = page.context().waitForEvent('page');

    await generalTab.focus();
    await page.keyboard.press('Space');
    await expect(generalButton).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(generalButton).toBeFocused();
    await page.keyboard.press('Space');

    const newPage = await pagePromise;

    await expect(newPage).toHaveURL('about:blank');
    await newPage.close();
  });

  test(`should have disabled attribute`, async ({ page }) => {
    const disabledTab = page.locator('sl-tab', { hasText: 'Disabled' });

    await expect(disabledTab).toHaveAttribute('disabled');
  });

  test(`should not have keyboard accessible disabled tab`, async ({ page }) => {
    const disabledTab = page.locator('sl-tab', { hasText: 'Disabled' });
    const disabledContent = page.locator('sl-tab-panel', {
      hasText: 'Disabled tab content',
    });

    await disabledTab.focus();
    await page.keyboard.press('Space');

    await expect(disabledTab).not.toHaveAttribute('aria-selected');
    await expect(disabledContent).not.toBeVisible();
  });
});
