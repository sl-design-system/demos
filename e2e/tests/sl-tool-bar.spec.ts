import { test, expect } from '@playwright/test';

test.describe('sl-tool-bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-tool-bar');
  });

  test('should click the sl-button and open a new page', async ({ page }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-button', { hasText: 'Copy' }).click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });

  test('should expand menu when clicking the Edit button', async ({ page }) => {
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(
      page.locator('sl-menu-item', { hasText: 'Rename...' }),
    ).toBeVisible();
    await expect(
      page.locator('sl-menu-item', { hasText: 'Delete...' }),
    ).toBeVisible();
  });

  test('should click the sl-menu-item open menu and open a new page', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Edit' }).click();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-menu-item', { hasText: 'Delete...' }).click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });

  test('should click the disabled sl-button and not open a new page', async ({
    page,
  }) => {
    const [newPage] = await Promise.all([
      page
        .context()
        .waitForEvent('page')
        .catch(() => null),
      page.locator('sl-button', { hasText: 'Paste' }).click(),
    ]);
    expect(newPage).toBeNull();
  });
});
