import { test, expect } from '@playwright/test';

test.describe('sl-checkbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-checkbox');
  });

  test('should check  and uncheck the enabled sl-checkbox', async ({
    page,
  }) => {
    const checkbox = page.locator('sl-checkbox', {
      hasText: 'Test 1',
    });
    await expect(checkbox).not.toHaveAttribute('checked', '');

    await checkbox.click();
    await expect(checkbox).toHaveAttribute('checked', '');

    await checkbox.click();
    await expect(checkbox).not.toHaveAttribute('checked', '');
  });

  test('should not check the disabled sl-checkbox', async ({ page }) => {
    const checkbox = page.locator('sl-checkbox', {
      hasText: 'Test 2',
    });

    await expect(checkbox).toHaveAttribute('disabled', '');
    await checkbox.click({ force: true });
    await expect(checkbox).not.toHaveAttribute('checked', '');
  });
});
