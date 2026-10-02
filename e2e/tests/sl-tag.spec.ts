import { test, expect } from '@playwright/test';

test.describe('sl-tag', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-tag');
  });

  test('should render tags', async ({ page }) => {
    const mathematics = page.locator('sl-tag').filter({ hasText: 'Mathematics' });
    const physics = page.locator('sl-tag').filter({ hasText: 'Physics' });
    const chemistry = page.locator('sl-tag').filter({ hasText: 'Chemistry' });

    await expect(mathematics).toBeVisible();
    await expect(physics).toBeVisible();
    await expect(chemistry).toBeVisible();
  });

  test('should remove tag on click', async ({ page }) => {
    const item = page.locator('sl-tag').filter({ hasText: 'Mathematics' });
    await expect(item).toBeVisible();
    await item.locator('sl-icon[slot="remove-button"]').click();
    await expect(item).not.toBeVisible();
  });

  test('should not allow to remove disabled tag', async ({ page }) => {
    const item = page.locator('sl-tag').filter({ hasText: 'Chemistry' });
    await expect(item).toHaveAttribute('disabled', '');
    await item.locator('sl-icon[slot="remove-button"]').click({ force: true });
    await expect(item).toBeVisible();
  });
});
