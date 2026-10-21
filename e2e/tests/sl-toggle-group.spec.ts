import { test, expect } from '@playwright/test';

test.describe('sl-toggle-group', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-toggle-group');
  });

  test('should toggle button on click', async ({ page }) => {
    const group = page.locator('sl-toggle-group');
    const item = group
      .locator('sl-toggle-button')
      .filter({ hasText: 'Test 1' });

    await expect(item).not.toHaveAttribute('pressed');
    await item.click();
    await expect(item).toHaveAttribute('pressed');
    await item.click();
    await expect(item).not.toHaveAttribute('pressed');
  });

  test('should toggle button if other is clicked', async ({ page }) => {
    const group = page.locator('sl-toggle-group');
    const test1 = group
      .locator('sl-toggle-button')
      .filter({ hasText: 'Test 1' });
    const test2 = group
      .locator('sl-toggle-button')
      .filter({ hasText: 'Test 2' });

    await expect(test2).not.toHaveAttribute('pressed');
    await test2.click();
    await expect(test2).toHaveAttribute('pressed');
    await test1.click();
    await expect(test1).toHaveAttribute('pressed');
    await expect(test2).not.toHaveAttribute('pressed');
  });

  test('should not allow to toggle disabled button', async ({ page }) => {
    const group = page.locator('sl-toggle-group');
    const item = group
      .locator('sl-toggle-button')
      .filter({ hasText: 'Test 3' });

    await expect(item).toHaveAttribute('disabled', '');
    await expect(item).not.toHaveAttribute('pressed');
    await item.click({ force: true });
    await expect(item).not.toHaveAttribute('pressed');
  });
});
