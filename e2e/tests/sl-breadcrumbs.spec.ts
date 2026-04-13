import { test, expect } from '@playwright/test';

test.describe('sl-breadcrumbs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sl-breadcrumbs');
  });

  test('should click the sl-breadcrumbs child item and open a new page', async ({
    page,
  }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('sl-breadcrumbs>a', { hasText: 'Test 1' }).click(),
    ]);
    await expect(newPage).toHaveURL('about:blank');
  });

  test('should click the sl-breadcrumbs home button and navigate to base url', async ({
    page,
  }) => {
    const baseUrl = '/sl-accordion';

    await Promise.all([
      page.waitForURL(baseUrl),
      page.locator('.home').click(),
    ]);
    await expect(page).toHaveURL(baseUrl);
  });
});
