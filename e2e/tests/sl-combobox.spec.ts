import { test, expect } from '@playwright/test';

test.describe('sl-combobox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-combobox');
  });

  test('should select and remove option from the list', async ({
    page,
  }) => {
    await page.locator('sl-combobox').click();
    await expect(page.locator('sl-option', { hasText: 'Test 1' })).toBeVisible();
    await expect(page.locator('sl-option', { hasText: 'Test 2' })).toBeVisible();
    
    await page.locator('sl-option', { hasText: 'Test 1' }).click();
    const tag = page.locator('sl-combobox').locator('sl-tag', { hasText: 'Test 1' });
    await expect(tag).toBeVisible();
    
    await tag.locator('button').click();
    await expect(tag).not.toBeVisible();
  });

  test('should select an option by typing text and pressing Enter', async ({
    page,
  }) => {
    await page.locator('sl-combobox').click();
    await page.keyboard.type('Test 2');
    await page.keyboard.press('Enter');
    const tag = page.locator('sl-combobox').locator('sl-tag', { hasText: 'Test 2' });
    await expect(tag).toBeVisible();
  });

  test('should allow selecting multiple options and show all as tags', async ({
    page,
  }) => {
    const combobox = page.locator('sl-combobox');
    await combobox.click();
    await page.locator('sl-option', { hasText: 'Test 1' }).click();
    await page.locator('sl-option', { hasText: 'Test 2' }).click();

    await expect(combobox.locator('sl-tag', { hasText: 'Test 1' })).toBeVisible();
    await expect(combobox.locator('sl-tag', { hasText: 'Test 2' })).toBeVisible();
  });
});
