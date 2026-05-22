import { test, expect } from '@playwright/test';

test.describe('sl-switch', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-switch');
  });

  test('should toggle switch on click', async ({ page }) => {
    const item = page.locator('sl-switch').filter({ hasText: 'Text inside the switch' });
    
    await expect(item).not.toHaveAttribute('checked');
    await item.click();
    await expect(item).toHaveAttribute('checked');
  });

  test('should change icon on toggle', async ({ page }) => {
    const item = page.locator('sl-switch').filter({ hasText: 'Text inside the switch' });
    const icon = item.locator('sl-icon');

    await expect(icon).toHaveAttribute('name', 'xmark');
    await item.click();
    await expect(icon).toHaveAttribute('name', 'check');
  });

  test('should change color on toggle', async ({ page }) => {
    const item = page.locator('sl-switch').filter({ hasText: 'Text inside the switch' });
    const checked_color = '#3366ff';
    const unchecked_color = '#818b98';
    await expect(item).toHaveCSS('--_bg-color', unchecked_color);
    await item.click();
    await expect(item).toHaveCSS('--_bg-color', checked_color);
  });

  test('should not allow to toggle disabled switch', async ({
    page,
  }) => {
    const item = page.locator('sl-switch').filter({ hasText: 'Disabled switch' });
    await expect(item).toHaveAttribute('disabled', '');
    await expect(item).not.toHaveAttribute('checked');
    await item.click({ force: true });
    await expect(item).not.toHaveAttribute('checked');
  });
});
